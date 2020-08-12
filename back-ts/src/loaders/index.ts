import knexLoader from "./knex"
import expressLoader from "./express"

export default async ({ expressApp }) => {
    expressLoader({ app: expressApp })
}