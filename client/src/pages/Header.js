import React from "react";
import { NavLink } from "react-router-dom";
import '../App.css';
export default props => {
  return (
    <div style={{ margin: 10 }} >
      <img className="Background-image" src={require('../images/LearningTranslatorLogo.png')} alt={"Learning Translator Logo"} />
      <NavLink style={{ marginLeft: 10 }} className="Menu-Item" to="/">
        Translate
      </NavLink>
      <NavLink style={{ marginLeft: 10 }} className="Menu-Item" to="/previous">
        Previous Translations
      </NavLink>
      <NavLink style={{ marginLeft: 10 }} className="Menu-Item" to="/compile">
        Compile Translator
      </NavLink>
    </div>
  );
};
