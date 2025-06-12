import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../utils/s3'; // Импортируем настроенный S3 клиент

const storage = multer.memoryStorage(); // Сохраняем файл в памяти
const upload = multer({ storage: storage }).single('file');

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;

    const statusMessage = 'Ошибка загрузки данных, попробуйте ещё раз';
    const statusMessageServer = 'Ошибка сервера, попробуйте позже';

    if (!sequelize) {
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }

    let params, formData;

    try {
        await new Promise((resolve, reject) => {
            upload(event.req, event.res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(event.req.file);
                }
            });
        });
        formData = event.req.file

        if (!formData) {
            throw createError({
                statusCode: 400,
                message: 'Файл не был загружен',
                statusMessage: statusMessage,
            });
        }

        const fileName = uuidv4() + '-' + formData.originalname;

        params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: formData.buffer, // Используем буфер файла, так как файл хранится в памяти
            ContentType: formData.mimetype,
            ACL: 'public-read', // Публичный доступ к файлу
        };

        const s3Response = await s3.upload(params).promise();
        console.log('File uploaded successfully:', s3Response.Location);

        return {
            message: 'File uploaded successfully!',
            url: s3Response.Location,
            success: true
        };

    } catch (error) {
        console.error('Error during file processing:', error);
        throw createError({
            statusCode: 500,
            message: error,
            statusMessage: statusMessage,
        });
    }
});

