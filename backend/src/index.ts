import express from 'express';
import dotenv from 'dotenv';
import router from './routes/v1';

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/api/v1', router);

// APIサーバ起動
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Express WebApi listening on port ' + port);