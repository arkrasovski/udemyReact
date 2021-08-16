import React, { Component } from "react";
import ItemList from "../itemList";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import { withRouter } from "react-router-dom";

class BooksPage extends Component {
  state = {
    error: false,
    pageNum: 1, //1 и нельзя менять! потому что их всего 10 штук
  };
  gotService = new GotService();

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(`/books/${itemId}`);
        }}
        getData={this.gotService.getAllBooks}
        pageNum={this.state.pageNum}
        renderItem={({ name }) => name}
      />
    );
  }
}
export default withRouter(BooksPage);
