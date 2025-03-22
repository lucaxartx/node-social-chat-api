import express from 'express';
import connectDB from './config/db';
import settings from './config/settings';
import authRoutes from './routes/user.route'

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World")
})


app.use('/api/auth', authRoutes);

app.listen(settings.PORT, () => {
    console.log(`App running on http://127.0.0.1:${settings.PORT}`)
})
