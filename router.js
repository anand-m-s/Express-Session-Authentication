let express =require('express');
let router=express.Router();

const credential ={
    email : 'anandms@gmail.com',
    password : 'salamanca'
}

// login user
router.post('/login', (req, res) => {
    // if (req.session.user) {
    //     // If the user is already logged in, redirect them to the home page
    //     // res.redirect('/route/home');
    // } else
     if (req.body.email === credential.email && req.body.password === credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/home');
    } else {
        // Set the error message only when login is unsuccessful
        const errorMessage = "Incorrect username or password";
        res.render('index', { title: "Home | Login", errorMessage });
    }
});

router.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user, title: "Home || page" });
    } else {
        // Set the error message and redirect to the home page
        req.session.errorMessage = "Login again";
        res.redirect('/');
    }
});
// Route for logout
router.get('/logout', (req, res) => {
    // Clear the session only when the user explicitly logs out
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.render('index', { title: "Express", logout: "Logout successfully" });
            }
        });
    } else {
        // Handle cases where there's no active session (e.g., user manually navigating to /logout)
        res.redirect('/');
    }
});




module.exports = router;