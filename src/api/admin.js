import {fetch,post} from '../config/http.js'
import './admin2'

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

export function info(params){
    return fetch("/admin/info",{...params})
}

export function cities(params){
    return fetch("/v1/cities",{...params})
}

export function restaurants(params){
    return fetch("/shopping/restaurants",{...params})
}

export function restaurantsCount(params){
    return fetch("/shopping/restaurants/count",{...params})
}

export function category(params){
    return fetch("/shopping/v2/restaurant/category",{...params})
}

export function updateshop(params){
    return post("/shopping/updateshop",{...params})
}

export function restaurant(params){
    return fetch("/shopping/restaurant/"+params.restaurant_id,{},'DELETE')
}

