import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import s3 from '../../utils/s3';
import {deleteFiles} from "~/server/services/upload.service.js"; // Импортируем настроенный S3 клиент

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
    const { fileUrl, fileUrlList } = await readBody(event);

    if (!fileUrl && !fileUrlList?.length) {
        throw createError({
            statusCode: 400,
            message: 'URL файла не предоставлен',
            statusMessage: 'Неверный запрос',
        });
    }

    try {
        await deleteFiles()
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: error,
            statusMessage: statusMessage,
        });
    }
});

