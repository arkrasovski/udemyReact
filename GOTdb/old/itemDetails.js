import React, { Component } from "react";

import styled from "styled-components";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
const ItemDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;

  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    } //сравниваем совпадение предыдущих пропсов и текущих
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.setState({
      loading: true,
    });
    const { getData } = this.props;

    getData(itemId)
      .then((item) => {
        this.setState({ item, loading: false });
      })
      .catch(() => this.onError());
  }
  onError() {
    this.setState({
      item: null,
      error: true,
    });
  }
  render() {
    if (!this.state.item && this.state.error) {
      return <ErrorMessage />;
    } else if (!this.state.item) {
      return <span className="select-error">Please select a character</span>;
    }
    const { item } = this.state;
    let { name } = item;

    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner />
        </div>
      );
    }

    return (
      <ItemDetailsBlock className="rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item }); //Добавляет детям char
          })}
        </ul>
      </ItemDetailsBlock>
    );
  }
}
