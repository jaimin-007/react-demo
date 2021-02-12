import React, { Component } from 'react';
import CustomerService from "../../common/services/CustomerService";
import querystring from 'querystring';
import { Redirect, withRouter,NavLink } from 'react-router-dom';
import { tmpdir } from 'os';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
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
            toast.success("Company update successfully.");  
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
              toast.success("Company add successfully.");  
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

          
          <Row className="col-12" >
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

            <Col md="12" sm="12" xs="12">
              <Card  className="mb-3">
                <CardBody>
                  <Form onSubmit={(e) => this.CompanySave(e)}>
                  {this.state.id?
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <FormGroup>
                  
              <div id="focusCode" className="form-group">
                <Label for="yourname">Company Code</Label>
                <Input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForCode} ` }}  
                onChange={e => {
                    this.handleFieldChange("Code", e.target.value)
                  }}
                value={this.state.getcode}  id="yourname" name="yourname" placeholder="Code here" type="text" autoComplete="disable"></Input>
              </div>
              </FormGroup>
              <FormGroup>
              <div id="focusName" className="form-group">
              <Label for="pwd">Company Name</Label>
                <input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForName} ` }} 
                onChange={e => {
                    this.handleFieldChange("Name", e.target.value)
                  }}
                 value={this.state.getname} id="pwd" name="pwd" placeholder="Name here"  type="text" autoComplete="disable"></input>
              </div>
              </FormGroup>

              </div>
              :<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <FormGroup>
                  
              <div id="focusCode" className="form-group">
              <Label for="yourname">Company Code</Label>
                <Input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForCode} ` }}  onChange={e => {
                this.setState({
                  getcode: e.target.value.trim()
                });
                }} id="yourname" name="yourname" placeholder="Code here" type="text" autoComplete="disable"></Input>
              </div>
              </FormGroup>
              <FormGroup>
  
              <div id="focusName" className="form-group">
              <Label for="pwd">Company Name</Label>
                <Input className="form-control text-box single-line" style={{ borderColor: `${this.state.errorForName} ` }}  onChange={e => {
                this.setState({
                  getname: e.target.value.trim()
                });
              }} id="pwd" name="pwd" placeholder="Name here"  type="text" autoComplete="disable"></Input>
              </div>
              </FormGroup>

              </div>}

              <hr />
              <a href="#" style={{marginRight:'20px'}} onClick={this.props.route.history.goBack}>
                Back
              </a>
              
              {this.state.id?
               <Button color="primary" onSubmit={(e) => this.CompanySave(e)}>Update</Button>

                :
                <Button color="primary" onSubmit={(e) => this.CompanySave(e)}>Save</Button>
              }
            
                  </Form>
                </CardBody>
              </Card>
              </Col>
            </Row>
          );
      }
}

export default (AddEditCompanyData);
