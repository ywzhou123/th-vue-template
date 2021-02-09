## 安装node版本管理工具

> 安装前先卸载已安装的nodejs

### 1、下载

[nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases)
[vscode](https://vscode.en.softonic.com/download)


### 2、配置

  修改或创建文件：nvm安装目录/settings.txt
  添加以下内容：

```
  node_mirror: https://npm.taobao.org/mirrors/node/ 
  npm_mirror: https://npm.taobao.org/mirrors/npm/
```

### 3、常用命令

```bash
  # 列出所有可以安装的node版本
  nvm ls-remote
  # 列出所有已经安装的node版本
  nvm ls
  # 安装指定版本号的node
  nvm install v12.18.1
  # 切换node的版本
  nvm use v12.18.1
  # 设置node的默认版本
  nvm alias default v12.18.1
  # 查询当前使用的node版本
  node -v
```

### 4、安装VsCode插件

- 在左侧扩展面板的应用商店中搜索`Tellhow Vue 2.x Snippets`进行安装
- 提供了请多代码块快捷方式，具体查看插件说明文档

## 项目部署

### 1、安装软件包

```bash
  npm config set registry https://registry.npm.taobao.org
  npm install
```

或者

```bash
  npm run pre
```


### 2、启动开发模式

```bash
  npm run dev
```

### 3、编译发布版本

```bash
  npm run build
```

### 4、编译发布版本，并且成生报告文件

```bash
  npm run report
```

## 目录结构说明

```
┌─public                   静态资源目录，不会被打包编译
├─src
│  ├─api            	     接口目录
│  ├─assets            	   静态资源目录
│  ├─components            复用组件目录
│  ├─const                 静态常量定义目录
│  ├─filters               过滤器目录
│  ├─mixins                混入器目录
│  ├─router                路由配置目录
│  ├─store                 vuex存储目录
│  ├─utils                 工具类目录
│  ├─views                 业务页面目录
│  ├─main.js               Vue初始化入口文件
│  └─App.vue               Vue根组件
├─.env.development         开发环境变量
├─.env.production          生产环境变量
├─babel.config.js          webpack编译配置文件
└─vue.config.js            vue配置文件
```

## 如何切换调用**UAP**接口还是**微服务**接口

- 配置`public/index.html`

```
  var GLOBAL_IS_ORIGIN = true
  var VUE_APP_API_PREFIX = 'http://<后端接口IP地址>:<端口>'
```

  参数`GLOBAL_IS_ORIGIN`设为`true`表示调用UAP接口，将不会调用认证机制。
  参数`VUE_APP_API_PREFIX`指定生产环境的接口地址，如果为空则使用`.env.production`中的配置

- 配置`.env.production` 或 `.env.development`

```
  VUE_APP_API_HOST = 'http://<后端接口IP地址>:<端口>'
  VUE_APP_API_HOST_ORIGIN = 'http://<后端接口IP地址>:<端口>'
```
  参数`VUE_APP_API_HOST`指定**微服务**接口地址
  参数`VUE_APP_API_HOST_ORIGIN`指定**UAP**接口地址


## 干掉sockjs
- 现象：
  - network里面一直请求接口：`http://localhost:8080/sockjs-node/info?t=1462183700002`
- 打开文件：
  - `node_modules/sockjs-client/dist/sockjs.js`
- 搜索并注释：
  - `self.xhr.send(payload);`
> 但是会影响开发时热更新功能，需要手动刷新页面

## 启动失败

> windows操作系统需要基础编译环境

- 安装[python](https://www.python.org/downloads/windows/)
- 下载[Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)
- 设置`npm config set msvs_version 2017`