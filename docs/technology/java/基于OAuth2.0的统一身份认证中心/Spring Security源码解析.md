# Spring Security源码解析

## 安全相关Filter清单

| 名称                                    | 简介                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| WebAsyncManagerIntegrationFilter        | 为请求处理过程中可能发生的异步调用准备安全上下文获取途径     |
| SecurityContextPersistenceFilter        | 整个请求处理过程所需的安全上下文对象SecurityContext的准备和清理<br/>不管请求是否针对需要登录才能访问的页面，这里都会确保SecurityContextHolder中出现一个SecurityContext对象:<br/>1.未登录状态访问登录保护页面:空SecurityContext对象，所含Authentication为null<br/>2.登录状态访问某个页面:从SecurityContextRepository获取的SecurityContext对象<br/ |
| HeaderWriterFilter                      | 将指定的头部信息写入响应对象                                 |
| CsrfFilter                              | 对请求进行csrf保护                                           |
| LogoutFilter                            | 检测用户退出登录请求并做相应退出登录处理                     |
| UsernamePasswordAuthenticationFilter    | 检测用户名/密码表单登录认证请求并作相应认证处理:<br/>  1.session管理，比如为新登录用户创建新session(session fixation防护)和设置新的csrf token等<br/>  2.经过完全认证的Authentication对象设置到SecurityContextHolder中的SecurityContext上;<br/>  3.发布登录认证成功事件InteractiveAuthenticationSuccessEvent<br/>  4.登录认证成功时的Remember Me处理<br/>  5.登录认证成功时的页面跳转<br/ |
| DefaultLoginPageGeneratingFilter        | 生成缺省的登录页面                                           |
| DefaultLogoutPageGeneratingFilter       | 生成缺省的退出登录页面                                       |
| BasicAuthenticationFilter               | 检测和处理http basic认证                                     |
| RequestCacheAwareFilter                 | 提取请求缓存中缓存的请求<br/>1.请求缓存在安全机制启动时指定<br/>2.请求写入缓存在其他地方完成<br/>3.典型应用场景:<br/>    1.用户请求保护的页面，<br/>    2.系统引导用户完成登录认证,<br/>    3.然后自动跳转到到用户最初请求页面 |
| SecurityContextHolderAwareRequestFilter | 包装请求对象使之可以访问SecurityContextHolder,从而使请求真正意义上拥有接口HttpServletRequest中定义的getUserPrincipal这种访问安全信息的能力 |
| RememberMeAuthenticationFilter          | 针对Remember Me登录认证机制的处理逻辑                        |
| AnonymousAuthenticationFilter           | 如果当前SecurityContext属性Authentication为null，将其替换为一个AnonymousAuthenticationToken |
| SessionManagementFilter                 | 检测从请求处理开始到目前是否有用户登录认证，如果有做相应的session管理，比如针对为新登录用户创建新的session(session fixation防护)和设置新的csrf token等。 |
| ExceptionTranslationFilter              | 处理AccessDeniedException和 AuthenticationException异常，将它们转换成相应的HTTP响应 |
| FilterSecurityInterceptor               | 一个请求处理的安全处理过滤器链的最后一个，检查用户是否已经认证,如果未认证执行必要的认证，对目标资源的权限检查，如果认证或者权限不足，抛出相应的异常:AccessDeniedException或者AuthenticationException |
|                                         |                                                              |

**注意 :**

- 上面的Filter并不总是同时被起用，根据配置的不同，会启用不同的Filter。

-  对于被起用的Filter，在对一个请求进行处理时，位于以上表格上部的过滤器先被调用。

- 上面的Filter被启用时并不是直接添加到Servlet容器的Filter chain中,而是先被组织成一个FilterChainProxy, 然后这个Filter会被添加到Servlet容器的Filter chain中。

  > FilterChainProxy也是一个Filter,它应用了代理模式和组合模式，它将上面的各个Filter组织到一起在自己内部形成一个filter chain,当自己被调用到时，它其实把任务代理给自己内部的filter chain完成。

