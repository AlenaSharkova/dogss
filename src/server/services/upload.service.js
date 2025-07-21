import s3 from "~/server/utils/s3.js";

export async function deleteFiles(fileUrl) {
    const statusMessage = 'Ошибка удаления данных, попробуйте ещё раз';

    if(!Array.isArray(fileUrl) && fileUrl) {
        const urlParts = new URL(fileUrl);
        const key = urlParts.pathname.slice(1); // Убираем первый слэш
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };
        await s3.deleteObject(params).promise();
    } else if(fileUrl?.length) {
        const objectsToDelete = fileUrl.map(fileUrl => {
            const urlParts = new URL(fileUrl);
            const key = urlParts.pathname.slice(1); // Убираем первый слэш
            return { Key: key };
        });


        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: objectsToDelete,
            },
        };
        const deleteObjectsResponse =  await s3.deleteObjects(params).promise();

        if (deleteObjectsResponse.Errors && deleteObjectsResponse.Errors.length > 0) {
            console.error('Errors during deletion:', deleteObjectsResponse.Errors);
            throw createError({
                statusCode: 500,
                message: 'Некоторые объекты не удалось удалить',
                statusMessage: statusMessage,
            });
        }
    }

    return {
        success: true,
        message: 'Файлы успешно удалены'
    };
}