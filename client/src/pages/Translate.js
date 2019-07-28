import React, { useState } from "react";
import Autosuggest from "./Autosuggest";
import {
  uploadOriginalFile,
  updateOriginalFile
} from "../Components/yuuvisPost";
import Meta from "./Meta";
// import { BrowserRouter, Switch, Route, RouteProps } from "react-router-dom";
const TEXT = `The Cardinals used 13 different offensive linemen last season, which is sub-optimal. And if you factor in that center A.Q. Shipley lost the entire 2018 season to a torn ACL, that's 14. No other team has used that many offensive linemen in a season in this millennium. In December, all five of the Cardinals' Week 1 starters were either on the bench or released; the team was using three guys off the practice squad of other teams, or linemen signed off the street. In December alone, Arizona allowed 22 sacks-that's more than the Colts, Saints, and Patriots allowed all season.`;
export default props => {
  const [docIds, setDocIds] = useState([null, null, null]);
  const [originalText, setOriginalText] = useState(TEXT);
  const [meta, setMeta] = useState("football, sports, news, article");
  const [lang, setLang] = useState("ko");
  const [title, setTitle] = useState("Football Article");
  const [googleText, setGoogleText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  async function translate() {
    fetch(
      `https://us-central1-customtranslation.cloudfunctions.net/translate?text=${originalText}&lang=${lang}`
    )
      .then(res => res.text())
      .then(setGoogleText);
  }
  async function updateOriginal() {
    updateOriginalFile(docIds[0], {
      autoTranslate: docIds[1],
      manualTranslate: docIds[2]
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }
  async function uploadOriginal() {
    console.log(meta);
    uploadOriginalFile(originalText, {
      name: title,
      tags: meta,
      originalLang: "en",
      targetLang: lang
    })
      .then(res => res.json())
      .then(r =>
        setDocIds([
          r.objects[0].properties["enaio:objectId"].value,
          docIds[1],
          docIds[2]
        ])
      )
      .then(console.log)
      .catch(console.error);
  }
  async function uploadAuto() {
    uploadOriginalFile(googleText, {
      name: `${title}-auto`,
      tags: meta,
      originalLang: "en",
      targetLang: lang
    })
      .then(res => res.json())
      .then(r =>
        setDocIds([
          docIds[0],
          r.objects[0].properties["enaio:objectId"].value,
          docIds[2]
        ])
      )
      .then(console.log)
      .then(updateOriginal)
      .catch(console.error);
  }
  async function uploadManual() {
    uploadOriginalFile(translatedText, {
      name: `${title}-manual`,
      tags: meta,
      originalLang: "en",
      targetLang: lang
    })
      .then(res => res.json())
      .then(r =>
        setDocIds([
          docIds[0],
          docIds[1],
          r.objects[0].properties["enaio:objectId"].value
        ])
      )
      .then(console.log)
      .then(updateOriginal)
      .catch(console.error);
  }
  return (
    <section style={{ padding: 10 }}>
      <h1>
        Title:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginLeft: 20 }}
        />
      </h1>
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
            style={{ width: 300, height: 400 }}
            value={originalText}
            onChange={e => setOriginalText(e.target.value)}
          />
          <Meta meta={meta} setMeta={setMeta} originalText={originalText} />
          <button style={{ marginTop: 10 }} onClick={uploadOriginal}>
            save
          </button>
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
          <button style={{ marginTop: 10 }} onClick={uploadAuto}>
            save
          </button>
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
          <button style={{ marginTop: 10 }} onClick={uploadManual}>
            save
          </button>
        </div>
      </div>
    </section>
  );
};
