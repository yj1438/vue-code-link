# tinyjs-code-link

Tiny.js 快速定位 IDE 中源代码位置

![Animation]()

## Install

`npm install -s tinyjs-code-link`

## Usage

### webpack config

```js
const codeLinkServer = require('tinyjs-code-link/server/index');

module.export = {
  //...
  rules: [
    {
      test: /\.(js|ts)$/,
      include: path.resolve('src/pages/game/'),
      use: [
        {
          loader: 'tinyjs-code-link/loader',
        }
      ]
    }
  ],
  devServer: {
    // webpack 5
    onBeforeSetupMiddleware: codeLineServer.onBeforeSetupMiddleware
    // webpack <= 4
    // before: codeLineServer.before
  }
  //...
}
```

webpack chain 参考：

```js
config.module
  .rule('tinyjs-code-link')
  .test(/\.(js|ts)/).pre()
  .include.add(path.resolve('src/pages/game/')).end()
  .use('tinyjs-code-link/loader')
  .loader('tinyjs-code-link/loader')
  .end()
```

### tinyjs-inspector

安装 chrome 扩展程序 tinyjs-inspector。
打开 Tiny.js 页面的开发者面板，在 `tinyjs` tab 中，点击元素后的打开代码图标，即可在 vscode 中定位到应用的代码。

## 环境支持

### vscode

此功能是基于 vscode `code` 命令实现，请先确认 code 命令是否有效(cmd 或 shell 里直接执行 code)。

打开方法：
* 方法1：使用 command + shift + p (window 下使用 ctrl + shift + p ) 然后搜索 code，选择 install 'code' command in PATH。
* 方法2：直接手动将 code 命令的路径添加到环境变量中

### webstorm

* 1. 修改默认 IDE 配置：
```
const codeLineServer = require('tinyjs-code-link/server/index');
codeLineServer.setEditor('webstorm');
```
* 2. 确保将 webstorm 命令的路径添加到环境变量中
