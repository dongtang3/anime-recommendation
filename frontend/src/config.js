// src/config.js

let apiEndpoint;

if (process.env.NODE_ENV === 'development') {
    apiEndpoint = 'http://localhost:4000/dev/';  // Local serverless-offline endpoint
} else {
    apiEndpoint = ''; // AWS Lambda endpoint
}

export const API_ENDPOINT = apiEndpoint;

