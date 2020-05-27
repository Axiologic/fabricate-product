function getBaseURL() {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${host}:${port}/dossierWizard`;
}

function setEndpoint(transactionId, callback) {
    const url = `/setEndpoint/${transactionId}`;
    const endpoint = "http://localhost:8080";
    doPost(url, endpoint, callback);
}

function doPost(url, data, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    if (typeof data === "object" && !Buffer.isBuffer(data)) {
        options = data;
        data = undefined;
    }

    if (typeof data === "function") {
        callback = data;
        options = {};
        data = undefined;
    }

    const baseURL = getBaseURL();
    url = `${baseURL}${url}`;
    fetch(url, {
        method: 'POST',
        headers: options.headers,
        body: data
    }).then((response) => {
        return response.text().then((data) => {
            if (!response.ok) {
                throw new Error(`Post request failed.`);
            }
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (e) {
                return callback(undefined, data);
            }
            callback(undefined, jsonData);
        })
    }).catch(err => {
        return callback(err);
    });
}

export default class DossierBuilder {
    constructor() {
    }

    getTransactionId(callback) {
        doPost("/begin", callback)
    }

    setSeedKey(transactionId, seedKey, callback) {
        const url = `/setSeedKey/${transactionId}`;
        doPost(url, seedKey, callback);

    }

    addFileDataToDossier(transactionId, fileName, fileData, callback) {
        const url = `/addFile/${transactionId}`;
        doPost(url, fileData, {headers: {"x-dossier-path": fileName}}, callback);

    }


    buildDossier(transactionId, callback) {
        setEndpoint(transactionId, (err) => {
            if (err) {
                return callback(err);
            }

            const url = `/build/${transactionId}`;
            doPost(url, callback);
        });
    }
}