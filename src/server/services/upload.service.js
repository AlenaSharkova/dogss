import s3 from "~/server/utils/s3.js";

export async function deleteFiles(fileUrl, fileUrlList) {
    const statusMessage = 'Ошибка удаления данных, попробуйте ещё раз';

    if(!Array.isArray(fileUrlList) && fileUrl) {
        const urlParts = new URL(fileUrl);
        const key = urlParts.pathname.slice(1); // Убираем первый слэш
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };
        await s3.deleteObject(params).promise();
    } else if(fileUrlList?.length) {
        const objectsToDelete = fileUrlList.map(fileUrl => {
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
    } else {
        throw createError({
            statusCode: 400,
            message: 'URL файла не предоставлен',
            statusMessage: 'Неверный запрос',
        });
    }

    return {
        success: true,
        message: 'Файлы успешно удалены',
        fileUrlList: fileUrlList,
        fileUrl: fileUrl,
    };
}


export async function deleteBDFiles(user, UploadedFile, fileUrl, fileUrlList, status = 'local') {

    if(!Array.isArray(fileUrlList) && fileUrl) {

        const fileBD = await UploadedFile.findOne({
            where: {
                url: fileUrl
            }
        })
        console.log('fileBD00', fileBD)
        if(fileBD && user === fileBD.owner)  {
            await UploadedFile.destroy({
                where: {
                    url: fileUrl
                }
            });
            return await deleteFiles(fileUrl)

        } else if(!fileBD && status !== 'in-base')  {
            await deleteFiles(fileUrl)
        } else {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ошибка удаления. Возможно, файл уже удалён.',
                message: 'Невозможно удалить файл. Файл не найден в базе данных под указанным пользователем.',
            });
        }
    } else if(fileUrlList?.length) {

        const fileListBD = UploadedFile.findAll({
            where: {
                url: fileUrlList.map(fileUrl => fileUrl.url)
            }
        })
        if(fileListBD && !fileListBD.find(item => item.owner !== user)) {
            await UploadedFile.destroy({
                where: {
                    url: fileUrlList.map(fileUrl => fileUrl.url)
                }
            });
            await deleteFiles('', fileUrlList)
        } else if(!fileListBD && status !== 'in-base')  {
            await deleteFiles('', fileUrlList)
        } else {
            throw createError({
                statusCode: 400,
                statusMessage: 'Ошибка удаления. Возможно, какой-то из файлов уже удалён',
                message: 'Невозможно удалить файл. Файл не найден в базе данных под указанным пользователем.',
            });
        }
    } else {
        throw createError({
            statusCode: 400,
            message: 'URL файла не предоставлен',
            statusMessage: 'Неверный запрос',
        });
    }

    return {
        success: true,
        message: 'Файлы успешно удалены'
    };
}