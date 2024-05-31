import './Lobby.css';
import type { Player, ServerToClientEvents, ClientToServerEvents } from '../Util/interfaces';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Copy } from 'react-feather';
import Modal from '../Modal/Modal';
import { patchGame } from '../Util/fetchCalls';
//import { io, Socket } from 'socket.io-client'; 

interface Props {
    players: Player[]
}

function Lobby({players}: Props) {
    const [sessionGame, setSessionGame] = useState({});
    const [sessionPlayers, setSessionPlayers] = useState([]);
    const location = useLocation();
    const game = location.state;
    const { gameid } = useParams();
    const navigate = useNavigate();
    const [joinURL, setJoinUrl] = useState('')
    const [error, setError] = useState('')
    //const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();


    useEffect(() => {
        
        // @ts-expect-error
        const sessionGame = JSON.parse(sessionStorage.getItem('game'))
        setSessionGame(sessionGame)
        let stringQuestion = JSON.stringify(game)
        let encodedQuestion = encodeURIComponent(stringQuestion)
        setJoinUrl(`https://https://brain-defrost.netlify.app/join/${gameid}/?data=${encodedQuestion}`)
        // @ts-expect-error
        const sessionPlayers = JSON.parse(sessionStorage.getItem('players'))
        setSessionPlayers(sessionPlayers)
    }, [players, game, gameid])

    
    const playerNames = sessionPlayers.map(player => {
        return(
            <p
            // @ts-expect-error
            key={player.id}
            // @ts-expect-error
            >{player.attributes.display_name}</p>
        )});
    
    const copyURL = () => {
        navigator.clipboard.writeText(joinURL);
    };

    const startGame = async () => {
        try {
            await patchGame(gameid);
            navigate(`/game/play/${gameid}`, {state: sessionGame});
        } catch (error) {
            setError(`${error}`);
            console.log(error)
        } 
    };

    return (
        <main className='lobby'>
            {error && <Modal setError={setError} alert={error} />}
            <section className='details'>
                <h2 className='game-topic lobby-details'><span>Topic</span><br/>{game.attributes.topic}</h2>
                <h2 className='question-count lobby-details'>{`${game.attributes.number_of_questions} Questions`}</h2>
                <h2 className='join-url-heading lobby-details'>Share the Link to invite players!</h2>
                <div className='join-url-container'>
                    <p onClick={copyURL} className='join-url'>Copy Link</p>
                    <button id='copy-url-btn' onClick={copyURL}><Copy /></button>
                </div>
                <button className='start-game-btn' onClick={startGame}>Start Game!</button>
            </section>
            <section className='players'>
                <h2 className='players-heading'>Players</h2>
                {playerNames.length && playerNames}
            </section>
        </main>
    )
}

export default Lobby