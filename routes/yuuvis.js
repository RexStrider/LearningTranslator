// const request = require('request');
// const fs = require('fs');
const axios = require('axios');

module.exports = app => {
    //create
    // app.post('/api/yuuvis/import', async (req, res) => {
    //     const user = "arwaterman@gmail.com";
    //     const password = "yuuvishackathon2019";
    //     const tenant = "default";
    //     const baseUrl = "http://localhost:8000"; //baseUrl of gateway: "http://<host>:<port>"
    //     const auth = "Basic Y2xvdWR1c2VyOmNsb3Vkc2VjcmV0Cg==" + user + ':' + password //clouduser:cloudsecret


    // });

    //read
    app.get('/api/yuuvis/search', async (req, res) => {
        console.log("api yuuvis search route has been hit!");

        const url = 'https://api.yuuvis.io/dms/objects/search';

        const result = await axios({
            url,
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit            
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Ocp-Apim-Subscription-Key": "eddb881a638b4b788982b3425ddd92ec"
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            data: {
                "query": {
                    "statement": "SELECT * FROM enaio:object",
                    "skipCount": 0,
                    "maxItems": 50
                }
            } // body data type must match "Content-Type" header
        });

        console.log(result);

        const data = await result.json();

        console.log(data);

        res.send(data);
    });
    //update
    //delete
}