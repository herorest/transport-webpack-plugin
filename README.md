
## 这是一款针对webpack的像素转vw单位的loader插件

### 安装：
```javascript
npm i transport-webpack-plugin
```


### 配置：
按以下loader格式，添加进入webpack配置文件，实现从px转换成vw，适用于移动端项目
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
