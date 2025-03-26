import dotenv from 'dotenv';

dotenv.config()

interface ISettings {
    MONGO_URI: string,
    PORT: string,
    JWT_SECRET_KEY: string,
    CLOUD_NAME: string
    CLOUD_API_KEY: string
    CLOUD_API_SECRET: string

}


const settings: ISettings = {
    MONGO_URI: process.env.MONGO_URI as string,
    PORT: process.env.PORT as string,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    CLOUD_NAME: process.env.CLOUD_NAME as string,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET as string,

}


console.log(settings)


export default settings;