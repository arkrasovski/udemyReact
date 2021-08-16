import React, { useState, useEffect } from "react";
import styled, { ThemeConsumer } from "styled-components";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from "prop-types";
const ItemListBlock = styled.ul`
  cursor: pointer;
`;

function ItemList({ getData, onItemSelected, renderItem, pageNum }) {
  const [itemList, updateList] = useState([]);
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(false);

  useEffect(() => {
    getData()
      .then((itemList) => {
        updateLoading(false);
        updateList(itemList);
      })
      .catch(() => onError());
  }, []);

  // componentDidMount() {

  //   this.setState({
  //     loading: true,
  //     pageNum: pageNum,
  //   });
  //   getData()
  //     .then((itemList) => {
  //       this.setState({
  //         itemList,
  //         loading: false,
  //       });
  //     })
  //     .catch(() => this.onError());
  // }
  function onError() {
    updateLoading(false);
    updateError(true);
  }
  function renderItems(arr) {
    return arr.map((item, i) => {
      const label = renderItem(item);
      return (
        <li
          key={(pageNum - 1) * 10 + 1 + i}
          className="list-group-item"
          onClick={() => {
            onItemSelected((pageNum - 1) * 10 + 1 + i);
          }}
        >
          {label}
        </li>
      );
    });
  }

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  const items = renderItems(itemList);

  return <ItemListBlock>{items}</ItemListBlock>;
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
};
export default ItemList;
