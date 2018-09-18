import {fetch,post} from '../config/http.js'
export function restaurants(params){
    return fetch("/shopping/restaurants",{...params})
}

export function merchants_post(params){
    return post("/shopping/restaurants",{...params})
}