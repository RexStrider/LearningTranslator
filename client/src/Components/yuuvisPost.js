export const metadataFileGenerator = hashtags => {
  const javascript = {
    objects: [
      {
        properties: {
          "enaio:objectTypeId": {
            value: "document"
          },
          Name: {
            value: "test import"
          },
          tags: {
            value: hashtags
          }
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

export const uploadFile = (text, hashtags) => {
  const formData = new FormData();
  formData.append("data", metadataFileGenerator(hashtags), "metadata");
  formData.append("cid_63apple", textFileGenerator(text), "contentdata");
  return fetch("https://api.yuuvis.io/dms/objects", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "no-cors", // no-cors, cors, *same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Ocp-Apim-Subscription-Key": "eddb881a638b4b788982b3425ddd92ec"
      // "Content-Type": "multipart/form-data"
      // "Content-Type": "application/x-www-form-urlencoded"
    },
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
    body: formData
  });
};
