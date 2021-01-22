import React from "react";
import "./css/style.css";
const formCompo = (props) => {
  return (
    <div className="container">
    <div>
        {props.error? err():null}
    </div>
     <form onSubmit={props.loadweather}>
     <div className="row">
        <div className="col-md-3 offset-md-2">
          <input
            type="text"
            className="form-control"
            name="city"
            autoComplete="off"
            placeholder="city"
          />
        </div>
        <div className="col-md-3 mt-md-0 text-md-left">
          <input
            type="text"
            className="form-control"
            name="country"
            autoComplete="off"
            placeholder="country"
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-warning py-2">Get Weather</button>
        </div>
      </div>
     </form>
    </div>
  );
};

function err() {
    return(
        <div className="alert alert-danger mx-5" role="alert">Please Enter City and Country</div>
    )
}
export default formCompo;
