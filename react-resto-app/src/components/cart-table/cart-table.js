import React, { Component } from "react";
import "./cart-table.scss";
import { connect } from "react-redux";
import { deleteFromCart } from "../../actions";
import WithRestoService from "../hoc";

class CartTable extends Component {
  render() {
    const { items, deleteFromCart, RestoService } = this.props;
    if (items.length !== 0) {
      return (
        <>
          <CartItem items={items} deleteFromCart={deleteFromCart} />
          <button
            onClick={() => {
              RestoService.setOrder(generateOrder(items));
            }}
            className="order"
          >
            Оформить заказ
          </button>
        </>
      );
    } else {
      return <CartItem items={items} deleteFromCart={deleteFromCart} />;
    }
  }
}
const CartItem = ({ items, deleteFromCart }) => {
  return (
    <>
      {" "}
      <div className="cart__title">Ваш заказ:</div>
      <div className="cart__list">
        {items.map((item) => {
          const { title, price, url, id, qtty } = item;
          return (
            <div key={id} className="cart__item">
              <img src={url} className="cart__item-img" alt={title}></img>
              <div className="cart__item-title">{title}</div>
              <div className="cart__item-price">{price}$</div>
              <div className="cart__item-price">{qtty}</div>
              <div
                onClick={() => {
                  deleteFromCart(id);
                }}
                className="cart__close"
              >
                &times;
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const generateOrder = (items) => {
  const newOrder = items.map((item) => {
    return {
      id: item.id,
      qtty: item.qtty,
    };
  });
  return newOrder;
};

const mapStateToProps = ({ items }) => {
  return {
    items,
  };
};

const mapDispatchToProps = {
  deleteFromCart,
};
export default WithRestoService()(
  connect(mapStateToProps, mapDispatchToProps)(CartTable)
);
