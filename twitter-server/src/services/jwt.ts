import { User } from "@prisma/client";
import { prismaclient } from "../clients/db";
const JWT = require("jsonwebtoken");

const JWT_SECRET = "$uper@1234"

class JWTService{
    public static async generateTokenForUser(user:User){

        const payload = {
            id:user?.id,
            email:user?.email
        }

        const token = JWT.sign(payload,JWT_SECRET)
        return token;
    }
}

export default JWTService;