
## 这是一款将指定目录文件复制到目标目录的插件
由于项目需要将打包后的文件复制到某目录，但在使用transfer-webpack-plugin及copy-webpack-plugin两款插件后，无一例外均在95%阶段报错，而这两款插件都是基于webpack的emit阶段中compilation.assets制作的，所以决定本插件单纯使用node来进行复制，在after-emit阶段触发，需要的朋友拿去使用。

### 安装：
```javascript
npm i transport-webpack-plugin
```


### 配置：
```javascript
const TransportWebpackPlugin = require('transport-webpack-plugin');

plugins: {
  new TransferWebpackPlugin([
      { from: path1, to: path2 }
  ],{
      delFirst:true,
      showTip:false
  })
}
```


### 参数：
| 参数名        |  备注  |
| --------   | :----:  |
| delFirst     |   是否复制前删除目标文件夹及其下所有文件     |
| showTip        |   是否输出删除后提示   |