- 上面的Spring Security Filter被组合到一个FilterChainProxy的过程可以参考配置类WebSecurityConfiguration的方法Filter springSecurityFilterChain(),这是一个bean定义方法，使用的bean名称为AbstractSecurityWebApplicationInitializer.DEFAULT_FILTER_NAME:springSecurityFilterChain。

### WebAsyncManagerIntegrationFilter

#### 概述

此过滤器用于集成`SecurityContext`到`Spring`异步执行机制中的`WebAsyncManager`。

#### 源代码解析

```java
// 此过滤器用于集成SecurityContext到Spring异步执行机制中的WebAsyncManager。
public final class WebAsyncManagerIntegrationFilter extends OncePerRequestFilter {
    private static final Object CALLABLE_INTERCEPTOR_KEY = new Object();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 从请求属性上获取所绑定的`WebAsyncManager`，如果尚未绑定，先做绑定
        // 相应的属性名称为 :
        // org.springframework.web.context.request.async.WebAsyncManager.WEB_ASYNC_MANAGER
        WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

        // 从 asyncManager 中获取 key 为 CALLABLE_INTERCEPTOR_KEY 的
        //  SecurityContextCallableProcessingInterceptor,  如果获取到的为 null，
        // 说明其中还没有 key 为 CALLABLE_INTERCEPTOR_KEY 的
        // SecurityContextCallableProcessingInterceptor, 新建一个并使用该 key
        // 注册上去
        SecurityContextCallableProcessingInterceptor securityProcessingInterceptor = (SecurityContextCallableProcessingInterceptor) asyncManager
                .getCallableInterceptor(CALLABLE_INTERCEPTOR_KEY);
        if (securityProcessingInterceptor == null) {
            // 这里新建的 SecurityContextCallableProcessingInterceptor 实现了
            // 接口 CallableProcessingInterceptor，当它被应用于一次异步执行时，
            // 它的方法beforeConcurrentHandling() 会在调用者线程执行，该方法
            // 会相应地从当前线程获取SecurityContext,然后被调用者线程中执行设计的
            // 逻辑时，会使用这个SecurityContext，从而实现安全上下文从调用者线程
            // 到被调用者线程的传播
            asyncManager.registerCallableInterceptor(CALLABLE_INTERCEPTOR_KEY,
                    new SecurityContextCallableProcessingInterceptor());
        }

        // 上面是本过滤器的职责逻辑:为整个请求处理过程中可能的异步处理做安全上下文相关的
        // 准备。现在该任务已经完成，继续 filter chain 的调用。
        filterChain.doFilter(request, response);
    }
}
```

### SecurityContextPersistenceFilter

####概述
**`SecurityContextPersistenceFilter`有两个主要任务:**

1. 在请求到达时处理之前，从`SecurityContextRepository`中获取安全上下文信息填充到`SecurityContextHolder;`
2. 在请求处理结束后返回响应时，将SecurityContextHolder中的安全上下文信息保存回SecurityContextRepository,并清空SecurityContextHolder。

通过SecurityContextPersistenceFilter的这种机制，在整个请求处理过程中，开发人员都可以通过使用SecurityContextHolder获取当前访问用户的安全上下文信息。

> 缺省情况下，SecurityContextPersistenceFilter使用的SecurityContextRepository是HttpSessionSecurityContextRepository，也就是将安全上下文的信息保存在用户的会话中。
>

为了解决不同Serlvet容器上，尤其是weblogic上的兼容性问题，此Filter必须在整个request处理过程中被调用最多一次。

该Filter也必须在任何认证机制逻辑发生之前被调用。因为这些认证机制都依赖于SecurityContextHolder所包含的安全上下文对象。

#### 源代码解析

