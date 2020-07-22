#  Linux免密远程登录

## 免密登陆的原理
1. 走SSL协议，ssh包含了SSL协议，ssh前身telnet协议，电话拨号。ssh为加密的telnet。（类似于https和http的区别）
2. telnet时期需要modem（接入设备）。之前传输最快56K。传输为音频信号。未加密，传输为明文。
3. SSL协议需要交换密钥，使用不对称加密方式。生成两个密钥，一个公钥，一个私钥。
4. 登录过程需要建立TLS加密链接，服务器传过来一个公钥加密后的，传给客户端，客户端用私钥加密。


## 配置免密登陆的步骤

1. 生成秘钥对

>ssh-keygen -t rsa -C "你自己的名字" -f "你自己的名字_rsa"

生成过程中会询问问题，第一个询问是否使用密钥时候输入密码，第二次再次输入，两次回车跳过

2. 上传配置公钥 
上传公钥到服务器对应账号的home路径下的.ssh/中 ( ssh-copy-id -i "公钥文件名" 用户名@服务器ip或域名 ) 配置公钥文件访问权限为 600
>ssh-copy-id -i "公钥文件名" 用户名@服务器ip或域名
-i指定你的密钥文件  共钥名字

* 添加到的位置
->> 服务器下的.ssh文件夹下面 authorized.keys
3. 配置本地私钥 

* 把第一步生成的私钥复制到你的home目录下的.ssh/ 路径下 
* 配置你的私钥文件访问权限为 600

这时候已经可以使用你的私钥进行免密登陆了

>ssh -i 私钥名字 root@服务器地址

但是显得过于长了

4. 免密登陆功能的本地配置文件

* 编辑自己home目录的.ssh/ 路径下的config文件 
* 配置config文件的访问权限为 644

```
# 多主机配置
Host gateway-produce
HostName IP或绑定的域名
Port 22
Host node-produce
HostName IP或绑定的域名
Port 22
Host java-produce
HostName IP或绑定的域名
Port 22

Host *-produce
User root
IdentityFile ~/.ssh/produce_key_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO

#单主机配置
Host evil-cloud
User root
HostName IP或绑定的域名
IdentityFile ~/.ssh/evilboy_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO

#单主机配置
Host git.yideng.site
User git
IdentityFile ~/.ssh/evilboy_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```