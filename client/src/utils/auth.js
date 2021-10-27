import FetchKit from "./fetchKit"
import jwt_decode from "jwt-decode"



class Auth {
    authenticateToken = async (token) =>{

        try{

            const validateToken = await FetchKit.validateJWTFetch(token)
            if(validateToken.ok) {
                return true
            }
            else {
                return false
            }
        }
        
        catch{
            return false
        }

    }
    
}

export default new Auth