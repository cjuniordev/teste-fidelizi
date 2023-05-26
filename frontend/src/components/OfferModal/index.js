import Modal from "../Modal/index";
import { useState } from "react";
import clients from "../../api/clients";
import './style.css';
import Swal from 'sweetalert2';

function OfferModal({ setShow, offer, onClose }) {
    const [cpf, setCpf] = useState('');
    const [cpfIsValid, setCpfIsValid] = useState(false);
    
    const getOffer = async () => {
        let result = {};
        await clients.getOffer(cpf.replace(/\D/g, ""), offer?.id).then((response) => {
            result = {
                title: 'Oferta Ativada!',
                text: 'Uma mensagem foi enviada para o seu email com o link da oferta.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }
        }).catch((error) => {
            let message = error?.response?.data?.message;

            if (message === null) {
                message = `Esta oferta é destinada apenas para novos participantes do programa de fidelidade de ${offer?.company?.name}.`;
            }

            result = {
                title: 'Oops!',
                text: message,
                icon: 'error',
                confirmButtonText: 'Ok'
            }
        });

        await Swal.fire(result);
        setShow(false);
        onClose();
    };

    const handleCpfIsValid = (cpf) => {
        let clearedCpf = cpf.replace(/\D/g, ""); // Remove all non-numeric characters

        if (clearedCpf.length !== 11) {
            setCpfIsValid(false)
            return;
        }

        if (clearedCpf === "00000000000") {
            setCpfIsValid(false)
            return;
        }

        // TODO: Check if CPF is valid

        setCpfIsValid(true)
    };

    const formatCpf = (event) => {
        let formatted = event.target.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        handleCpfIsValid(formatted);

        setCpf(formatted);
    };

    return (
        <Modal
            title="ATIVE SUA OFERTA"
            main={
                <>
                    <p className="main-text">Para ativar a oferta, digite seu CPF para identificação.</p>
                    <input type="text" className="main-input" value={cpf} onChange={formatCpf} placeholder='___.___.___-__'/>
                </>
            }
            footer={
                <button
                    className="footer-button"
                    disabled={!cpfIsValid}
                    onClick={getOffer}
                >
                    Continuar
                </button>
            }
            setShow={setShow}
        />
    )
}

export default OfferModal;