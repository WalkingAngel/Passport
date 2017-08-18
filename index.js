var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

passport.use('login', new Strategy(
    function(username, password, done) {
        db.users.findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        })
    }
))

passport.use('signup', new Strategy({passReqToCallback: true},
    function(req, username, password, done) {
        console.log(username);
        db.users.findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (user) { return done(null, false); }
            console.log("finded!", username);
            console.log(req);
            db.users.push(req.body, function(err, user) {
                if (err) { return done(err); }
                console.log(user);
                return done(null, user);  
            })
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function(err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    })
})

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat'}));///////////

app.use(passport.initialize());
app.use(passport.session());

app.get('/',
    function(req, res) {
        res.render('home', { user: req.user });
    }
);

app.get('/login', 
    function(req, res) {
        res.render('login');
    }
);

app.post('/login', 
    passport.authenticate('login', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
);

app.get('/signup',
    function(req, res) {
        res.render('signup');
    }
)

app.post('/signup',
    passport.authenticate('signup', { failureRedirect: '/signup' }),
    function(req, res) {
        res.redirect('/');
    }
)

app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    }
);

app.get('/profile',
    function(req, res){
        res.render('profile', { user: req.user });
    }
);

app.listen(3000);
