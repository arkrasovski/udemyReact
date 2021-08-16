import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import App from "./components/app";

const store = createStore(reducer);
// store.subscribe(() => {
//   console.log(store.getState());
// });

// const bindActionCreator =
//   (creator, dispatch) =>
//   (...args) => {
//     dispatch(creator(...args));
//   };

// const update = () => {
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// };
// update();
// store.subscribe(update);
// store.dispatch({ type: "INC" });
// store.dispatch({ type: "INC" });
// store.dispatch({ type: "INC" });
// let state = reducer(undefined, {});
// state = reducer(state, { type: "INC" });
// console.log(state);
// state = reducer(state, { type: "INC" });
// console.log(state);
