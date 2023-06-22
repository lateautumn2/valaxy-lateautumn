const { log } = require('console');
const fs = require('fs');

// 读取当前目录下的所有json文件
fs.readdir('./public/createJson', (err, files) => {
  if (err) throw err;

  // 过滤出所有json文件
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  console.log(jsonFiles);
  // 存储所有content字段的值
  const contents = [];
  let newContents = []

  // 遍历所有json文件
  jsonFiles.forEach((file,index) => {
    // 读取文件内容
    const data = fs.readFileSync("./public/createJson/"+file, 'utf8');
    const json = JSON.parse(data);
    //合并所有内容
    contents.push(...json);

    // 取出paragraphs字段的值
     newContents = contents.map(item => item.paragraphs);
  });

  // 生成新文件
  const newJsonString = JSON.stringify(newContents, null, 2);
  fs.writeFileSync('./public/poetry.json', newJsonString, 'utf8');
})
