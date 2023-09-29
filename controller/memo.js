const Memo = require('../Model/memo_model')

exports.getMemos =(req, res, next) => {
    Memo.fetchAll((memos)=> res.render('home',{
        n: memos, 
        docTitle: 'Memo - Home', 
        path: '/' 
    }));
   
};

exports.getAddMemo = (req, res, next) => {
    res.render('add-note',{
        docTitle:'Memo - Add Note',
        path:'/add-note'
    }
)};

exports.PostAddMemo = (req, res, next) => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const checkamOrPm = hours >= 12 ? 'pm' : 'am';
    const currentTime = `${hourshours = hours % 12 || 12}:${minutes} ${checkamOrPm}`;
    const currentDMY = `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`

    const memos = new Memo(req.body.title,req.body.message,currentTime,currentDMY );

    if(req.body.title != '' && req.body.message != ''){
        memos.save();
    }
    else{
        console.log('Is null')
    }
    res.redirect('/');  
};

exports.PostDeleteMemo = (req, res, next) => {
    const noteId = req.body.noteId;
    Memo.delete(noteId);
    res.redirect('/')
};