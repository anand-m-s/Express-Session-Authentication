const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const router = require('./router')




const port = process.env.PORT || 3000;


// Set cache control headers to prevent caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    next();
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//middleware & static files
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router); 


//route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/home');
    } else {
        const errorMessage = req.session.errorMessage; // Get the error message from the session
        req.session.errorMessage = undefined; // Clear the error message
        res.render('index', { title: "Home | login", errorMessage });
    }
});




app.listen(port, () => { console.log('listening to the server on http://localhost:3000'); })