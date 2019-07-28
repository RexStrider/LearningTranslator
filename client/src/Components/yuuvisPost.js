export const metadataFileGenerator = ({
  Name,
  tags,
  originalLang,
  targetLang
}) => {
  const javascript = {
    objects: [
      {
        properties: {
          "enaio:objectTypeId": {
            value: "document"
          },
          Name: { value: Name },
          tags: { value: tags },
          originalLang: { value: originalLang },
          targetLang: { value: targetLang }
        },
        contentStreams: [
          {
            cid: "cid_63apple"
          }
        ]
      }
    ]
  };
  const file = new Blob([JSON.stringify(javascript)], {
    type: "application/json"
  });
  return file;
};
export const textFileGenerator = text => {
  const file = new Blob([text], { type: "text/plain" });
  return file;
};

export const uploadOriginalFile = (text, metadata) => {
  const formData = new FormData();
  formData.append("data", metadataFileGenerator(metadata), "metadata");
  formData.append("cid_63apple", textFileGenerator(text), "contentdata");
  return fetch("https://api.yuuvis.io/dms/objects", {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": "eddb881a638b4b788982b3425ddd92ec"
    },
    body: formData
  });
};

export const updateOriginalFile = (docId, text, metadata) => {
  const formData = new FormData();
  formData.append("data", metadataFileGenerator(metadata), "metadata");
  formData.append("cid_63apple", textFileGenerator(text), "contentdata");
  return fetch("https://api.yuuvis.io/dms/objects", {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": "eddb881a638b4b788982b3425ddd92ec"
    },
    body: formData
  });
};

export const search = () => {
  return fetch(
    `https://us-central1-customtranslation.cloudfunctions.net/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: {
          statement: "SELECT * FROM enaio:object",
          skipCount: 0,
          maxItems: 50
        }
      })
    }
  );
};
