import Modal from "../Modal/index";
import {useState} from "react";
import './style.css';

function OfferModal({ setShow }) {
    const [cpf, setCpf] = useState('');
    const [cpfIsValid, setCpfIsValid] = useState(false);

    const formatCpf = (event) => {
        let formatted = event.target.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

        setCpfIsValid(handleCpfIsValid(formatted));

        setCpf(formatted);
    };

    const handleCpfIsValid = () => {

        const getRest = () => {
            rest = (sum * 10) % 11;
        }

        const clearRest = () => {
            if (
                (rest === 10) ||
                (rest === 11)
            ) rest = 0;
        };

        let copyCpf = cpf.replace(/\D/g, "");

        if (copyCpf.length !== 11) return false;

        if (copyCpf === "00000000000") return false;

        let sum = 0;
        let rest;

        for (let i=1; i<=9; i++) {
            sum = sum + parseInt(copyCpf.substring(i -1, i)) * (11 - i)
        }

        getRest();
        clearRest();
        console.log(copyCpf);
        if (rest !== parseInt(copyCpf.substring(9, 10))) return false;

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(copyCpf.substring(i -1, i)) * (12 - i)
        }

        getRest();
        clearRest();

        return rest === parseInt(copyCpf.substring(10, 11));
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
                    disabled={handleCpfIsValid}
                >
                    Continuar
                </button>
            }
            setShow={setShow}
        />
    )
}

export default OfferModal;