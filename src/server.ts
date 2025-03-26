import express from 'express';
import connectDB from './config/db';
import settings from './config/settings';
import authRoutes from './routes/user.route'
import { errorHandler } from './middlewares/errorHandler';
import profileRoutes from './routes/profile.route'

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })) //handle form data like the photos we'll do 


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)


app.get('/', (req, res) => {
    res.send("Hello World")
})



app.use(errorHandler)

// console.log('------we have these in settings -----', settings);


app.listen(settings.PORT, () => {
    console.log(`App running on http://127.0.0.1:${settings.PORT}`)
})
