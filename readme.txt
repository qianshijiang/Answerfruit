
开发工具推荐使用visual studio code
下载地址 https://code.visualstudio.com/ 无脑下一步
64 位
nodejs下载地址
https://npm.taobao.org/mirrors/node/v10.5.0/node-v10.5.0-x64.msi
无脑下一步，不需要环境变量各种

1.安装node环境（其实就是走完上面的nodejs安装就行了）
2.cd到本目录下
3.npm install安装依赖包，可能很慢
4.npm run dev
5.打开localhost:8080(有可能会是其他端口，看控制台即可，会有Your application is running here: http://localhost:8080的提示)

接口对接范例
在http://localhost:8080/#/Login中输入帐号密码点击登录，则在本地缓存中设置了token
逻辑代码在：fckd/src/views/Login.vue 52行，与jquery ajax用法相仿

http://localhost:8080/#/about中点击头像，读取本地缓存中的token，并发送图片信息到后端。
逻辑代码在：fckd/src/views/about.vue 59行

域名映射在 fckd/conf/index.js 13行处设置

路由配置在src/routes/index.js中

