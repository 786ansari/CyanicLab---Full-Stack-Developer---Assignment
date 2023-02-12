import * as curd from "./curd"
import * as dataUrl  from "./DataUrls"
export const AddUserService =async (data) => {
    return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.addUser,{},data)
} 
export const getUserDataService =async (data) => {
    return await curd.get(dataUrl.MainUrl+dataUrl.endPoint.getUser+"/"+data)
}
export const UpdateUserService =async (data) => {
    return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.updateUser,{},data)
}
export const DeleteUserService =async (data) => {
    return await curd.post(dataUrl.MainUrl+dataUrl.endPoint.deleteUser,{},data)
}