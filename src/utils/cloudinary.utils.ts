import cloudinary from 'cloudinary';
import settings from '../config/settings';

//cloudinary setup



cloudinary.v2.config({
    cloud_name: settings.CLOUD_NAME,
    api_key: settings.CLOUD_API_KEY,
    api_secret: settings.CLOUD_API_SECRET
})


// Function for to cloudinary
const cloudinaryImageUploadMethod = async (file: any) => {
    return new Promise(resolve => {
        cloudinary.v2.uploader.upload(file, (_err: any, res: any) => {
            resolve({
                res: res.secure_url,
            })
        })
    })
}

export default cloudinaryImageUploadMethod;