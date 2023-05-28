import api from "./axios";

const endpoint = 'clients/';

const clients = {
    getOffer: async (cpf, offerId) => {
        await api.post(endpoint + 'getOffer/' + cpf, {
            'offer_id': offerId,
        });
    },
    post: async (data) => {
        await api.post(endpoint, data)
    },
}

export default clients;