function getBaseURL() {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;

    return `${protocol}//${host}:${port}/dossierWizard`;
}

function setEndpoint(transactionId, callback) {
    const baseURL = getBaseURL();
    const req = new XMLHttpRequest();
    const url = `${baseURL}/setEndpoint/${transactionId}`;
    const endpoint = "http://localhost:8080";

    req.open("POST", url, true);
    req.onload = function (oEvent) {
        callback();
    };

    req.send(endpoint);
}


export default class DossierBuilder {
    constructor() {
    }

    getTransactionId(callback) {
        const baseURL = getBaseURL();
        const req = new XMLHttpRequest();

        const url = `${baseURL}/begin`;

        req.open("POST", url, true);
        req.onload = function (oEvent) {
            callback(undefined, req.response);
        };

        req.send();
    }

    setSeedKey(transactionId, seedKey, callback) {
        const baseURL = getBaseURL();
        const req = new XMLHttpRequest();
        const url = `${baseURL}/setSeedKey/${transactionId}`;

        req.open("POST", url, true);
        req.onload = function (oEvent) {
            callback();
        };

        req.send(seedKey);
    }

    addFileDataToDossier(transactionId, fileName, fileData, callback) {

        const req = new XMLHttpRequest();
        const url = `${getBaseURL()}/addFile/${transactionId}`;
        req.open("POST", url, true);
        req.setRequestHeader("x-dossier-path", fileName);
        req.onload = function (oEvent) {
            callback();
        };

        req.send(fileData);
    }


    buildDossier(transactionId, callback) {
        setEndpoint(transactionId, (err) => {
            if (err) {
                return callback(err);
            }

            const baseURL = getBaseURL();
            const req = new XMLHttpRequest();
            const url = `${baseURL}/build/${transactionId}`;

            req.open("POST", url, true);
            req.onload = function (oEvent) {
                callback(undefined, req.response);
            };

            req.send();
        });
    }
}