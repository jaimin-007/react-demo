import React from 'react';
import querystring from 'querystring';
import CustomServices from "../../common/services/CustomerService";
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Col, Row,Button, Form, FormGroup, Input, Label } from 'reactstrap';

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
      .then(response => {
        debugger;
        if(response.data=="Send Mail Successfully..!!")
        {
          toast.success(response.data); 
          sessionStorage.setItem("isForgotEmail", true);
            this.props.history.push('/');
             
            
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

        <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>


          <Form onSubmit={(e) => this.SendEmail(e)}>
        
        <FormGroup>
        <div id="focusEmailAddress" className="form-group">
        <Label> Email</Label>
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForemail} ` }}  onChange={e => {
                this.setState({
                  email: e.target.value.trim()
                });
                }} id="yourname" name="yourname" placeholder="email address here" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" title="example@gmail.com" type="text" autoComplete="disable"></input>
              </div>
        </FormGroup>
       
       
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onSubmit={(e) => this.SendEmail(e)}>
          Fogot Password
        </Button>

        <div className="text-center pt-1">
          <h6>
              <a href="#" onClick={this.props.history.goBack}>
                Back
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
  
  export default withRouter(ForgotPasswordForm);