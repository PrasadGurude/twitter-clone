import axios from "axios"

interface GoogleTokenResult{
  iss?:           string;
  azp?:           string;
  aud?:           string;
  sub?:           string;
  email:          string;
  email_verified: string;
  nbf:            string;
  name:           string;
  picture:        string;
  given_name:     string;
  family_name:    string;
  exp:            string;
  jti:            string;  
  iat:            string;
  alg:            string;
  kid:            string;  
  typ:            string;
}
const queries = {
    verifyGoogleToken: async(parent:any,{token}:{token: string})=>{
        const googleToken = token
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
        googleOauthURL.searchParams.set("id_token",googleToken)

        const {data} =await axios.get(googleOauthURL.toString(),{
            responseType:"json"
        })
        console.log(data)
        return "ok";
    },
};

export const resolvers = {queries};