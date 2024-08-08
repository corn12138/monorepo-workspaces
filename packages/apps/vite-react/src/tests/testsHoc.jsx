import React from "react";
import withDataFetching from "../hoc/withDataFetching"; // hoc

const DateDisplay = ({ data, loading, error }) => {
  return /*#__PURE__*/React.createElement("div", null, loading && "Loading...", error || !data ? error : data.map((date, index) => /*#__PURE__*/React.createElement("div", {
    key: index
  }, date.date)));
}