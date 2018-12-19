# Answerfruit

## 答案之果项目

### 项目为前后端分离项目,后端项目地址为:https://github.com/qianshijiang/OnlineInterfaceDocument.git

### 项目设及的技术

>>> 开发工具推荐使用visual studio code
   下载地址 地址 https://code.visualstudio.com/ 无脑/ 无脑下一步
   64 位
   nodejs下载地址
   地址
   https://npm.taobao.org/mirrors/node/v10.5.0/node-v10.5.0-x64.msi
   无脑下
   无脑下一步，不需要环境变量各种
   
1. 安装node环境（其实就是走完上面的nodejs安装就行了）
   了）
2. cd到本目录到本目录下
   录下
3. npm install安装依赖包，可能很慢很慢
4. npm run dev
5. 打开localhost:8082(有可能(有可能会是其他端口，看控制台即可，会有Your application is running here: e: http://localhost:8080的提示)的提示)
   
   接口对接范例
   在例
   在http://localhost:8080/#/Login中输入帐中输入帐号密码点击登录，则在本地缓存中设置了token
   逻辑代码在：fckd/src/views/ws/Login.vue 52行 52行，与jquery ajax用法相仿
   
   仿
   
   http://localhost:8080/#/about中点击头中点击头像，读取本地缓存中的token，并发送图片信息到后端。
   逻辑代码在：fckd/src/views/ws/about.vue 59行 59行
   
   域名映射在 fckd/conf/nf/index.js 13行 13行处设置
   
   路由配置在src/routes/es/index.js中

### 项目描述

> 项目作为前端呈现数据,需求点：
1. 以后端生成的二维码作为入口,扫二维码,请求后端接口。
2. 呈现后端返回的数据。

