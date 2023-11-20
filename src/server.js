import express from 'express';

const app = express();

const hostname = 'localhost';
const port = 3001;

app.get('/', (req, res) => {
    res.send('<h1>Hello word </h1>');
});

app.listen(port, hostname, () => {
    console.log(`ChiBao is Connected port http://${hostname}:${port}`);
});
