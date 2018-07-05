const path = require('path');
const dir = require('node-dir');
const fs = require('fs');

//返回promise
module.exports = function(from,to,options){
  return new Promise((resolve,reject) => {
    if(!from || !to){
      return ;
    }
  
    let readWrite = (fullPath,targetPath,cb) => {
      let rs = fs.createReadStream(fullPath) ;
      let ws = fs.createWriteStream(targetPath) ;
      let code = 'UTF8';
      rs.setEncoding(code);
      rs.on('data', (chunk) => {
        ws.write(chunk,code);
      });
      rs.on('end', () => {
        if(options.showTip)
          console.log(`${path.basename(targetPath)} ====================== \u001b[1;32m [100%] \u001b[0m copy `);
        ws.end();
        cb();
      });
    }
    
    dir.files(from,'all', async (err, files) => {
      if (err) {
          return;
      }
      //处理文件夹
      await files.dirs.sort((a,b) => {
        return a.length - b.length;
      }).map((dir) => {
        dir = path.join(to,dir.replace(from,''));
        fs.access(dir,fs.constants.F_OK,(err) => {
          if(err){
            fs.mkdirSync(dir, 0777);
          }
        })
      });
      //处理文件
      let allFiles = files.files.map((fullPath) => {
        let targetPath = path.join(to , fullPath.replace(from,'').substring(1));
        fs.access(targetPath,fs.constants.F_OK,(err) => {
          if(err){
            fs.writeFile(targetPath, '', (err) => {
              readWrite(fullPath,targetPath,() => {
                resolve();
              });
            });
          }else{
            readWrite(fullPath,targetPath,() => {
              resolve();
            });
          }
        });
      });
    });
  });
};