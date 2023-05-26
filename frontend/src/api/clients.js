import api from "./axios";

const endpoint = 'clients/';

const clients = {
    getOffer: async (cpf, offerId) => {
        await api.post(endpoint + cpf, {
            'offer_id': offerId,
        });
    },
}

export default clients;