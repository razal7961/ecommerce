import { BASE_URL } from "./baseurl";
import commonrequest from "./commonapi";

export const regStud=async(body,header)=>{
    return await commonrequest('POST',`${BASE_URL}/register`,body,header)
}

export const logstud=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/login`,body,'')
}

export const forgotpassword=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/password`,body,'')
}

export const changepassword=async(id,body)=>{
    return await commonrequest('PUT',`${BASE_URL}/changepassword/${id}`,body)
}

export const addproduct=async(body,header)=>{
    return await commonrequest('POST',`${BASE_URL}/addproduct`,body,header)
}

export const viewproduct=async()=>{
    return await commonrequest('GET',`${BASE_URL}/getproduct`,'','')
}

export const deleteproduct=async(id)=>{
    return await commonrequest('DELETE',`${BASE_URL}/deleteproduct/${id}`,{},'')
}

export const editproduct=async(id,body,header)=>{
    return await commonrequest('PUT',`${BASE_URL}/editproduct/${id}`,body,header)
}

export const viewusers=async()=>{
    return await commonrequest('GET',`${BASE_URL}/viewusers`,'','')
}

export const editprofile=async(id,header,body)=>{
    return await commonrequest('PUT',`${BASE_URL}/editprofile/${id}`,header,body)
}

export const getuser=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/getuser/${id}`)
}

export const showproduct=async()=>{
    return await commonrequest('GET',`${BASE_URL}/showproduct`,'','')
}

export const allproduct=async(search)=>{
    return await commonrequest('GET',`${BASE_URL}/viewproduct?search=${search}`,'','')
}

export const Category=async(category)=>{
    return await commonrequest('GET',`${BASE_URL}/category/${category}`)
}

export const userprofile=async(id,body,header)=>{
    return await commonrequest('PUT',`${BASE_URL}/userprofile/${id}`,body,header)
}

export const wishlist=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/addwishlist`,body) 
}

export const viewwishlist=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/viewwishlist/${id}`)
}

export const removeitem=async(id)=>{
    return await commonrequest('DELETE',`${BASE_URL}/removeitem/${id}`)
}

export const addtocart=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/addtocart`,body)
}

export const viewcart=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/viewcart/${id}`)
}

export const increase=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/increase/${id}`)
}

export const decrease=async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/decrease/${id}`)
}

export const deletecart=async(id)=>{
    return await commonrequest('DELETE',`${BASE_URL}/deletecart/${id}`)
}

export const addorder=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/addorder`,body)
}

export const cartdelete=async(id)=>{
    return await commonrequest('DELETE',`${BASE_URL}/cartdelete/${id}`)
}

export const vieworder=async()=>{
    return await commonrequest('GET',`${BASE_URL}/vieworder`)
}