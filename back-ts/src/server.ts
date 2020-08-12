import express from "express";
import session from "express-session";
import redis from "redis"
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import config from "./config/index"

import IUser from "./models/User";
import knex from "./loaders/knex"

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {

        try {

            const user: IUser[] = await knex.from('Users').select().where({
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
passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    knex.from('Users').select("id", "userName", "email").where({ id: id })
        .then((user: IUser[]) => done(null, user[0]))
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
    name: config.redis.name,
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