import express from "express";
import session from "express-session";
import redis from "redis"
import dotenv from "dotenv"
import { v4 } from "uuid";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

dotenv.config()

// tslint:disable: no-console
// tslint:disable-next-line: no-var-requires
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST || 'localhost',
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB
    }
});

type TUser = {
    id: string,
    userName: string;
    email: string;
    password: string;
}

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
        knex.from('Users').select().where({
            // tslint:disable: object-literal-shorthand
            email: email,
            password: password,
        }).then((user: TUser[]) => {
            done(null, user[0])
        }).catch((err: Error) => {
            done(err, null)
        });
    }
));

// tell passport how to serialize the user
passport.serializeUser((user: TUser, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(id)
    knex.from('Users').select().where({ id: id })
        .then((user: TUser[]) => done(null, user[0]))
        .catch((err: Error) => {
            done(err, null)
        })
});

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
    saveUninitialized: true,
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
    res.send(`Hit the home route. Received UUID: ${uuid} with Redis session id: ${req.sessionID}`)
});

// create the login get and post routes
app.get('/login', (req, res) => {
    res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.sendStatus(404)
        }

        req.logIn(user, (loginErr) => {

            if (err) {
                return next(loginErr)
            }

            return res.send('You were authenticated & logged in!\n');
        })
    })(req, res, next);
})

app.get('/authrequired', (req, res) => {
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