```java
public class SecurityContextPersistenceFilter extends GenericFilterBean {

    // 确保该Filter在一个request处理过程中最多被调到用一次的机制：
    // 一旦该Fitler被调用过，他会在当前request增加该属性值为true，利用此标记
    // 可以避免Filter被调用二次。
    static final String FILTER_APPLIED = "__spring_security_scpf_applied";

    // 安全上下文存储库
    private SecurityContextRepository repo;

    private boolean forceEagerSessionCreation = false;

    public SecurityContextPersistenceFilter() {
        // 缺省使用http session 作为安全上下文对象存储
        this(new HttpSessionSecurityContextRepository());
    }

    public SecurityContextPersistenceFilter(SecurityContextRepository repo) {
        this.repo = repo;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (request.getAttribute(FILTER_APPLIED) != null) {
            // ensure that filter is only applied once per request
            // 检查调用标志，如果request上已经存在属性FILTER_APPLIED,
            // 表明该Filter在该request的处理过程中已经被调用过
            chain.doFilter(request, response);
            return;
        }

        final boolean debug = logger.isDebugEnabled();

        // 设置该Filter已经被调用的标记
        request.setAttribute(FILTER_APPLIED, Boolean.TRUE);

        if (forceEagerSessionCreation) {
            HttpSession session = request.getSession();

            if (debug && session.isNew()) {
                logger.debug("Eagerly created session: " + session.getId());
            }
        }

        HttpRequestResponseHolder holder = new HttpRequestResponseHolder(request,
                response);
        // 从安全上下文存储库(缺省是http session)中读取安全上下文对象
        SecurityContext contextBeforeChainExecution = repo.loadContext(holder);

        try {
            // 设置安全上下文对象到SecurityContextHolder然后才继续Filter chain的调用
            SecurityContextHolder.setContext(contextBeforeChainExecution);

            chain.doFilter(holder.getRequest(), holder.getResponse());

        } finally {
            SecurityContext contextAfterChainExecution = SecurityContextHolder
                    .getContext();
            // Crucial removal of SecurityContextHolder contents - do this before anything
            // else.
            // 当前请求已经被处理完成了，清除SecurityContextHolder并将最新的
            // 安全上下文对象保存回安全上下文存储库(缺省是http session)
            SecurityContextHolder.clearContext();
            repo.saveContext(contextAfterChainExecution, holder.getRequest(),
                    holder.getResponse());
            request.removeAttribute(FILTER_APPLIED);

            if (debug) {
                logger.debug("SecurityContextHolder now cleared, as request processing completed");
            }
        }
    }

    public void setForceEagerSessionCreation(boolean forceEagerSessionCreation) {
        this.forceEagerSessionCreation = forceEagerSessionCreation;
    }
}
```

### HeaderWriterFilter

#### 概述
`Spring Securty` 使用该`Filter`在一个请求的处理过程中为响应对象增加一些头部信息。头部信息由外部提供，比如用于增加一些浏览器保护的头部，比如`X-Frame-Options,` `X-XSS-Protection`和`X-Content-Type-Options`等。

具体的做法是在请求到达的时候将传入的响应对象包装成一个具有头部写入能力的`HeaderWriterResponse`对象，`HeaderWriterResponse`所具备的头部写入能力是这样的 :

1. `HeaderWriterResponse` 继承自 `OnCommittedResponseWrapper`
   `OnCommittedResponseWrapper`会检测`response commit`,在这之前调用特定方法`onResponseCommitted`；

   > response commit 通常发生在include, redirect, sendError, flushBuffer这些事情发生时。

2. HeaderWriterResponse实现onResponseCommitted方法，该方法用于将指定的头部信息写入响应;
3. HeaderWriterResponse实现了一个writeHeaders方法，该方法用于将指定的头部信息写入响应；

因为具备了上述能力，所以一旦在请求处理过程中检测到`response commit`,`onResponseCommitted`会被调用，
如果没有检测到`response commit`,程序再次回到当前Filter时，它会主动调用`HeaderWriterResponse#writeHeaders`
将头部信息写入响应。

