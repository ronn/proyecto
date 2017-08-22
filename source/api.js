import fetch from 'isomorphic-fetch'

const baseUrl = 'http://jsonplaceholder.typicode.com'

const getData = response => response.json()

const api = {
    posts: {
        async getList(page = 1){
            const response = await fetch(`${baseUrl}/posts?_page=${page}`)
            return getData(response);
        },
        async getSingle(id = 1){
            const response = await fetch(`${baseUrl}/posts/${id}`)
            return getData(response);
        },
        async getCommments(id = 1){
            const response = await fetch(`${baseUrl}/posts/${id}/comments`)
            return getData(response);
        }
    },
    users: {
        async getSingle(id = 1){
            const response = await fetch(`${baseUrl}/users/${id}`)
            return getData(response);
        },
        async getPosts (id = 1){
            const response = await fetch(`${baseUrl}/posts/?userId=${id}`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

            })
            return getData(response);
        }
    }
}

export default api