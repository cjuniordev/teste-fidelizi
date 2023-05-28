import './styles.css';
import logo from '../../assets/logo-fidelizi.png';
import ofertaTeste from '../../assets/oferte-teste.png';
import fidelizi from '../../assets/fidelizi.png';
import fb from '../../assets/fb.svg';
import insta from '../../assets/insta.svg';
import twitter from '../../assets/twitter.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { useState, useEffect } from "react";
import OfferModal from "../../components/OfferModal";
import ShareModal from "../../components/ShareModal";
import offers from "../../api/offers";
import { useParams, redirect } from "react-router-dom";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import CreateClientModal from "../../components/CreateClientModal";

function Ofertas() {
    const [error, setError] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showCreateClient, setShowCreateClient] = useState(false);
    const [offer, setOffer] = useState({
        deadline: undefined,
        company: {
            name: undefined,
        },
        amount: 0,
    });
    const [timeOver, setTimeOver] = useState(false);
    const [soldOut, setSoldOut] = useState(false);

    const { slug, id } = useParams();

    const mountOffer = () => {
        let route = slug + '/' + id;
        offers.get(route).then((response) => {
            let data = response.data;

            setOffer(data);

            if (data.deadline <= 0) {
                setTimeOver(true);
            }

            if (data.amount <= 0) {
                setSoldOut(true);
            }

        }).catch((error) => {
            setError(true); // TODO: handle error
        });
    }

    useEffect(mountOffer, [])

    const handleGetOfferClick = () => {
        setShowOfferModal(true);
    }

    const handleShareClick = () => {
        setShowShareModal(true);
    }

    const scroll = (hidden) => {
        document.body.style.overflow = (hidden ? "hidden" : "auto");
    };

    scroll(showOfferModal || showShareModal || showCreateClient);

    return (
        <>

            { showOfferModal ?
                <OfferModal
                    setShow={setShowOfferModal}
                    setShowCreateClient={setShowCreateClient}
                    offer={offer}
                    onClose={mountOffer}
                /> : null
            }
            { showShareModal ? <ShareModal setShow={setShowShareModal} /> : null }
            { showCreateClient ? <CreateClientModal setShow={setShowCreateClient} companyName={offer.company.name} /> : null }

            <div className="container center-items block-scroll">
                <div className="card">
                    <header className="center-items">
                        <img src={ logo } alt="Fidelizi"/>
                    </header>
                    <main className="card-content">
                        <span className="card-content-demonstration">Demonstração FideliZi</span>
                        <div className="offer">
                            <h1>{ offer?.title }</h1>
                            <div className="offer-content">
                                <div className="offer-left">
                                    <img src={ ofertaTeste } alt="Oferta"/>
                                </div>
                                <div className="offer-right">
                                    <button
                                        className="offer-button"
                                        onClick={handleGetOfferClick}
                                        disabled={ timeOver || soldOut }
                                    >
                                        <span className="offer-button-active">
                                            <FontAwesomeIcon icon={(timeOver || soldOut) ? faX : faCheck} size="lg"/>
                                            { timeOver || soldOut ? 'Oferta indisponível' : 'Ativar Oferta' }
                                        </span>
                                        <span className="offer-button-amount">
                                            <span>{ offer?.amount === null ? 0 : offer?.amount }</span>
                                            <span>disponíveis</span>
                                        </span>
                                    </button>
                                    <button className="button-share" onClick={handleShareClick}>
                                        <FontAwesomeIcon icon={faShare} />
                                        <span>Compartilhar</span>
                                    </button>
                                    <div className="offer-warning">
                                        { timeOver ?
                                            <span className="offer-warning-time">Oferta expirada</span> :
                                            <>
                                                <span>OFERTA DISPONÍVEL POR TEMPO LIMITADO! FALTAM:</span>
                                                <span>
                                                    <FontAwesomeIcon icon={faClock} />
                                                    { offer?.deadline } dias restantes
                                                </span>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="offer-content-footer">
                                { offer?.title }
                            </div>
                        </div>
                        <div className="offer-tutorial">
                            <div className="offer-tutorial-step">
                                <div className="step-number">
                                    1
                                </div>
                                <div className="step-content">
                                    <h2>ATIVE A OFERTA</h2>
                                    <span>
                                        Clique em 'ativar oferta' e se identifique com o seu CPF. Dados pessoais podem ser solicitados.
                                    </span>
                                </div>
                            </div>
                            <div className="offer-tutorial-step">
                                <div className="step-number">
                                    2
                                </div>
                                <div className="step-content">
                                    <h2>VISITE O ESTABELECIMENTO</h2>
                                    <span>
                                        Fique atento ao prazo de validade após a ativação para não perder a oferta.
                                    </span>
                                </div>
                            </div>
                            <div className="offer-tutorial-step">
                                <div className="step-number">
                                    3
                                </div>
                                <div className="step-content">
                                    <h2>RESGATE A OFERTA</h2>
                                    <span>
                                        Informe o seu CPF na área de resgate do Fidelizi e aproveite!
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="rules">
                            <h2>Regras da Oferta</h2>
                            <ul>
                                <li>Oferta exclusiva para clientes novos, não participantes do programa de fidelidade do estabelecimento <strong>Demonstração FideliZi</strong></li>
                                <li>Oferta sujeita à alterações a partir da data de publicação</li>
                                <li>O não comparecimento dentro do prazo estipulado implicará na perda da oferta</li>
                                <li>A oferta estará válida na área de resgate do FideliZi por <strong>15 dias</strong> a partir da ativação</li>
                                <li>Não cumulativo com outras promoções ou ofertas</li>
                                <li>O valor total da oferta deverá ser gasto em uma única visita (não haverá troco ou crédito)</li>
                                <li>Oferta poderá ser ativada apenas uma vez por CPF</li>
                                <li>Válido somente aos finais de semana</li>
                            </ul>
                        </div>
                    </main>
                </div>
                <footer>
                    <div className="card-footer">
                        <div className="card-footer-title">
                            Siga { offer?.company?.name }
                        </div>
                        <div className="social-media">
                            <a href="https://www.facebook.com/FideliZii" target="_blank" rel="noreferrer">
                                <img src={fb} alt="Facebook"/>
                            </a>
                            <a href="https://www.facebook.com/FideliZii" target="_blank" rel="noreferrer">
                                <img src={insta} alt="Instagram"/>
                            </a>
                            <a href="https://twitter.com/fidelizii" target="_blank" rel="noreferrer">
                                <img src={twitter} alt="Twitter"/>
                            </a>
                        </div>
                    </div>
                    <img src={fidelizi} alt="Fidelizi"/>
                </footer>
            </div>
        </>
    );
}

export default Ofertas;