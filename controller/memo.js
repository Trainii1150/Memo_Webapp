const Memo = require('../Model/memo_model');

exports.getMemos = async (req, res, next) => {
  try {
    const memos = await Memo.find();
    res.render('home', {
      n: memos,
      docTitle: 'Memo - Home',
      path: '/',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAddMemo = (req, res, next) => {
  res.render('add-note', {
    docTitle: 'Memo - Add Note',
    path: '/add-note',
  });
};

exports.PostAddMemo = async (req, res, next) => {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  const checkbelow10m = minutes < 10? '0'+minutes : minutes;
  const checkamOrPm = hours >= 12 ? 'pm' : 'am';
  const currentTime = `${hours = hours % 12 || 12}:${checkbelow10m} ${checkamOrPm}`;
  const currentDMY = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const memos = new Memo({ title: req.body.title, body: req.body.message, time : currentTime, date : currentDMY,});

  try {
    if (req.body.title !== '' && req.body.message !== '') {
      await memos.save();
    } else {
      console.log('Title and message cannot be empty');
    }
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.PostDeleteMemo = async (req, res, next) => {
  const noteId = req.body.noteId;
  try {
    await Memo.findByIdAndDelete(noteId);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};


