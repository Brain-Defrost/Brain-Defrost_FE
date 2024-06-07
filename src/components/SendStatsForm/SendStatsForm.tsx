import "./SendStatsForm.css";
import { useState } from "react";
import { XCircle } from "react-feather";
import { postEmail } from "../Util/fetchCalls";

interface Props {
    closeForm: () => void;
    gameId: string | undefined;
}

function SendStatsForm({closeForm, gameId}: Props) {
    const [emailInput, setEmailInput] = useState<string>('');
    const [succesfulSubmission, setSuccessfulSubmission] = useState<boolean | null>(null);

    const submitEmail = async () => {
        try {
            await postEmail(gameId, emailInput);
            setSuccessfulSubmission(true)
        } catch (error) {
            setSuccessfulSubmission(false)
            console.log(error)
        }
    }

    function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitEmail();
        setEmailInput('');
    }

    return (
        <dialog open className="form-modal">
            <button title='Close' className="close-btn" onClick={closeForm}><XCircle color="#A5E6BA"></XCircle></button>
            {succesfulSubmission === null && <h2 className="form-message">Send me those stats!</h2>}
            {succesfulSubmission && <h2 className="form-message">Check your email for the stats!</h2>}
            {succesfulSubmission === false && <h2 className="form-message">Email couldn't be sent, please try again later</h2>}
            <form className="send-results-form" onSubmit={(e) => {handleSubmission(e)}}>
                <label htmlFor="email">Enter your Email Address</label>
                <input autoFocus type='text' name='email' id='email' required placeholder="brainiac@example.com" value={emailInput} onChange={(e) => {setEmailInput(e.target.value)}}></input>
                <button className="submit-btn">Submit</button>
            </form>
        </dialog>
    )
}

export default SendStatsForm