import api from "./axios";

const endpoint = 'offers/';

const offers = {
    get: (id) => api.get(endpoint + id),
}

export default offers;