import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { createUser } from "../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
          return res.sendStatus(404);
        }

        req.logIn(user, (loginErr) => {
          if (err) {
            return next(loginErr);
          }

          return res.status(200).json({
            ok: true,
            data: user.email,
          });
        });
      })(req, res, next);
    }
  );

  route.post("/sign-up", async (req, res, next) => {
    const { email, password } = req.body;
    const returnedUser = await createUser(email, password);

    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        return res.sendStatus(403);
      }
      req.logIn(user, (loginErr) => {
        if (err) {
          return next(loginErr);
        }

        return res.status(200).json({
          ok: true,
          data: user.email,
        });
      });
    })(req, res, next);
  });

  route.post("/required", async (req, res, next) => {
    if (req.isAuthenticated()) {
      res.send("you hit the authentication endpoint\n and here it is");
    } else {
      res.sendStatus(403);
    }
  });
};
