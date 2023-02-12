import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUser } from '../../action/user.action'
import Navbar from '../comman/Navbar'
import toast, { Toaster } from 'react-hot-toast';
import AddUserModal from "./AddUserModal"
import "./user.css"

const User = (props) => {
  const[updateUserRecord,setUpdateUserRecord] =useState([])
  const[page,setPage] = useState(1)
  const[modalFor,setModalFor] = useState("")
  const selectorUpdate = useSelector(state=>state.users.USER_UPDATE)
  const selectorDelete = useSelector(state=>state.users.USER_DELETE)
  const selector = useSelector(state=>state.users.USER_GET)
  const selectorUserAdd = useSelector(state=>state.users.USER_ADD)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(selectorUserAdd.status){
    dispatch(getUser(page))
      toast.success(selectorUserAdd.success)
    }
    if(selectorUserAdd.status === false){
      toast.error(selectorUserAdd.message)
    }
  },[selectorUserAdd])

  useEffect(()=>{
    if(selectorUpdate.status){
      dispatch(getUser(page))
      toast.success(selectorUpdate.success)
    }
    if(selectorUpdate.status === false){
      toast.error(selectorUpdate.message)
    }
  },[selectorUpdate])
  useEffect(()=>{
    if(selectorDelete.status){
      dispatch(getUser(page))
      toast.success(selectorDelete.success)
    }
    if(selectorDelete.status === false){
      toast.error(selectorDelete.message)
    }
  },[selectorDelete])
  useEffect(() => {
    dispatch(getUser(page))
  }, [])
  

  const updateUser = (userdata) => {
    setUpdateUserRecord(userdata)
    setModalFor("update")
  }
  const deleteData = (user) => {
    dispatch(deleteUser({_id:user._id}))
  }
  const Pagination = () => {
    let html = []
    for(let i=page-3;i<=page;i++){
      i>=0 && html.push(<li class="page-item"><a class="page-link" style={i+1 == page?{backgroundColor:"#dddddd"}:{backgroundColor:""}} href="##" onClick={()=>{setPage(i+1)}}>{i+1}</a></li>)
      
    } 
    return html
  }
  
  
  return (
    <>
    <Navbar/>
    <div className='user-page'>
    <div className='table-heading'>
    <h3>User Data</h3>
    <button type="button" class="btn btn-primary" data-toggle="modal" onClick={()=>{setModalFor("add")}} data-target="#exampleModal">Add</button>
    </div>
    <div className='user-table-main'>
    <table>
      <tr className='user-table'>
      <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile Number</th>
        <th>Home address (City)</th>
        <th>ZIP Code</th>
        <th>Address line </th>
        <th>Date of employment</th>
        <th>Date of Birth </th>
        <td>Actions</td>
      </tr>
    {selector && Object.keys(selector).length !== 0 && selector.data.map((user,i)=>{
      return(
        <tr>
          <tr>{page === 1 ?page+i:(page-1)*selector.data.length+i+1}</tr>
        <td>{user.name}</td>
        <td>{user.emailAddress}</td>
        <td>{user.mobileNumber}</td>
        <td>{user.homeAddress.length>0 && user.homeAddress[0].city}</td>
        <td>{user.homeAddress.length>0 && user.homeAddress[0].zipCode}</td>
        <td>{user.homeAddress.length>0 && user.homeAddress[0].address}</td> 
        <td>{user.dateOfEmployment}</td>
        <td>{user.dateOfBirth}</td>
        <td>
          <button type='button' title='Update User'  data-toggle="modal" data-target="#exampleModal" className='btn btn-primary' onClick={()=>updateUser(user)}><img src='../assets/img/update.png' width="30px" height="30px" alt="update" /></button>
          <button type='button' title='Delete User' className='btn btn-secondary' onClick={()=>deleteData(user)}><img src='../assets/img/delete.png' alt="update" width="30px" height="30px" /></button>
        </td>
      </tr>
      )
    })
      }
    </table>
    </div>
    </div>
    <nav aria-label="Page navigation example"className='pagination-main'>
  <ul class="pagination justify-content-end">
    <li class={page>1?"page-item":"page-item disabled"}>
      <a class="page-link" href="##" onClick={()=>{setPage(page>0 && page-1)}}>Previous</a>
    </li>
    {Pagination()}
    <li class="page-item">
      <a class="page-link" onClick={()=>{setPage(page+1)}} href="##">Next</a>
    </li>
  </ul>
</nav>
    <AddUserModal data={updateUserRecord} type={modalFor} />
    <Toaster />
    </>
  )
}

export default User