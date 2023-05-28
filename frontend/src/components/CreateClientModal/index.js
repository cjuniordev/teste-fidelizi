import Modal from "../Modal/index";
import { useState } from "react";
import clients from "../../api/clients";
import './style.css';
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons/faGreaterThan";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {mask_cpf} from "../../helpers/masks";
import {only_numbers} from "../../helpers/utils";

function CreateClientModal({ setShow, companyName }) {
    const [cpf, setCpf] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        cpf: null,
        password: null,
    });

    const handleInput = (e) => {
        let { name, value } = e.target;

        if (name === 'cpf') {
            value = mask_cpf(value);
        }

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;

        setErrors({
            name: null,
            email: null,
            cpf: null,
            password: null,
        });

        let loadingModal = Swal.fire({
            title: 'Aguarde um momento!',
            text: 'Estamos te cadastrando no sistema.',
            backdrop: false,
        })

        Swal.showLoading();

        let result = {};
        let data = {
            'cpf': only_numbers(form.cpf),
            'user': {
                'name': form.name,
                'email': form.email,
                'password': form.password,
            }
        };

        await clients.post(data).then((response) => {
            result = {
                title: 'Cadastro feito!',
                text: 'Aproveite as ofertas em nosso site.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }
        }).catch((error) => {
            let response = error?.response;

            if (response?.status === 422) {
                hasError = true;
                let dataErrors = response?.data?.errors;

                setErrors({
                    name: dataErrors['user.name'] ? dataErrors['user.name'][0] : null,
                    email: dataErrors['user.email'] ? dataErrors['user.email'][0] : null,
                    cpf: dataErrors['cpf'] ? dataErrors['cpf'][0] : null,
                    password: dataErrors['user.password'] ? dataErrors['user.password'][0] : null,
                });

                return;
            }

            let message = 'Ocorreu um erro ao cadastrar.';

            result = {
                title: 'Oops!',
                text: message,
                icon: 'error',
                confirmButtonText: 'Ok'
            }
        });

        Swal.hideLoading();
        loadingModal.close();

        if (! hasError) {
            await Swal.fire(result).then((isConfirmed) => {
                if (isConfirmed) {
                    window.location.reload();
                }
            });
        }
    }

    return (
        <Modal
            title="ATIVE SUA OFERTA"
            main={
                <>
                    <p className="main-text">
                        Para ativar esta oferta, é necessário
                        <strong className="text-purple"> participar </strong>
                        do Fidelizi em <a className="text-purple company" href="#">{ companyName }</a> !
                    </p>
                    <span className="text-description">
                        Preencha os campos abaixo para participar!
                    </span>
                    <div className="form">
                        <div className="form-group">
                            <h5>Dados Essenciais</h5>
                            <div className="inputs">
                                <div className="input-group">
                                    <label htmlFor="name">
                                        Nome completo <span className="required">(Obrigatório)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleInput}
                                        value={form.name}
                                    />
                                    {
                                        errors.name ? (
                                            <span className="error">
                                                { errors.name }
                                            </span>
                                        ) : null
                                    }
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">
                                        Email <span className="required">(Obrigatório)</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleInput}
                                        value={form.email}
                                    />
                                    {
                                        errors.email ? (
                                            <span className="error">
                                                { errors.email }
                                            </span>
                                        ) : null
                                    }
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cpf">
                                        CPF <span className="required">(Obrigatório)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        onChange={handleInput}
                                        value={form.cpf}
                                    />
                                    {
                                        errors.cpf ? (
                                            <span className="error">
                                                { errors.cpf }
                                            </span>
                                        ) : null
                                    }
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">
                                        Senha <span className="required">(Obrigatório)</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleInput}
                                        value={form.password}
                                    />
                                    {
                                        errors.password ? (
                                            <span className="error">
                                                { errors.password }
                                            </span>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            footer={
                <div className="footer">
                    <button
                        className="footer-button"
                        onClick={handleSubmit}
                    >
                        Continuar <FontAwesomeIcon icon={faGreaterThan} size="sm" />
                    </button>
                    <span className="policies">
                        Ao participar você concorda e aceita os <span>termos de uso</span> e políticas de <span>privacidade</span> do Fidelizi
                    </span>
                </div>
            }
            setShow={setShow}
        />
    )
}

export default CreateClientModal;