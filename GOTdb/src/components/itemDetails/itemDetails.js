import React, { useState, useEffect } from "react";
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

function ItemDetails({ itemId, getData, children, book }) {
  const [item, updateItemState] = useState(null);
  const [loading, updateLoading] = useState(true);
  const [error, updateError] = useState(false);

  useEffect(() => {
    updateItem();
  }, [itemId]);

  function updateItem() {
    if (!itemId) {
      return;
    }

    updateLoading(true);
    getData(itemId)
      .then((item) => {
        updateItemState(item);
        updateLoading(false);
      })
      .catch(() => onError());
  }
  function onError() {
    updateItemState(null);
    updateError(true);
    updateLoading(false);
  }

  if (!item && error) {
    return <ErrorMessage />;
  } else if (!item) {
    if (book) {
      return <Spinner />;
    } else {
      return <span className="select-error">Please select a character</span>;
    }
  }

  let { name } = item;

  if (loading) {
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
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { item }); //Добавляет детям char
        })}
      </ul>
    </ItemDetailsBlock>
  );
}
export default ItemDetails;
