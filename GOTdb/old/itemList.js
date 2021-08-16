import React, { Component } from "react";
import styled, { ThemeConsumer } from "styled-components";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from "prop-types";
const ItemListBlock = styled.ul`
  cursor: pointer;
`;

export default class ItemList extends Component {
  gotService = new GotService();

  state = {
    itemList: null,
    loading: true,
    error: false,
    pageNum: null,
  };

  componentDidMount() {
    const { getData, pageNum } = this.props;

    this.setState({
      loading: true,
      pageNum: pageNum,
    });
    getData()
      .then((itemList) => {
        this.setState({
          itemList,
          loading: false,
        });
      })
      .catch(() => this.onError());
  }
  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }
  renderItems(arr) {
    return arr.map((item, i) => {
      const label = this.props.renderItem(item);
      return (
        <li
          key={(this.state.pageNum - 1) * 10 + 1 + i}
          className="list-group-item"
          onClick={() => {
            this.props.onItemSelected((this.state.pageNum - 1) * 10 + 1 + i);
          }}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList, loading, error } = this.state;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorMessage />;
    }

    const items = this.renderItems(itemList);

    return <ItemListBlock>{items}</ItemListBlock>;
  }
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
};
