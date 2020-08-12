import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import ResponseError from "../interfaces/ResponseError";

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

  // Load API routes.

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