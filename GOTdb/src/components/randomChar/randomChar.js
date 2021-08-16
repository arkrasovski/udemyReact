import React, { useState, useEffect } from "react";
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

function RandomChar({ interval }) {
  const gotService = new GotService();

  const [char, updateCharState] = useState({});
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(false);

  useEffect(() => {
    updateChar();
    let timerId = setInterval(updateChar, interval);
    return () => {
      clearInterval(timerId); //выполнится если unmount
    };
  }, []);

  // componentDidMount() {
  //   this.updateChar(); //когда создается объект класса, обновляется эта функция
  //   this.timerId = setInterval(this.updateChar, this.props.interval);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

  function onCharLoaded(char) {
    //когда загрузилось, убираем спиннер
    updateCharState(char);
    updateLoading(false);
    updateError(false);
  }

  function onError() {
    updateLoading(false);
    updateError(true);
  }

  function updateChar() {
    const id = Math.floor(Math.random() * 140 + 25);
    gotService
      .getCharacter(id)
      .then(onCharLoaded)
      .catch(onError);
  }

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

const View = ({ char }) => {
  let { name, gender, born, died, culture } = char;

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

export default RandomChar;
