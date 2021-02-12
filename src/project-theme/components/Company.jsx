import React, { Component } from 'react';
import CustomerService from "../../common/services/CustomerService";
import querystring from 'querystring';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, CardHeader, Col, Row, Table,Button,ButtonGroup, } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { CSVLink } from 'react-csv'
const tableTypes = ['', 'bordered', 'striped', 'hover'];
class CompanyList extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            CompanyData: [],
            FinalData:[]
        };
        this.csvLink = React.createRef();
        
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
            window.location.reload();
            // this.props.route.history.push('/company');
           }
            });
      }

      ConfirmDelete = (Id) => {
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'you want to delete ?.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.DeleteCompany(Id)
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        })
      };

      ExportCompanyData() {
        debugger;
        let customerService = new CustomerService();
        debugger;
            customerService.exportCompanyData()
            .then((response) => {
              debugger;
              if(response.data.length>0 && response.data!="An error has occured trying to get companies")
              {
               this.setState({ CompanyData:response.data.map(x => ({ Id: x.Id, Code: x.Code,Name:x.Name,Active:x.Active })) }, () => {
                 // click the CSVLink component to trigger the CSV download
                 this.csvLink.current.link.click()
               })
               toast.success("File download")
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

<Row style={{ margin: "20px" }}>
<ToastContainer autoClose={8000} />
             <Col md="12" sm="12" xs="12">
            <Card className="mb-3">
              <CardBody style={{ textAlign: 'center' }} >
                <Button style={{ margin: "5px" }} color="primary" onClick={(e) => {
                      this.EditCompany()
                    }}>Add New</Button>
                {/* <Button color="secondary" onClick={(e) => {
                      this.ExportCompanyData()
                    }}>Export</Button>
                <CSVLink
          data={this.state.CompanyData}
          filename={'customer.csv'}
          className="hidden"
          ref={this.csvLink}
          target="_blank" 
       /> */}
              </CardBody>
            </Card>
          </Col>
        <Col>
          <Card className="mb-3">
            
            <CardBody>
              <Table responsive>
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
                       <td> 
                        <Button style={{marginRight:'5px'}} color="success" size="sm" onClick={(e) => {
                              this.EditCompany(singleData.Id)
                            }}>
                          Edit
                        </Button>
                        <Button color="info" size="sm" onClick={(e) => {
                              this.ConfirmDelete(singleData.Id)
                            }}>
                          Delete
                        </Button>

                    </td>
                   </tr>
                   )}
                        </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>


         
        );
      }
}

export default (CompanyList);