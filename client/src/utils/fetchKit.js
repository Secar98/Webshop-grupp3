export default class FetchKit {
    static loginFetch = (formData) => {
        const url = "https://my-app-server-webshop-grupp3.herokuapp.com/api/users/signin"

        return fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)

        })
    }

    static registerFetch = (formData) => {
        const url = "https://my-app-server-webshop-grupp3.herokuapp.com/api/users/signup"

        return fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)


        })
    }

    static FetchUser = (token) => {
        const url = 'https://my-app-server-webshop-grupp3.herokuapp.com/api/users/'
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    }

    static editFetch = (formData, token, id) => {
        const url = `https://my-app-server-webshop-grupp3.herokuapp.com/api/users/${id}`
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(formData)

        })
    }

    static FetchOrders = (token) => {
        const url = 'https://my-app-server-webshop-grupp3.herokuapp.com/api/orders'
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    }

    static validateJWTFetch = (token) => {
        const url = 'https://my-app-server-webshop-grupp3.herokuapp.com/api/users/jwt-valid'
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
    }

    static fetchCheckoutPage = (body) => {
        return fetch("https://my-app-server-webshop-grupp3.herokuapp.com/api/products/checkout", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

    static placeOrderFetch = (body) => {
        return fetch("https://my-app-server-webshop-grupp3.herokuapp.com/api/orders", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(body),
        })
    }

    static fetchAllProducts = () => {
        const url = "https://my-app-server-webshop-grupp3.herokuapp.com/api/products/";
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
    }
}
