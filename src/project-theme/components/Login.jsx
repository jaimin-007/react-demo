import React from 'react';
import querystring from 'querystring';
import CustomerService from "../../common/services/CustomerService";
import { Redirect, withRouter,NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class LoginForm extends React.Component {
  
    constructor(props) {
      super(props);
      this.indexs = querystring.parse(props.location.search);
        this.state =
          {
            "UserId": "",
            "Password": "",
            "errorForUserId": "",
            "errorForPassword": "",
            "companyList":""
          }
      
    }
   
  
  
    UserLogin(event) {
      event.preventDefault();
      debugger;
     
      let tmpData = this.state;
    
      if (!tmpData.UserId) {
        var elmnt = document.getElementById("focusEmailAddress");
        elmnt.scrollIntoView();
        this.setState({ errorForUserId: "red", })
        return false
      }
      if (!tmpData.Password) {
        var elmnt = document.getElementById("focusPassword");
        elmnt.scrollIntoView();
        this.setState({ errorForPassword: "red", })
        return false
      }
      
      delete tmpData.errorForUserId;
      delete tmpData.errorForPassword;
     
      let service = new CustomerService();
     service.userLogin(tmpData.UserId,tmpData.Password)
     .then((response) => {
        debugger;
        if(response.data=="Email address and/or password is incorrect" || response.data=="An error has occured trying to log in")
        {
            toast.error(response.data);
        }
        else if(response.data.length>0)
        {
            sessionStorage.setItem("UserId", response.data[0].Id)
            this.props.history.push('/company');
        }
          
        });
    }
   
    gotoForgotPassword(e) {
      // const history = useHistory();
      // history.push('/ForgotPassword');
      this.props.history.push('/ForgotPassword');
    }
  
    componentDidMount() {
    }
    render() {
      return (
        <div className="comp_details_outer detailPage detailPageBGColor">
            
          <div className="row gvs_vouch_lst m-b-50">
            <div className="container-inner-width">
              <div className="col-lg-12 text-center">
                <h1 className="head_ttl"><i className="ti-gift giftVoucherIcon"></i> <span class="screenHeading">Login</span> </h1>
                <span className="head_ttl_bor"><span className="lineBg"></span></span>
                
              </div>
            </div>
          </div>
          <form onSubmit={(e) => this.UserLogin(e)}>
            <div className="row m-t-50">
              <div className="col-lg-12 text-center">
                <span className="head_ttl_bor"><span className="lineBg"></span></span>
              </div>
            </div>
            <div className="row m-t-20 m-b-50 vscd_form">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div id="focusEmailAddress" className="form-group">
                <label className="control-label d-block text-center screenHeading">Email Address</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForUserId} ` }}  onChange={e => {
                this.setState({
                  UserId: e.target.value.trim()
                });
                }} id="yourname" name="yourname" placeholder="email address here" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title="example@gmail.com" type="text" autoComplete="disable"></input>
              </div>
  
              <div id="focusPassword" className="form-group">
                <label className="control-label d-block text-center screenHeading">Password</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForPassword} ` }}  onChange={e => {
                this.setState({
                  Password: e.target.value.trim()
                });
              }} id="pwd" name="pwd" placeholder="password"  type="password" autoComplete="disable"></input>
              </div>
              </div>
             
              </div>
              <div className="row m-t-10 m-b-50 px-3 xs-align-center">
            <div className="col-lg-6 col-md-6 col-sm-4 col-xs-12 ">
              <a onClick={this.props.history.goBack} className="btn btn-flat btn-preview-addcard pull-left buttonSettings"><i className="ti-angle-left"></i> BACK</a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
              <button className="btn btn-flat btn-preview-addcard pull-right buttonSettings" onSubmit={(e) => this.UserLogin(e)}>
                Login <i className="ti-angle-right"></i>
              </button>
            </div>
          </div>
          </form>
          <div>
              <button className="text-uppercase border-0 px-4 py-2 cursor" onClick={(e) => {
                      this.gotoForgotPassword(e)
                    }}>Forgot Password</button>


              </div>
              <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover
        />
        </div>
      );
    }
  }
  
  export default withRouter(LoginForm);