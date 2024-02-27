const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.uk4kkhj.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    // เรียกใช้ฟังก์ชัน importData 
  })
  .catch((err) => {
    console.error(err);
  });


const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const notememo = require('./routes/notes');
const homeRoutes = require('./routes/home');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);
app.use(notememo);


app.use((req,res,next)=>{
    res.status(404).render('404',{docTitle:'404 Not Found',path:""});
})

app.listen(3000);