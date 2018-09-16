import {fetch,post} from '../config/http.js'
export function merchants(params){
    return fetch("/shopping/restaurants",{...params})
}