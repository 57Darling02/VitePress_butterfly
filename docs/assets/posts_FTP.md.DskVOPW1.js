import{_ as i,c as l,o as e,a2 as o}from"./chunks/framework.CSVsBaMC.js";const d=JSON.parse('{"title":"FTP for Android and Window","description":"","frontmatter":{"title":"FTP for Android and Window","date":"2024-01-25T15:35:57.000Z","categories":"瞎捣鼓","cover":"https://resource-un4.pages.dev/yspic/Marx&Engels.webp","copyright":true},"headers":[],"relativePath":"posts/FTP.md","filePath":"posts/FTP.md","lastUpdated":1740504357000}'),a={name:"posts/FTP.md"};function t(r,p,n,F,s,P){return e(),l("div",null,p[0]||(p[0]=[o('<h1 id="ftp-for-android-and-window" tabindex="-1">FTP for Android and Window <a class="header-anchor" href="#ftp-for-android-and-window" aria-label="Permalink to &quot;FTP for Android and Window&quot;">​</a></h1><p>最近接触到了KSWEB，附带FTP服务。顺带整理一下我摸索出来的用法。</p><h4 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h4><blockquote><p>文件传输协议（File Transfer Protocol，FTP）是用于在网络上进行文件传输的一套标准协议，它工作在 OSI 模型的第七层， TCP 模型的第四层， 即应用层， 使用 TCP 传输而不是 UDP， 客户在和服务器建立连接前要经过一个“三次握手”的过程， 保证客户与服务器之间的连接是可靠的， 而且是面向连接， 为数据传输提供可靠保证。 FTP允许用户以文件操作的方式（如文件的增、删、改、查、传送等）与另一主机相互通信。然而， 用户并不真正登录到自己想要存取的计算机上面而成为完全用户， 可用FTP程序访问远程资源， 实现用户往返传输文件、目录管理以及访问电子邮件等等， 即使双方计算机可能配有不同的操作系统和文件存储方式。</p></blockquote><p>利用 <strong>“FTP程序访问远程资源即使双方计算机配有不同的操作系统和文件存储方式”</strong> ，我们可以将自己的旧Android手机改造成<strong>局域网云盘</strong>，也就是相同WiFi下可以访问作为ftp服务器的设备终端。</p><ol><li><p>用旧手机作为站点（就是服务器），ksweb提供了作为FTP服务器便捷设置，设置访问端口，用户账号密码以及对应用户的权限（默认权限只有从FTP服务器上下载东西，也可以开放修改文件的权限）以及相应用户可以访问到的文件夹目录。当然，因为是局域网，相对安全许多，我们也可以设置<strong>匿名用户</strong>来免账号密码直接进行FTP通讯。<img src="https://resource-un4.pages.dev/article/2313015471.jpg" alt="KSWEB设置FTP"></p></li><li><p>Andriod接收端：首先连上局域网。然后连接FTP服务器。因为Android的使用命令行比较麻烦，推荐直接用软件，首推ES文件管理器。（ES左侧找到FTP，输入<strong>作为服务器的终端</strong>内网ip，账号密码，登入即可）</p></li><li><p>pc接收端：如果设置了账号密码，建议使用软件<strong>FileZilla</strong>，如果设置了匿名访问（即上图中的Anonymous选项打开），则直接在资源管理器（又称<strong>我的电脑</strong>）输入<code>ftp://FTP服务器内网ip:设置的端口号/</code>，效果如下：<img src="https://resource-un4.pages.dev/article/image-20240125172740725.png" alt="win11资源管理器链接FTP服务器"></p></li><li><p>Linux的FTP使用方法：抄的，以后也许会用到吧。</p><blockquote><p>FTP（File Transfer Protocol）是一种用于在网络上传输文件的常用协议。在Linux系统中，有多种方式可以使用FTP进行文件传输，并且Linux系统提供了一些优秀的FTP工具。在本文中，将介绍Linux系统下FTP的使用方法，并一步一步回答关于FTP的常见问题。</p><p>第一步：安装FTP客户端</p><p>在Linux系统中，存在多个FTP客户端可以选择，如FileZilla、lftp等。下面将以FileZilla为例来介绍FTP的使用方法。要安装FileZilla，可以执行以下命令：</p><p>shell</p><p>sudo apt-get install filezilla</p><p>第二步：打开FileZilla</p><p>安装完成后，可以在应用程序菜单中找到FileZilla，并点击打开它。接下来，将看到FileZilla的用户界面。</p><p>第三步：连接FTP服务器</p><p>在FileZilla的用户界面中，有一个快速连接栏，用于输入FTP服务器的地址、用户名和密码。在这里，将输入正确的FTP服务器地址、登录用户名和密码，并点击“快速连接”按钮。如果一切顺利，FileZilla将成功连接到FTP服务器。</p><p>第四步：浏览FTP服务器文件</p><p>连接成功后，FileZilla的界面会有两个主要窗口：左侧是本地文件系统的目录结构，右侧是FTP服务器上的文件列表。通过点击左右窗口之间的切换按钮，可以在本地和FTP服务器文件之间进行切换。</p><p>第五步：上传和下载文件</p><p>要上传文件到FTP服务器，可以选中需要上传的文件，然后将其拖动到右侧窗口中的目标目录。FileZilla会自动开始上传，进度将显示在底部状态栏上。</p><p>要从FTP服务器下载文件，可以选中需要下载的文件，然后将其拖动到左侧窗口中的目标目录。FileZilla会自动开始下载，进度将显示在底部状态栏上。</p><p>第六步：管理FTP服务器上的文件和目录</p><p>FileZilla还提供了一些管理功能，可以对FTP服务器上的文件和目录进行操作。要创建新目录，可以右键点击右侧窗口中的目标目录，然后选择“新建目录”选项。要删除文件或目录，可以右键点击右侧窗口中的目标文件或目录，然后选择“删除”选项。</p><p>此外，FileZilla还支持对FTP服务器上的文件进行重命名、复制和粘贴等操作。这些功能可以通过右键菜单或工具栏上的按钮来实现。</p><p>常见问题解答：</p><ol><li><p>如何解决连接不上FTP服务器的问题？</p><p>- 确保输入了正确的FTP服务器地址、用户名和密码。</p><p>- 检查网络连接是否正常。</p><p>- 确保FTP服务器正常运行并且允许外部连接。</p></li><li><p>如何解决上传或下载文件速度慢的问题？</p><p>- 检查网络连接的带宽，如果带宽较低可能会导致速度慢。</p><p>- 确保FTP服务器的性能良好，如果服务器负载过高可能会影响传输速度。</p></li><li><p>如何解决文件传输过程中断的问题？</p><p>- 检查网络连接是否稳定，如果网络不稳定可能会导致传输中断。</p><p>- 尝试重新连接FTP服务器，然后重新开始上传或下载操作。</p></li></ol><p>本文介绍了在Linux系统中使用FTP进行文件传输的方法，并回答了一些常见问题。希望能够帮助读者更好地理解和使用Linux系统下的FTP工具。如果对于特定的FTP工具有更深入的了解需求，可以参考该工具的官方文档或相关资源。同时，也可以了解其他FTP工具，并选择最适合自己需求的工具来进行文件传输。</p></blockquote></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>FTP=家用云盘se</p><p>建议使用Alist</p>',9)]))}const c=i(a,[["render",t]]);export{d as __pageData,c as default};
