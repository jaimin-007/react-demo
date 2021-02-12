import React from 'react';
import querystring from 'querystring';
import CustomerService from "../../common/services/CustomerService";
import { Redirect, withRouter,NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Col, Row,Button, Form, FormGroup, Input, Label } from 'reactstrap';


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
            sessionStorage.setItem("UserName", response.data[0].FirstName+" "+response.data[0].LastName)
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
      debugger;
      if(sessionStorage.getItem('isForgotEmail')!=null && sessionStorage.getItem('isForgotEmail')!=undefined && sessionStorage.getItem('isForgotEmail')!=false && sessionStorage.getItem('isForgotEmail')!="false" )
      {
        toast.success("Forgot email send successfully.")
        sessionStorage.setItem("isForgotEmail", false);
      }
    }
    render() {
      return (
        <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>


          <Form onSubmit={(e) => this.UserLogin(e)}>
        
        <FormGroup>
        <div id="focusEmailAddress">
        <Label> Email</Label>
                  <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForUserId} ` }}  onChange={e => {
                  this.setState({
                    UserId: e.target.value.trim()
                  });
                  }} id="yourname" name="yourname" placeholder="email address here" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title="example@gmail.com" type="text" autoComplete="disable"></input>
                </div>
        </FormGroup>
        <FormGroup>
        <div id="focusPassword" className="form-group">
        <Label> Password</Label>
                  <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForPassword} ` }}  onChange={e => {
                  this.setState({
                    Password: e.target.value.trim()
                  });
                }} id="pwd" name="pwd" placeholder="password"  type="password" autoComplete="disable"></input>
                </div>
        </FormGroup>
       
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onSubmit={(e) => this.UserLogin(e)}>
          Login
        </Button>

        <div className="text-center pt-1">
          <h6>
              <a href="" onClick={(e) => {
                this.gotoForgotPassword(e)
              }}>
                Forgot Password
              </a>
          </h6>
        </div>

        
      </Form>
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

          </Card>
        </Col>
      </Row>
      );
    }
  }
  
  export default withRouter(LoginForm);