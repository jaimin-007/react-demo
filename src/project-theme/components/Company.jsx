import React, { Component } from 'react';
import CustomerService from "../../common/services/CustomerService";
import querystring from 'querystring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class CompanyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyList: []
        };
        
    }
    EditCompany(Id) {
        debugger;
        if(Id=='' || Id==null||Id==undefined)
        {
        this.props.route.history.push('/AddEditCompany');
        }
        else
        {
            this.props.route.history.push('/AddEditCompany?id='+Id);
        }
      }
      DeleteCompany(Id) {
        debugger;
        let customerService = new CustomerService();
        debugger;
            customerService.DeleteCompanyById(Id)
            .then((response) => {
           if(response.data=="Company deleted succesfully ..!!")
           {
            toast.success(response.data);
            this.props.route.history.push('/company');
           }
            });
      }

      ExportCompanyData() {
        debugger;
        let customerService = new CustomerService();
        debugger;
            customerService.exportCompanyData()
            .then((response) => {
           if(response.data=="Write to company.csv successfully..!")
           {
            toast.success(response.data)
           }
           else{
               toast.error(response.data.message)
           }
            });
      }
    componentDidMount() {
       debugger;
        let customerService = new CustomerService();
        debugger;
            customerService.getCustomer()
            .then((response) => {
            debugger;
                this.setState({
                    companyList: response.data,
                    
                });
            });
    }

    render() {
        return (
            
            <div className="container">
                <ToastContainer autoClose={8000} />
                <button className="text-uppercase border-0 px-4 py-2 cursor" onClick={(e) => {
                      this.EditCompany()
                    }}>Add New</button>

<button className="text-uppercase border-0 px-4 py-2 cursor" onClick={(e) => {
                      this.ExportCompanyData()
                    }}>Export</button>
            <div className="row">
              <div className="col s12 board"></div>
                <table id="simple-board">
                    <thead>
                        <tr>
                            <td>Company Name</td>
                            <td>Company Code</td>
                            <td>Created by</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                   <tbody>
                   {this.state.companyList.map((singleData, i) =>
                   <tr>
                       <td>{singleData.Name}</td>
                       <td>{singleData.Code}</td>
                       <td>{singleData.CreatedByName}</td>
                       <td> <button className="text-uppercase border-0 px-4 py-2 cursor" onClick={(e) => {
                      this.EditCompany(singleData.Id)
                    }}>Edit</button>

                    <button className="text-uppercase border-0 px-4 py-2 cursor" onClick={(e) => {
                      this.DeleteCompany(singleData.Id)
                    }}>Delete</button>
                    </td>
                   </tr>
                   )}
                   </tbody>
                 </table>
              </div>
            </div>
        );
      }
}

export default (CompanyList);