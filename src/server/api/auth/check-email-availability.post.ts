import {generateOTP, generateRandomToken} from '../../utils/generate.js'
import {sendOTPByEmail} from '../../services/mail.service'
import {UserFactory} from "~/server/class/User.class";
import {UserBDFirstItemStruct} from "~/server/struct/UserStruct";

export default defineEventHandler(async (event) => {
    const userInstance = UserFactory.createFromContext(event);

    const { email } = await readBody(event)
    try {
        let user: UserBDFirstItemStruct = await userInstance.getByEmail(email)
        return {
            isAvailability: !!user,
            userStatus: user?.status
        }
    } catch (error) {
        throw error
    }
})