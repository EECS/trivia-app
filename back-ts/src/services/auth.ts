import { Strategy as LocalStrategy } from "passport-local"
import knex from "../loaders/knex"
import bcrypt from "bcrypt"

import IUser from "../models/User"

const localStrategy = new LocalStrategy(
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
)

const deserializeUser = (id: string, done: (err: Error, user: IUser) => void) => {
    knex.from('Users').select("id", "userName", "email").where({ id: id })
        .then((user: IUser[]) => done(null, user[0]))
        .catch((err: Error) => {
            done(err, null)
        })
}

const serializeUser = (user: IUser, done: (err: Error, user: string) => void) => {
    done(null, user.id);
}

export {
    localStrategy, deserializeUser, serializeUser
}