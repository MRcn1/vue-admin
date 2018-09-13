import {fetch,post} from '../config/http.js'

export function login(params){
    return post("/admin/login",{...params})
}

export function singout(params){
    return fetch("/admin/singout",{...params})
}