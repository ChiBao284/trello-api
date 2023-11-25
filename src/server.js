/* eslint-disable no-console */

import express from 'express';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';

const START_SERVER = () => {
    const app = express();
    const hostname = env.APP_HOST;
    const port = env.APP_PORT;

    app.get('/', (req, res) => {
        res.end('<h1>Hello World!</h1><hr>');
    });

    app.listen(port, hostname, () => {
        // eslint-disable-next-line no-console
        console.log(
            `Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`,
        );
    });
    // Close connect mongoDB
    exitHook(() => {
        CLOSE_DB();
        console.log('Exit-Hook: Quit app');
    });
};

// Chạy kết nối databse start server

(async () => {
    try {
        await CONNECT_DB();
        START_SERVER();
    } catch (error) {
        console.log(error);
        process.exit();
    }
})();
