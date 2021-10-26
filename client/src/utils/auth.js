import FetchKit from "./fetchKit"
import jwt_decode from "jwt-decode"



class Auth {
    authenticateToken = async (token) =>{

        try{

            const validateToken = await FetchKit.validateJWTFetch(token)
            if(validateToken.ok) return true
            else return false
            
        }
        
        catch{
            return false
        }

    }
    
}

/* const validateJWT = async () =>{
    const token = localStorage.getItem("token")
    const newToken = await FetchKit.validateJWTFetch(token)
    console.log(newToken)
    if(newToken){
        localStorage.setItem("token", newToken)
        return true
    } 
    else {
        return false
    }
} */

export default new Auth