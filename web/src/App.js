import React, { Component } from "react";
import store from "./store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import withMuiTheme from "./with_mui_theme";
import Demo from "./pages/demo/demo_main";
import Main from "./pages/main/main";
import NotFindPage from "./pages/not_found_page";

import "./iconfont.js";
import { IntlProvider } from "react-intl-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider>
          <Router basename="/">
            <Switch>
              <Route path="/" component={Main} />
              <Route exact={true} path="/demo" component={Demo} />
              <Route component={NotFindPage} />
            </Switch>
          </Router>
        </IntlProvider>
      </Provider>
    );
  }
}

export default withMuiTheme(App);
