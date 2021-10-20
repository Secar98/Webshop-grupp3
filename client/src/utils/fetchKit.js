export default class FetchKit{
    static loginFetch = (formData) => {
        const url = "http://localhost:3000/api/users/signin" 

        return fetch(url, {
            method: "POST", 
            headers:{
                "accept": "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formData)
        
        })
    }
    static registerFetch = (formData) => {
        const url = "http://localhost:3000/api/users/signup" 

        return fetch(url, {
            method: "POST", 
            headers:{
                "accept": "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formData)
        
        })
    }
    static FetchUser = (token )=>{
        const url = 'http://localhost:3000/api/users/'
        return fetch(url,{
              method: "GET",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization": token
              }
          })
        }

        static editFetch = (formData,token,id) => {

        const url = `http://localhost:3000/api/users/${id}`

        return fetch(url, {
            method: "POST", 
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }, 
            body: JSON.stringify(formData)
        
        })
    }
    
}
