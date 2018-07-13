const path = require('path');
const dir = require('node-dir');
const rimraf = require('rimraf')
const fs = require('fs');
const copy = require('./copy');

/*定义传输类*/
function TransportWebpackPlugin(patterns, options) {
  this.patterns = patterns || [];
  this.options = options;
}

TransportWebpackPlugin.prototype.apply = function(compiler) {
  let _this = this;
  compiler.plugin('after-emit', function(compilation, cb) {
    let promises = [];

    _this.patterns.forEach(async function(pattern) {
      let from = pattern.from, to = pattern.to, regx = /[\.\/|\..\/]/;
      if(from.match(regx)){
        from = path.resolve(from);
      }
      if(to.match(regx)){
        to = path.resolve(to);
      }

      if(_this.options.delFirst){
        await new Promise((resolve,reject) => {
          rimraf(path.join(to,'/'), (err) => {
            if (err) throw err;
            fs.mkdir(to,0777);
            resolve();
          });
        });
      }
      promises.push(copy(from, to, _this.options));
    });
    Promise.all(promises).then(() => {
      cb();
    }).catch((text) => {
      throw new Error(text)
      cb();
    });
  });
}
module.exports = TransportWebpackPlugin;
