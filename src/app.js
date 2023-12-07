import express from 'express';
import { serverPort } from '../config/config.js';
import { apiRouter } from '../routers/index.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(serverPort, () => {
  console.log(serverPort, '포트로 서버가 열렸어요!');
});
