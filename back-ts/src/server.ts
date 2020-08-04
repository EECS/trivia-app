import express from "express";
import session from "express-session";
import redis from "redis"
import dotenv from "dotenv"
import { v4 } from "uuid";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST || 'localhost',
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB
    }
});

// tslint:disable: no-console

type TUser = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const users: TUser[] = [
    {
        id: "1",
        firstName: 'Jacob',
        lastName: "Shannon",
        email: "jacobshnn@gmail.com",
        password: 'password'
    }
]

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        console.log('Inside local strategy callback')
        // here is where you make a call to the database
        // to find the user based on their username or email address
        // for now, we'll just pretend we found that it was users[0]
        const user = users[0]
        if (email === user.email && password === user.password) {
            console.log('Local strategy returned true')
            return done(null, user)
        }
    }
));

// tell passport how to serialize the user
passport.serializeUser((user: TUser, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    const user = users[0].id === id ? users[0] : false;
    done(null, user);
});

dotenv.config()

const redisClient = redis.createClient()
// tslint:disable-next-line
const redisStore = require("connect-redis")(session)

const app = express();
const port = process.env.API_PORT; // default port to listen

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: process.env.REDIS_SECRET,
    name: "trivia-app-redis-instance",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new redisStore({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT,
        client: redisClient,
        ttl: 86400
    })
}))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// define a route handler for the default home page
app.get("/", (req, res) => {
    const uuid = v4()
    // tslint:disable-next-line: no-console
    console.log(req.sessionID)
    res.send(`Hit the home route. Received UUID: ${uuid}`)
});

// create the login get and post routes
app.get('/login', (req, res) => {
    console.log('Inside GET /login callback function')
    console.log(req.sessionID)
    res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);
})

app.get('/authrequired', (req, res) => {
    console.log('Inside GET /authrequired callback')
    console.log(`User authenticated? ${req.isAuthenticated()}`)
    if (req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n and here it is')
    } else {
        res.redirect('/')
    }
})

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});