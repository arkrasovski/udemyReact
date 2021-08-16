import React, { Component } from "react";
import styled from "styled-components";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;

  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;
const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  }; //создали state потому что постоянно будет обновляться

  componentDidMount() {
    this.updateChar(); //когда создается объект класса, обновляется эта функция
    this.timerId = setInterval(this.updateChar, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false }); //когда загрузилось, убираем спиннер
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    let { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <RandomBlock className="rounded">
        {errorMessage}
        {spinner}
        {content}
      </RandomBlock>
    );
  }
}

const View = ({ char }) => {
  let { name, gender, born, died, culture } = char;
  function isThere(prop) {
    if (prop === "") {
      return "Неизвестно";
    } else {
      return prop;
    }
  }
  name = isThere(name);
  gender = isThere(gender);
  born = isThere(born);
  died = isThere(died);
  culture = isThere(culture);

  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
