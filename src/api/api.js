import axios from 'axios';
import resolve from './resolve';

let apiBase = process.env.REACT_APP_API_BASEURL;
let apiBaseUrl = apiBase + "/api"
//

const createUser = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/register`, data).then(res => res.data));
}
const login = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/login`, data).then(res => res.data));
}
const postCoupon = async (data) => {
    return await resolve(axios.post(`${apiBaseUrl}/coupons`, data).then(res => res.data));
}
const getAllCoupons = async () => {
    return await resolve(axios.get(`${apiBaseUrl}/coupons`).then(res => res.data));
}
const deleteCoupon = async (id) => {
    return await resolve(axios.delete(`${apiBaseUrl}/coupon/${id}`).then(res => res.data));
}


export {
    createUser,
    login,
    postCoupon,
    getAllCoupons,
    deleteCoupon
}
