import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    endpoint: process.env.ENDPOINT, // storage.yandexcloud.net
    region: process.env.REGION, //Укажите ваш регион
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    signatureVersion: 'v4', // Важно для Yandex Object Storage
});

export default s3;
