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
        this.id = generateUniqueId();
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

    static delete(noteId){
        getMemoFromFile((memos)=>{
            const updatedMemos = memos.filter((memo) => memo.id !== noteId);
            fs.writeFile(p, JSON.stringify(updatedMemos), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Deleted note with id ${noteId}`);
                }
            });

        })
    }
};

function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert the current timestamp to base36
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
    return timestamp + randomString;
}