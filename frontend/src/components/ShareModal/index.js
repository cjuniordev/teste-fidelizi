import Modal from "../Modal";
import { BsFacebook, BsLinkedin, BsWhatsapp } from "react-icons/bs";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import SocialMediaButton from "../SocialMediaButton";

function ShareModal({ setShow }) {
    return (
        <Modal
            title="COMPARTILHE ESSA OFERTA"
            main={
                <div className="wrap-social-media">
                    <div className="social-media-row">
                        <SocialMediaButton
                            icon={<BsWhatsapp />}
                            color={'#8eb936'}
                            link="https://api.whatsapp.com/send?text=ofertas.fidelizii.com.br//demonstracao-fidelizi/901"
                        />
                        <SocialMediaButton
                            icon={<BsFacebook />}
                            color={'#1877f2'}
                            link="https://www.facebook.com/sharer/sharer.php?u=ofertas.fidelizii.com.br//demonstracao-fidelizi/901"
                        />
                    </div>
                    <div className="social-media-row">
                        <SocialMediaButton
                            icon={<BsLinkedin />}
                            color={'#007bb5'}
                            link="https://www.linkedin.com/cws/share?url=ofertas.fidelizii.com.br//demonstracao-fidelizi/901"
                        />
                        <SocialMediaButton
                            icon={<FontAwesomeIcon icon={faEnvelope} />}
                            color={'#2c4762'}
                            link="mailto:?body=ofertas.fidelizii.com.br//demonstracao-fidelizi/901"
                        />
                    </div>
                </div>
            }
            footer={<></>}
            setShow={setShow}
        />
    )
}

export default ShareModal;