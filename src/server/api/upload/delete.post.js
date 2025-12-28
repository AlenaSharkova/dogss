import multer from 'multer';
import {deleteBDFiles, deleteFiles} from "~/server/services/upload.service.js";
import {getUserAuth} from "~/server/services/auth.service.js"; // Импортируем настроенный S3 клиент

const storage = multer.memoryStorage(); // Сохраняем файл в памяти
const upload = multer({ storage: storage }).single('file');

export default defineEventHandler(async (event) => {
    const sequelize = event.context.sequelize;

    const statusMessage = 'Ошибка удаления данных, попробуйте ещё раз0';
    const statusMessageServer = 'Ошибка сервера, попробуйте позже';
    const Users = event.context.Users;
    const UploadedFile = event.context.UploadedFile;

    const authHeader = getHeader(event, 'authorization')
    console.log('token0000', authHeader)

    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>
    console.log('token000')

    if (!sequelize || !Users || !UploadedFile) {
        console.error('Model or sequelize is not available in the context');
        throw createError({
            statusCode: 500,
            message: 'Database connection error',
            statusMessage: statusMessageServer,
        });
    }

    //TODO: обезопасить, чтоб удалять не могли все подряд

    const { fileUrl, fileUrlList, status } = await readBody(event);

    if (!fileUrl && !fileUrlList?.length) {
        throw createError({
            statusCode: 400,
            message: 'URL файла не предоставлен',
            statusMessage: 'Неверный запрос',
        });
    }

    try {
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw createError({
                    statusCode: 400,
                    message: 'Неавторизованный пользователь',
                    statusMessage: 'Неавторизованный пользователь',
                });
            })

        return await deleteBDFiles(user, UploadedFile, fileUrl, fileUrlList, status)
    } catch (error) {
        console.error('Ошибка', error)
        throw createError({
            statusCode: 500,
            message: error,
            statusMessage: statusMessage,
        });
    }
});

