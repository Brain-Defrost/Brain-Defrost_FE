import "./JoinGameForm.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { postPlayer } from "../Util/fetchCalls";
import type { Player } from "../Util/interfaces";

interface Props {
  setPlayers: (array: Player[]) => void;
  players: Player[];
}

function JoinGameForm({ players, setPlayers }: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encodedString = params.get("data");
  const { gameid } = useParams<string>();
  const [displayName, setDisplayName] = useState<string>("");
  const [sessionPlayers, setSessionPlayers] = useState<Player[]>([]);
  const [sessionGame, setSessionGame] = useState<any>(null);
  const [nameAvailable, setNameAvailable] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(encodedString){
    const data = JSON.parse(decodeURIComponent(encodedString));
    setSessionPlayers(data.relationships.players.data);
    sessionStorage.setItem(data,'game')
    }
  }, [encodedString]);

  const isNameAvailable = (nameInput: string): boolean => {
    const playerNames = sessionPlayers.map(
      (player) => player.attributes.display_name
    );
    const matches = playerNames.filter((name) => nameInput === name);
    if (matches.length) {
      setNameAvailable(false);
      return false;
    } else {
      setNameAvailable(true);
      return true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const createPlayer = async (
    gameID: string | undefined,
    nameString: string
  ) => {
    const newPlayer = await postPlayer(gameID, nameString);
    setPlayers([...players, newPlayer.data]);
    sessionStorage.setItem(
      "players",
      JSON.stringify([...sessionPlayers, newPlayer.data])
    );
  };

  const handleSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
    gameID: string | undefined,
    nameString: string
  ) => {
    e.preventDefault();
    if (isNameAvailable(nameString)) {
      await createPlayer(gameID, nameString);
      navigate(`/game/lobby/${gameid}`, { state: sessionGame });
    }
  };

  return (
    <form
      className="entry-form"
      onSubmit={(e) => handleSubmission(e, gameid, displayName)}
    >
      {!nameAvailable && (
        <p id="display-name-notif">
          That display name is taken. Please choose another one!
        </p>
      )}
      <input
        id="display-name-input"
        name="display name"
        type="text"
        placeholder="Enter Display Name"
        value={displayName}
        onChange={handleChange}
        required
      />
      <button id="join-game-button" name="join">
        Join Game!
      </button>
    </form>
  );
}

export default JoinGameForm;
