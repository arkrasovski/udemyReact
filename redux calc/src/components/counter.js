import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { bindActionCreators } from "redux";

const Counter = ({ counter, inc, dec, rnd, res }) => {
  return (
    <div class="jumbotron">
      <div class="wrapper">
        <div class="counterBlock">
          <h1>{counter}</h1>
        </div>

        <div class="Btns">
          <button onClick={inc} className="btn btn-inc btn-primary">
            inc{" "}
          </button>
          <button onClick={dec} className="btn-dec btn btn-primary">
            dec
          </button>
          <button onClick={res} className="btn-res btn btn-primary">
            res
          </button>
          <button onClick={rnd} className="btn-dec btn btn-primary">
            rnd
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    counter: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, actions)(Counter);
