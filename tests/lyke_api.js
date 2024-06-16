const Axios = require('axios');

const namespace = 'infovacanta-react';
const id = 'review-612';
const token = 'pt_49ef1b9862ddcdc97d841106b33e79';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

Axios.get(`http://api.lyket.dev/v1/like-buttons/${namespace}/${id}`, config)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));