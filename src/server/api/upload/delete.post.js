import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../utils/s3'; // Импортируем настроенный S3 клиент

const storage = multer.memoryStorage(); // Сохраняем файл в памяти
const upload = multer({ storage: storage }).single('file');

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;

    const statusMessage = 'Ошибка удаления данных, попробуйте ещё раз';
    const statusMessageServer = 'Ошибка сервера, попробуйте позже';

    if (!sequelize) {
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }

    //TODO: обезопасить, чтоб удалять не могли все подряд
    const { fileUrl } = await readBody(event);

    if (!fileUrl) {
        throw createError({
            statusCode: 400,
            message: 'URL файла не предоставлен',
            statusMessage: 'Неверный запрос',
        });
    }

    try {
        // Извлекаем имя файла (ключ объекта) из URL
        const urlParts = new URL(fileUrl);
        const key = urlParts.pathname.slice(1); // Убираем первый слэш

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };

        await s3.deleteObject(params).promise();
        return {
            success: true,
            message: 'Файл успешно удален'
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: error,
            statusMessage: statusMessage,
        });
    }
});

