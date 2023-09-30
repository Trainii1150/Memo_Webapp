const fs = require('fs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types;
const jsonFilePath = './data/memos.json';
let memo_Data = [];

const memoSchema = new Schema({
    
    _id: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    Memo_title:{type: String},
    Memo_body: {type: String},
    Memo_time: {type: String},
    Memo_date: {type: String}
});

const Memo = mongoose.model('Memo', memoSchema); 

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'memos.json'
);

const getMemoFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err);
            cb([]);
        } else {
            try {
                const parsedData = JSON.parse(fileContent);
                cb(parsedData);
            } catch (jsonError) {
                console.log('Error parsing JSON:', jsonError);
                cb([]);
            }
        }
    });
}


module.exports = class Memo {
    constructor(title, body, time, date) {
        this.id = generateUniqueId();
        this.title = title;
        this.body = body;
        this.time = time;
        this.date = date;
    }
    save() {
        getMemoFromFile((memos) => {
            memos.push(this);
            fs.writeFile(p, JSON.stringify(memos),
                (err) => {
                    console.log(err);
                });
        });
    }

    static fetchAll(cb) {
        getMemoFromFile(cb);
    }

    static delete(noteId) {
        getMemoFromFile((memos) => {
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


    try {
        if (fs.existsSync(jsonFilePath)) {
          const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
          if (fileContent) {
            memo_Data = JSON.parse(fileContent);
          } else {
            console.log('The JSON file is empty.');
            
          }
        } else {
          console.log('The JSON file does not exist.');
          
        }
      } catch (err) {
        console.error('Error reading JSON file:', err);
      }


const deleteAllData = async () => {
    try {
        await Memo.deleteMany({}); // ลบทุกข้อมูลใน MongoDB
        console.log('All existing data deleted from MongoDB');
        importData(); // เมื่อลบข้อมูลเสร็จเรียบร้อยให้เริ่มการนำเข้าข้อมูลใหม่
    } catch (err) {
        console.log(err, 'Error');
    }
}
deleteAllData();

const importData = async () => {
    try {
        const memoData = memo_Data; // คัดลอกข้อมูลจาก memo_Data มาใช้
        
        // บันทึกข้อมูลตรงไปยัง MongoDB
        for (const memo of memoData) {
            const newMemo = new Memo({
                _id: new ObjectId(),
                Memo_title: memo.title,
                Memo_body: memo.body,
                Memo_time: memo.time,
                Memo_date: memo.date
            },);
            await newMemo.save();
        }
        
        console.log('Data has been imported to MongoDB');
    } catch (err) {
        console.log(err, 'Error');
    }
}