把头部信息写入响应的动作不会被执行超过一次，因为`onResponseCommitted`,`writeHeaders`方法都会检测一个头部信息是否已经写入的标记(具体请参考下面的源代码解析)。

#### 源代码解析

```java
public class HeaderWriterFilter extends OncePerRequestFilter {

    /**
     * Collection of  HeaderWriter instances to write out the headers to the
     * response.
     * 将要写入响应头部的头部写入器，注意，这里不是直接提供头部信息让该Filter自己写入响应头部，
     * 而是委托给各个头部写入器HeaderWriter完成，当前Filter并不关心每个头部信息如何写入的细节。
     */
    private final List<HeaderWriter> headerWriters;

    /**
     * Creates a new instance. 构建一个当前Filter的实例，外部提供对响应对象的头部写入器
     *
     * @param headerWriters the  HeaderWriter instances to write out headers to the
     *                      HttpServletResponse.
     */
    public HeaderWriterFilter(List<HeaderWriter> headerWriters) {
        Assert.notEmpty(headerWriters, "headerWriters cannot be null or empty");
        this.headerWriters = headerWriters;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 将传入的response对象和头部写入器放在一起包装成一个HeaderWriterResponse对象，
        // 该HeaderWriterResponse本身带有执行头部写入器的能力(可以被外部主动调用,也可能在响应对象
        // 的某些事件发生时自主调用)，但此时并不执行这些头部写入器，只是将响应对象携带上需要的信息
        // 二次封装继续传递，在需要执行的时候再执行。
        HeaderWriterResponse headerWriterResponse = new HeaderWriterResponse(request,
                response, this.headerWriters);
        HeaderWriterRequest headerWriterRequest = new HeaderWriterRequest(request,
                headerWriterResponse);

        try {
            // 头部写入器已经绑定到二次封装的headerWriterResponse上了，继续filter chain
            // 的执行
            filterChain.doFilter(headerWriterRequest, headerWriterResponse);
        } finally {
            // 逻辑执行到这里，说明请求处理已经完成，已经处于回写响应对象给客户的阶段了，
            // 这里调用头部写入方法。
            // 注意，这里虽然调用头部写入方法，但真正的头部写入动作并不一定真正在这里发生,
            // 因为该动作有可能已经在其他Filter中发生，具体请参考OnCommittedResponseWrapper
            // 赋予HeaderWriterResponse的这种能力。
            headerWriterResponse.writeHeaders();
        }
    }

    // 继承OnCommittedResponseWrapper实现一个自定义的HttpServletResponse，
    // HeaderWriterResponse 实现的核心逻辑是提供一个onResponseCommitted()方法实现，
    // 用于写入要求的头部信息到响应对象。
    // 而onResponseCommitted()会在response被commit前确保被调用，这一点是OnCommittedResponseWrapper
    // 的任务。一般来讲，在处理中发生 include,sendError, redirect, flushBuffer 时会导致 response commit,
    // 而OnCommittedResponseWrapper的设计目的就是就是在这些事件将要发生时，调用onResponseCommitted()。
    static class HeaderWriterResponse extends OnCommittedResponseWrapper {
        private final HttpServletRequest request;
        private final List<HeaderWriter> headerWriters;

        HeaderWriterResponse(HttpServletRequest request, HttpServletResponse response,
                             List<HeaderWriter> headerWriters) {
            super(response);
            this.request = request;
            this.headerWriters = headerWriters;
        }

        /*
         * (non-Javadoc)
         *
         * @see org.springframework.security.web.util.OnCommittedResponseWrapper#
         * onResponseCommitted()
         */
        @Override
        protected void onResponseCommitted() {
            // 将头部信息写入响应对象
            writeHeaders();
            // 一旦完成头部写入，设置一个标记声明这件事情，从而可以避免
            // 对该方法的再次调用或者对writeHeaders()不会导致重复写入
            // 头部信息到响应对象
            this.disableOnResponseCommitted();
        }

        protected void writeHeaders() {
            if (isDisableOnResponseCommitted()) {
                // 先检查是否已经将头部写入响应的标记，如果已经写入则不再二次写入
                return;
            }
            // 将头部写入响应
            for (HeaderWriter headerWriter : this.headerWriters) {
                headerWriter.writeHeaders(this.request, getHttpResponse());
            }
        }

        private HttpServletResponse getHttpResponse() {
            return (HttpServletResponse) getResponse();
        }
    }

    static class HeaderWriterRequest extends HttpServletRequestWrapper {
        private final HeaderWriterResponse response;

        HeaderWriterRequest(HttpServletRequest request, HeaderWriterResponse response) {
            super(request);
            this.response = response;
        }

        @Override
        public RequestDispatcher getRequestDispatcher(String path) {
            return new HeaderWriterRequestDispatcher(super.getRequestDispatcher(path), this.response);
        }
    }

    static class HeaderWriterRequestDispatcher implements RequestDispatcher {
        private final RequestDispatcher delegate;
        private final HeaderWriterResponse response;

        HeaderWriterRequestDispatcher(RequestDispatcher delegate, HeaderWriterResponse response) {
            this.delegate = delegate;
            this.response = response;
        }

        @Override
        public void forward(ServletRequest request, ServletResponse response) throws ServletException, IOException {
            this.delegate.forward(request, response);
        }

        @Override
        public void include(ServletRequest request, ServletResponse response) throws ServletException, IOException {
            this.response.onResponseCommitted();
            this.delegate.include(request, response);
        }
    }
}
```

