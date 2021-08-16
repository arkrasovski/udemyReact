import React from "react";
import { MainPage, CartPage } from "../pages";
import AppHeader from "../app-header";
import itemPage from "../pages/item-page";
import { useLocation } from "react-router";
import Background from "./food-bg.jpg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

const App = ({ total }) => {
  return (
    <Router>
      <div
        style={{
          background: `url(${Background}) center center/cover no-repeat`,
        }}
        className="app"
      >
        <AppHeader total={total} />
        <Switch>
          <Route path="/" exact component={MainPage} />

          <Route path="/cart" component={CartPage} />
          <Route path="/:id" component={itemPage} />
          <Route path="*/">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for {location.pathname}
        {/* window.location.href */}
        <br />
        <button>
          <Link className="alink" to="/">
            To the main page
          </Link>
        </button>
      </h3>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    total: state.total,
  };
};
export default connect(mapStateToProps)(App);
