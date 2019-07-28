import React, { useState } from "react";
import Autosuggest from "./Autosuggest";
// import { BrowserRouter, Switch, Route, RouteProps } from "react-router-dom";
const TEXT = `The Cardinals used 13 different offensive linemen last season, which is sub-optimal. And if you factor in that center A.Q. Shipley lost the entire 2018 season to a torn ACL, that's 14. No other team has used that many offensive linemen in a season in this millennium. In December, all five of the Cardinals' Week 1 starters were either on the bench or released; the team was using three guys off the practice squad of other teams, or linemen signed off the street. In December alone, Arizona allowed 22 sacks-that's more than the Colts, Saints, and Patriots allowed all season.`;
export default props => {
  const [originalText, setOriginalText] = useState(TEXT);
  const [lang, setLang] = useState("ko");
  const [googleText, setGoogleText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  async function translate() {
    fetch(
      `https://us-central1-customtranslation.cloudfunctions.net/translate?text=${originalText}&lang=${lang}`
    )
      .then(res => res.text())
      .then(setGoogleText);
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3>Original Text</h3>
        <textarea
          style={{ width: 300, height: 600 }}
          value={originalText}
          onChange={e => setOriginalText(e.target.value)}
        />
        <button>save</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* <input
          type="text"
          value={lang}
          onChange={e => setLang(e.target.value)}
        /> */}
        <Autosuggest value={lang} onChange={setLang} />
        <button onClick={translate}>
          google
          <br />
          translate
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3>Auto Translated</h3>
        <textarea
          style={{ width: 300, height: 600 }}
          value={googleText}
          onChange={e => setGoogleText(e.target.value)}
        />
        <button>save</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3>User Translation</h3>
        <textarea
          style={{ width: 300, height: 600 }}
          value={translatedText}
          onChange={e => setTranslatedText(e.target.value)}
        />
        <button>save</button>
      </div>
    </div>
  );
};
