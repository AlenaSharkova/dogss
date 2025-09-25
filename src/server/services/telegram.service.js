import {adminChatTgBot} from "~/server/data/access-data.js";


export async function initEventTgBot(instanceBot ) {
    try {
        console.log('initEventTgBot', instanceBot)
        instanceBot.on('text', (msg, match) => {
            console.log('msg.chat.id011', msg)

            let chatId = msg.chat.id;
            console.log('msg.chat.id010', msg.chat.id, msg)
            instanceBot.sendMessage(chatId, 'Хелло');
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export async function sendAdModerationToTgAdmin(instanceBot, id) {
    try {
        const text = `http://192.168.0.196:3000/admin/publications Запрос на модерацию от ${new Date()}, http://192.168.0.196:3000/catalog/${id}`;
        sendMsgFromTgBot(instanceBot, text)
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


export async function sendMsgFromTgBot(instanceBot, text) {
    try {
        instanceBot.sendMessage(adminChatTgBot, text);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

