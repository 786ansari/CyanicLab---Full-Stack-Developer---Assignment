const Validation = (data) => {
    let error = ""
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!data.name){
        return error = "Name is required"
    }
    if(!data.email){
        return error = "Email is required"
    }
    if(!emailRegex.test(data.email)){
        return error = "Email address is not valid"
    }
    if(!data.mobileNumber){
        return error = "Mobile number is required"
    }
    if(data.mobileNumber.length!==10){
        return error = "Mobile number is not valid"
    }
    if(!data.Date_of_employment){
        return error = "Date of employement is required"
    }

    if(!data.dob){
        return error = "Date of birth is required"
    }
    if(!data.homeAddress.city){
        return error = "City is required"
    }

    if(!data.homeAddress.zipCode){
        return error = "Zip code is required"
    }

    if(!data.homeAddress.address){
        return error = "Address is required"
    }
}
module.exports = Validation