### CsrfFilter

#### 概述

`Spring Security Web`使用该Filter解决Cross-Site Request Forgery (CSRF)攻击,使用的模式是Synchronizer token pattern (STP)。

> `STP`模式本意是每个请求都生成一个不同的,随机的,不可预测的`token`用于`CSRF`保护。这种严格的模式`CSRF`保护能力很强。但是每请求必验给服务端增加了额外的负担，另外它也要求浏览器必须保持正确的事件顺序，从而会带来一些可用性上的问题(比如用户打开了多个Tab的情况)。所以`Spring Security`中把这种限制放宽到了每个`session`使用一个`csrf token`，并且仅针对会对服务器进行状态更新的HTTP动作:PATCH, POST, PUT,DELETE等。

#### 源代码解析

```java
public final class CsrfFilter extends OncePerRequestFilter {
    /**
     * The default RequestMatcher that indicates if CSRF protection is required or
     * not. The default is to ignore GET, HEAD, TRACE, OPTIONS and process all other
     * requests.
     * 用于检测哪些请求需要csrf保护，这里的缺省配置是：GET, HEAD, TRACE, OPTIONS这种只读的
     * HTTP动词都被忽略不做csrf保护，而其他PATCH, POST, PUT,DELETE等会修改服务器状态的HTTP
     * 动词会受到当前Filter的csrf保护。
     */
    public static final RequestMatcher DEFAULT_CSRF_MATCHER = new DefaultRequiresCsrfMatcher();

    private final Log logger = LogFactory.getLog(getClass());
    private final CsrfTokenRepository tokenRepository;
    private RequestMatcher requireCsrfProtectionMatcher = DEFAULT_CSRF_MATCHER;
    // 用于CSRF保护验证逻辑失败进行处理
    private AccessDeniedHandler accessDeniedHandler = new AccessDeniedHandlerImpl();

    // 构造函数，使用指定的csrf token存储库构造一个CsrfFilter实例
    // 缺省情况下，使用Spring Security 的 Springboot web 应用，选择使用的
    // csrfTokenRepository是一个做了惰性封装的HttpSessionCsrfTokenRepository实例。
    // 也就是说相应的 csrf token保存在http session中。
    public CsrfFilter(CsrfTokenRepository csrfTokenRepository) {
        Assert.notNull(csrfTokenRepository, "csrfTokenRepository cannot be null");
        this.tokenRepository = csrfTokenRepository;
    }

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.web.filter.OncePerRequestFilter#doFilterInternal(javax.servlet
     * .http.HttpServletRequest, javax.servlet.http.HttpServletResponse,
     * javax.servlet.FilterChain)
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        request.setAttribute(HttpServletResponse.class.getName(), response);

        // 从csrf token存储库中获取针对当前请求的csrf token。
        CsrfToken csrfToken = this.tokenRepository.loadToken(request);
        // 记录针对当前请求是否不存在csrf token
        final boolean missingToken = csrfToken == null;
        if (missingToken) {
            // 如果存储库中尚不存在针对当前请求的csrf token，生成一个，把它关联到
            // 当前请求保存到csrf token存储库中
            csrfToken = this.tokenRepository.generateToken(request);
            this.tokenRepository.saveToken(csrfToken, request, response);
        }
        // 将从存储库中获取得到的或者新建并保存到存储库的csrf token保存为请求的两个属性
        request.setAttribute(CsrfToken.class.getName(), csrfToken);
        request.setAttribute(csrfToken.getParameterName(), csrfToken);

        if (!this.requireCsrfProtectionMatcher.matches(request)) {
            // 检测当前请求是否需要csrf保护，如果不需要，放行继续执行filter chain的其他逻辑
            filterChain.doFilter(request, response);
            return;
        }

        // 尝试从请求头部或者参数中获取浏览器端传递过来的实际的csrf token。
        // 缺省情况下，从头部取出时使用header name: X-CSRF-TOKEN
        // 从请求中获取参数时使用的参数名称是 : _csrf
        String actualToken = request.getHeader(csrfToken.getHeaderName());
        if (actualToken == null) {
            actualToken = request.getParameter(csrfToken.getParameterName());
        }
        if (!csrfToken.getToken().equals(actualToken)) {
            // csrf token存储库中取出的token和浏览器端传递过来的token不相等的情况有两种:
            // 1. 针对该请求在存储库中并不存在csrf token
            // 2. 针对该请求在存储库中的csrf token和请求参数实际携带的不一致
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Invalid CSRF token found for "
                        + UrlUtils.buildFullRequestUrl(request));
            }
            if (missingToken) {
                // 1. 针对该请求在存储库中并不存在csrf token ， 处理方案:
                // 抛出异常 MissingCsrfTokenException
                this.accessDeniedHandler.handle(request, response,
                        new MissingCsrfTokenException(actualToken));
            } else {
                // 2. 针对该请求在存储库中的csrf token和请求参数实际携带的不一致,处理方案:
                // 抛出异常 InvalidCsrfTokenException
                this.accessDeniedHandler.handle(request, response,
                        new InvalidCsrfTokenException(csrfToken, actualToken));
            }
            return;
        }

        // 当前请求需要经该Filter的csrf验证逻辑并且通过了csrf验证，放行，继续执行filter chain
        // 其他部分逻辑
        filterChain.doFilter(request, response);
    }

    /**
     * Specifies a RequestMatcher that is used to determine if CSRF protection
     * should be applied. If the RequestMatcher returns true for a given request,
     * then CSRF protection is applied.
     *
     * 指定一个RequestMatcher用来检测一个请求是否需要应用csrf保护验证逻辑。
     *
     * The default is to apply CSRF protection for any HTTP method other than GET, HEAD,
     * TRACE, OPTIONS.
     * 缺省行为是针对GET, HEAD,TRACE, OPTIONS这种只读性的HTTP请求不做csrf保护验证，验证其他
     * 那些会更新服务器状态的HTTP请求，比如PATCH, POST, PUT,DELETE等。
     *
     *
     * @param requireCsrfProtectionMatcher the RequestMatcher used to determine if
     * CSRF protection should be applied.
     */
    public void setRequireCsrfProtectionMatcher(
            RequestMatcher requireCsrfProtectionMatcher) {
        Assert.notNull(requireCsrfProtectionMatcher,
                "requireCsrfProtectionMatcher cannot be null");
        this.requireCsrfProtectionMatcher = requireCsrfProtectionMatcher;
    }

    /**
     * Specifies a AccessDeniedHandler that should be used when CSRF protection
     * fails.
     * 指定一个AccessDeniedHandler用于CSRF保护验证逻辑失败进行处理。
     *
     * The default is to use AccessDeniedHandlerImpl with no arguments.
     * 缺省行为是使用一个不但参数的AccessDeniedHandlerImpl实例。
     *
     * @param accessDeniedHandler the AccessDeniedHandler to use
     */
    public void setAccessDeniedHandler(AccessDeniedHandler accessDeniedHandler) {
        Assert.notNull(accessDeniedHandler, "accessDeniedHandler cannot be null");
        this.accessDeniedHandler = accessDeniedHandler;
    }

    // 用于检测哪些HTTP请求需要应用csrf保护的RequestMatcher，
    // 缺省行为是针对GET, HEAD,TRACE, OPTIONS这种只读性的HTTP请求不做csrf保护，
    // 其他那些会更新服务器状态的HTTP请求，比如PATCH, POST, PUT,DELETE等需要csrf保护。
    private static final class DefaultRequiresCsrfMatcher implements RequestMatcher {
        private final HashSet<String> allowedMethods = new HashSet<>(
                Arrays.asList("GET", "HEAD", "TRACE", "OPTIONS"));

        /*
         * (non-Javadoc)
         *
         * @see
         * org.springframework.security.web.util.matcher.RequestMatcher#matches(javax.
         * servlet.http.HttpServletRequest)
         */
        @Override
        public boolean matches(HttpServletRequest request) {
            return !this.allowedMethods.contains(request.getMethod());
        }
    }
}
```

