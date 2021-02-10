import React from 'react';
import querystring from 'querystring';
import CustomServices from "../../common/services/CustomerService";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgotPasswordForm extends React.Component {
   
    constructor(props) {
      super(props);
      this.indexs = querystring.parse(props.location.search);
        this.state =
          {
            "email": "",
            "errorForemail": ""
          }
      
    }
   
  
  
    SendEmail(event) {
      event.preventDefault();
      debugger;
     
      let tmpData = this.state;
    
      if (!tmpData.email) {
        var elmnt = document.getElementById("focusEmailAddress");
        elmnt.scrollIntoView();
        this.setState({ errorForemail: "red", })
        return false
      }
      
      delete tmpData.errorForemail;
     
      let service = new CustomServices();
      service.ForgotPassword(tmpData.email)
      .then((response) => {
        debugger;
        if(response.data.message=="Send Mail Successfully..!!")
        {
            this.props.history.push('/Login');
            toast.success(response.data);
            
        }
        else if(response.data.length>0)
        {
            toast.error(response.data);
        }
          
        });
     
    }
  
    componentDidMount() {
    }
    render() {
      return (
        <div className="comp_details_outer detailPage detailPageBGColor">
            <ToastContainer autoClose={8000} />
          <div className="row gvs_vouch_lst m-b-50">
            <div className="container-inner-width">
              <div className="col-lg-12 text-center">
                <h1 className="head_ttl"><i className="ti-gift giftVoucherIcon"></i> <span class="screenHeading">Login</span> </h1>
                <span className="head_ttl_bor"><span className="lineBg"></span></span>
                
              </div>
            </div>
          </div>
          <form onSubmit={(e) => this.SendEmail(e)}>
            <div className="row m-t-50">
              <div className="col-lg-12 text-center">
                <span className="head_ttl_bor"><span className="lineBg"></span></span>
              </div>
            </div>
            <div className="row m-t-20 m-b-50 vscd_form">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div id="focusEmailAddress" className="form-group">
                <label className="control-label d-block text-center screenHeading">Email Address</label><hr className="w-50line page2borderColor" />
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForemail} ` }}  onChange={e => {
                this.setState({
                  email: e.target.value.trim()
                });
                }} id="yourname" name="yourname" placeholder="email address here" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title="example@gmail.com" type="text" autoComplete="disable"></input>
              </div>
  
              
              </div>
              </div>
              <div className="row m-t-10 m-b-50 px-3 xs-align-center">
            <div className="col-lg-6 col-md-6 col-sm-4 col-xs-12 ">
              <a onClick={this.props.history.goBack} className="btn btn-flat btn-preview-addcard pull-left buttonSettings"><i className="ti-angle-left"></i> BACK</a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
              <button className="btn btn-flat btn-preview-addcard pull-right buttonSettings" onSubmit={(e) => this.SendEmail(e)}>
                Forgot Password <i className="ti-angle-right"></i>
              </button>
            </div>
          </div>
          </form>
  
        </div>
      );
    }
  }
  
  export default withRouter(ForgotPasswordForm);