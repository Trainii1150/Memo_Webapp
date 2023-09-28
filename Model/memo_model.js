const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'memos.json'
);

const getMemoFromFile = (cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            console.log(err);
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
        
    });
}

module.exports = class Memo{
    constructor(title,body,time,date){
        this.title = title;
        this.body = body;
        this.time = time;
        this.date = date;
    }
    save() { 
        getMemoFromFile((memos) => {
            memos.push(this);
            fs.writeFile(p, JSON.stringify(memos), (err) => {
                console.log(err);
            });
        });  
    }

    static fetchAll(cb){
        getMemoFromFile(cb);
    }
};