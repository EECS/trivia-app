import express from "express";
import session from "express-session";
import redis from "redis"
import dotenv from "dotenv"

dotenv.config()

const redisClient = redis.createClient()
// tslint:disable-next-line
const redisStore = require("connect-redis")(session)

const app = express();
const port = process.env.API_PORT; // default port to listen

app.use(session({
    secret: process.env.REDIS_SECRET,
    name: "trivia-app-redis-instance",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new redisStore({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT,
        client: redisClient,
        ttl: 86400
    })
}))

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});