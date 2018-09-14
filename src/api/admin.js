import {fetch,post} from '../config/http.js'

export function login(params){
    return post("/admin/login",{...params})
}

export function singout(params){
    return fetch("/admin/singout",{...params})
}

export function list(params){
    return fetch("/v1/users/list",{...params})
}

export function count(params){
    return fetch("/v1/users/count",{...params})
}