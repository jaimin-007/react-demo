import React, { Component } from 'react';
import CustomerService from "../../common/services/CustomerService";
import querystring from 'querystring';
import { Redirect, withRouter,NavLink } from 'react-router-dom';
import { tmpdir } from 'os';
class AddEditCompanyData extends Component {

    constructor(props) {
        super(props);
        debugger;
         this.indexs = querystring.parse(props.route.location.search);
        
        this.state = {
            companyData: [],
           "id":this.indexs["?id"],
           "getcode":"",
           "postcode":"",
           "getname":"",
           "postname":"",
           "postId":"",
           "errorForName": "",
           "errorForCode": "",
        };
       
    }

    handleFieldChange(field, value) {

       debugger;
        if (field === "Name") {
          this.setState({ getname: value});
        }
        if (field === "Code") {
            this.setState({ getcode: value });
          }
      }
    CompanySave(event) {
        debugger;
        event.preventDefault();
        debugger;
       
        let tmpData = this.state;
      
        if (!tmpData.getcode) {
          var elmnt = document.getElementById("focusCode");
          elmnt.scrollIntoView();
          this.setState({ errorForCode: "red", })
          return false
        }
        if (!tmpData.getname) {
          var elmnt = document.getElementById("focusName");
          elmnt.scrollIntoView();
          this.setState({ errorForName: "red", })
          return false
        }
        
        delete tmpData.errorForCode;
        delete tmpData.errorForName;
        var createdBy=sessionStorage.getItem('UserId');
        let service = new CustomerService();
        if(this.state.id!=null && this.state.id!='' && this.state.id!=undefined)
        {
       service.EditCompany(tmpData.getcode,tmpData.getname,createdBy,this.state.id)
       .then((response) => {
          if(response.data[0].Id>0)
          {
              this.props.route.history.push('/company');
          }
             
          });
        }
        else{
       service.AddCompany(tmpData.getcode,tmpData.getname,createdBy)
       .then((response) => {
          debugger;
             if(response.data.length>0)
             {
              this.props.route.history.push('/company');
             }
          });
        }
      }
    

    componentDidMount() {
       if(this.state.id!=null && this.state.id!='' && this.state.id!=undefined)
       {
        let customerService = new CustomerService();
        debugger;
            customerService.getCustomerById(this.state.id)
            .then((response) => {
            debugger;
                this.setState({
                    companyData: response.data,
                    getcode:response.data[0].Code,
                    getname:response.data[0].Name
                    
                });
            });
        }
    }

    render() {
        return (
            <div className="comp_details_outer detailPage detailPageBGColor">
              <div className="row gvs_vouch_lst m-b-50">
                <div className="container-inner-width">
                  <div className="col-lg-12 text-center">
                    <h1 className="head_ttl"><i className="ti-gift giftVoucherIcon"></i> <span class="screenHeading">Company Add</span> </h1>
                    <span className="head_ttl_bor"><span className="lineBg"></span></span>
                    
                  </div>
                </div>
              </div>              
              <form onSubmit={(e) => this.CompanySave(e)}>
                <div className="row m-t-20 m-b-50 vscd_form">
                    {this.state.id?
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  
              <div id="focusCode" className="form-group">
                <label className="control-label d-block text-center screenHeading">Company Code</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForCode} ` }}  
                onChange={e => {
                    this.handleFieldChange("Code", e.target.value)
                  }}
                value={this.state.getcode}  id="yourname" name="yourname" placeholder="Code here" type="text" autoComplete="disable"></input>
              </div>
  
              <div id="focusName" className="form-group">
                <label className="control-label d-block text-center screenHeading">Company Name</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForName} ` }} 
                onChange={e => {
                    this.handleFieldChange("Name", e.target.value)
                  }}
                 value={this.state.getname} id="pwd" name="pwd" placeholder="Name here"  type="text" autoComplete="disable"></input>
              </div>
              

              </div>
              :<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  
              <div id="focusCode" className="form-group">
                <label className="control-label d-block text-center screenHeading">Company Code</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForCode} ` }}  onChange={e => {
                this.setState({
                  postcode: e.target.value.trim()
                });
                }} id="yourname" name="yourname" placeholder="Code here" type="text" autoComplete="disable"></input>
              </div>
  
              <div id="focusName" className="form-group">
                <label className="control-label d-block text-center screenHeading">Company Name</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForName} ` }}  onChange={e => {
                this.setState({
                  postname: e.target.value.trim()
                });
              }} id="pwd" name="pwd" placeholder="Name here"  type="text" autoComplete="disable"></input>
              </div>
              

              </div>}
             
              </div>
                  <div className="row m-t-10 m-b-50 px-3 xs-align-center">
                <div className="col-lg-6 col-md-6 col-sm-4 col-xs-12 ">
                  <a onClick={this.props.route.history.goBack} className="btn btn-flat btn-preview-addcard pull-left buttonSettings"><i className="ti-angle-left"></i> BACK</a>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                    {this.state.id?
                  <button className="btn btn-flat btn-preview-addcard pull-right buttonSettings" onSubmit={(e) => this.CompanyEdit(e)}>
                    Update <i className="ti-angle-right"></i>
                  </button>
    : <button className="btn btn-flat btn-preview-addcard pull-right buttonSettings" onSubmit={(e) => this.CompanySave(e)}>
    Save <i className="ti-angle-right"></i>
  </button>}
                </div>
              </div>
              </form>
            </div>
          );
      }
}

export default (AddEditCompanyData);
