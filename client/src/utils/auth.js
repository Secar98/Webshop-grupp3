import FetchKit from "./fetchKit"



class Auth {
    authenticateToken = async (token) => {
        try {
            const validateToken = await FetchKit.validateJWTFetch(token)
            if (validateToken.ok) {
                return [true]
            }
            else {
                throw new Error('Failed to authenticate token')
            }
        } catch (err) {
            return [false, err];
        }
    }

}

export default new Auth()