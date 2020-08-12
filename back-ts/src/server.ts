import express from "express"
import config from "./config/index"

async function startServer() {
    const app = express();

    await require("./loaders").default({ expressApp: app })

    app.listen(config.port, err => {
        if (err) {
            // tslint:disable-next-line: no-console
            console.log(err)
            process.exit(1)
        }

        // tslint:disable-next-line: no-console
        console.log(`Server listening on port: ${config.port}`)
    })
}

startServer();