### LogoutFilter

#### 概述
在进行安全配置时，不管是明确指定还是使用缺省配置，最终安全配置中都会包含以下退出登录配置信息:

- 怎样的请求是一个退出登录请求
  - 这里包含两部分信息: url, http method

- 成功退出登录过程需要做哪些事情
  - 也就是各种配置的LogoutHandler
  - 核心LogoutHandler:SecurityContextLogoutHandler–销毁session和SecurityContextHolder内容

- 成功退出登录后跳转到哪里
  - 也就是配置中的 logoutSuccessUrl

基于以上配置信息，`LogoutFilter`被设计用于检测用户退出登录请求,执行相应的处理工作以及退出登录后的页面跳转。

#### 源代码解析

```
public class LogoutFilter extends GenericFilterBean {

    // ~ Instance fields
    // ================================================================================================

    private RequestMatcher logoutRequestMatcher;

    private final LogoutHandler handler;
    private final LogoutSuccessHandler logoutSuccessHandler;

    // ~ Constructors
    // ===================================================================================================

    /**
     * Constructor which takes a LogoutSuccessHandler instance to determine the
     * target destination after logging out. The list of LogoutHandlers are
     * intended to perform the actual logout functionality (such as clearing the security
     * context, invalidating the session, etc.).
     * 缺省情况下，这里的LogoutSuccessHandler是一个SimpleUrlLogoutSuccessHandler实例，
     * 在退出登录成功时跳转到/。
     * <p>
     * 安全配置信息中还会包含对cookie,remember me 等安全机制的配置，这些机制中在用户成功退出
     * 登录时也会执行一些相应的清场工作，这些工作就是通过参数handlers传递进来的。这些handlers
     * 中最核心的一个就是SecurityContextLogoutHandler,它会销毁session和针对当前请求的
     * SecurityContextHolder中的安全上下文对象，这是真正意义上的退出登录。
     */
    public LogoutFilter(LogoutSuccessHandler logoutSuccessHandler,
                        LogoutHandler... handlers) {
        this.handler = new CompositeLogoutHandler(handlers);
        Assert.notNull(logoutSuccessHandler, "logoutSuccessHandler cannot be null");
        this.logoutSuccessHandler = logoutSuccessHandler;
        setFilterProcessesUrl("/logout");
    }

    // 另外一个构造函数，如果没有指定logoutSuccessHandler,而是只指定了logoutSuccessUrl,
    // 该方法会根据logoutSuccessUrl构造一个logoutSuccessHandler：SimpleUrlLogoutSuccessHandler
    public LogoutFilter(String logoutSuccessUrl, LogoutHandler... handlers) {
        this.handler = new CompositeLogoutHandler(handlers);
        Assert.isTrue(
                !StringUtils.hasLength(logoutSuccessUrl)
                        || UrlUtils.isValidRedirectUrl(logoutSuccessUrl),
                () -> logoutSuccessUrl + " isn't a valid redirect URL");
        SimpleUrlLogoutSuccessHandler urlLogoutSuccessHandler = new SimpleUrlLogoutSuccessHandler();
        if (StringUtils.hasText(logoutSuccessUrl)) {
            urlLogoutSuccessHandler.setDefaultTargetUrl(logoutSuccessUrl);
        }
        logoutSuccessHandler = urlLogoutSuccessHandler;
        setFilterProcessesUrl("/logout");
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (requiresLogout(request, response)) {
            // 检测到用户请求了退出当前登录,现在执行退出登录逻辑
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (logger.isDebugEnabled()) {
                logger.debug("Logging out user '" + auth
                        + "' and transferring to logout destination");
            }

            this.handler.logout(request, response, auth);

            // 缺省情况下，这里的LogoutSuccessHandler是一个SimpleUrlLogoutSuccessHandler实例，
            // 在退出登录成功时跳转到/。
            // 上面已经成功退出了用户登录，现在跳转到相应的页面
            logoutSuccessHandler.onLogoutSuccess(request, response, auth);

            // 注意,这里完成了用户退出登录动作和页面跳转，所以当前请求的处理任务已经结束,
            // 也就是说不用再继续filter chain的执行了，直接函数返回即可。
            return;
        }

        // 不是用户请求退出登录的情况，继续执行 filter chain 。
        chain.doFilter(request, response);
    }

    /**
     * Allow subclasses to modify when a logout should take place.
     * 根据当前请求和安全配置检测是否用户在请求退出登录，如果是用户在请求退出登录的情况返回true，
     * 否则返回false
     *
     * @param request  the request
     * @param response the response
     * @return true if logout should occur, false otherwise
     */
    protected boolean requiresLogout(HttpServletRequest request,
                                     HttpServletResponse response) {
        //     logoutRequestMatcher 是配置时明确指定的，或者是根据其他配置计算出来的
        return logoutRequestMatcher.matches(request);
    }

    // 配置阶段会将用户明确指定的logoutRequestMatcher或者根据其他配置计算出来的logoutRequestMatcher
    // 通过该方法设置到当前Filter对象
    public void setLogoutRequestMatcher(RequestMatcher logoutRequestMatcher) {
        Assert.notNull(logoutRequestMatcher, "logoutRequestMatcher cannot be null");
        this.logoutRequestMatcher = logoutRequestMatcher;
    }

    // 调用该方法则会将当前Filter的logoutRequestMatcher设置为一个根据filterProcessesUrl计算出来的
    //AntPathRequestMatcher,该matcher会仅根据请求url进行匹配，而不管http method是什么
    //
    // 在该Filter的构造函数中就调用了该方法setFilterProcessesUrl("/logout"),从而构建了一个缺省的
    // AntPathRequestMatcher,表示只要用户访问 url /logout,不管http method是什么，都认为用户想要
    // 退出登录。但实际上，该初始值都会被配置过程中根据用户配置信息计算出的AntPathRequestMatcher
    // 调用上面的setLogoutRequestMatcher(logoutRequestMatcher)覆盖该matcher
    public void setFilterProcessesUrl(String filterProcessesUrl) {
        this.logoutRequestMatcher = new AntPathRequestMatcher(filterProcessesUrl);
    }
}
```