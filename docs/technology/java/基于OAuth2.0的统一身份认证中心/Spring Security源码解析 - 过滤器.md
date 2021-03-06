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

### UsernamePasswordAuthenticationFilter

#### 概述
该过滤器会拦截用户请求，看它是否是一个来自用户名/密码表单登录页面提交的用户登录认证请求，缺省使用的匹配模式是:`POST /login`。缺省情况下，如果是用户登录认证请求，该请求就不会在整个filter chain中继续传递了，而是会被当前过滤器处理并进入响应用户阶段。

具体用户登录认证处理逻辑是这样的，它会调用所指定的`AuthenticationManager`认证所提交的用户名/密码。

如果认证成功，则会 ：

1. 调用所设置的`SessionAuthenticationStrategy`会话认证策略;

   > 针对Servlet 3.1+,缺省所使用的SessionAuthenticationStrategy是一个ChangeSessionIdAuthenticationStrategy和CsrfAuthenticationStrategy组合。ChangeSessionIdAuthenticationStrategy会为登录的用户创建一个新的session，而CsrfAuthenticationStrategy会创建新的csrf token用于CSRF保护。

2. 经过完全认证的Authentication对象设置到SecurityContextHolder中的SecurityContext上;

3. 如果请求要求了Remember Me,进行相应记录;

4. 发布事件`InteractiveAuthenticationSuccessEvent`;

5. 获取并跳转到目标跳转页面；

   > 缺省情况下，该跳转策略是`SavedRequestAwareAuthenticationSuccessHandler`。

   1. 如果有保存的请求,则获取保存的请求，跳转到相应的请求地址;

      > 一般在未登录用户直接访问受保护页面时会出现该情况：先被跳转到登录页面，登录完成过后再被跳转到原始请求页面

   2. `alwaysUseDefaultTargetUrl`为true则总是会跳到指定的defaultTargetUrl;

      > 注意: `defaultTargetUrl` 也是可以设置的，如果不设置，其值缺省为/

   3. `alwaysUseDefaultTargetUrl`为`false`则
      1. 看请求参数中是否含有名称为配置参数`targetUrlParameter`值的参数，如果有，跳转到它定义的地址；
      2. 否则如果指定了`useReferer`，尝试使用请求头部Referer作为目标跳转地址;
      3. 否则使用`defaultTargetUrl`作为目标跳转地址;

#### 源代码解析

```java
/*
 * Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.web.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

/**
 * Abstract processor of browser-based HTTP-based authentication requests.
 * 基于浏览器和HTTP的认证请求的处理抽象。
 *
 * <h3>Authentication Process</h3> 认证过程
 * <p>
 * The filter requires that you set the <tt>authenticationManager</tt> property. An
 * <tt>AuthenticationManager</tt> is required to process the authentication request tokens
 * created by implementing classes.
 * 该过滤器执行认证需要一个authenticationManager，这个AuthenticationManager用来针对
 * 所创建的认证请求token做真正的用户身份认证动作。
 * <p>
 * This filter will intercept a request and attempt to perform authentication from that
 * request if the request matches the
 * {@link #setRequiresAuthenticationRequestMatcher(RequestMatcher)}.
 * 该过滤器拦截请求识别当前请求是否一个用户名/密码表单认证请求的匹配方法是通过方法
 * <p>
 * Authentication is performed by the
 * {@link #attemptAuthentication(HttpServletRequest, HttpServletResponse)
 * attemptAuthentication} method, which must be implemented by subclasses.
 * 认证动作由方法#attemptAuthentication(HttpServletRequest, HttpServletResponse)完成，
 * 该方法由子类实现。上面的UsernamePasswordAuthenticationFilter就提供了该方法的实现。
 *
 * <h4>Authentication Success</h4> 认证成功
 * <p>
 * If authentication is successful, the resulting {@link Authentication} object will be
 * placed into the <code>SecurityContext</code> for the current thread, which is
 * guaranteed to have already been created by an earlier filter.
 * 认证成功时，结果认证对象Authentication会被放到一个SecurityContext对象中，然后保存在处理
 * 当前请求的线程中。
 * <p>
 * The configured {@link #setAuthenticationSuccessHandler(AuthenticationSuccessHandler)
 * AuthenticationSuccessHandler} will then be called to take the redirect to the
 * appropriate destination after a successful login. The default behaviour is implemented
 * in a {@link SavedRequestAwareAuthenticationSuccessHandler} which will make use of any
 * <tt>DefaultSavedRequest</tt> set by the <tt>ExceptionTranslationFilter</tt> and
 * redirect the user to the URL contained therein. Otherwise it will redirect to the
 * webapp root "/". You can customize this behaviour by injecting a differently configured
 * instance of this class, or by using a different implementation.
 * 然后通过#setAuthenticationSuccessHandler(AuthenticationSuccessHandler)所设置的
 * AuthenticationSuccessHandler会被调用，从而页面被跳转到所配置的成功登录页面。
 * <p>
 * See the
 * {@link #successfulAuthentication(HttpServletRequest, HttpServletResponse, FilterChain, Authentication)}
 * method for more information.
 *
 * <h4>Authentication Failure</h4> 认证失败
 * <p>
 * If authentication fails, it will delegate to the configured
 * {@link AuthenticationFailureHandler} to allow the failure information to be conveyed to
 * the client. The default implementation is {@link SimpleUrlAuthenticationFailureHandler}
 * , which sends a 401 error code to the client. It may also be configured with a failure
 * URL as an alternative. Again you can inject whatever behaviour you require here.
 * 如果认证失败，该过滤器会代理给AuthenticationFailureHandler将失败信息传回给客户。缺省实现是
 * 一个SimpleUrlAuthenticationFailureHandler，它会发送一个HTTP 401代码给客户端。
 * <h4>Event Publication</h4> 事件发布
 * <p>
 * If authentication is successful, an {@link InteractiveAuthenticationSuccessEvent} will
 * be published via the application context. No events will be published if authentication
 * was unsuccessful, because this would generally be recorded via an
 * {@code AuthenticationManager}-specific application event.
 * 认证成功时一个InteractiveAuthenticationSuccessEvent事件会发布到应用上下文。认证不成功
 * 则不会发布任何事件。
 * <h4>Session Authentication</h4>
 * <p>
 * The class has an optional {@link SessionAuthenticationStrategy} which will be invoked
 * immediately after a successful call to {@code attemptAuthentication()}. Different
 * implementations
 * {@link #setSessionAuthenticationStrategy(SessionAuthenticationStrategy) can be
 * injected} to enable things like session-fixation attack prevention or to control the
 * number of simultaneous sessions a principal may have.
 *
 * @author Ben Alex
 * @author Luke Taylor
 */
public abstract class AbstractAuthenticationProcessingFilter extends GenericFilterBean
        implements ApplicationEventPublisherAware, MessageSourceAware {
    // ~ Static fields/initializers
    // =====================================================================================

    // ~ Instance fields
    // ================================================================================================

    protected ApplicationEventPublisher eventPublisher;
    protected AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
    // 真正执行认证的认真管理器
    private AuthenticationManager authenticationManager;
    protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
    private RememberMeServices rememberMeServices = new NullRememberMeServices();

    private RequestMatcher requiresAuthenticationRequestMatcher;

    // 登录认证成功时是否继续执行filter chain，缺省为false，该属性安全配置阶段会重新指定,
    // 但安全配置阶段缺省使用的值也是false，表示登录认证成功时不继续执行filter chain，而是
    // 由该页面直接进入响应用户阶段
    private boolean continueChainBeforeSuccessfulAuthentication = false;

    // session 认证策略
    // 安全配置中缺省是一个 CompositeSessionAuthenticationStrategy 对象，应用了组合模式，组合一些其他的
    // session 认证策略实现，比如针对Servlet 3.1+,缺省会是 ChangeSessionIdAuthenticationStrategy跟
    // CsrfAuthenticationStrategy组合
    // 这里虽然初始化为NullAuthenticatedSessionStrategy,但它会被安全配置中的值覆盖
    private SessionAuthenticationStrategy sessionStrategy = new NullAuthenticatedSessionStrategy();

    private boolean allowSessionCreation = true;

    private AuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
    private AuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();

    // ~ Constructors
    // ===================================================================================================

    /**
     * @param defaultFilterProcessesUrl the default value for <tt>filterProcessesUrl</tt>.
     */
    protected AbstractAuthenticationProcessingFilter(String defaultFilterProcessesUrl) {
        setFilterProcessesUrl(defaultFilterProcessesUrl);
    }

    /**
     * Creates a new instance
     *
     * @param requiresAuthenticationRequestMatcher the {@link RequestMatcher} used to
     *                                             determine if authentication is required. Cannot be null.
     */
    protected AbstractAuthenticationProcessingFilter(
            RequestMatcher requiresAuthenticationRequestMatcher) {
        Assert.notNull(requiresAuthenticationRequestMatcher,
                "requiresAuthenticationRequestMatcher cannot be null");
        this.requiresAuthenticationRequestMatcher = requiresAuthenticationRequestMatcher;
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void afterPropertiesSet() {
        Assert.notNull(authenticationManager, "authenticationManager must be specified");
    }

    /**
     * Invokes the
     * {@link #requiresAuthentication(HttpServletRequest, HttpServletResponse)
     * requiresAuthentication} method to determine whether the request is for
     * authentication and should be handled by this filter. If it is an authentication
     * request, the
     * {@link #attemptAuthentication(HttpServletRequest, HttpServletResponse)
     * attemptAuthentication} will be invoked to perform the authentication. There are
     * then three possible outcomes:
     * <ol>
     * <li>An <tt>Authentication</tt> object is returned. The configured
     * {@link SessionAuthenticationStrategy} will be invoked (to handle any
     * session-related behaviour such as creating a new session to protect against
     * session-fixation attacks) followed by the invocation of
     * {@link #successfulAuthentication(HttpServletRequest, HttpServletResponse, FilterChain, Authentication)}
     * method</li>
     * <li>An <tt>AuthenticationException</tt> occurs during authentication. The
     * {@link #unsuccessfulAuthentication(HttpServletRequest, HttpServletResponse, AuthenticationException)
     * unsuccessfulAuthentication} method will be invoked</li>
     * <li>Null is returned, indicating that the authentication process is incomplete. The
     * method will then return immediately, assuming that the subclass has done any
     * necessary work (such as redirects) to continue the authentication process. The
     * assumption is that a later request will be received by this method where the
     * returned <tt>Authentication</tt> object is not null.
     * </ol>
     */
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (!requiresAuthentication(request, response)) {
            // 检查当前请求是否是一个用户名/密码登录表单请求，如果不是，则继续执行filter chain
            // 的其他部分
            chain.doFilter(request, response);

            return;
        }

        // 下面是检测到这是一个用户名/密码登录表单请求时的处理逻辑
        if (logger.isDebugEnabled()) {
            logger.debug("Request is to process authentication");
        }

        Authentication authResult;

        try {
            // 交给 AuthenticationManger 执行相应的认证
            authResult = attemptAuthentication(request, response);
            if (authResult == null) {
                // return immediately as subclass has indicated that it hasn't completed
                // authentication
                return;
            }
            //针对Servlet 3.1+,缺省所使用的SessionAuthenticationStrategy会是一个
            //ChangeSessionIdAuthenticationStrategy和CsrfAuthenticationStrategy组合。
            //ChangeSessionIdAuthenticationStrategy会为登录的用户创建一个新的session，
            //而CsrfAuthenticationStrategy会创建新的csrf token用于CSRF保护。
            sessionStrategy.onAuthentication(authResult, request, response);
        } catch (InternalAuthenticationServiceException failed) {
            logger.error(
                    "An internal error occurred while trying to authenticate the user.",
                    failed);
            // 认证失败
            unsuccessfulAuthentication(request, response, failed);

            return;
        } catch (AuthenticationException failed) {
            // Authentication failed
            // 认证失败
            unsuccessfulAuthentication(request, response, failed);

            return;
        }

        // Authentication success
        // 认证成功，如果continueChainBeforeSuccessfulAuthentication为true，
        // (continueChainBeforeSuccessfulAuthentication缺省为false)
        // 继续执行filter chain的其他部分
        if (continueChainBeforeSuccessfulAuthentication) {
            chain.doFilter(request, response);
        }

        // 认证成功后的处理逻辑
        successfulAuthentication(request, response, chain, authResult);
    }

    /**
     * 检测当前请求是否是登录认证请求
     * Indicates whether this filter should attempt to process a login request for the
     * current invocation.
     * <p>
     * It strips any parameters from the "path" section of the request URL (such as the
     * jsessionid parameter in <em>http://host/myapp/index.html;jsessionid=blah</em>)
     * before matching against the <code>filterProcessesUrl</code> property.
     * <p>
     * Subclasses may override for special requirements, such as Tapestry integration.
     *
     * @return <code>true</code> if the filter should attempt authentication,
     * <code>false</code> otherwise.
     */
    protected boolean requiresAuthentication(HttpServletRequest request,
                                             HttpServletResponse response) {
        return requiresAuthenticationRequestMatcher.matches(request);
    }

    /**
     * Performs actual authentication. 执行真正的认证
     * <p>
     * The implementation should do one of the following:
     * 会是以下三种情况之一:
     * <ol>
     * <li>Return a populated authentication token for the authenticated user, indicating
     * successful authentication</li> 认证成功，填充认证了的用户的其他信息到authentication token并返回之
     * <li>Return null, indicating that the authentication process is still in progress.
     * Before returning, the implementation should perform any additional work required to
     * complete the process.</li> 返回null表示认证仍在进行中。
     * <li>Throw an <tt>AuthenticationException</tt> if the authentication process fails</li>
     * 抛出一个异常AuthenticationException表示认证失败。
     * </ol>
     *
     * @param request  from which to extract parameters and perform the authentication
     * @param response the response, which may be needed if the implementation has to do a
     *                 redirect as part of a multi-stage authentication process (such as OpenID).
     * @return the authenticated user token, or null if authentication is incomplete.
     * @throws AuthenticationException if authentication fails.
     */
    public abstract Authentication attemptAuthentication(HttpServletRequest request,
                                                         HttpServletResponse response) throws AuthenticationException, IOException,
            ServletException;

    /**
     * Default behaviour for successful authentication. 认证成功时的缺省行为
     * <ol>
     * <li>Sets the successful <tt>Authentication</tt> object on the
     * {@link SecurityContextHolder}</li>
     * <li>Informs the configured <tt>RememberMeServices</tt> of the successful login</li>
     * <li>Fires an {@link InteractiveAuthenticationSuccessEvent} via the configured
     * <tt>ApplicationEventPublisher</tt></li>
     * <li>Delegates additional behaviour to the {@link AuthenticationSuccessHandler}.</li>
     * </ol>
     * <p>
     * Subclasses can override this method to continue the {@link FilterChain} after
     * successful authentication.
     *
     * @param request
     * @param response
     * @param chain
     * @param authResult the object returned from the <tt>attemptAuthentication</tt>
     *                   method.
     * @throws IOException
     * @throws ServletException
     */
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        if (logger.isDebugEnabled()) {
            logger.debug("Authentication success. Updating SecurityContextHolder to contain: "
                    + authResult);
        }

        SecurityContextHolder.getContext().setAuthentication(authResult);

        rememberMeServices.loginSuccess(request, response, authResult);

        // Fire event
        if (this.eventPublisher != null) {
            eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(
                    authResult, this.getClass()));
        }

        successHandler.onAuthenticationSuccess(request, response, authResult);
    }

    /**
     * Default behaviour for unsuccessful authentication.
     * 认证失败时的缺省行为
     * <ol>
     * <li>Clears the {@link SecurityContextHolder}</li>
     * <li>Stores the exception in the session (if it exists or
     * <tt>allowSesssionCreation</tt> is set to <tt>true</tt>)</li>
     * <li>Informs the configured <tt>RememberMeServices</tt> of the failed login</li>
     * <li>Delegates additional behaviour to the {@link AuthenticationFailureHandler}.</li>
     * </ol>
     */
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response, AuthenticationException failed)
            throws IOException, ServletException {
        SecurityContextHolder.clearContext();

        if (logger.isDebugEnabled()) {
            logger.debug("Authentication request failed: " + failed.toString(), failed);
            logger.debug("Updated SecurityContextHolder to contain null Authentication");
            logger.debug("Delegating to authentication failure handler " + failureHandler);
        }

        rememberMeServices.loginFail(request, response);

        failureHandler.onAuthenticationFailure(request, response, failed);
    }

    protected AuthenticationManager getAuthenticationManager() {
        return authenticationManager;
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * Sets the URL that determines if authentication is required
     *
     * @param filterProcessesUrl
     */
    public void setFilterProcessesUrl(String filterProcessesUrl) {
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(
                filterProcessesUrl));
    }

    public final void setRequiresAuthenticationRequestMatcher(
            RequestMatcher requestMatcher) {
        Assert.notNull(requestMatcher, "requestMatcher cannot be null");
        this.requiresAuthenticationRequestMatcher = requestMatcher;
    }

    public RememberMeServices getRememberMeServices() {
        return rememberMeServices;
    }

    public void setRememberMeServices(RememberMeServices rememberMeServices) {
        Assert.notNull(rememberMeServices, "rememberMeServices cannot be null");
        this.rememberMeServices = rememberMeServices;
    }

    /**
     * Indicates if the filter chain should be continued prior to delegation to
     * {@link #successfulAuthentication(HttpServletRequest, HttpServletResponse, FilterChain, Authentication)}
     * , which may be useful in certain environment (such as Tapestry applications).
     * Defaults to <code>false</code>.
     */
    public void setContinueChainBeforeSuccessfulAuthentication(
            boolean continueChainBeforeSuccessfulAuthentication) {
        this.continueChainBeforeSuccessfulAuthentication = continueChainBeforeSuccessfulAuthentication;
    }

    public void setApplicationEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void setAuthenticationDetailsSource(
            AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource) {
        Assert.notNull(authenticationDetailsSource,
                "AuthenticationDetailsSource required");
        this.authenticationDetailsSource = authenticationDetailsSource;
    }

    public void setMessageSource(MessageSource messageSource) {
        this.messages = new MessageSourceAccessor(messageSource);
    }

    protected boolean getAllowSessionCreation() {
        return allowSessionCreation;
    }

    public void setAllowSessionCreation(boolean allowSessionCreation) {
        this.allowSessionCreation = allowSessionCreation;
    }

    /**
     * The session handling strategy which will be invoked immediately after an
     * authentication request is successfully processed by the
     * <tt>AuthenticationManager</tt>. Used, for example, to handle changing of the
     * session identifier to prevent session fixation attacks.
     *
     * @param sessionStrategy the implementation to use. If not set a null implementation
     *                        is used.
     */
    public void setSessionAuthenticationStrategy(
            SessionAuthenticationStrategy sessionStrategy) {
        this.sessionStrategy = sessionStrategy;
    }

    /**
     * Sets the strategy used to handle a successful authentication. By default a
     * {@link SavedRequestAwareAuthenticationSuccessHandler} is used.
     */
    public void setAuthenticationSuccessHandler(
            AuthenticationSuccessHandler successHandler) {
        Assert.notNull(successHandler, "successHandler cannot be null");
        this.successHandler = successHandler;
    }

    public void setAuthenticationFailureHandler(
            AuthenticationFailureHandler failureHandler) {
        Assert.notNull(failureHandler, "failureHandler cannot be null");
        this.failureHandler = failureHandler;
    }

    protected AuthenticationSuccessHandler getSuccessHandler() {
        return successHandler;
    }

    protected AuthenticationFailureHandler getFailureHandler() {
        return failureHandler;
    }
}
```

