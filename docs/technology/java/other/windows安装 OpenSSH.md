# windows安装 OpenSSH

> 适用于 Windows Server 2019、Windows 10、Windows Server 2022

OpenSSH 是一款用于远程登录的连接工具，它使用 SSH 协议。 它会加密客户端与服务器之间的所有流量，从而遏止窃听、连接劫持和其他攻击。

OpenSSH 可用于将安装了 OpenSSH 客户端的 Window 10（版本 1809 及更高版本）或 Windows Server 2019 设备连接到那些安装了 OpenSSH 服务器的设备。

## 使用 Windows 设置来安装 OpenSSH

可以使用 Windows Server 2019 和 Windows 10 设备上的 Windows 设置安装这两个 OpenSSH 组件。

若要安装 OpenSSH 组件：

1. 打开“设置”，选择“应用”>“应用和功能”，然后选择“可选功能” 。
2. 扫描列表，查看是否已安装 OpenSSH。 如果未安装，请在页面顶部选择“添加功能”，然后：
   - 查找“OpenSSH 客户端”，再单击“安装”
   - 查找“OpenSSH 服务器”，再单击“安装”

设置完成后，回到“应用”>“应用和功能”和“可选功能”，你应会看到已列出 OpenSSH 。

::: warning 备注
安装 OpenSSH 服务器将创建并启用一个名为 `OpenSSH-Server-In-TCP` 的防火墙规则。 这允许端口 22 上的入站 SSH 流量。 如果未启用此规则且未打开此端口，那么连接将被拒绝或重置。
:::

## 使用 PowerShell 安装 OpenSSH

若要使用 PowerShell 安装 OpenSSH，请先以管理员身份运行 PowerShell。 为了确保 OpenSSH 可用，请运行以下 cmdlet：

PowerShell

```powershell
Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'
```

如果两者均尚未安装，则此操作应返回以下输出：

```
Name  : OpenSSH.Client~~~~0.0.1.0
State : NotPresent

Name  : OpenSSH.Server~~~~0.0.1.0
State : NotPresent
```

然后，根据需要安装服务器或客户端组件：

PowerShell

```powershell
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

这两者应该都会返回以下输出：

```
Path          :
Online        : True
RestartNeeded : False
```

## 启动并配置 OpenSSH 服务器

若要启动并配置 OpenSSH 服务器来开启使用，请以管理员身份打开 PowerShell，然后运行以下命令来启动 `sshd service`：

PowerShell

```powershell
# Start the sshd service
Start-Service sshd

# OPTIONAL but recommended:
Set-Service -Name sshd -StartupType 'Automatic'

# Confirm the firewall rule is configured. It should be created automatically by setup.
Get-NetFirewallRule -Name *ssh*

# There should be a firewall rule named "OpenSSH-Server-In-TCP", which should be enabled
# If the firewall does not exist, create one
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Act
```

## 连接到 OpenSSH 服务器

安装后，可从使用 PowerShell 安装了 OpenSSH 客户端的 Windows 10 或 Windows Server 2019 设备连接到 OpenSSH 服务器，如下所示。 请务必以管理员身份运行 PowerShell：

PowerShell

```powershell
ssh username@servername
```

连接后，会收到如下所示的消息：

```
The authenticity of host 'servername (10.00.00.001)' can't be established.
ECDSA key fingerprint is SHA256:(<a large string>).
Are you sure you want to continue connecting (yes/no)?
```

选择“是”后，该服务器会添加到包含 Windows 客户端上的已知 SSH 主机的列表中。

系统此时会提示你输入密码。 作为安全预防措施，密码在键入的过程中不会显示。

连接后，你将看到 Windows 命令行界面提示符：

```
domain\username@SERVERNAME C:\Users\username>
```

## 使用 Windows 设置来卸载 OpenSSH

若要使用 Windows 设置来卸载 OpenSSH：

1. 打开“设置”，然后转到“应用”>“应用和功能” 。
2. 转到“可选功能”。
3. 在列表中，选择“OpenSSH 客户端”或“OpenSSH 服务器” 。
4. 选择“卸载”。

## 使用 PowerShell 卸载 OpenSSH

若要使用 PowerShell 卸载 OpenSSH 组件，请使用以下命令：

PowerShell

```powershell
# Uninstall the OpenSSH Client
Remove-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0

# Uninstall the OpenSSH Server
Remove-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

如果在卸载时服务正在使用中，稍后可能需要重启 Windows。

## 离线安装

### 下载安装包

[openssh的二进制可执行版本](https://github.com/PowerShell/Win32-OpenSSH/releases m)

### 解压

### 安装

```
powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1
```

安装成功提示：

```
[SC] SetServiceObjectSecurity SUCCESS
[SC] ChangeServiceConfig2 SUCCESS
[SC] ChangeServiceConfig2 SUCCESS
sshd and ssh-agent services successfully installed
```

如果端口没有打开， 需要执行如下命令打开SSH 需要的22端口。

```
netsh advfirewall firewall add rule name=sshd dir=in action=allow protocol=TCP localport=22
```

### 启动

```
net start sshd
net start ssh-agent
```

### 环境变量配置

![image-20210823114103403](https://gitee.com/wuyilong/picture-bed/raw/master/img/image-20210823114103403.png)

#### 问题

1. 权限不足，无法执行脚本

   ```
   Set-ExecutionPolicy RemoteSigned
   ```

   