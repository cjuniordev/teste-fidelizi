import api from "./axios";

const endpoint = 'clients/';

const clients = {
    post: (cpf, offerId) => {
        api.post(endpoint + cpf, {
            'offer_id': offerId,
        });
    },
}

export default offers;