### DefaultLoginPageGeneratingFilter

#### 概述
当开发人员在安全配置中没有配置登录页面时，`Spring Security Web`会自动构造一个登录页面给用户。完成这一任务是通过一个过滤器来完成的，该过滤器就是`DefaultLoginPageGeneratingFilter`。

**该过滤器支持两种登录情景:**

- 用户名/密码表单登录
- OpenID表单登录

无论以上哪种登录情景，该过滤器都会使用以下信息用于构建登录HTML页面 :

- 当前请求是否为登录页面请求的匹配器定义–由配置明确指定或者使用缺省值 `/login`

- 当前请求是否跳转自登录错误处理以及相应异常信息 – 缺省对应url : `/login?error`

- 当前请求是否跳转自退出登录成功处理 – 缺省对应url : `/login?logout`

- 配置指定使用用户名/密码表单登录还是`OpenID`表单登录

- 表单构建信息

  - `csrf token`信息
  - 针对用户名/密码表单登录的表单构建信息
    - 登录表单提交处理地址
    - 用户名表单字段名称
    - 密码表单字段名称
    - `RememberMe` 表单字段名称

  - 针对OpenID表单登录的表单构建信息
    - 登录表单提交处理地址
    - `OpenID`表单字段名称
    - `RememberMe` 表单字段名称

该过滤器被请求到达时会首先看是不是自己关注的请求，如果是，则会根据相应信息构建一个登录页面`HTML`直接写回浏览器端，对该请求的处理也到此结束，不再继续调用`filter chain`中的其他逻辑。

#### 生成的用户名/密码表单登录页面效果

由该Filter生成的用户名/密码表单登录页面如下所示：

