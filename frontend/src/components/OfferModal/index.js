import Modal from "../Modal/index";
import { useState } from "react";
import clients from "../../api/clients";
import './style.css';
import Swal from 'sweetalert2';
import CreateClientModal from "../CreateClientModal";
import { mask_cpf } from "../../helpers/masks";
import {validate_cpf} from "../../helpers/utils";

function OfferModal({ setShow, offer, onClose, showCreateClient, setShowCreateClient }) {
    const [cpf, setCpf] = useState('');
    const [cpfIsValid, setCpfIsValid] = useState(false);
    
    const getOffer = async () => {

        if(! cpfIsValid){
            await Swal
                .fire({
                    title: 'CPF inválido!',
                    text: 'Por favor, insira um CPF válido para continuar.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });

            return;
        }

        let loadingModal = Swal.fire({
            title: 'Aguarde um momento!',
            text: 'Estamos ativando sua oferta.',
            backdrop: false,
        })
        let createClientModal = false;

        Swal.showLoading();

        let result = {};
        await clients.getOffer(cpf.replace(/\D/g, ""), offer?.id).then((response) => {
            result = {
                title: 'Oferta Ativada!',
                text: 'Uma mensagem foi enviada para o seu email com o link da oferta.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }
        }).catch((error) => {
            let statusCode = error?.response?.status;

            let message = error?.response?.data?.message;
            let confimButtonText = 'Ok';

            if (statusCode === 404) {
                createClientModal = true;
                message = "Você ainda não está cadastrado no programa de fidelidade da empresa. Por favor, cadastre-se para ativar a oferta.";
                confimButtonText = 'Cadastrar Agora';
            }

            if (message === null) {
                message = `Esta oferta é destinada apenas para novos participantes do programa de fidelidade de ${offer?.company?.name}.`;
            }

            result = {
                title: 'Oops!',
                text: message,
                icon: 'error',
                confirmButtonText: confimButtonText,
                backdrop: false,
            }
        });

        Swal.hideLoading();
        loadingModal.close();

        await Swal
            .fire(result)
            .then((isConfirmed) => {
                if (createClientModal) {
                    setShowCreateClient(true);
                }
            });

        setShow(false);
        onClose();
    };

    const handleCpf = (event) => {
        let formatted = mask_cpf(event.target.value);

        let cpfIsValid = validate_cpf(formatted);
        setCpfIsValid(cpfIsValid);

        setCpf(formatted);
    };

    const handleEnter = (event) => {
        let enterPressed = event.keyCode === 13;

        if(enterPressed){
            event.preventDefault();

            getOffer();
        }
    }

    return (
        <>
            { showCreateClient ? <CreateClientModal setShow={setShowCreateClient} /> : null }

            <Modal
                title="ATIVE SUA OFERTA"
                main={
                    <>
                        <p className="main-text">Para ativar a oferta, digite seu CPF para identificação.</p>
                        <input
                            type="text"
                            className="main-input"
                            value={cpf}
                            onChange={handleCpf}
                            onKeyUp={handleEnter}
                            placeholder='___.___.___-__'
                        />
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
        </>
    )
}

export default OfferModal;