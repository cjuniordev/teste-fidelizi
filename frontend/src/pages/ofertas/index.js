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
import { useState } from "react";
import OfferModal from "../../components/OfferModal";
import ShareModal from "../../components/ShareModal";

function Ofertas() {
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    const handleGetOfferClick = () => {
        setShowOfferModal(true);
    }

    const handleShareClick = () => {
        setShowShareModal(true);
    }

    const blockScroll = () => {
        document.body.style.overflow = "hidden";
    };

    return (
        <>
            { (showOfferModal || showShareModal) ? blockScroll() : null }
            { showOfferModal ? <OfferModal setShow={setShowOfferModal} /> : null }
            { showShareModal ? <ShareModal setShow={setShowShareModal} /> : null }

            <div className="container center-items block-scroll">
                <div className="card">
                    <header className="center-items">
                        <img src={ logo } alt="Fidelizi"/>
                    </header>
                    <main className="card-content">
                        <span className="card-content-demonstration">Demonstração FideliZi</span>
                        <div className="offer">
                            <h1>20% de desconto na compra de qualquer hamburguer</h1>
                            <div className="offer-content">
                                <div className="offer-left">
                                    <img src={ ofertaTeste } alt="Oferta"/>
                                </div>
                                <div className="offer-right">
                                    <button className="offer-button" onClick={handleGetOfferClick}>
                                        <span className="offer-button-active">
                                            <FontAwesomeIcon icon={faCheck} size="lg"/>
                                            Ativar Oferta
                                        </span>
                                        <span className="offer-button-amount">
                                            <span>100</span>
                                            <span>disponíveis</span>
                                        </span>
                                    </button>
                                    <button className="button-share" onClick={handleShareClick}>
                                        <FontAwesomeIcon icon={faShare} />
                                        <span>Compartilhar</span>
                                    </button>
                                    <div className="offer-warning">
                                        <span>OFERTA DISPONÍVEL POR TEMPO LIMITADO! FALTAM:</span>
                                        <span>
                                            <FontAwesomeIcon icon={faClock} />
                                            172 dias restantes
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="offer-content-footer">
                                20% de desconto na compra de qualquer hamburguer
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
                            Siga Demonstração FideliZi
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