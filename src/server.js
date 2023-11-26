/* eslint-disable no-console */

import express from 'express';
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';

const START_SERVER = () => {
    const app = express();

    app.use(express.json());
    // Use APIs v1
    app.use('/v1', APIs_V1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(
            `Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`,
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
