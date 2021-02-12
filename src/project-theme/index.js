import React, { Component } from 'react'
import AppRoute from './AppRoute'; // default theme
import Login from './components/Login'; // default theme
import Layout from "./components/Layout";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { withLocalize } from "react-localize-redux";
import { EmptyLayout, LayoutRoute, MainLayout } from '../components/Layout';
import ForgotPassword from './components/ForgotPassword';


class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                <LayoutRoute
              exact
              path="/Login"
              layout={EmptyLayout}
              component={props => (
                <Login />
              )}
            ></LayoutRoute>
             <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <Login />
              )}
            ></LayoutRoute>
            <LayoutRoute exact
              path="/forgotPassword"
              layout={EmptyLayout}
              component={props => (
                <ForgotPassword />
              )}>
                
            </LayoutRoute>
                <MainLayout breakpoint={this.props.breakpoint}>
                    {_.map(AppRoute, (route, key) => {
                        const { component, path } = route;
                        return (
                            <Route
                                exact
                                path={path}
                                key={key}
                                render={(route) => <Layout  component={component} route={route} />}
                            />
                        )
                    })}
                    </MainLayout>
                </Switch>
                
            </BrowserRouter>
        );
    };
}

export default withLocalize(Main)