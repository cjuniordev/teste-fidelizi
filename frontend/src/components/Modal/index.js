import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

function Modal({ setShow, title, main, footer}) {

    const handleCloseModal = () => {
        setShow(false);
    };

    return (
        <div className="modal-container">
            <div className="modal">
                <header>
                    <h4>{ title }</h4>
                    <button onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </header>
                <main>
                    { main }
                </main>
                <footer>
                    { footer }
                </footer>
            </div>
        </div>
    );
}

export default Modal;