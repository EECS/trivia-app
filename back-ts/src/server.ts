import express from "express";
import session from "express-session";
import redis from "redis"
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import config from "./config/index"

// tslint:disable: no-var-requires
// tslint:disable: no-console
const knexConfig = require("../knexfile")[config.environment]

const knex = require('knex')(knexConfig);

type TUser = {
    id: string,
    userName: string;
    email: string;
    password: string;
}

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {

        try {
            // Encrypt password
            const saltRounds = 10;

            const user: TUser[] = await knex.from('Users').select("id", "userName", "email", "password").where({
                // tslint:disable: object-literal-shorthand
                email: email,
            })

            if (user.length > 0) {
                const isFound = await bcrypt.compare(password, user[0].password)

                if (isFound) {
                    return done(null, user[0])
                }
            }

            done(Error("User not found."), null)

        } catch (e) {
            done(e, null)
        }
    }
));

// tell passport how to serialize the user
passport.serializeUser((user: TUser, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex.from('Users').select("id", "userName", "email").where({ id: id })
        .then((user: TUser[]) => done(null, user[0]))
        .catch((err: Error) => {
            done(err, null)
        })
});

const redisClient = redis.createClient()
// tslint:disable-next-line
const redisStore = require("connect-redis")(session)

const app = express();
const port = config.port; // default port to listen

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: config.redis.secretKey,
    name: "trivia-app-redis-instance",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({
        host: config.redis.host || 'localhost',
        port: config.redis.port,
        client: redisClient,
        ttl: 86400
    })
}))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send(`Hit the home route.`)
});

// create the login get and post routes
app.get('/login', (req, res) => {
    res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
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
        res.sendStatus(403)
    }
})

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});