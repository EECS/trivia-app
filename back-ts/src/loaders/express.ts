import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import ResponseError from "../interfaces/ResponseError";
import session from "express-session"
import config from "../config/index";
import redis from "redis"
import passport from "passport"
import { localStrategy, serializeUser, deserializeUser } from "../services/auth";
import routes from "../api/index";

export default ({ app }: { app: express.Application }) => {
  /**
   * Health check endpoints
   */

  app.get("/status", (req, res) => {
    res.status(200).end()
  })
  app.head("/status", (req, res) => {
    res.status(200).end()
  })

  // Apparently useful behind a reverse proxy.
  app.enable("trust proxy")

  // Enable cross orgin resource sharing to all origins by default.
  app.use(cors())

  // Middleware that transforms raw string of req.body into json.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const redisClient = redis.createClient()
  // tslint:disable-next-line
  const redisStore = require("connect-redis")(session)

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

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(localStrategy)
  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  // Load API routes.
  app.use(`http://${config.host}:${config.port}`, routes)

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err: ResponseError = new Error("Not Found")
    err.status = 404
    next(err)
  })

  // Error handlers
  app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message
      }
    })
  })

}