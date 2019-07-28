import React, { useEffect } from "react";
import KeywordExtractor from "keyword-extractor";

const computeMetaData = keywords => {
  let meta = {};
  keywords.forEach(keyword => {
    meta[keyword] ? (meta[keyword] += 1) : (meta[keyword] = 1);
  });

  const keys = Object.keys(meta);

  const displayMeta = keys.map(key => {
    return `${key} (${meta[key]})`;
  });

  return displayMeta;
};

const Meta = ({ meta, setMeta, originalText }) => {
  const extractionResult = KeywordExtractor.extract(originalText, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  });

  const metaData = computeMetaData(extractionResult);

  useEffect(() => {
    const updateMeta = data => {
      setMeta(data);
    };

    updateMeta(metaData);
  }, [metaData, setMeta]);

  return (
    <div>
      <h4>Metadata</h4>
      <textarea
        style={{ width: 300, height: 100 }}
        value={meta}
        onChange={setMeta}
      />
    </div>
  );
};

export default Meta;
