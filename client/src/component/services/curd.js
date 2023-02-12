import axios from "axios"

export const post = (url,token,data) => {
    console.log('dhhjsdfsd',url,token,data)
    if(token){
        token = `Bearer ${token}`        
    }
    return axios.post(url,data,{headers:token}).then((res,err)=>{
        return res.data
    })
}

export const get = (url,token) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
          }
    }
    if(token){
        token = `Bearer ${token}`        
    }
    return axios.get(url,config).then((res,err)=>{
        return res.data
    })

}