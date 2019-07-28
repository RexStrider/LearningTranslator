import React from "react";
import { NavLink } from "react-router-dom";
export default props => {
  return (
    <div style={{ margin: 10 }}>
      <NavLink style={{ marginLeft: 10 }} to="/">
        Translate
      </NavLink>
      <NavLink style={{ marginLeft: 10 }} to="/previous">
        Previous Translations
      </NavLink>
      <NavLink style={{ marginLeft: 10 }} to="/compile">
        Compile Translator
      </NavLink>
    </div>
  );
};
