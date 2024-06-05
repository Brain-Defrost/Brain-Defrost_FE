import "./Modal.css";
import brain from '../../images/VaporWaveBrain.png'
import { XCircle } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    alert: string,
    setError: (error: string) => void,
}

function Modal({alert, setError}: Props) {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const handleClose = () => {
        setError('');
    };

    return (
        <dialog open className="alert-modal">
            <button title='Close' className="close-btn" onClick={handleClose}><XCircle color="#A5E6BA"></XCircle></button>
            <h2>Alert!</h2>
            <img className="alert-img" src={brain} alt="vaporwave style brain illustration"/>
            <p>{alert}</p>
            {pathname.includes('join') ? <button autoFocus className="modal-close-btn" onClick={() => navigate('/')}>Home</button> : <button autoFocus className="modal-close-btn" onClick={handleClose}>Close</button>}
        </dialog>
    )

}

export default Modal