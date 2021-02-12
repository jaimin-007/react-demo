import React, {
  Component
} from 'react'
import Home from "./home/components/Home";
import styled from 'styled-components';
import CustomerService from "./common/services/CustomerService";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
  };
  }

  componentDidMount() {
   
  }

  render() {
      //console.log(this.props.location.pathname)
      const LoaderWrapper = styled.div `
      background:#fff; position:absolute; top:0px; left:0px; width:100%; height:100%;
      text-align:center; padding-top:100px; padding-bottom:100px;
      `;

      return <Home></Home>



  }
}
export default App