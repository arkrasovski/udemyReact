import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {
  state = {
    selectedItem: null,
    error: false,
    pageNum: 3,
  };
  gotService = new GotService();
  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={async () => {
          return await this.gotService.getAllCharacters(this.state.pageNum);
        }}
        pageNum={this.state.pageNum}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetails} />;
  }
}
