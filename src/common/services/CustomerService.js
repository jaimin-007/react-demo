import axios from "axios"

class CustomeServices {
    state = {
        response: '',
        post: '',
        responseToPost: '',
      };

    getCustomer() {
        return axios.get("http://localhost:8081/company");
    }
    getCustomerById(id) {
        return axios.get("http://localhost:8081/company/"+id);
    }

    exportCompanyData(id) {
        return axios.get("http://localhost:8081/export");
    }

    DeleteCompanyById(id) {
        return axios.delete("http://localhost:8081/company/"+id);
    }

    userLogin(userId,password)
    {
        debugger;
       
        var data = {
            "Email":userId,
            "Password":password,

           }
       return axios.post('http://localhost:8081/login',data)
        

        // return axios.get(process.env.REACT_APP_API_BASE_URL + "customer/" + userId+"/password/"+password);
    }
    AddCompany(Code,Name,userId)
    {
        debugger;
       
        var data = {
            "Code":Code,
            "Name":Name,
            "CreatedBy":userId

           }
       return axios.post('http://localhost:8081/company',data)
        
    }

    EditCompany(Code,Name,userId,CompanyId)
    {
        debugger;
       
        var data = {
            "Code":Code,
            "Name":Name,
            "CreatedBy":userId,
            "Id":CompanyId

           }
       return axios.put('http://localhost:8081/company',data)
        
    }
    ForgotPassword(userId)
    {
        debugger;
       
        var data = {
            "Email":userId

           }
       return axios.post('http://localhost:8081/forgot-password',data)
    }

    // getCustomerByStringId(stringId) {
    //     return axios.get(process.env.REACT_APP_API_BASE_URL + "customer/" + stringId);
    // }
    // setCustomerData(data) {
    //     // localStorage.setItem("customerData", data);
    //     return data;
    // }
    // getCustomerData() {
    //     let customerData = sessionStorage.getItem("customerData");
    //     if(customerData == null){
    //         customerData = {};
    //     }else{
    //         customerData = JSON.parse(customerData);
    //     }
    //     return customerData;
    // }
    // verifyManualVoucherTokem(stringId,token) {
    //     return axios.get(process.env.REACT_APP_API_BASE_URL + "customer/" + stringId+"/manualVoucherToken/"+token);
    // }
}

export default CustomeServices;