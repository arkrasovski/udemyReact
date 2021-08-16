import React, { Component } from "react";
import GotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class BooksItem extends Component {
  gotService = new GotService();

  render() {
    return (
      <ItemDetails
        className="app"
        itemId={this.props.bookId}
        getData={this.gotService.getBook}
        book={true}
      >
        <Field field="name" label="Name" />
        <Field field="numberOfPages" label="Number of pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </ItemDetails>
    );
  }
}
