import React, { Component, Suspense, lazy } from 'react';

const ThemeProject = React.lazy(() => import('../../project-theme'));

class Home extends Component {


    render() {
          return <Suspense fallback={<div>Loading...</div>}><ThemeProject /></Suspense>;
       
    }
  }
  
  export default Home;