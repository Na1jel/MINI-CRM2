import axios from "axios";

export function fetchUsers(data) {
    let page = 1;
    let limit = 10;
    let sort = 'id';
    let order = 'asc';
    let search = '';
    if(data.page){
        page = data.page;
    }
    if(data.limit){
       limit = data.limit;
    }
    if(data.sort){
        sort = data.sort;
    }
    if(data.order){
        order = data.order;
    }
    if(data.search){
        search = data.search
    }
    return axios.get(`http://localhost:3001/users?page=${page}&count=${limit}&sort=${sort}&order=${order}&search=${search}`)
}

export function fetchUser(id) {
    return axios.get(`http://localhost:3001/users/${id}`);
}
export function postUser(data){
    return axios.post('http://localhost:3001/users', data)
}
export function patchUser(data){
    return axios.patch(`http://localhost:3001/users/${data.id}`, data)
}
export function deleteUser(id){
    return axios.delete(`http://localhost:3001/users/${id}`)
}
export function planUser(id){
    return axios.get(`http://localhost:3001/plan/${id}`)
}