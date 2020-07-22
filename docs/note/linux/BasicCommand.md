# 基本命令

[linux教程](https://www.runoob.com/linux/linux-tutorial.html)
1. 查看目录
- ls      查看目录名字
- ls -a   查看隐藏目录
2. 进入/退出下一级别
- cd 目录名
- cd ..   退到上一级
- cd ../..  退两级
3. 创建文件
- mkdir 文件名
4. 复制文件
- cp 文件名  路径/文件名
- cp -R 目标文件夹名  复制后文件夹名
5. 显示当前路径
- pwd 
6. 删除
- rm 文件名
- rm -r 文件夹名
7. mv (移动文件与目录，或修改名称)
 mv bashrc mvtest

# linux下目录的作用

## /bin 存放⼆进制可执⾏⽂件(ls,cat,mkdir等)，常⽤命令⼀般都在这⾥。
系统有很多放置执⾏档的⽬录，但/bin⽐较特殊。因为/bin放置的是在单⼈维护模式下 
还能够被操作的指令。在/bin底下的指令可以被root与⼀般帐号所使⽤，主要有： 
cat,chmod(修改权限), chown, date, mv, mkdir, cp, bash等等常⽤的指令。


## /etc 存放系统管理和配置⽂件
/etc/sysconfig/network-scripts

ifcfg-lo    本地回环地址

ifcfg-eth0   配置网略

systemctl restart network  重启网略

ifconfig   查看（ip addr）

-- 文件详情  
-  ‘-’      文件
-  drwxr    目录（文件夹）
-  l        链接（快捷方式）

系统主要的设定档⼏乎都放置在这个⽬录内，例如⼈员的帐号密码档、各种服务的启
始档等等。 ⼀般来说，这个⽬录下的各档案属性是可以让⼀般使⽤者查阅的，但是只
有root有权⼒修改。 FHS建议不要放置可执⾏档(binary)在这个⽬录中。 ⽐较重要的档
案有：/etc/inittab, /etc/init.d/, /etc/modprobe.conf, /etc/X11/, /etc/fstab,
/etc/sysconfig/等等。 另外，其下重要的⽬录有：/etc/init.d/ ：所有服务的预设启动
script都是放在这⾥的，例如要启动或者关闭iptables的话： /etc/init.d/iptables
start、/etc/init.d/ iptables stop/etc/xinetd.d/ ：这就是所谓的super daemon管理的
各项服务的设定档⽬录。/etc/X11/ ：与X Window有关的各种设定档都在这⾥，尤其
是xorg.conf或XF86Config这两个X Server的设定档。

## /home 存放所有⽤户⽂件的根⽬录，是⽤户主⽬录的基点，⽐如⽤户user的主⽬录就是/home/user，可以⽤~user表示
系统主要的设定档⼏乎都放置在这个⽬录内，例如⼈员的帐号密码档、各种服务的启
始档等等。 ⼀般来说，这个⽬录下的各档案属性是可以让⼀般使⽤者查阅的，但是只
有root有权⼒修改。 FHS建议不要放置可执⾏档(binary)在这个⽬录中。 ⽐较重要的档
案有：/etc/inittab, /etc/init.d/, /etc/modprobe.conf, /etc/X11/, /etc/fstab,
/etc/sysconfig/等等。 另外，其下重要的⽬录有：/etc/init.d/ ：所有服务的预设启动
script都是放在这⾥的，例如要启动或者关闭iptables的话： /etc/init.d/iptables
start、/etc/init.d/ iptables stop/etc/xinetd.d/ ：这就是所谓的super daemon管理的
各项服务的设定档⽬录。/etc/X11/ ：与X Window有关的各种设定档都在这⾥，尤其
是xorg.conf或XF86Config这两个X Server的设定档。

## 库 lib  lib64 存放跟⽂件系统中的程序运⾏所需要的共享库及内核模块。共享库⼜叫动态链接共享库，作⽤类似windows⾥的.dll⽂件，存放了根⽂件系统程序运⾏所需的共享⽂件。
系统的函式库⾮常的多，⽽/lib放置的则是在开机时会⽤到的函式库，以及在/bin
或/sbin底下的指令会呼叫的函式库⽽已 。 什么是函式库呢？妳可以将他想成是外挂，
如果状态为“未启⽤”，按照如下步骤操作
1、重启电脑，在主板显示画⾯，快速寻找进⼊BIOS的按键。根据品牌不同，可能是F2、Del
或其他键。 2、进⼊BIOS后，寻找进⼊“System Configuration”。 3、找到“Virtualization
Technology”，按回⻋键。 4、选择“Enabled”，按Enter回⻋键。 5、然后保存重启即可。
2.2 安装过程
⻅直播视频
2.3 配置过程
⻅直播视频
3、 认识 Linux 环境
Linux下的⽬录都是做什么⽤的
/lib 某些指令必须要有这些外挂才能够顺利完成程式的执⾏之意。 尤其重要的
是/lib/modules/这个⽬录，因为该⽬录会放置核⼼相关的模组(驱动程式)。

## srv 服务程序
srv可以视为service的缩写，是⼀些⽹路服务启动之后，这些服务所需要取⽤的资料⽬
录。 常⻅的服务例如WWW, FTP等等。 举例来说，WWW伺服器需要的⽹⻚资料就可
以放置在/srv/www/⾥⾯。呵呵，看来平时我们编写的代码应该放到这⾥了。

## USR  用户的

## boot  存放Linux内核
主要放置开机会使⽤到的档案，包括Linux核⼼档案以及开机选单与开机所需设定档等
等。Linux kernel常⽤的档名为：vmlinuz ，如果使⽤的是grub这个开机管理程式，则
还会存在/boot/grub/这个⽬录

## opt 额外安装的可选应⽤程序包所放置的位置。⼀般情况下，我们可以把tomcat等都安装到这⾥。
这个是给第三⽅协⼒软体放置的⽬录 。 什么是第三⽅协⼒软体啊？举例来说，KDE这
个桌⾯管理系统是⼀个独⽴的计画，不过他可以安装到Linux系统中，因此KDE的软体
就建议放置到此⽬录下了。 另外，如果妳想要⾃⾏安装额外的软体(⾮原本的
distribution提供的)，那么也能够将你的软体安装到这⾥来。 不过，以前的Linux系统
中，我们还是习惯放置在/usr/local⽬录下。
## proc 虚拟目录（存在内存） 虚拟⽂件系统⽬录，是系统内存的映射。可直接访问这个⽬录来获取系统信息。
运行的时候才有内容

## sys 系统相关

## /mnt 系统管理员安装临时⽂件系统的安装点，系统提供这个⽬录是让⽤户临时挂载其他的⽂件系统。

## var 
    目录下的log 存放日志文件
## dev 设备文件
在Linux系统上，任何装置与周边设备都是以档案的型态存在于这个⽬录当中。 只要通
过存取这个⽬录下的某个档案，就等于存取某个装置。⽐要重要的档案有/dev/null,
/dev/zero, /dev/tty , /dev/lp, / dev/hd, /dev/sd*等等

## media 优盘
media是媒体的英⽂，顾名思义，这个/media底下放置的就是可移除的装置。 包括软
碟、光碟、DVD等等装置都暂时挂载于此。 常⻅的档名有：/media/floppy,
/media/cdrom等等。
## tmp 临时目录
正常情况下重启会清空目录

## 网略

- netstat -an  查看端口
- netstat -anp  查看哪个进程用的端口