![用户名/密码登录页面效果](https://img-blog.csdnimg.cn/20181203102339102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FuZHlfemhhbmcyMDA3,size_16,color_FFFFFF,t_70)


#### 生成的OpenID表单登录页面效果

由该Filter生成的OpenID表单登录页面如下所示：

![OpenId登录页面效果](https://img-blog.csdnimg.cn/20181203104714316.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FuZHlfemhhbmcyMDA3,size_16,color_FFFFFF,t_70)


#### 源代码解析

```java
/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.security.web.authentication.ui;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.AbstractRememberMeServices;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import java.util.function.Function;

/**
 * For internal use with namespace configuration in the case where a user doesn't
 * configure a login page. The configuration code will insert this filter in the chain
 * instead.
 * 内部使用的一个过滤器，当用户没有指定一个登录页面时，安全配置逻辑自动插入这样一个过滤器用于
 * 自动生成一个登录页面。
 * <p>
 * Will only work if a redirect is used to the login page.
 *
 * @author Luke Taylor
 * @since 2.0
 */
public class DefaultLoginPageGeneratingFilter extends GenericFilterBean {
    public static final String DEFAULT_LOGIN_PAGE_URL = "/login";
    public static final String ERROR_PARAMETER_NAME = "error";
    private String loginPageUrl;
    private String logoutSuccessUrl;
    private String failureUrl;
    private boolean formLoginEnabled;
    private boolean openIdEnabled;
    private boolean oauth2LoginEnabled;
    // 用于构造用户名/密码表单登录页面的参数
    // 表单提交时的认证处理地址
    private String authenticationUrl;
    // 用户名表单字段的名称
    private String usernameParameter;
    //  密码表单字段的名称
    private String passwordParameter;
    // rememberMe表单字段的名称
    private String rememberMeParameter;
    // 用于构造openID表单登录页面的参数
    // 提交时的认证处理地址
    private String openIDauthenticationUrl;
    //  用户名表单字段的名称
    private String openIDusernameParameter;
    // rememberMe表单字段的名称
    private String openIDrememberMeParameter;
    private Map<String, String> oauth2AuthenticationUrlToClientName;
    private Function<HttpServletRequest, Map<String, String>> resolveHiddenInputs = request -> Collections
            .emptyMap();


    public DefaultLoginPageGeneratingFilter() {
    }

    public DefaultLoginPageGeneratingFilter(AbstractAuthenticationProcessingFilter filter) {
        if (filter instanceof UsernamePasswordAuthenticationFilter) {
            init((UsernamePasswordAuthenticationFilter) filter, null);
        } else {
            init(null, filter);
        }
    }

    public DefaultLoginPageGeneratingFilter(
            UsernamePasswordAuthenticationFilter authFilter,
            AbstractAuthenticationProcessingFilter openIDFilter) {
        init(authFilter, openIDFilter);
    }

    // 支持两种登录方式:用户名/密码表单登录,openID登录，根据提供的filter参数的类型
    // 判断使用了哪种登录方式
    private void init(UsernamePasswordAuthenticationFilter authFilter,
                      AbstractAuthenticationProcessingFilter openIDFilter) {
        // 登录页面，缺省为 /logoin
        this.loginPageUrl = DEFAULT_LOGIN_PAGE_URL;
        // 默认的退出登录成功页面 /login?logout
        this.logoutSuccessUrl = DEFAULT_LOGIN_PAGE_URL + "?logout";
        // 登录出错页面, 缺省为 /login?error
        this.failureUrl = DEFAULT_LOGIN_PAGE_URL + "?" + ERROR_PARAMETER_NAME;
        if (authFilter != null) {
            formLoginEnabled = true;
            usernameParameter = authFilter.getUsernameParameter();
            passwordParameter = authFilter.getPasswordParameter();

            if (authFilter.getRememberMeServices() instanceof AbstractRememberMeServices) {
                rememberMeParameter = ((AbstractRememberMeServices) authFilter
                        .getRememberMeServices()).getParameter();
            }
        }

        if (openIDFilter != null) {
            openIdEnabled = true;
            openIDusernameParameter = "openid_identifier";

            if (openIDFilter.getRememberMeServices() instanceof AbstractRememberMeServices) {
                openIDrememberMeParameter = ((AbstractRememberMeServices) openIDFilter
                        .getRememberMeServices()).getParameter();
            }
        }
    }

    /**
     * Sets a Function used to resolve a Map of the hidden inputs where the key is the
     * name of the input and the value is the value of the input. Typically this is used
     * to resolve the CSRF token.
     *
     * @param resolveHiddenInputs the function to resolve the inputs
     */
    public void setResolveHiddenInputs(
            Function<HttpServletRequest, Map<String, String>> resolveHiddenInputs) {
        Assert.notNull(resolveHiddenInputs, "resolveHiddenInputs cannot be null");
        this.resolveHiddenInputs = resolveHiddenInputs;
    }

    public boolean isEnabled() {
        return formLoginEnabled || openIdEnabled || oauth2LoginEnabled;
    }

    public void setLogoutSuccessUrl(String logoutSuccessUrl) {
        this.logoutSuccessUrl = logoutSuccessUrl;
    }

    public String getLoginPageUrl() {
        return loginPageUrl;
    }

    public void setLoginPageUrl(String loginPageUrl) {
        this.loginPageUrl = loginPageUrl;
    }

    public void setFailureUrl(String failureUrl) {
        this.failureUrl = failureUrl;
    }

    public void setFormLoginEnabled(boolean formLoginEnabled) {
        this.formLoginEnabled = formLoginEnabled;
    }

    public void setOpenIdEnabled(boolean openIdEnabled) {
        this.openIdEnabled = openIdEnabled;
    }

    public void setOauth2LoginEnabled(boolean oauth2LoginEnabled) {
        this.oauth2LoginEnabled = oauth2LoginEnabled;
    }

    public void setAuthenticationUrl(String authenticationUrl) {
        this.authenticationUrl = authenticationUrl;
    }

    public void setUsernameParameter(String usernameParameter) {
        this.usernameParameter = usernameParameter;
    }

    public void setPasswordParameter(String passwordParameter) {
        this.passwordParameter = passwordParameter;
    }

    public void setRememberMeParameter(String rememberMeParameter) {
        this.rememberMeParameter = rememberMeParameter;
        this.openIDrememberMeParameter = rememberMeParameter;
    }

    public void setOpenIDauthenticationUrl(String openIDauthenticationUrl) {
        this.openIDauthenticationUrl = openIDauthenticationUrl;
    }

    public void setOpenIDusernameParameter(String openIDusernameParameter) {
        this.openIDusernameParameter = openIDusernameParameter;
    }

    public void setOauth2AuthenticationUrlToClientName(Map<String, String> oauth2AuthenticationUrlToClientName) {
        this.oauth2AuthenticationUrlToClientName = oauth2AuthenticationUrlToClientName;
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 检测是否登录错误页面请求
        boolean loginError = isErrorPage(request);
        // 检测是否退出登录成功页面请求
        boolean logoutSuccess = isLogoutSuccess(request);
        // 检测是否登录页面请求
        if (isLoginUrlRequest(request) || loginError || logoutSuccess) {
            // 如果是上面三种任何一种情况，则自动生成一个登录HTML页面写回响应，
            // 该方法返回，当前请求的处理结束。

            // 生成登录页面的HTML内容
            String loginPageHtml = generateLoginPageHtml(request, loginError,
                    logoutSuccess);
            response.setContentType("text/html;charset=UTF-8");
            response.setContentLength(loginPageHtml.getBytes(StandardCharsets.UTF_8).length);
            // 将登录页面HTML内容写回浏览器
            response.getWriter().write(loginPageHtml);

            // 当前请求的处理已经结果，方法返回，不再继续filter chain的调用
            return;
        }

        chain.doFilter(request, response);
    }

    // 生成登录页面
    // 会根据当前是用户名/密码表单登录请求还是openID表单登录请求生成不同的HTML
    private String generateLoginPageHtml(HttpServletRequest request, boolean loginError,
                                         boolean logoutSuccess) {
        String errorMsg = "Invalid credentials";

        if (loginError) {
            // 如果是登录错误，则从session中获取登录错误异常信息，该错误信息会组织到
            // 回写给浏览器端的HTML页面中
            HttpSession session = request.getSession(false);

            if (session != null) {
                AuthenticationException ex = (AuthenticationException) session
                        .getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
                errorMsg = ex != null ? ex.getMessage() : "Invalid credentials";
            }
        }

        StringBuilder sb = new StringBuilder();

        sb.append("<!DOCTYPE html>\n"
                + "<html lang=\"en\">\n"
                + "  <head>\n"
                + "    <meta charset=\"utf-8\">\n"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n"
                + "    <meta name=\"description\" content=\"\">\n"
                + "    <meta name=\"author\" content=\"\">\n"
                + "    <title>Please sign in</title>\n"
                + "    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M\" crossorigin=\"anonymous\">\n"
                + "    <link href=\"https://getbootstrap.com/docs/4.0/examples/signin/signin.css\" rel=\"stylesheet\" crossorigin=\"anonymous\"/>\n"
                + "  </head>\n"
                + "  <body>\n"
                + "     <div class=\"container\">\n");

        String contextPath = request.getContextPath();
        if (this.formLoginEnabled) { // 针对用户名/密码表单登录的情形构建相应的表单
            sb.append("      <form class=\"form-signin\" method=\"post\" action=\"" + contextPath + this.authenticationUrl + "\">\n"
                    + "        <h2 class=\"form-signin-heading\">Please sign in</h2>\n"
                    + createError(loginError, errorMsg) // 出现登录错误的情况下，需要把登录错误信息追加到页面中
                    + createLogoutSuccess(logoutSuccess) // 如果该页面登录请求跳转自退出登录成功，在页面中追加该信息
                    + "        <p>\n"
                    + "          <label for=\"username\" class=\"sr-only\">Username</label>\n"
                    + "          <input type=\"text\" id=\"username\" name=\"" + this.usernameParameter + "\" class=\"form-control\" placeholder=\"Username\" required autofocus>\n"
                    + "        </p>\n"
                    + "        <p>\n"
                    + "          <label for=\"password\" class=\"sr-only\">Password</label>\n"
                    + "          <input type=\"password\" id=\"password\" name=\"" + this.passwordParameter + "\" class=\"form-control\" placeholder=\"Password\" required>\n"
                    + "        </p>\n"
                    + createRememberMe(this.rememberMeParameter)
                    + renderHiddenInputs(request)
                    + "        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n"
                    + "      </form>\n");
        }

        if (openIdEnabled) { // 针对OpenID表单登录的情形构建相应的表单
            sb.append("      <form name=\"oidf\" class=\"form-signin\" method=\"post\" action=\"" + contextPath + this.openIDauthenticationUrl + "\">\n"
                    + "        <h2 class=\"form-signin-heading\">Login with OpenID Identity</h2>\n"
                    + createError(loginError, errorMsg)
                    + createLogoutSuccess(logoutSuccess)
                    + "        <p>\n"
                    + "          <label for=\"username\" class=\"sr-only\">Identity</label>\n"
                    + "          <input type=\"text\" id=\"username\" name=\"" + this.openIDusernameParameter + "\" class=\"form-control\" placeholder=\"Username\" required autofocus>\n"
                    + "        </p>\n"
                    + createRememberMe(this.openIDrememberMeParameter)
                    + renderHiddenInputs(request)
                    + "        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n"
                    + "      </form>\n");
        }

        if (oauth2LoginEnabled) {
            sb.append("<h2 class=\"form-signin-heading\">Login with OAuth 2.0</h2>");
            sb.append(createError(loginError, errorMsg));
            sb.append(createLogoutSuccess(logoutSuccess));
            sb.append("<table class=\"table table-striped\">\n");
            for (Map.Entry<String, String> clientAuthenticationUrlToClientName : oauth2AuthenticationUrlToClientName.entrySet()) {
                sb.append(" <tr><td>");
                String url = clientAuthenticationUrlToClientName.getKey();
                sb.append("<a href=\"").append(contextPath).append(url).append("\">");
                String clientName = HtmlUtils.htmlEscape(clientAuthenticationUrlToClientName.getValue());
                sb.append(clientName);
                sb.append("</a>");
                sb.append("</td></tr>\n");
            }
            sb.append("</table>\n");
        }
        sb.append("</div>\n");
        sb.append("</body></html>");

        return sb.toString();
    }

    // 如果请求的属性:CsrfToken.class.getName()有值，则渲染一个隐藏的针对csrf token的表单输入框
    // 默认名称是 _csrf
    private String renderHiddenInputs(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> input : this.resolveHiddenInputs.apply(request).entrySet()) {
            sb.append("<input name=\"").append(input.getKey()).append("\" type=\"hidden\" value=\"").append(input.getValue()).append("\" />\n");
        }
        return sb.toString();
    }

    private String createRememberMe(String paramName) {
        if (paramName == null) {
            return "";
        }
        return "<p><input type='checkbox' name='"
                + paramName
                + "'/> Remember me on this computer.</p>\n";
    }

    private boolean isLogoutSuccess(HttpServletRequest request) {
        return logoutSuccessUrl != null && matches(request, logoutSuccessUrl);
    }

    // 检测当前请求是否是一个登录页面请求
    private boolean isLoginUrlRequest(HttpServletRequest request) {
        return matches(request, loginPageUrl);
    }

    // 检测当前请求是否是一个登录错误页面请求
    private boolean isErrorPage(HttpServletRequest request) {
        return matches(request, failureUrl);
    }

    private static String createError(boolean isError, String message) {
        return isError ? "<div class=\"alert alert-danger\" role=\"alert\">" + HtmlUtils.htmlEscape(message) + "</div>" : "";
    }

    private static String createLogoutSuccess(boolean isLogoutSuccess) {
        return isLogoutSuccess ? "<div class=\"alert alert-success\" role=\"alert\">You have been signed out</div>" : "";
    }

    private boolean matches(HttpServletRequest request, String url) {
        if (!"GET".equals(request.getMethod()) || url == null) {
            // 参数检查:
            // 1. 对登录页面的请求仅仅支持GET方式
            // 2. url 不能为空
            return false;
        }
        // 获取请求uri，注意其中不包含QueryString部分
        String uri = request.getRequestURI();
        int pathParamIndex = uri.indexOf(';');

        if (pathParamIndex > 0) {
            // strip everything after the first semi-colon
            uri = uri.substring(0, pathParamIndex);
        }

        if (request.getQueryString() != null) {
            uri += "?" + request.getQueryString();
        }

        // 比较请求的uri和预期的url是否相同
        if ("".equals(request.getContextPath())) {
            return uri.equals(url);
        }

        return uri.equals(request.getContextPath() + url);
    }
}
```

### DefaultLogoutPageGeneratingFilter

#### 概述
`DefaultLogoutPageGeneratingFilter`用于生成一个缺省的用户退出登录页面，默认情况下，当用户请求为`GET /logout`时，该过滤器会起作用，生成并展示相应的用户退出登录表单页面。用户点击其中的表单提交按钮会提交用户退出登录请求到`POST /logout`，缺省情况下，也就是由`LogoutFilte`r过滤器来执行相应的用户退出登录逻辑。

该用户退出登录页面如下所示：

![缺省用户退出登录页面](https://img-blog.csdnimg.cn/20181203132346883.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FuZHlfemhhbmcyMDA3,size_16,color_FFFFFF,t_70)


#### 源码解析

```java
/*
 * Copyright 2002-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.web.authentication.ui;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.Assert;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.function.Function;

/**
 * Generates a default log out page.
 *
 * @author Rob Winch
 * @since 5.1
 */
public class DefaultLogoutPageGeneratingFilter extends OncePerRequestFilter {
    // 缺省用户请求退出登录页面识别匹配器 : GET, /logout
    private RequestMatcher matcher = new AntPathRequestMatcher("/logout", "GET");

    private Function<HttpServletRequest, Map<String, String>> resolveHiddenInputs = request -> Collections
            .emptyMap();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (this.matcher.matches(request)) {
            // 如果当前请求是请求退出登录页面，则渲染该页面给用户并结束对请求的处理
            renderLogout(request, response);
        } else {
            // 如果当前请求不是请求退出登录页面，继续filter chain的调用
            filterChain.doFilter(request, response);
        }
    }

    // 往response中写入一个HTML，这个HTML包含一个FORM表单，该表单包含一个按钮，点击该按钮提交该表单
    // 到退出登录处理URL(也就是由LogoutFilter所负责的逻辑)
    private void renderLogout(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String page = "<!DOCTYPE html>\n"
                + "<html lang=\"en\">\n"
                + "  <head>\n"
                + "    <meta charset=\"utf-8\">\n"
                + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n"
                + "    <meta name=\"description\" content=\"\">\n"
                + "    <meta name=\"author\" content=\"\">\n"
                + "    <title>Confirm Log Out?</title>\n"
                + "    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M\" crossorigin=\"anonymous\">\n"
                + "    <link href=\"https://getbootstrap.com/docs/4.0/examples/signin/signin.css\" rel=\"stylesheet\" crossorigin=\"anonymous\"/>\n"
                + "  </head>\n"
                + "  <body>\n"
                + "     <div class=\"container\">\n"
                + "      <form class=\"form-signin\" method=\"post\" action=\"" + request.getContextPath() + "/logout\">\n"
                + "        <h2 class=\"form-signin-heading\">Are you sure you want to log out?</h2>\n"
                + renderHiddenInputs(request)
                + "        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Log Out</button>\n"
                + "      </form>\n"
                + "    </div>\n"
                + "  </body>\n"
                + "</html>";

        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().write(page);
    }

    /**
     * Sets a Function used to resolve a Map of the hidden inputs where the key is the
     * name of the input and the value is the value of the input. Typically this is used
     * to resolve the CSRF token.
     *
     * @param resolveHiddenInputs the function to resolve the inputs
     */
    public void setResolveHiddenInputs(
            Function<HttpServletRequest, Map<String, String>> resolveHiddenInputs) {
        Assert.notNull(resolveHiddenInputs, "resolveHiddenInputs cannot be null");
        this.resolveHiddenInputs = resolveHiddenInputs;
    }

    // 将一些隐藏输入字段，比如csrf token等，追加到退出登录页面
    private String renderHiddenInputs(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> input : this.resolveHiddenInputs.apply(request).entrySet()) {
            sb.append("<input name=\"").append(input.getKey()).append("\" type=\"hidden\" value=\"").append(input.getValue()).append("\" />\n");
        }
        return sb.toString();
    }
}
```

### BasicAuthenticationFilter

#### 概述
处理HTTP请求中的`BASIC authorization`头部，把认证结果写入`SecurityContextHolder`。

当一个HTTP请求中包含一个名字为`Authorization`的头部，并且其值格式是`Basic xxx`时，该Filter会认为这是一个`BASIC authorization`头部，其中xxx部分应该是一个base64编码的`{username}:{password}`字符串。比如用户名/密码分别为 admin/secret, 则对应的该头部是 : `Basic YWRtaW46c2VjcmV0` 。

该过滤器会从 `HTTP BASIC authorization`头部解析出相应的用户名和密码然后调用AuthenticationManager进行认证，成功的话会把认证了的结果写入到`SecurityContextHolder`中`SecurityContext`的属性`authentication`上面。同时还会做其他一些处理，比如`Remember Me`相关处理等等。

如果头部分析失败，该过滤器会抛出异常`BadCredentialsException`。

如果认证失败，则会清除`SecurityContextHolder`中的`SecurityContext`。并且不再继续`filter chain`的执行。

#### 源代码解析

```java
/*
 * Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.web.authentication.www;

import java.io.IOException;
import java.util.Base64;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.NullRememberMeServices;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.Assert;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Processes a HTTP request's BASIC authorization headers, putting the result into the
 * <code>SecurityContextHolder</code>.
 *
 * <p>
 * For a detailed background on what this filter is designed to process, refer to
 * <a href="http://www.faqs.org/rfcs/rfc1945.html">RFC 1945, Section 11.1</a>. Any realm
 * name presented in the HTTP request is ignored.
 *
 * <p>
 * In summary, this filter is responsible for processing any request that has a HTTP
 * request header of <code>Authorization</code> with an authentication scheme of
 * <code>Basic</code> and a Base64-encoded <code>username:password</code> token. For
 * example, to authenticate user "Aladdin" with password "open sesame" the following
 * header would be presented:
 *
 * <pre>
 *
 * Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
 * </pre>
 *
 * <p>
 * This filter can be used to provide BASIC authentication services to both remoting
 * protocol clients (such as Hessian and SOAP) as well as standard user agents (such as
 * Internet Explorer and Netscape).
 * <p>
 * If authentication is successful, the resulting {@link Authentication} object will be
 * placed into the <code>SecurityContextHolder</code>.
 *
 * <p>
 * If authentication fails and <code>ignoreFailure</code> is <code>false</code> (the
 * default), an {@link AuthenticationEntryPoint} implementation is called (unless the
 * <tt>ignoreFailure</tt> property is set to <tt>true</tt>). Usually this should be
 * {@link BasicAuthenticationEntryPoint}, which will prompt the user to authenticate again
 * via BASIC authentication.
 *
 * <p>
 * Basic authentication is an attractive protocol because it is simple and widely
 * deployed. However, it still transmits a password in clear text and as such is
 * undesirable in many situations. Digest authentication is also provided by Spring
 * Security and should be used instead of Basic authentication wherever possible. See
 * {@link org.springframework.security.web.authentication.www.DigestAuthenticationFilter}.
 * <p>
 * Note that if a {@link RememberMeServices} is set, this filter will automatically send
 * back remember-me details to the client. Therefore, subsequent requests will not need to
 * present a BASIC authentication header as they will be authenticated using the
 * remember-me mechanism.
 *
 * @author Ben Alex
 */
public class BasicAuthenticationFilter extends OncePerRequestFilter {

    // ~ Instance fields
    // ================================================================================================

    // 创建Authentication对象时设置details属性所使用的详情来源
    private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
    private AuthenticationEntryPoint authenticationEntryPoint;
    private AuthenticationManager authenticationManager;
    private RememberMeServices rememberMeServices = new NullRememberMeServices();
    private boolean ignoreFailure = false;
    private String credentialsCharset = "UTF-8";

    /**
     * Creates an instance which will authenticate against the supplied
     * {@code AuthenticationManager} and which will ignore failed authentication attempts,
     * allowing the request to proceed down the filter chain.
     *
     * @param authenticationManager the bean to submit authentication requests to
     */
    public BasicAuthenticationFilter(AuthenticationManager authenticationManager) {
        Assert.notNull(authenticationManager, "authenticationManager cannot be null");
        this.authenticationManager = authenticationManager;
        this.ignoreFailure = true;
    }

    /**
     * Creates an instance which will authenticate against the supplied
     * {@code AuthenticationManager} and use the supplied {@code AuthenticationEntryPoint}
     * to handle authentication failures.
     *
     * @param authenticationManager    the bean to submit authentication requests to
     * @param authenticationEntryPoint will be invoked when authentication fails.
     *                                 Typically an instance of {@link BasicAuthenticationEntryPoint}.
     */
    public BasicAuthenticationFilter(AuthenticationManager authenticationManager,
                                     AuthenticationEntryPoint authenticationEntryPoint) {
        Assert.notNull(authenticationManager, "authenticationManager cannot be null");
        Assert.notNull(authenticationEntryPoint,
                "authenticationEntryPoint cannot be null");
        this.authenticationManager = authenticationManager;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void afterPropertiesSet() {
        Assert.notNull(this.authenticationManager,
                "An AuthenticationManager is required");

        if (!isIgnoreFailure()) {
            Assert.notNull(this.authenticationEntryPoint,
                    "An AuthenticationEntryPoint is required");
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        final boolean debug = this.logger.isDebugEnabled();

        // 获取请求头部 Authorization
        String header = request.getHeader("Authorization");

        if (header == null || !header.toLowerCase().startsWith("basic ")) {
            // 如果头部 Authorization 未设置或者不是 basic 认证头部，则当前
            // 请求不是该过滤器关注的对象，直接放行，继续filter chain 的执行
            chain.doFilter(request, response);
            return;
        }

        // 这是一个 http basic authentication 请求的情况，也就是说，已经检测到
        // 请求头部 Authorization 的值符合格式(大小写不敏感) : "basic xxxxxx"
        try {
            // 分析头部 Authorization 获取用户名和密码
            String[] tokens = extractAndDecodeHeader(header, request);
            assert tokens.length == 2;

            // 现在 tokens[0] 表示用户名， tokens[1] 表示密码
            String username = tokens[0];

            if (debug) {
                this.logger
                        .debug("Basic Authentication Authorization header found for user '"
                                + username + "'");
            }

            // 检测针对所请求的用户名 username 是否需要认证
            if (authenticationIsRequired(username)) {
                // 如果需要认证，使用所获取到的用户名/密码构建一个 UsernamePasswordAuthenticationToken,
                // 然后执行认证流程
                UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                        username, tokens[1]);
                authRequest.setDetails(
                        this.authenticationDetailsSource.buildDetails(request));
                // 执行认证
                Authentication authResult = this.authenticationManager
                        .authenticate(authRequest);

                if (debug) {
                    this.logger.debug("Authentication success: " + authResult);
                }

                // 认证成功，将完全认证的Authentication authRequest设置到 SecurityContextHolder
                // 中的 SecurityContext 上。
                SecurityContextHolder.getContext().setAuthentication(authResult);

                // 认证成功时 RememberMe 相关处理
                this.rememberMeServices.loginSuccess(request, response, authResult);

                // 认证成功时的其他处理: 其实这个个空方法，什么都没做
                onSuccessfulAuthentication(request, response, authResult);
            }

        } catch (AuthenticationException failed) {
            // 认证失败，清除 SecurityContextHolder 的安全上下文
            SecurityContextHolder.clearContext();

            if (debug) {
                this.logger.debug("Authentication request for failed: " + failed);
            }

            // 认证失败 RememberMe 相关处理
            this.rememberMeServices.loginFail(request, response);

            // 认证失败时的其他处理: 其实这个个空方法，什么都没做
            onUnsuccessfulAuthentication(request, response, failed);

            if (this.ignoreFailure) {
                chain.doFilter(request, response);
            } else {
                this.authenticationEntryPoint.commence(request, response, failed);
            }

            return;
        }

        // 如果当前请求并非含有 http basic authentication 头部的请求，则直接放行，继续filter chain的执行
        chain.doFilter(request, response);
    }

    /**
     * Decodes the header into a username and password.
     * 从指定的 http basic authentication 请求头部解码出一个用户名和密码
     *
     * @throws BadCredentialsException if the Basic header is not present or is not valid
     *                                 Base64
     */
    private String[] extractAndDecodeHeader(String header, HttpServletRequest request)
            throws IOException {
        //     截取头部前6个字符之后的内容部分,使用字符集编码方式UTF-8
        // 举例: 整个头部值为 "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==",
        //       这里则是获取"QWxhZGRpbjpvcGVuIHNlc2FtZQ=="部分
        byte[] base64Token = header.substring(6).getBytes("UTF-8");
        // 使用 Base64 字符编码方式解码 base64Token
        byte[] decoded;
        try {
            decoded = Base64.getDecoder().decode(base64Token);
        } catch (IllegalArgumentException e) {
            throw new BadCredentialsException(
                    "Failed to decode basic authentication token");
        }

        // 使用指定的字符集credentialsCharset重新构建"{用户名}:{密码}"字符串
        // credentialsCharset 缺省也是 UTF-8
        String token = new String(decoded, getCredentialsCharset(request));

        // 提取用户名,密码并返回之
        int delim = token.indexOf(":");

        if (delim == -1) {
            throw new BadCredentialsException("Invalid basic authentication token");
        }
        return new String[]{token.substring(0, delim), token.substring(delim + 1)};
    }

    private boolean authenticationIsRequired(String username) {
        // Only reauthenticate if username doesn't match SecurityContextHolder and user
        // isn't authenticated
        // (see SEC-53)
        Authentication existingAuth = SecurityContextHolder.getContext()
                .getAuthentication();

        // 检测 SecurityContextHolder 中 SecurityContext 的 Authentication,
        // 如果它为 null 或者尚未认证，则认为需要认证
        if (existingAuth == null || !existingAuth.isAuthenticated()) {
            return true;
        }

        // Limit username comparison to providers which use usernames (ie
        // UsernamePasswordAuthenticationToken)
        // (see SEC-348)
        // 如果 SecurityContextHolder 中 SecurityContext 的 Authentication 是
        // 已经认证状态，但是其中的用户名和这里的 username 不相同，也认为需要认证
        if (existingAuth instanceof UsernamePasswordAuthenticationToken
                && !existingAuth.getName().equals(username)) {
            return true;
        }

        // Handle unusual condition where an AnonymousAuthenticationToken is already
        // present
        // This shouldn't happen very often, as BasicProcessingFitler is meant to be
        // earlier in the filter
        // chain than AnonymousAuthenticationFilter. Nevertheless, presence of both an
        // AnonymousAuthenticationToken
        // together with a BASIC authentication request header should indicate
        // reauthentication using the
        // BASIC protocol is desirable. This behaviour is also consistent with that
        // provided by form and digest,
        // both of which force re-authentication if the respective header is detected (and
        // in doing so replace
        // any existing AnonymousAuthenticationToken). See SEC-610.
        // 如果 SecurityContextHolder 中 SecurityContext 的 Authentication 是匿名认证，
        // 则认为需要认证
        if (existingAuth instanceof AnonymousAuthenticationToken) {
            return true;
        }

        // 如果 SecurityContextHolder 中 SecurityContext 的 Authentication 是已认证状态,
        // 并且是针对当前username的，则认为不需要认证
        return false;
    }

    protected void onSuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response, Authentication authResult) throws IOException {
    }

    protected void onUnsuccessfulAuthentication(HttpServletRequest request,
                                                HttpServletResponse response, AuthenticationException failed)
            throws IOException {
    }

    protected AuthenticationEntryPoint getAuthenticationEntryPoint() {
        return this.authenticationEntryPoint;
    }

    protected AuthenticationManager getAuthenticationManager() {
        return this.authenticationManager;
    }

    protected boolean isIgnoreFailure() {
        return this.ignoreFailure;
    }

    public void setAuthenticationDetailsSource(
            AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource) {
        Assert.notNull(authenticationDetailsSource,
                "AuthenticationDetailsSource required");
        this.authenticationDetailsSource = authenticationDetailsSource;
    }

    public void setRememberMeServices(RememberMeServices rememberMeServices) {
        Assert.notNull(rememberMeServices, "rememberMeServices cannot be null");
        this.rememberMeServices = rememberMeServices;
    }

    public void setCredentialsCharset(String credentialsCharset) {
        Assert.hasText(credentialsCharset, "credentialsCharset cannot be null or empty");
        this.credentialsCharset = credentialsCharset;
    }

    protected String getCredentialsCharset(HttpServletRequest httpRequest) {
        return this.credentialsCharset;
    }
}
```

### RequestCacheAwareFilter

#### 概述
`Spring Security Web`对请求提供了缓存机制，如果某个请求被缓存，它的提取和使用是交给`RequestCacheAwareFilter`完成的。

系统在启动时，`Spring Security Web`会首先尝试从容器中获取一个`RequestCache bean`,获取失败的话，会构建一个缺省的`RequestCache`对象，然后实例化该过滤器 。

如果容器中不存在`RequestCache bean`,`Spring Security Web`所使用的缺省`RequestCache`是一个`HttpSessionRequestCache`,它会将请求保存在`http session`中，而且不是所有的请求都会被缓存，而是只有符合以下条件的请求才被缓存 ：

1. 必须是 GET /**

2. 并且不能是 /**/favicon.*
3. 并且不能是 application.json
4. 并且不能是 XMLHttpRequest (也就是一般意义上的 ajax 请求)
5. 上面请求缓存条件的定义在RequestCacheConfigurer#createDefaultSavedRequestMatcher中。

> 上面请求缓存条件的定义在`RequestCacheConfigurer#createDefaultSavedRequestMatcher`中。

#### 源代码分析

```java
/*
 * Copyright 2002-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.security.web.savedrequest;

import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Responsible for reconstituting the saved request if one is cached and it matches the
 * current request.
 * <p>
 * It will call
 * {@link RequestCache#getMatchingRequest(HttpServletRequest, HttpServletResponse)
 * getMatchingRequest} on the configured <tt>RequestCache</tt>. If the method returns a
 * value (a wrapper of the saved request), it will pass this to the filter chain's
 * <tt>doFilter</tt> method. If null is returned by the cache, the original request is
 * used and the filter has no effect.
 * 用于用户登录成功后，重新恢复因为登录被打断的请求
 * @author Luke Taylor
 * @since 3.0
 */
public class RequestCacheAwareFilter extends GenericFilterBean {

    private RequestCache requestCache;

    // 使用http session 作为请求缓存的构造函数
    public RequestCacheAwareFilter() {
        this(new HttpSessionRequestCache());
    }

    // 外部指定请求缓存对象的构造函数
    public RequestCacheAwareFilter(RequestCache requestCache) {
        Assert.notNull(requestCache, "requestCache cannot be null");
        this.requestCache = requestCache;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest wrappedSavedRequest = requestCache.getMatchingRequest(
                (HttpServletRequest) request, (HttpServletResponse) response);

        chain.doFilter(wrappedSavedRequest == null ? request : wrappedSavedRequest,
                response);
    }

}
```

### SecurityContextHolderAwareRequestFilter

#### 概述
`SecurityContextHolderAwareRequestFilter`对请求`HttpServletRequest`采用`Wrapper/Decorator`模式包装成一个可以访问`SecurityContextHolder`中安全上下文的`SecurityContextHolderAwareRequestWrapper`。这样接口`HttpServletRequest`上定义的`getUserPrincipal`这种安全相关的方法才能访问到相应的安全信息。

> 针对`Servlet 2.5`和`Servlet 3`,该过滤器使用了不一样的工厂，但最终都是使用`SecurityContextHolderAwareRequestWrapper`封装请求使其具备访问`SecurityContextHolder`安全上下文的能力。

#### 源代码解析

```java
public class SecurityContextHolderAwareRequestFilter extends GenericFilterBean {
    // ~ Instance fields
    // ================================================================================================

    // 缺省角色名称的前缀
    private String rolePrefix = "ROLE_";

    // 用于封装HttpServletRequest的工厂类，最终目的是封装HttpServletRequest
    // 使之具有访问SecurityContextHolder中安全上下文的能力。
    // 针对 Servlet 2.5 和 Servlet 3 使用的不同实现类。
    private HttpServletRequestFactory requestFactory;

    private AuthenticationEntryPoint authenticationEntryPoint;

    private AuthenticationManager authenticationManager;

    private List<LogoutHandler> logoutHandlers;

    // 判断认证对象Authentication是何种类型:是否匿名Authentication,
    // 是否 Remember Me Authentication。
    // 缺省使用实现AuthenticationTrustResolverImpl,
    // 根据对象Authentication所使用的实现类是AnonymousAuthenticationToken
    // 还是RememberMeAuthenticationToken达到上述目的
    private AuthenticationTrustResolver trustResolver = new AuthenticationTrustResolverImpl();

    // ~ Methods
    // ========================================================================================================
    // 指定角色前缀，
    public void setRolePrefix(String rolePrefix) {
        Assert.notNull(rolePrefix, "Role prefix must not be null");
        this.rolePrefix = rolePrefix;
        // 角色前缀变更时更新requestFactory工厂
        updateFactory();
    }

    /**
     * <p>
     * Sets the {@link AuthenticationEntryPoint} used when integrating
     * {@link HttpServletRequest} with Servlet 3 APIs. Specifically, it will be used when
     * {@link HttpServletRequest#authenticate(HttpServletResponse)} is called and the user
     * is not authenticated.
     * </p>
     * <p>
     * If the value is null (default), then the default container behavior will be be
     * retained when invoking {@link HttpServletRequest#authenticate(HttpServletResponse)}
     * .
     * </p>
     *
     * @param authenticationEntryPoint the {@link AuthenticationEntryPoint} to use when
     *                                 invoking {@link HttpServletRequest#authenticate(HttpServletResponse)} if the user
     *                                 is not authenticated.
     * @throws IllegalStateException if the Servlet 3 APIs are not found on the classpath
     */
    public void setAuthenticationEntryPoint(
            AuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    /**
     * <p>
     * Sets the {@link AuthenticationManager} used when integrating
     * {@link HttpServletRequest} with Servlet 3 APIs. Specifically, it will be used when
     * {@link HttpServletRequest#login(String, String)} is invoked to determine if the
     * user is authenticated.
     * </p>
     * <p>
     * If the value is null (default), then the default container behavior will be
     * retained when invoking {@link HttpServletRequest#login(String, String)}.
     * </p>
     *
     * @param authenticationManager the {@link AuthenticationManager} to use when invoking
     *                              {@link HttpServletRequest#login(String, String)}
     * @throws IllegalStateException if the Servlet 3 APIs are not found on the classpath
     */
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * <p>
     * Sets the {@link LogoutHandler}s used when integrating with
     * {@link HttpServletRequest} with Servlet 3 APIs. Specifically it will be used when
     * {@link HttpServletRequest#logout()} is invoked in order to log the user out. So
     * long as the {@link LogoutHandler}s do not commit the {@link HttpServletResponse}
     * (expected), then the user is in charge of handling the response.
     * </p>
     * <p>
     * If the value is null (default), the default container behavior will be retained
     * when invoking {@link HttpServletRequest#logout()}.
     * </p>
     *
     * @param logoutHandlers the {@code List&lt;LogoutHandler&gt;}s when invoking
     *                       {@link HttpServletRequest#logout()}.
     * @throws IllegalStateException if the Servlet 3 APIs are not found on the classpath
     */
    public void setLogoutHandlers(List<LogoutHandler> logoutHandlers) {
        this.logoutHandlers = logoutHandlers;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(this.requestFactory.create((HttpServletRequest) req,
                (HttpServletResponse) res), res);
    }

    @Override
    public void afterPropertiesSet() throws ServletException {
        // 本Filter因为继承自GenericFilterBean，从而隐含地实现了接口InitializingBean，
        // 所以会有此方法。而此方法会在该Filter bean被初始化时调用。此时会确定具体使用的
        // requestFactory 实例
        super.afterPropertiesSet();
        updateFactory();
    }

    private void updateFactory() {
        // 更新封装HttpServletRequest的工厂实例requestFactory，
        // 根据当前使用的Servlet版本的不同使用不同的工厂类
        String rolePrefix = this.rolePrefix;
        this.requestFactory = isServlet3() ? createServlet3Factory(rolePrefix)
                : new HttpServlet25RequestFactory(this.trustResolver, rolePrefix);
    }

    /**
     * Sets the {@link AuthenticationTrustResolver} to be used. The default is
     * {@link AuthenticationTrustResolverImpl}.
     *
     * @param trustResolver the {@link AuthenticationTrustResolver} to use. Cannot be
     *                      null.
     */
    public void setTrustResolver(AuthenticationTrustResolver trustResolver) {
        Assert.notNull(trustResolver, "trustResolver cannot be null");
        this.trustResolver = trustResolver;
        // trustResolver 变更时更新requestFactory工厂
        updateFactory();
    }

    private HttpServletRequestFactory createServlet3Factory(String rolePrefix) {
        HttpServlet3RequestFactory factory = new HttpServlet3RequestFactory(rolePrefix);
        factory.setTrustResolver(this.trustResolver);
        factory.setAuthenticationEntryPoint(this.authenticationEntryPoint);
        factory.setAuthenticationManager(this.authenticationManager);
        factory.setLogoutHandlers(this.logoutHandlers);
        return factory;
    }

    /**
     * Returns true if the Servlet 3 APIs are detected.
     *
     * @return
     */
    private boolean isServlet3() {
        return ClassUtils.hasMethod(ServletRequest.class, "startAsync");
    }
}
```

### RememberMeAuthenticationFilter

#### 概述
缺省情况下，如果安全配置开启了`Remember Me`机制，用户在登录界面上会看到`Remember Me`选择框，如果用户选择了该选择框，会导致生成一个名为`remember-me`,属性`httpOnly`为`true`的`cookie`，其值是一个`RememberMe token`。

> `RememberMe token`是一个`Base64`编码的字符串，解码后格式为`{用户名}:{Token过期时间戳}:{Token签名摘要}`,比如:`admin:1545787408479:d0b0e7a53960e94b521bee3f02ba0bf5`

而该过滤器在每次请求到达时会检测`SecurityContext`属性`Authentication`是否已经设置。如果没有设置，会进入该过滤器的职责逻辑。它尝试获取名为`remember-me`的`cookie`,获取到的话会认为这是一次`Remember Me`登录尝试，从中分析出用户名,`Token`过期时间戳，签名摘要，针对用户库验证这些信息，认证通过的话，就会往SecurityContext里面设置`Authentication`为一个针对请求中所指定用户的`RememberMeAuthenticationToken`。

认证成功的话，也会向应用上下文发布事件`InteractiveAuthenticationSuccessEvent`。

默认情况下不管认证成功还是失败，请求都会被继续执行。

> 不过也可以指定一个`AuthenticationSuccessHandler`给当前过滤器，这样当`Remember Me`登录认证成功时，处理委托给该`AuthenticationSuccessHandler`,而不再继续原请求的处理。利用这种机制，可以为`Remember Me`登录认证成功指定特定的跳转地址。
>

`Remember Me`登录认证成功并不代表用户一定可以访问到目标页面，因为如果`Remember Me`登录认证成功对应用户访问权限级别为`isRememberMe`，而目标页面需要更高的访问权限级别`fullyAuthenticated`,这时候请求最终会被拒绝访问目标页面，原因是权限不足(虽然认证通过)。

> 如果你想观察该过滤器的行为，可以这么做：
>
> 1. 在配置中开启`Remember Me`机制，则此过滤器会被使用;
> 2. 启动应用，打开浏览器,提供正确的用户名密码，选择`Remember Me`选项,然后提交完成一次成功的登录;
> 3. 关闭整个浏览器;
> 4. 重新打开刚刚关闭的浏览器;
> 5. 直接访问某个受`rememberMe`访问级别保护的页面，你会看到该过滤器的职责逻辑被执行，目标页面可以访问。
>    注意 : 这里如果访问某个受`fullyAuthenticated`访问级别保护的页面，目标页面则不能访问，浏览器会被跳转到登录页面。

#### 源代码解析

```java
public class RememberMeAuthenticationFilter extends GenericFilterBean implements
        ApplicationEventPublisherAware {

    // ~ Instance fields
    // ================================================================================================

    private ApplicationEventPublisher eventPublisher;
    private AuthenticationSuccessHandler successHandler;
    private AuthenticationManager authenticationManager;
    private RememberMeServices rememberMeServices;

    public RememberMeAuthenticationFilter(AuthenticationManager authenticationManager,
                                          RememberMeServices rememberMeServices) {
        Assert.notNull(authenticationManager, "authenticationManager cannot be null");
        Assert.notNull(rememberMeServices, "rememberMeServices cannot be null");
        this.authenticationManager = authenticationManager;
        this.rememberMeServices = rememberMeServices;
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void afterPropertiesSet() {
        Assert.notNull(authenticationManager, "authenticationManager must be specified");
        Assert.notNull(rememberMeServices, "rememberMeServices must be specified");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            // 如果SecurityContext中authentication为空则尝试 remember me 自动认证,
            // 缺省情况下这里rememberMeServices会是一个TokenBasedRememberMeServices,
            // 其自动 remember me 认证过程如下:
            // 1. 获取 cookie remember-me 的值 , 一个base64 编码串;
            // 2. 从上面cookie之中解析出信息:用户名，token 过期时间，token 签名
            // 3. 检查用户是否存在，token是否过期，token 签名是否一致,
            // 上面三个步骤都通过的情况下再检查一下账号是否锁定，过期，禁用，密码过期等现象,
            // 如果上面这些验证都通过，则认为认证成功，会构造一个
            // RememberMeAuthenticationToken并返回
            // 上面的认证失败会有rememberMeAuth==null
            Authentication rememberMeAuth = rememberMeServices.autoLogin(request,
                    response);

            if (rememberMeAuth != null) {
                // Attempt authenticaton via AuthenticationManager
                try {
                    // 如果上面的 Remember Me 认证成功，则需要使用 authenticationManager
                    // 认证该rememberMeAuth
                    rememberMeAuth = authenticationManager.authenticate(rememberMeAuth);

                    // Store to SecurityContextHolder
                    // 将认证成功的rememberMeAuth放到SecurityContextHolder中的SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(rememberMeAuth);

                    // 成功时的其他操作:空方法，其实没有其他在这里做
                    onSuccessfulAuthentication(request, response, rememberMeAuth);

                    if (logger.isDebugEnabled()) {
                        logger.debug("SecurityContextHolder populated with remember-me token: '"
                                + SecurityContextHolder.getContext().getAuthentication()
                                + "'");
                    }

                    // Fire event
                    if (this.eventPublisher != null) {
                        // 发布事件 InteractiveAuthenticationSuccessEvent 到应用上下文
                        eventPublisher
                                .publishEvent(new InteractiveAuthenticationSuccessEvent(
                                        SecurityContextHolder.getContext()
                                                .getAuthentication(), this.getClass()));
                    }

                    if (successHandler != null) {
                        // 如果指定了 successHandler ,则调用它，
                        // 缺省情况下这个 successHandler  为 null
                        successHandler.onAuthenticationSuccess(request, response,
                                rememberMeAuth);

                        // 如果指定了 successHandler，在它调用之后，不再继续 filter chain 的执行
                        return;
                    }

                } catch (AuthenticationException authenticationException) {
                    // Remember Me 认证失败的情况
                    if (logger.isDebugEnabled()) {
                        logger.debug(
                                "SecurityContextHolder not populated with remember-me token, as "
                                        + "AuthenticationManager rejected Authentication returned by RememberMeServices: '"
                                        + rememberMeAuth
                                        + "'; invalidating remember-me token",
                                authenticationException);
                    }

                    // rememberMeServices 的认证失败处理
                    rememberMeServices.loginFail(request, response);

                    // 空方法，这里什么都不做
                    onUnsuccessfulAuthentication(request, response,
                            authenticationException);
                }
            }

            chain.doFilter(request, response);
        } else {
            if (logger.isDebugEnabled()) {
                logger.debug("SecurityContextHolder not populated with remember-me token, as it already contained: '"
                        + SecurityContextHolder.getContext().getAuthentication() + "'");
            }

            // 继续 filter chain 执行
            chain.doFilter(request, response);
        }
    }

    /**
     * Called if a remember-me token is presented and successfully authenticated by the
     * {@code RememberMeServices} {@code autoLogin} method and the
     * {@code AuthenticationManager}.
     */
    protected void onSuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response, Authentication authResult) {
    }

    /**
     * Called if the {@code AuthenticationManager} rejects the authentication object
     * returned from the {@code RememberMeServices} {@code autoLogin} method. This method
     * will not be called when no remember-me token is present in the request and
     * {@code autoLogin} reurns null.
     */
    protected void onUnsuccessfulAuthentication(HttpServletRequest request,
                                                HttpServletResponse response, AuthenticationException failed) {
    }

    public RememberMeServices getRememberMeServices() {
        return rememberMeServices;
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    /**
     * Allows control over the destination a remembered user is sent to when they are
     * successfully authenticated. By default, the filter will just allow the current
     * request to proceed, but if an {@code AuthenticationSuccessHandler} is set, it will
     * be invoked and the {@code doFilter()} method will return immediately, thus allowing
     * the application to redirect the user to a specific URL, regardless of whatthe
     * original request was for.
     * 缺省情况下，Remember Me 登录认证成功时filter chain会继续执行。但是也允许指定一个
     * AuthenticationSuccessHandler , 这样就可以控制 Remember Me 登录认证成功时的目标
     * 跳转地址(当然会忽略原始的请求目标)。
     *
     * @param successHandler the strategy to invoke immediately before returning from
     *                       {@code doFilter()}.
     */
    public void setAuthenticationSuccessHandler(
            AuthenticationSuccessHandler successHandler) {
        Assert.notNull(successHandler, "successHandler cannot be null");
        this.successHandler = successHandler;
    }

}
```

### AnonymousAuthenticationFilter

#### 概述
此过滤器过滤请求,检测`SecurityContextHolder`中是否存在`Authentication`对象，如果不存在，说明用户尚未登录，此时为其提供一个匿名`Authentication`对象:`AnonymousAuthentication`。

> 注意:在整个请求处理的开始,无论当前请求所对应的`session`中用户是否已经登录,`SecurityContextPersistenceFilter`
> 都会确保`SecurityContextHolder`中保持一个`SecurityContext`对象。但如果用户尚未登录，这个的`SecurityContext`对
> 象会是一个空对象，也就是其属性`Authentication`为null。然后在该请求处理过程中，如果一直到当前Filter执
> 行,`SecurityContextHolder`中`SecurityContext`对象属性`Authentication`仍是null,该`AnonymousAuthenticationFilter`就将其
> 修改为一个`AnonymousAuthentication`对象，表明这是一个匿名访问。

#### 源代码解析

```java
/*
 * Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.web.authentication;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

/**
 * Detects if there is no {@code Authentication} object in the
 * {@code SecurityContextHolder}, and populates it with one if needed.
 * 检测 SecurityContextHolder中是否存在Authentication对象，如果不存在，说明
 * 用户尚未登录，此时为其提供一个匿名 Authentication: AnonymousAuthentication对象。
 *
 * @author Ben Alex
 * @author Luke Taylor
 */
public class AnonymousAuthenticationFilter extends GenericFilterBean implements
        InitializingBean {

    // ~ Instance fields
    // ================================================================================================

    // 用于构造匿名Authentication中详情属性的详情来源对象，这里使用一个WebAuthenticationDetailsSource
    private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
    private String key;
    private Object principal;
    private List<GrantedAuthority> authorities;

    /**
     * Creates a filter with a principal named "anonymousUser" and the single authority
     * "ROLE_ANONYMOUS".
     * 使用外部指定的key构造一个AnonymousAuthenticationFilter:
     * 1. 缺省情况下，Spring Security 配置机制为这里指定的key是一个随机的uuid;
     * 2. 所对应的 princpial(含义指当前登录主体) 是一个字符串"anonymousUser";
     * 3. 所拥护的角色是 "ROLE_ANONYMOUS";
     *
     * @param key the key to identify tokens created by this filter
     */
    public AnonymousAuthenticationFilter(String key) {
        this(key, "anonymousUser", AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS"));
    }

    /**
     * 使用外部指定的参数构造一个AnonymousAuthenticationFilter
     *
     * @param key         key the key to identify tokens created by this filter
     * @param principal   the principal which will be used to represent anonymous users
     * @param authorities the authority list for anonymous users
     */
    public AnonymousAuthenticationFilter(String key, Object principal,
                                         List<GrantedAuthority> authorities) {
        Assert.hasLength(key, "key cannot be null or empty");
        Assert.notNull(principal, "Anonymous authentication principal must be set");
        Assert.notNull(authorities, "Anonymous authorities must be set");
        this.key = key;
        this.principal = principal;
        this.authorities = authorities;
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void afterPropertiesSet() {
        // 在当前Filter bean被创建时调用，主要目的是断言三个主要属性都必须已经有效设置
        Assert.hasLength(key, "key must have length");
        Assert.notNull(principal, "Anonymous authentication principal must be set");
        Assert.notNull(authorities, "Anonymous authorities must be set");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            // 如果SecurityContextHolder中SecurityContext对象的属性authentication是null,
            // 将其替换成一个匿名 Authentication: AnonymousAuthentication
            SecurityContextHolder.getContext().setAuthentication(
                    createAuthentication((HttpServletRequest) req));

            if (logger.isDebugEnabled()) {
                logger.debug("Populated SecurityContextHolder with anonymous token: '"
                        + SecurityContextHolder.getContext().getAuthentication() + "'");
            }
        } else {
            if (logger.isDebugEnabled()) {
                logger.debug("SecurityContextHolder not populated with anonymous token, as it already contained: '"
                        + SecurityContextHolder.getContext().getAuthentication() + "'");
            }
        }

        // 对SecurityContextHolder中SecurityContext对象的属性authentication做过以上处理之后，继续
        // filter chain 的执行
        chain.doFilter(req, res);
    }

    // 根据指定属性key,princpial,authorities和当前环境(servlet web环境)构造一个AnonymousAuthenticationToken
    protected Authentication createAuthentication(HttpServletRequest request) {
        AnonymousAuthenticationToken auth = new AnonymousAuthenticationToken(key,
                principal, authorities);
        auth.setDetails(authenticationDetailsSource.buildDetails(request));

        return auth;
    }

    // 可以外部指定Authentication对象的详情来源, 缺省情况下使用的是WebAuthenticationDetailsSource,
    // 已经在属性authenticationDetailsSource初始化指定
    public void setAuthenticationDetailsSource(
            AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource) {
        Assert.notNull(authenticationDetailsSource,
                "AuthenticationDetailsSource required");
        this.authenticationDetailsSource = authenticationDetailsSource;
    }

    public Object getPrincipal() {
        return principal;
    }

    public List<GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
```

### SessionManagementFilter

#### 概述
该过滤器会检测从当前请求处理开始到目前为止的过程中是否发生了用户登录认证行为(比如这是一个用户名/密码表单提交的请求处理过程)，如果检测到这一情况，执行相应的`session`认证策略(一个`SessionAuthenticationStrategy`)，然后继续继续请求的处理。

针对`Servlet 3.1+`,缺省所使用的`SessionAuthenticationStrategy`会是一个`ChangeSessionIdAuthenticationStrategy`和`CsrfAuthenticationStrategy`组合。`ChangeSessionIdAuthenticationStrategy`会为登录的用户创建一个新的`session`，而`CsrfAuthenticationStrategy`会创建新的`csrf token`用于`CSRF`保护。

如果当前过滤器链中启用了`UsernamePasswordAuthenticationFilter`,实际上本过滤器`SessionManagementFilter`并不会真正被执行到上面所说的逻辑。因为在`UsernamePasswordAuthenticationFilter`中，一旦用户登录认证发生它会先执行上述的逻辑。因此到`SessionManagementFilter`执行的时候，它会发现安全上下文存储库中已经有相应的安全上下文了，从而不再重复执行上面的逻辑。

另外需要注意的是，如果相应的`session`认证策略执行失败的话，整个成功的用户登录认证行为会被该过滤器否定，相应新建的`SecurityContextHolder`中的安全上下文会被清除，所设定的`AuthenticationFailureHandler`逻辑会被执行。

#### 源代码解析

```java
/**
 * Detects that a user has been authenticated since the start of the request and, if they
 * have, calls the configured {@link SessionAuthenticationStrategy} to perform any
 * session-related activity such as activating session-fixation protection mechanisms or
 * checking for multiple concurrent logins.
 * <p>
 * 检测从当前请求处理最初到现在整个处理过程中是否发生了用户登录认证，如果确实发生了，调用所配置的
 * SessionAuthenticationStrategy(session认证策略)执行与session相关的操作。比如针对session-fxation攻击
 * 保护机制对应的策略可能是为废弃登录前的session为登录用户生成一个新的session等。
 *
 * @author Martin Algesten
 * @author Luke Taylor
 * @since 2.0
 */
public class SessionManagementFilter extends GenericFilterBean {
    // ~ Static fields/initializers
    // =====================================================================================

    static final String FILTER_APPLIED = "__spring_security_session_mgmt_filter_applied";

    // ~ Instance fields
    // ================================================================================================

    // 安全上下文存储库，要和当前请求处理过程中其他filter配合，一般由配置阶段使用统一配置设置进来
    // 缺省使用基于http session的安全上下文存储库:HttpSessionSecurityContextRepository
    private final SecurityContextRepository securityContextRepository;
    // session 认证策略
    // 缺省是一个 CompositeSessionAuthenticationStrategy 对象，应用了组合模式，组合一些其他的
    // session 认证策略实现，比如针对Servlet 3.1+,缺省会是 ChangeSessionIdAuthenticationStrategy跟
    // CsrfAuthenticationStrategy组合
    private SessionAuthenticationStrategy sessionAuthenticationStrategy;
    // 用于识别一个Authentication是哪种类型:anonymous ? remember ?
    // 配置阶段统一指定，缺省使用 AuthenticationTrustResolverImpl
    private AuthenticationTrustResolver trustResolver = new AuthenticationTrustResolverImpl();
    // 遇到无效session时的处理策略，缺省值为null
    private InvalidSessionStrategy invalidSessionStrategy = null;
    // 认证失败处理器，比如form用户名/密码登录如果失败可能会引导用户重新发起表单认证
    // 缺省使用SimpleUrlAuthenticationFailureHandler
    private AuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();

    public SessionManagementFilter(SecurityContextRepository securityContextRepository) {
        this(securityContextRepository, new SessionFixationProtectionStrategy());
    }

    public SessionManagementFilter(SecurityContextRepository securityContextRepository,
                                   SessionAuthenticationStrategy sessionStrategy) {
        Assert.notNull(securityContextRepository,
                "SecurityContextRepository cannot be null");
        Assert.notNull(sessionStrategy, "SessionAuthenticationStrategy cannot be null");
        this.securityContextRepository = securityContextRepository;
        this.sessionAuthenticationStrategy = sessionStrategy;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        if (request.getAttribute(FILTER_APPLIED) != null) {
            // 如果在当前请求过程中该过滤器已经应用过，则不在二次应用，继续filter chain的执行
            chain.doFilter(request, response);
            return;
        }

        // 该过滤器要执行了，在请求上设置该过滤器已经执行过的标记，避免在该请求的同一处理过程中
        // 本过滤器执行二遍
        request.setAttribute(FILTER_APPLIED, Boolean.TRUE);

        // 检测securityContextRepository是否已经保存了针对当前请求的安全上下文对象 ：
        // 1. 未登录用户访问登录保护url的情况 : 否
        // 2. 未登录用户访问登录页面url的情况 : (不会走到这里，已经被登录页面生成Filter拦截)
        // 3. 未登录用户访问公开url的情况 : 否
        // 4. 登录用户访问公开url的情况 : 是
        // 5. 登录用户访问登录保护url的情况 : 是
        // 6. 登录用户访问公开url的情况 : 是
        if (!securityContextRepository.containsContext(request)) {
            // 如果securityContextRepository中没有保存安全上下文对象，
            // 但是SecurityContextHolder中安全上下文对象的authentication属性
            // 不为null或者匿名，则说明从请求处理开始到现在出现了用户登录认证成功的情况
            Authentication authentication = SecurityContextHolder.getContext()
                    .getAuthentication();

            if (authentication != null && !trustResolver.isAnonymous(authentication)) {
                // The user has been authenticated during the current request, so call the
                // session strategy
                // 认证登录成功的情况被检测到，执行相应的session认证策略
                try {
                    sessionAuthenticationStrategy.onAuthentication(authentication,
                            request, response);
                } catch (SessionAuthenticationException e) {
                    // 如果session认证策略执行出现异常，则拒绝该用户登录认证，
                    // 清除已经登录成功的安全上下文，并调用相应的failureHandler认证失败逻辑
                    // The session strategy can reject the authentication
                    logger.debug(
                            "SessionAuthenticationStrategy rejected the authentication object",
                            e);
                    SecurityContextHolder.clearContext();
                    failureHandler.onAuthenticationFailure(request, response, e);

                    return;
                }
                // Eagerly save the security context to make it available for any possible
                // re-entrant
                // requests which may occur before the current request completes.
                // SEC-1396.
                // 如果该请求处理过程中出现了用户成功登录的情况，并且相应的session认证策略已经
                // 执行成功，直接在securityContextRepository保存新建的针对已经登录用户的安全上下文，
                // 这样之后，在当前请求处理结束前，遇到任何可重入的请求，它们就可以利用该信息了。
                securityContextRepository.saveContext(SecurityContextHolder.getContext(),
                        request, response);
            } else {
                // No security context or authentication present. Check for a session
                // timeout
                // authentication 为 null 或者 匿名 或者 RememberMe 的情况,
                // 检测是否遇到了session过期或者提供了无效的session id，如果遇到了，
                // 并且设置了相应的无效session处理器invalidSessionStrategy，则最相应的处理
                if (request.getRequestedSessionId() != null
                        && !request.isRequestedSessionIdValid()) {
                    if (logger.isDebugEnabled()) {
                        logger.debug("Requested session ID "
                                + request.getRequestedSessionId() + " is invalid.");
                    }

                    if (invalidSessionStrategy != null) {
                        invalidSessionStrategy
                                .onInvalidSessionDetected(request, response);
                        return;
                    }
                }
            }
        }

        chain.doFilter(request, response);
    }

    /**
     * Sets the strategy which will be invoked instead of allowing the filter chain to
     * prceed, if the user agent requests an invalid session Id. If the property is not
     * set, no action will be taken.
     *
     * @param invalidSessionStrategy the strategy to invoke. Typically a
     *                               {@link SimpleRedirectInvalidSessionStrategy}.
     */
    public void setInvalidSessionStrategy(InvalidSessionStrategy invalidSessionStrategy) {
        this.invalidSessionStrategy = invalidSessionStrategy;
    }

    /**
     * The handler which will be invoked if the <tt>AuthenticatedSessionStrategy</tt>
     * raises a <tt>SessionAuthenticationException</tt>, indicating that the user is not
     * allowed to be authenticated for this session (typically because they already have
     * too many sessions open).
     */
    public void setAuthenticationFailureHandler(
            AuthenticationFailureHandler failureHandler) {
        Assert.notNull(failureHandler, "failureHandler cannot be null");
        this.failureHandler = failureHandler;
    }

    /**
     * Sets the {@link AuthenticationTrustResolver} to be used. The default is
     * {@link AuthenticationTrustResolverImpl}.
     *
     * @param trustResolver the {@link AuthenticationTrustResolver} to use. Cannot be
     *                      null.
     */
    public void setTrustResolver(AuthenticationTrustResolver trustResolver) {
        Assert.notNull(trustResolver, "trustResolver cannot be null");
        this.trustResolver = trustResolver;
    }

}
```

### ExceptionTranslationFilter

#### 概述
该过滤器的作用是处理过滤器链中发生的 `AccessDeniedException` 和 `AuthenticationException` 异常，将它们转换成相应的HTTP响应。

当检测到 `AuthenticationException` 异常时，该过滤器会启动 `authenticationEntryPoint`,也就是启动认证流程。

当检测到 `AccessDeniedException` 异常时，该过滤器先判断当前用户是否为匿名访问或者`Remember Me`访问。如果是这两种情况之一，会启动 `authenticationEntryPoint`逻辑。如果安全配置开启了用户名/密码表单认证，通常这个`authenticationEntryPoint`会对应到一个`LoginUrlAuthenticationEntryPoint`。它执行时会将用户带到登录页面，开启登录认证流程。

如果不是匿名访问或者`Remember Me`访问，接下来的处理会交给一个 `AccessDeniedHandler` 来完成。缺省情况下，这个 `AccessDeniedHandler` 的实现类是 `AccessDeniedHandlerImpl`，它会:

1. 请求添加`HTTP 403`异常属性,记录相应的异常;
2. 然后往写入响应HTTP状态码`403`;
3. 并`foward`到相应的错误页面。

使用该过滤器必须要设置以下属性:

1. `authenticationEntryPoint`:用于启动认证流程的处理器(handler)
2. `requestCache`:认证过程中涉及到保存请求时使用的请求缓存策略，缺省情况下是基于`session`的`HttpSessionRequestCache`

> 如果你想观察该过滤器的行为，可以在未登录状态下访问一个受登录保护的页面，系统会抛出`AccessDeniedException`并最终进入该Filter的职责流程。

#### 源代码解析

```java
/*
 * Copyright 2004-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.security.web.access;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.util.ThrowableAnalyzer;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import org.springframework.context.support.MessageSourceAccessor;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ExceptionTranslationFilter extends GenericFilterBean {

    // ~ Instance fields
    // ================================================================================================

    private AccessDeniedHandler accessDeniedHandler = new AccessDeniedHandlerImpl();
    private AuthenticationEntryPoint authenticationEntryPoint;
    // 用于判断一个Authentication是否Anonymous,Remember Me,
    // 缺省使用 AuthenticationTrustResolverImpl
    private AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();
    // 用于分析一个Throwable抛出的原因，使用本类自定义的嵌套类DefaultThrowableAnalyzer，
    // 主要是加入了对ServletException的分析
    private ThrowableAnalyzer throwableAnalyzer = new DefaultThrowableAnalyzer();

    // 请求缓存，缺省使用HttpSessionRequestCache，在遇到异常启动认证过程时会用到,
    // 因为要先把原始请求缓存下来，一旦认证成功结果，需要把原始请求提出重新跳转到相应URL
    private RequestCache requestCache = new HttpSessionRequestCache();

    private final MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

    public ExceptionTranslationFilter(AuthenticationEntryPoint authenticationEntryPoint) {
        this(authenticationEntryPoint, new HttpSessionRequestCache());
    }

    public ExceptionTranslationFilter(AuthenticationEntryPoint authenticationEntryPoint,
                                      RequestCache requestCache) {
        Assert.notNull(authenticationEntryPoint,
                "authenticationEntryPoint cannot be null");
        Assert.notNull(requestCache, "requestCache cannot be null");
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.requestCache = requestCache;
    }

    // ~ Methods
    // ========================================================================================================

    @Override
    public void afterPropertiesSet() {
        Assert.notNull(authenticationEntryPoint,
                "authenticationEntryPoint must be specified");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 在任何请求到达时不做任何操作，直接放行，继续filter chain的执行，
        // 但是使用一个 try-catch 来捕获filter chain中接下来会发生的各种异常，
        // 重点关注其中的以下异常，其他异常继续向外抛出 :
        // AuthenticationException : 认证失败异常,通常因为认证信息错误导致
        // AccessDeniedException : 访问被拒绝异常，通常因为权限不足导致
        try {
            chain.doFilter(request, response);

            logger.debug("Chain processed normally");
        } catch (IOException ex) {
            throw ex;
        } catch (Exception ex) {
            // Try to extract a SpringSecurityException from the stacktrace
            Throwable[] causeChain = throwableAnalyzer.determineCauseChain(ex);
            // 检测ex是否由AuthenticationException或者AccessDeniedException异常导致
            RuntimeException ase = (AuthenticationException) throwableAnalyzer
                    .getFirstThrowableOfType(AuthenticationException.class, causeChain);

            if (ase == null) {
                ase = (AccessDeniedException) throwableAnalyzer.getFirstThrowableOfType(
                        AccessDeniedException.class, causeChain);
            }

            if (ase != null) {
                if (response.isCommitted()) {
                    // 如果response已经提交，则没办法向响应中转换和写入这些异常了，只好抛一个异常
                    throw new ServletException("Unable to handle the Spring Security Exception because the response is already committed.", ex);
                }
                // 如果ex是由AuthenticationException或者AccessDeniedException异常导致，
                // 并且响应尚未提交，这里将这些Spring Security异常翻译成相应的 http response。
                handleSpringSecurityException(request, response, chain, ase);
            } else {
                // Rethrow ServletExceptions and RuntimeExceptions as-is
                if (ex instanceof ServletException) {
                    throw (ServletException) ex;
                } else if (ex instanceof RuntimeException) {
                    throw (RuntimeException) ex;
                }

                // Wrap other Exceptions. This shouldn't actually happen
                // as we've already covered all the possibilities for doFilter
                throw new RuntimeException(ex);
            }
        }
    }

    public AuthenticationEntryPoint getAuthenticationEntryPoint() {
        return authenticationEntryPoint;
    }

    protected AuthenticationTrustResolver getAuthenticationTrustResolver() {
        return authenticationTrustResolver;
    }

    // 此方法仅用于处理两种Spring Security 异常:
    // AuthenticationException , AccessDeniedException
    private void handleSpringSecurityException(HttpServletRequest request,
                                               HttpServletResponse response, FilterChain chain, RuntimeException exception)
            throws IOException, ServletException {
        if (exception instanceof AuthenticationException) {
            logger.debug(
                    "Authentication exception occurred; redirecting to authentication entry point",
                    exception);

            // 如果是 AuthenticationException 异常，启动认证流程
            sendStartAuthentication(request, response, chain,
                    (AuthenticationException) exception);
        } else if (exception instanceof AccessDeniedException) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authenticationTrustResolver.isAnonymous(authentication) || authenticationTrustResolver.isRememberMe(authentication)) {
                // 如果当前认证token是匿名或者RememberMe token
                logger.debug(
                        "Access is denied (user is " + (authenticationTrustResolver.isAnonymous(authentication) ? "anonymous" : "not fully authenticated") + "); redirecting to authentication entry point",
                        exception);

                // 如果是 AccessDeniedException 异常，而且当前登录主体是匿名状态或者
                // Remember Me认证，则也启动认证流程
                sendStartAuthentication(
                        request,
                        response,
                        chain,
                        new InsufficientAuthenticationException(
                                messages.getMessage(
                                        "ExceptionTranslationFilter.insufficientAuthentication",
                                        "Full authentication is required to access this resource")));
            } else {
                logger.debug(
                        "Access is denied (user is not anonymous); delegating to AccessDeniedHandler",
                        exception);

                // 如果是 AccessDeniedException 异常,而且当前用户不是匿名，也不是
                // Remember Me, 而是真正经过认证的某个用户，则说明是该用户权限不足,
                // 则交给 accessDeniedHandler 处理，缺省告知其权限不足
                // 注意 : 如果当前被请求的页面被配置成RememberMe权限可访问，但实际上
                // 当前当前安全上下文中的token是fullAuthenticated的，则也会走到这个流程
                accessDeniedHandler.handle(request, response,
                        (AccessDeniedException) exception);
            }
        }
    }

    // 发起认证流程
    protected void sendStartAuthentication(HttpServletRequest request,
                                           HttpServletResponse response, FilterChain chain,
                                           AuthenticationException reason) throws ServletException, IOException {
        // SEC-112: Clear the SecurityContextHolder's Authentication, as the
        // existing Authentication is no longer considered valid
        // 将SecurityContextHolder中SecurityContext的authentication设置为null
        SecurityContextHolder.getContext().setAuthentication(null);

        // 保存当前请求，一旦认证成功，认证机制会再次提取该请求并跳转到该请求对应的页面
        requestCache.saveRequest(request, response);

        // 准备工作已经做完，开始认证流程
        logger.debug("Calling Authentication entry point.");
        authenticationEntryPoint.commence(request, response, reason);
    }

    public void setAccessDeniedHandler(AccessDeniedHandler accessDeniedHandler) {
        Assert.notNull(accessDeniedHandler, "AccessDeniedHandler required");
        this.accessDeniedHandler = accessDeniedHandler;
    }

    public void setAuthenticationTrustResolver(
            AuthenticationTrustResolver authenticationTrustResolver) {
        Assert.notNull(authenticationTrustResolver,
                "authenticationTrustResolver must not be null");
        this.authenticationTrustResolver = authenticationTrustResolver;
    }

    public void setThrowableAnalyzer(ThrowableAnalyzer throwableAnalyzer) {
        Assert.notNull(throwableAnalyzer, "throwableAnalyzer must not be null");
        this.throwableAnalyzer = throwableAnalyzer;
    }

    /**
     * Default implementation of <code>ThrowableAnalyzer</code> which is capable of also
     * unwrapping <code>ServletException</code>s.
     */
    private static final class DefaultThrowableAnalyzer extends ThrowableAnalyzer {
        /**
         * @see org.springframework.security.web.util.ThrowableAnalyzer#initExtractorMap()
         */
        @Override
        protected void initExtractorMap() {
            super.initExtractorMap();

            registerExtractor(ServletException.class, new ThrowableCauseExtractor() {
                @Override
                public Throwable extractCause(Throwable throwable) {
                    ThrowableAnalyzer.verifyThrowableHierarchy(throwable,
                            ServletException.class);
                    return ((ServletException) throwable).getRootCause();
                }
            });
        }

    }

}
```

### FilterSecurityInterceptor

#### 概述
此过滤器`FilterSecurityInterceptor`是一个请求处理过程中安全机制过滤器链中最后一个`filter`,它执行真正的`HTTP`资源安全控制。

具体代码实现上，`FilterSecurityInterceptor`主要是将请求上下文包装成一个`FilterInvocation`然后对它进行操作。`FilterSecurityInterceptor`仅仅包含调用`FilterInvocation`的主要流程。具体的安全控制细节，在其基类`AbstractSecurityInterceptor`中实现。

#### 源代码解析

```java
/*
 * Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.web.access.intercept;

import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;

import javax.servlet.*;
import java.io.IOException;

/**
 * Performs security handling of HTTP resources via a filter implementation.
 * <p>
 * The <code>SecurityMetadataSource</code> required by this security interceptor is of
 * type {@link FilterInvocationSecurityMetadataSource}.
 * <p>
 * Refer to {@link AbstractSecurityInterceptor} for details on the workflow.
 * </p>
 *
 * @author Ben Alex
 * @author Rob Winch
 */
public class FilterSecurityInterceptor extends AbstractSecurityInterceptor implements
        Filter {
    // ~ Static fields/initializers
    // =====================================================================================

    private static final String FILTER_APPLIED = "__spring_security_filterSecurityInterceptor_filterApplied";

    // ~ Instance fields
    // ================================================================================================

    private FilterInvocationSecurityMetadataSource securityMetadataSource;
    private boolean observeOncePerRequest = true;

    // ~ Methods
    // ========================================================================================================

    /**
     * Not used (we rely on IoC container lifecycle services instead)
     *
     * @param arg0 ignored
     * @throws ServletException never thrown
     */
    @Override
    public void init(FilterConfig arg0) throws ServletException {
    }

    /**
     * Not used (we rely on IoC container lifecycle services instead)
     */
    @Override
    public void destroy() {
    }

    /**
     * Method that is actually called by the filter chain. Simply delegates to the
     * {@link #invoke(FilterInvocation)} method.
     *
     * @param request  the servlet request
     * @param response the servlet response
     * @param chain    the filter chain
     * @throws IOException      if the filter chain fails
     * @throws ServletException if the filter chain fails
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        // 封装请求上下文为一个FilterInvocation,然后调用该FilterInvocation执行安全认证
        FilterInvocation fi = new FilterInvocation(request, response, chain);
        invoke(fi);
    }

    public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {
        return this.securityMetadataSource;
    }

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        return this.securityMetadataSource;
    }

    public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource newSource) {
        this.securityMetadataSource = newSource;
    }

    @Override
    public Class<?> getSecureObjectClass() {
        return FilterInvocation.class;
    }

    public void invoke(FilterInvocation fi) throws IOException, ServletException {
        if ((fi.getRequest() != null)
                && (fi.getRequest().getAttribute(FILTER_APPLIED) != null)
                && observeOncePerRequest) {
            // filter already applied to this request and user wants us to observe
            // once-per-request handling, so don't re-do security checking
            // 如果被指定为在整个请求处理过程中只能执行最多一次 ,并且监测到已经执行过,
            // 则直接放行，继续 filter chain 的执行
            fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
        } else {
            // first time this request being called, so perform security checking
            if (fi.getRequest() != null && observeOncePerRequest) {
                // 如果被指定为在整个请求处理过程中只能执行最多一次 ,并且监测到尚未执行,
                // 则设置已经执行标志，随后执行职责逻辑
                fi.getRequest().setAttribute(FILTER_APPLIED, Boolean.TRUE);
            }

            // 这里是该过滤器进行安全检查的职责逻辑,具体实现在基类AbstractSecurityInterceptor
            // 主要是进行必要的认证和授权检查，如果遇到相关异常则抛出异常，之后的过滤器链
            // 调用不会继续进行
            InterceptorStatusToken token = super.beforeInvocation(fi);

            try {
                // 如果上面通过安全检查，这里继续过滤器的执行
                fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
            } finally {
                super.finallyInvocation(token);
            }

            super.afterInvocation(token, null);
        }
    }

    // 指定是否在整个请求处理过程中该过滤器只被执行一次，缺省是 true。
    // 也存在在整个请求处理过程中该过滤器需要执行多次的情况，比如JSP foward/include
    // 等情况。
    public boolean isObserveOncePerRequest() {
        return observeOncePerRequest;
    }

    public void setObserveOncePerRequest(boolean observeOncePerRequest) {
        this.observeOncePerRequest = observeOncePerRequest;
    }
}
```

```java
/*
 * Copyright 2004, 2005, 2006 Acegi Technology Pty Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.security.access.intercept;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.*;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.event.AuthenticationCredentialsNotFoundEvent;
import org.springframework.security.access.event.AuthorizationFailureEvent;
import org.springframework.security.access.event.AuthorizedEvent;
import org.springframework.security.access.event.PublicInvocationEvent;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Abstract class that implements security interception for secure objects.
 * <p>
 * The <code>AbstractSecurityInterceptor</code> will ensure the proper startup
 * configuration of the security interceptor. It will also implement the proper handling
 * of secure object invocations, namely:
 * <ol>
 * <li>Obtain the {@link Authentication} object from the {@link SecurityContextHolder}.</li>
 * <li>Determine if the request relates to a secured or public invocation by looking up
 * the secure object request against the {@link SecurityMetadataSource}.</li>
 * <li>For an invocation that is secured (there is a list of <code>ConfigAttribute</code>s
 * for the secure object invocation):
 * <ol type="a">
 * <li>If either the
 * {@link org.springframework.security.core.Authentication#isAuthenticated()} returns
 * <code>false</code>, or the {@link #alwaysReauthenticate} is <code>true</code>,
 * authenticate the request against the configured {@link AuthenticationManager}. When
 * authenticated, replace the <code>Authentication</code> object on the
 * <code>SecurityContextHolder</code> with the returned value.</li>
 * <li>Authorize the request against the configured {@link AccessDecisionManager}.</li>
 * <li>Perform any run-as replacement via the configured {@link RunAsManager}.</li>
 * <li>Pass control back to the concrete subclass, which will actually proceed with
 * executing the object. A {@link InterceptorStatusToken} is returned so that after the
 * subclass has finished proceeding with execution of the object, its finally clause can
 * ensure the <code>AbstractSecurityInterceptor</code> is re-called and tidies up
 * correctly using {@link #finallyInvocation(InterceptorStatusToken)}.</li>
 * <li>The concrete subclass will re-call the <code>AbstractSecurityInterceptor</code> via
 * the {@link #afterInvocation(InterceptorStatusToken, Object)} method.</li>
 * <li>If the <code>RunAsManager</code> replaced the <code>Authentication</code> object,
 * return the <code>SecurityContextHolder</code> to the object that existed after the call
 * to <code>AuthenticationManager</code>.</li>
 * <li>If an <code>AfterInvocationManager</code> is defined, invoke the invocation manager
 * and allow it to replace the object due to be returned to the caller.</li>
 * </ol>
 * </li>
 * <li>For an invocation that is public (there are no <code>ConfigAttribute</code>s for
 * the secure object invocation):
 * <ol type="a">
 * <li>As described above, the concrete subclass will be returned an
 * <code>InterceptorStatusToken</code> which is subsequently re-presented to the
 * <code>AbstractSecurityInterceptor</code> after the secure object has been executed. The
 * <code>AbstractSecurityInterceptor</code> will take no further action when its
 * {@link #afterInvocation(InterceptorStatusToken, Object)} is called.</li>
 * </ol>
 * </li>
 * <li>Control again returns to the concrete subclass, along with the <code>Object</code>
 * that should be returned to the caller. The subclass will then return that result or
 * exception to the original caller.</li>
 * </ol>
 *
 * @author Ben Alex
 * @author Rob Winch
 */
public abstract class AbstractSecurityInterceptor implements InitializingBean,
        ApplicationEventPublisherAware, MessageSourceAware {
    // ~ Static fields/initializers
    // =====================================================================================

    protected final Log logger = LogFactory.getLog(getClass());

    // ~ Instance fields
    // ================================================================================================

    protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
    private ApplicationEventPublisher eventPublisher;
    private AccessDecisionManager accessDecisionManager;
    private AfterInvocationManager afterInvocationManager;
    private AuthenticationManager authenticationManager = new NoOpAuthenticationManager();
    private RunAsManager runAsManager = new NullRunAsManager();

    private boolean alwaysReauthenticate = false;
    private boolean rejectPublicInvocations = false;
    private boolean validateConfigAttributes = true;
    private boolean publishAuthorizationSuccess = false;

    // ~ Methods
    // ========================================================================================================

    public void afterPropertiesSet() throws Exception {
        Assert.notNull(getSecureObjectClass(),
                "Subclass must provide a non-null response to getSecureObjectClass()");
        Assert.notNull(this.messages, "A message source must be set");
        Assert.notNull(this.authenticationManager, "An AuthenticationManager is required");
        Assert.notNull(this.accessDecisionManager, "An AccessDecisionManager is required");
        Assert.notNull(this.runAsManager, "A RunAsManager is required");
        Assert.notNull(this.obtainSecurityMetadataSource(),
                "An SecurityMetadataSource is required");
        Assert.isTrue(this.obtainSecurityMetadataSource()
                        .supports(getSecureObjectClass()),
                () -> "SecurityMetadataSource does not support secure object class: "
                        + getSecureObjectClass());
        Assert.isTrue(this.runAsManager.supports(getSecureObjectClass()),
                () -> "RunAsManager does not support secure object class: "
                        + getSecureObjectClass());
        Assert.isTrue(this.accessDecisionManager.supports(getSecureObjectClass()),
                () -> "AccessDecisionManager does not support secure object class: "
                        + getSecureObjectClass());

        if (this.afterInvocationManager != null) {
            Assert.isTrue(this.afterInvocationManager.supports(getSecureObjectClass()),
                    () -> "AfterInvocationManager does not support secure object class: "
                            + getSecureObjectClass());
        }

        if (this.validateConfigAttributes) {
            Collection<ConfigAttribute> attributeDefs = this
                    .obtainSecurityMetadataSource().getAllConfigAttributes();

            if (attributeDefs == null) {
                logger.warn("Could not validate configuration attributes as the SecurityMetadataSource did not return "
                        + "any attributes from getAllConfigAttributes()");
                return;
            }

            Set<ConfigAttribute> unsupportedAttrs = new HashSet<>();

            for (ConfigAttribute attr : attributeDefs) {
                if (!this.runAsManager.supports(attr)
                        && !this.accessDecisionManager.supports(attr)
                        && ((this.afterInvocationManager == null) || !this.afterInvocationManager
                        .supports(attr))) {
                    unsupportedAttrs.add(attr);
                }
            }

            if (unsupportedAttrs.size() != 0) {
                throw new IllegalArgumentException(
                        "Unsupported configuration attributes: " + unsupportedAttrs);
            }

            logger.debug("Validated configuration attributes");
        }
    }

    protected InterceptorStatusToken beforeInvocation(Object object) {
        Assert.notNull(object, "Object was null");
        final boolean debug = logger.isDebugEnabled();

        if (!getSecureObjectClass().isAssignableFrom(object.getClass())) {
            throw new IllegalArgumentException(
                    "Security invocation attempted for object "
                            + object.getClass().getName()
                            + " but AbstractSecurityInterceptor only configured to support secure objects of type: "
                            + getSecureObjectClass());
        }

        // 从安全配置中获取安全元数据,记录在 attributes
        Collection<ConfigAttribute> attributes = this.obtainSecurityMetadataSource()
                .getAttributes(object);

        if (attributes == null || attributes.isEmpty()) {
            // 说明该安全对象没有配置安全控制，可以被公开访问
            if (rejectPublicInvocations) {
                // 如果系统配置了拒绝公开调用，则抛出异常拒绝当前请求
                throw new IllegalArgumentException(
                        "Secure object invocation "
                                + object
                                + " was denied as public invocations are not allowed via this interceptor. "
                                + "This indicates a configuration error because the "
                                + "rejectPublicInvocations property is set to 'true'");
            }

            if (debug) {
                logger.debug("Public object - authentication not attempted");
            }

            publishEvent(new PublicInvocationEvent(object));

            // 该资源没有设置安全，可以公开访问，不做相应的安全检查，返回 null，
            // 表示不需要做后续处理
            return null; // no further work post-invocation
        }

        if (debug) {
            logger.debug("Secure object: " + object + "; Attributes: " + attributes);
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            // 如果安全认证token不存在，则抛出异常 AuthenticationCredentialsNotFoundException
            credentialsNotFound(messages.getMessage(
                    "AbstractSecurityInterceptor.authenticationNotFound",
                    "An Authentication object was not found in the SecurityContext"),
                    object, attributes);
        }

        // 如果安全认证token存在，则检查是否需要认证，如果需要，则执行认证并更行
        // 安全上下文中的安全认证token，如果认证失败，抛出异常 AuthenticationException
        Authentication authenticated = authenticateIfRequired();

        // Attempt authorization
        try {
            // 现在已经确保用户通过了认证，现在基于登录的当前用户信息，和目标资源的安全配置属性
            // 进行相应的权限检查,如果检查失败，则抛出相应的异常 AccessDeniedException
            this.accessDecisionManager.decide(authenticated, object, attributes);
        } catch (AccessDeniedException accessDeniedException) {
            publishEvent(new AuthorizationFailureEvent(object, attributes, authenticated,
                    accessDeniedException));

            throw accessDeniedException;
        }

        if (debug) {
            logger.debug("Authorization successful");
        }

        if (publishAuthorizationSuccess) {
            publishEvent(new AuthorizedEvent(object, attributes, authenticated));
        }

        // Attempt to run as a different user
        // 如果设置了 RunAsManager， 尝试将当前安全认证token修改为另外一个run-as用户,
        // 缺省是 NullRunAsManager， 其实相当于没有启用 run-as, 下面的 runAs 缺省会是
        // null
        Authentication runAs = this.runAsManager.buildRunAs(authenticated, object,
                attributes);

        if (runAs == null) {
            if (debug) {
                logger.debug("RunAsManager did not change Authentication object");
            }

            // no further work post-invocation
            // 注意这里第二个参数为 false, 表示请求处理完之后再次回到该filter时不需要在刷新安全认证token
            return new InterceptorStatusToken(SecurityContextHolder.getContext(), false,
                    attributes, object);
        } else {
            if (debug) {
                logger.debug("Switching to RunAs Authentication: " + runAs);
            }

            SecurityContext origCtx = SecurityContextHolder.getContext();
            SecurityContextHolder.setContext(SecurityContextHolder.createEmptyContext());
            SecurityContextHolder.getContext().setAuthentication(runAs);

            // need to revert to token.Authenticated post-invocation
            // 注意这里第二个参数为 true, 表示请求处理完之后再次回到该filter时需要在刷新安全认证token :
            // 恢复到 run-as 之前的安全认证token
            return new InterceptorStatusToken(origCtx, true, attributes, object);
        }
    }

    /**
     * Cleans up the work of the <tt>AbstractSecurityInterceptor</tt> after the secure
     * object invocation has been completed. This method should be invoked after the
     * secure object invocation and before afterInvocation regardless of the secure object
     * invocation returning successfully (i.e. it should be done in a finally block).
     *
     * @param token as returned by the {@link #beforeInvocation(Object)} method
     */
    protected void finallyInvocation(InterceptorStatusToken token) {
        if (token != null && token.isContextHolderRefreshRequired()) {
            if (logger.isDebugEnabled()) {
                logger.debug("Reverting to original Authentication: "
                        + token.getSecurityContext().getAuthentication());
            }

            SecurityContextHolder.setContext(token.getSecurityContext());
        }
    }

    /**
     * Completes the work of the <tt>AbstractSecurityInterceptor</tt> after the secure
     * object invocation has been completed.
     *
     * @param token          as returned by the {@link #beforeInvocation(Object)} method
     * @param returnedObject any object returned from the secure object invocation (may be
     *                       <tt>null</tt>)
     * @return the object the secure object invocation should ultimately return to its
     * caller (may be <tt>null</tt>)
     */
    protected Object afterInvocation(InterceptorStatusToken token, Object returnedObject) {
        if (token == null) {
            // public object
            return returnedObject;
        }

        finallyInvocation(token); // continue to clean in this method for passivity

        if (afterInvocationManager != null) {
            // Attempt after invocation handling
            try {
                returnedObject = afterInvocationManager.decide(token.getSecurityContext()
                        .getAuthentication(), token.getSecureObject(), token
                        .getAttributes(), returnedObject);
            } catch (AccessDeniedException accessDeniedException) {
                AuthorizationFailureEvent event = new AuthorizationFailureEvent(
                        token.getSecureObject(), token.getAttributes(), token
                        .getSecurityContext().getAuthentication(),
                        accessDeniedException);
                publishEvent(event);

                throw accessDeniedException;
            }
        }

        return returnedObject;
    }

    /**
     * Checks the current authentication token and passes it to the AuthenticationManager
     * if {@link org.springframework.security.core.Authentication#isAuthenticated()}
     * returns false or the property <tt>alwaysReauthenticate</tt> has been set to true.
     *
     * @return an authenticated <tt>Authentication</tt> object.
     */
    private Authentication authenticateIfRequired() {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        if (authentication.isAuthenticated() && !alwaysReauthenticate) {
            if (logger.isDebugEnabled()) {
                logger.debug("Previously Authenticated: " + authentication);
            }

            return authentication;
        }

        authentication = authenticationManager.authenticate(authentication);

        // We don't authenticated.setAuthentication(true), because each provider should do
        // that
        if (logger.isDebugEnabled()) {
            logger.debug("Successfully Authenticated: " + authentication);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }

    /**
     * Helper method which generates an exception containing the passed reason, and
     * publishes an event to the application context.
     * <p>
     * Always throws an exception.
     *
     * @param reason        to be provided in the exception detail
     * @param secureObject  that was being called
     * @param configAttribs that were defined for the secureObject
     */
    private void credentialsNotFound(String reason, Object secureObject,
                                     Collection<ConfigAttribute> configAttribs) {
        AuthenticationCredentialsNotFoundException exception = new AuthenticationCredentialsNotFoundException(
                reason);

        AuthenticationCredentialsNotFoundEvent event = new AuthenticationCredentialsNotFoundEvent(
                secureObject, configAttribs, exception);
        publishEvent(event);

        throw exception;
    }

    public AccessDecisionManager getAccessDecisionManager() {
        return accessDecisionManager;
    }

    public AfterInvocationManager getAfterInvocationManager() {
        return afterInvocationManager;
    }

    public AuthenticationManager getAuthenticationManager() {
        return this.authenticationManager;
    }

    public RunAsManager getRunAsManager() {
        return runAsManager;
    }

    /**
     * Indicates the type of secure objects the subclass will be presenting to the
     * abstract parent for processing. This is used to ensure collaborators wired to the
     * {@code AbstractSecurityInterceptor} all support the indicated secure object class.
     *
     * @return the type of secure object the subclass provides services for
     */
    public abstract Class<?> getSecureObjectClass();

    public boolean isAlwaysReauthenticate() {
        return alwaysReauthenticate;
    }

    public boolean isRejectPublicInvocations() {
        return rejectPublicInvocations;
    }

    public boolean isValidateConfigAttributes() {
        return validateConfigAttributes;
    }

    public abstract SecurityMetadataSource obtainSecurityMetadataSource();

    public void setAccessDecisionManager(AccessDecisionManager accessDecisionManager) {
        this.accessDecisionManager = accessDecisionManager;
    }

    public void setAfterInvocationManager(AfterInvocationManager afterInvocationManager) {
        this.afterInvocationManager = afterInvocationManager;
    }

    /**
     * Indicates whether the <code>AbstractSecurityInterceptor</code> should ignore the
     * {@link Authentication#isAuthenticated()} property. Defaults to <code>false</code>,
     * meaning by default the <code>Authentication.isAuthenticated()</code> property is
     * trusted and re-authentication will not occur if the principal has already been
     * authenticated.
     *
     * @param alwaysReauthenticate <code>true</code> to force
     *                             <code>AbstractSecurityInterceptor</code> to disregard the value of
     *                             <code>Authentication.isAuthenticated()</code> and always re-authenticate the
     *                             request (defaults to <code>false</code>).
     */
    public void setAlwaysReauthenticate(boolean alwaysReauthenticate) {
        this.alwaysReauthenticate = alwaysReauthenticate;
    }

    @Override
    public void setApplicationEventPublisher(
            ApplicationEventPublisher applicationEventPublisher) {
        this.eventPublisher = applicationEventPublisher;
    }

    public void setAuthenticationManager(AuthenticationManager newManager) {
        this.authenticationManager = newManager;
    }

    @Override
    public void setMessageSource(MessageSource messageSource) {
        this.messages = new MessageSourceAccessor(messageSource);
    }

    /**
     * Only {@code AuthorizationFailureEvent} will be published. If you set this property
     * to {@code true}, {@code AuthorizedEvent}s will also be published.
     *
     * @param publishAuthorizationSuccess default value is {@code false}
     */
    public void setPublishAuthorizationSuccess(boolean publishAuthorizationSuccess) {
        this.publishAuthorizationSuccess = publishAuthorizationSuccess;
    }

    /**
     * By rejecting public invocations (and setting this property to <tt>true</tt>),
     * essentially you are ensuring that every secure object invocation advised by
     * <code>AbstractSecurityInterceptor</code> has a configuration attribute defined.
     * This is useful to ensure a "fail safe" mode where undeclared secure objects will be
     * rejected and configuration omissions detected early. An
     * <tt>IllegalArgumentException</tt> will be thrown by the
     * <tt>AbstractSecurityInterceptor</tt> if you set this property to <tt>true</tt> and
     * an attempt is made to invoke a secure object that has no configuration attributes.
     *
     * @param rejectPublicInvocations set to <code>true</code> to reject invocations of
     *                                secure objects that have no configuration attributes (by default it is
     *                                <code>false</code> which treats undeclared secure objects as "public" or
     *                                unauthorized).
     */
    public void setRejectPublicInvocations(boolean rejectPublicInvocations) {
        this.rejectPublicInvocations = rejectPublicInvocations;
    }

    public void setRunAsManager(RunAsManager runAsManager) {
        this.runAsManager = runAsManager;
    }

    public void setValidateConfigAttributes(boolean validateConfigAttributes) {
        this.validateConfigAttributes = validateConfigAttributes;
    }

    private void publishEvent(ApplicationEvent event) {
        if (this.eventPublisher != null) {
            this.eventPublisher.publishEvent(event);
        }
    }

    private static class NoOpAuthenticationManager implements AuthenticationManager {

        @Override
        public Authentication authenticate(Authentication authentication)
                throws AuthenticationException {
            throw new AuthenticationServiceException("Cannot authenticate "
                    + authentication);
        }
    }
}
```