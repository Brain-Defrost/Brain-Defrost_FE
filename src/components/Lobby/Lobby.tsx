import "./Lobby.css";
import type { Player } from "../Util/interfaces";
import { patchGame, getGame } from "../Util/fetchCalls";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Copy } from "react-feather";
import Modal from "../Modal/Modal";
import { createConsumer } from "@rails/actioncable";

interface Props {
  players: Player[];
}

function Lobby({ players }: Props) {
  const location = useLocation();
  const [game, setGame] = useState(location.state);
  const { gameid } = useParams();
  const navigate = useNavigate();
  const [joinURL, setJoinUrl] = useState("");
  const [error, setError] = useState<string>("");
  const [playerList, setPlayers] = useState(game.relationships.players.data);
  const [connectionLink, setConnectionLink] = useState(null);
  //@ts-expect-error
  const currentPlayer = JSON.parse(sessionStorage.getItem("currentPlayer"));

  useEffect(() => {
    // @ts-expect-error
    fetchGame(gameid);
    setJoinUrl(`https://brain-defrost.netlify.app/join/${gameid}/`);

    const cable = createConsumer(
      `wss://brain-defrost-f8afea5ead0a.herokuapp.com/cable?player_id=${currentPlayer.id}`
    );

    const link = cable.subscriptions.create(
      { channel: "GameChannel", game_id: gameid },
      {
        received: (data) => {
          console.log(data);
          if (data.game_started === true) {
            navigate(`/game/play/${gameid}`, { state: game });
            link.unsubscribe();
          }
          setPlayers(data.player_list);
        },
      }
    );
    //@ts-ignore
    setConnectionLink(link);
    // eslint-disable-next-line
  }, [players, gameid]);

  const fetchGame = async (gameID: string) => {
    try {
      const currentGame = await getGame(gameID);
      setGame(currentGame.data);
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };
  //@ts-ignore
  const playerNames = playerList.map((player) => {
    return <p key={player.id}>{player.display_name}</p>;
  });

  const copyURL = () => {
    navigator.clipboard.writeText(joinURL);
  };

  const startGame = async () => {
    try {
      await patchGame(gameid);
      //@ts-ignore
      connectionLink.perform("start_game", { game_id: gameid });
    } catch (error) {
      setError(`${error}`);
      console.log(error);
    }
  };

  return (
    <main className="lobby">
      {error && <Modal setError={setError} alert={error} />}
      <section className="details">
        <h2 className="game-topic lobby-details">
          <span>Topic</span>
          <br />
          {game.attributes.topic}
        </h2>
        <h2 className="question-count lobby-details">{`${game.attributes.number_of_questions} Questions`}</h2>
        <h2 className="join-url-heading lobby-details">
          Share the Link to invite players!
        </h2>
        <div className="join-url-container">
          <p onClick={copyURL} className="join-url">
            Copy Link
          </p>
          <button id="copy-url-btn" onClick={copyURL} title="Copy game link">
            <Copy />
          </button>
        </div>
        <button className="start-game-btn" onClick={startGame}>
          Start Game!
        </button>
      </section>
      <section className="players">
        <h2 className="players-heading">Players</h2>
        {playerList ? (
          <>{playerNames.length && playerNames}</>
        ) : (
          <h2>Loading...</h2>
        )}
      </section>
    </main>
  );
}

export default Lobby;
