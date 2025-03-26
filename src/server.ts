import express from 'express';
import connectDB from './config/db';
import settings from './config/settings';
import authRoutes from './routes/user.route'
import { errorHandler } from './middlewares/errorHandler';
import { log } from 'util';

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send("Hello World")
})



app.use(errorHandler)

// console.log('------we have these in settings -----', settings);


app.listen(settings.PORT, () => {
    console.log(`App running on http://127.0.0.1:${settings.PORT}`)
})
