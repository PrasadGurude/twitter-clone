import axios from "axios"
import { prismaclient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";

interface GoogleTokenResult {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    nbf: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: string;
    exp: string;
    jti: string;
    alg: string;
    kid: string;
    typ: string;
}
const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const googleToken = token
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
        googleOauthURL.searchParams.set("id_token", googleToken)

        const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
            responseType: "json"
        })

        const user = await prismaclient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!user) {
            const newUser = await prismaclient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    profileImageURL: data.picture,
                }
            })

        }

        const userInDb = await prismaclient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!userInDb) throw Error("user with wiht email not found")

        const userToken = JWTService.generateTokenForUser(userInDb)
        return userToken;
    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        return ctx.user;
    }
};

export const resolvers = { queries };