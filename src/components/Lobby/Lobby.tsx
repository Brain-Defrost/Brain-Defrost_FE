import './Lobby.css';
import type { Player } from '../Util/interfaces';
import { patchGame, getGame } from '../Util/fetchCalls';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Copy } from 'react-feather';
import Modal from '../Modal/Modal';

interface Props {
    players: Player[]
}

function Lobby({players}: Props) {
    const location = useLocation();
    const [game, setGame] = useState(location.state);
    const { gameid } = useParams();
    const navigate = useNavigate();
    const [joinURL, setJoinUrl] = useState('');
    const [error, setError] = useState<string>('');

    //establish websocket connection here

    // let socket = new WebSocket('wss://localhost:3000')
    // console.log(socket)
    let socket = new WebSocket('wss://www.brain-defrost-f8afea5ead0a.herokuapp.com')
    console.log(socket)

    useEffect(() => {
        // @ts-expect-error
        fetchGame(gameid);
        setJoinUrl(`https://brain-defrost.netlify.app/join/${gameid}/`)
    }, [players, gameid])

    const fetchGame = async (gameID: string) => {
        try {
          const currentGame = await getGame(gameID);
          setGame(currentGame.data);
        } catch (error) {
          setError(`${error}`);
          console.log(error);
        }
      };
    
    const playerNames = game.relationships.players.data.map((player: Player) => {
        return(
            <p
            key={player.id}
            >{player.attributes.display_name}</p>
        )});

   
    
    const copyURL = () => {
        navigator.clipboard.writeText(joinURL);
    };

    const startGame = async () => {
        try {
            await patchGame(gameid);
            navigate(`/game/play/${gameid}`, {state: game});
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
                    <button id='copy-url-btn' onClick={copyURL} title='Copy game link'><Copy /></button>
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