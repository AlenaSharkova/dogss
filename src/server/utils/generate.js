import {randomInt, randomBytes} from 'crypto';

export function generateOTP() {
    return randomInt(100000, 999999).toString(); // Генерация 6-значного числа
}

export function generateRandomToken() {
    return randomBytes(25).toString('hex');
}
export function generateRandomHash() {
    return randomBytes(25).toString('hex');
}
