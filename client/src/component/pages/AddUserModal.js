import React, { useEffect, useState } from 'react'
import "./addUserModal.css"
import {useDispatch} from "react-redux"
import { addUser, updateUser } from '../../action/user.action'

function AddUserModal(props) {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dobVal, setDobVal] = useState(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate())
  const [mobilenumber, setMobilenumber] = useState("")
  const [dateOfEmployment, setDateOfEmployment] = useState("")
  const [dob, setDob] = useState("")
  const [homeAddress, setHomeAddress] = useState([{
    city:"",
    zipCode:"",
    address:""
  }]) 
  useEffect(() => {
    if(props && Object.keys(props.data).length !== 0){
      setId(props.data._id)
      setName(props.data.name)
      setEmail(props.data.emailAddress)
      setMobilenumber(props.data.mobileNumber)
      setDateOfEmployment(props.data.dateOfEmployment)
      setDob(props.data.dateOfBirth)
    setHomeAddress(props.data.homeAddress) }
    if(props.type === "add"){
      setId("")
      setName("")
      setEmail("")
      setMobilenumber("")
      setDateOfEmployment("")
      setDob("")
    setHomeAddress([{
      city:"",
      zipCode:"",
      address:""
    }])
    }
  }, [props])
  
  const dispatch = useDispatch()

  const handleChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    if(id === 'name'){
      setName(value)
    }
    if(id === 'email'){
      setEmail(value)
    }
    if(id === 'mobilenumber'){
      setMobilenumber(value)
    }
    if(id === 'dateOfEmployment'){
      setDateOfEmployment(value)
    }
    if(id === 'dob'){
      setDob(value)
    }
    if(id === "zipCode" || id === "city" || id === "address"){
    setHomeAddress({...homeAddress,[id]:value})
    }
  }
  const handleSubmit = async() => {
    let data = {
      name:name,
      email:email,
      mobileNumber:mobilenumber,
      homeAddress:homeAddress,
      Date_of_employment:dateOfEmployment,
      dob:dob
  }
  if( Object.keys(props.data).length !== 0){
    data._id = id
    dispatch(updateUser(data))
  }
  else{
      dispatch(addUser(data));
  }
  }
  return (
    <>
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
      </div>
      <form className='user-form'>
        <div className='row'>
<div className="form-group col-md-6 col-2">
  <label for="name">Name</label>
  <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={handleChange} value={name} placeholder="Enter name" required/>
</div>
<div className="form-group col-md-6 col-2">
  <label for="exampleInputEmail1">Email address</label>
  <input type="email" className="form-control" id="email" onChange={handleChange} value={email} aria-describedby="emailHelp" placeholder="Enter email" required/>
</div>
</div>
<div className='row'>
<div className="form-group col-md-6 col-2">
  <label for="mobilenumber">Mobile Number</label>
  <input type="number" className="form-control" id="mobilenumber" onChange={handleChange} value={mobilenumber} aria-describedby="mobilenumber" placeholder="Enter Mobile" required/>
</div>
<div className="form-group col-md-6 col-2">
  <label for="dateOfEmployment">Date of employment </label>
  <input type="date" className="form-control" id="dateOfEmployment" onChange={handleChange} value={dateOfEmployment} placeholder="Date Of Employment" required/>
</div>
</div>
<div className='row mt-3'>
<div className="form-group col-md-6 col-2">
  <label for="exampleInputEmail1">Date of Birth</label>
  <input type="date" className="form-control" min={dobVal.toString()} id="dob" aria-describedby="dobHelp" onChange={handleChange} value={dob} placeholder="Enter dob" required/>
</div>
<div className="form-group col-md-6 col-2">
  <label for="exampleInputPassword1">City </label>
  <input type="text" className="form-control"  onChange={handleChange} value={homeAddress[0].city} id="city" placeholder="city" required/>
</div>
</div>
<div className='row mt-3'>
<div className="form-group col-md-6 col-2">
  <label for="exampleInputPassword1"> Zip Code </label>
  <input type="number" className="form-control" id="zipCode" onChange={handleChange} value={homeAddress[0].zipCode} placeholder="Zipcode" required/>
</div><div className="form-group col-md-6 col-2">
  <label for="address">Address </label>
  <input type="text" className="form-control" id="address" onChange={handleChange} value={homeAddress[0].address} placeholder="address"/>
</div>
</div>
</form>
      <div className="modal-footer">
        <button type="button" id="close-button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default AddUserModal          