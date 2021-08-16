import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import { CharacterPage, BooksPage, HousesPage, BooksItem } from "../pages";
import styled from "styled-components";
import "../../index.css";
import PropTypes from "prop-types";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";

const ToggleBtn = styled.button`
  padding: 5px;
  margin-bottom: 20px;
`;

export default class App extends Component {
  state = {
    show: true,
    error: false,
    //pageNum: 5,
  };
  gotService = new GotService();
  componentDidCatch() {
    this.setState({ error: true });
  }

  onToggleBtn = () => {
    let { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const { show } = this.state;
    const isShow = show ? <RandomChar /> : null;
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <div className="app">
          {/* обернули в див класс app чтобы не потерять стили */}
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {isShow}
                <ToggleBtn onClick={this.onToggleBtn}>
                  Toggle random character panel
                </ToggleBtn>
              </Col>
            </Row>
            {/* свойство exact позволяет добавлять элементы конкретно на главную страницу при указании пути /*/}
            <Switch>
              <Route path="/" exact component={CharacterPage} />
              <Route path="/characters" component={CharacterPage} />
              <Route path="/houses" component={HousesPage} />
              <Route path="/books" exact component={BooksPage} />
              <Route
                path="/books/:id/"
                render={({ match }) => {
                  const { id } = match.params;
                  return <BooksItem bookId={id} />;
                }}
              />
              <Route path="*/">
                <NoMatch />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

RandomChar.defaultProps = {
  interval: 15000,
}; //пропсы по умолчанию
//проверка на правильность типов данных
RandomChar.propTypes = {
  interval: PropTypes.number,
  // interval: (props, propName, componentName) => {
  //   const value = props[propName];
  //   if (typeof value === "number" && !isNaN(value)) {
  //     return null;
  //   }
  //   return new TypeError(`${componentName}: ${propName} must be a number`);
  // },
};

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
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

//когда мы работаем с перебрасыванием функций, на верхнем уровне мы делаем функцию куда принимаются определенные переменные, а снизу ее берем из пропсов и добавляем переменные
