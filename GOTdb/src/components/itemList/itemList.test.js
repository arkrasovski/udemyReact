import React from "react";
import ItemList from "./itemList";
import { mount } from "enzyme";
import gotService from "../../services/gotService";
describe("Testing <ItemList/>", () => {
  const service = new gotService();
  const list = mount(
    <ItemList
      getData={service.getAllHouses}
      renderItem={({ name }) => 
        name;
      }
    />
  );
  it('click on item list must renderer all list in 1 instance', () => {
      list.setState({itemList: [{name: 'ivan', id: '1'}, {name: 'matvey', id: '2'}]})
      list.find('.list-group-item:first-child').simulate('click');
      expect(list.find('ul')).toHaveLength(1);
  });
});
