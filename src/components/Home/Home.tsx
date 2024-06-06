import React, { FormEvent, useState } from "react";
import "./Home.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { postGame } from "../Util/fetchCalls";
import type { Game, Player } from "../Util/interfaces";
import brainGif from "../../images/Brain gif.gif"
import star from "../../images/Star 1.png"
// import useWebSocket from "react-use-websocket";
// import actionCable from 'actioncable';


interface Props {
  setGame: (game: Game) => void;
  setPlayers: (playersArray: Player[]) => void;
}

// interface NotificationTypes {
//   user: number,
//   message: string
// }

function Home({ setGame, setPlayers }: Props) {
  const [error, setError] = useState<string>("");
  const [isGameBeingCreated, setIsGameCreate] = useState<Boolean>(false);
  const [formData, setFormData] = useState({
    topic: "",
    number_of_questions: 1,
    time_limit: 30,
    number_of_players: 1,
    display_name: "",
  });


  // const cableApp = actionCable.createConsumer('ws://brain-defrost-f8afea5ead0a.herokuapp.com/cable');
  // const [channel, setChannel] = useState<null | actionCable.Channel>(null);

  // useEffect(() => {
  //   if (channel !== null) channel.unsubscribe();
  //   // destroy possible duplicate connections
 
  //   // setChannel(
  //   //   cableApp.subscriptions.create(
  //   //     {
  //   //       channel: 'NotificationsChannel',
  //   //       user_id: 1,
  //   //       // channel that will be used for the connection
  //   //     },
  //   //     {
  //   //       received: (message: NotificationTypes) => {
  //   //         // function that will be executed when a message is received
            
  //   //         console.log('Yay! :D')
  //   //         console.log(message);
           
  //   //       },
  //   //     },
  //   //   ),
  //   // );
  // }, []);
  
  const socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

  socket.onopen = function(e) {
    alert("Connection established girllllll!");
    console.log(e)
    socket.send("My name is John");
  }

  socket.onmessage = function(e) {
    console.log(e)
    alert(`[message] Data received from server: ${e.data}`);
  };

  socket.onclose = function(e) {
    if (e.wasClean) {
      alert(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`)
    } else {
      alert('Connection died :(')
    }
  };

  socket.onerror = function(error) {
    alert(error)
  }

  // let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);


  // socket.onopen = function(e) {
  //   alert('Connected to chat socket')
  // }
  // socket.addEventListener("open", (event) => {
  //   socket.send("Connection established");
  // });

  // socket.addEventListener("message", (event) => {
  //   console.log("Message from server ", event.data);
  // });
  
  const Navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGameCreate(true)
    createGame();
    setFormData({
      topic: "",
      number_of_questions: 1,
      time_limit: 30,
      number_of_players: 1,
      display_name: "",
    });
  };

  const createGame = async () => {
    const gameSpecs = {
      topic: formData.topic,
      number_of_questions: Number(formData.number_of_questions),
      time_limit: formData.time_limit,
      number_of_players: Number(formData.number_of_players),
      display_name: formData.display_name,
    };

    try {
      const newGame = await postGame(gameSpecs);
      setGame(newGame.data);
      setPlayers([newGame.data.relationships.players.data[0]]);
      sessionStorage.setItem("game", JSON.stringify(newGame.data));
      sessionStorage.setItem(
        "players",
        JSON.stringify([newGame.data.relationships.players.data[0]])
      );
      sessionStorage.setItem(
        "currentPlayer",
        JSON.stringify(newGame.data.relationships.players.data[0])
      );
      const gameID = newGame.data.id;
      Navigate(`game/lobby/${gameID}`, { state: newGame.data });
      setIsGameCreate(false)
      // console.log("newGame", newGame);
    } catch (error) {
      setIsGameCreate(false)
      setError(`${error}`);
      console.log(error);
    }
  };

  return (
    <>
      {isGameBeingCreated ? (
        <div className="loading" style={{backgroundImage:`url(${star})`}}>
          <img alt="wiggling brain icon" src={brainGif}/> 
          <h1 className="loading-text">Loading...</h1>
        </div>
      ) : (
        <div className="home">
          {error && <Modal setError={setError} alert={error} />}
          <h2 className="form-title">Generate A New Trivia Game!</h2>
          <form className="create-game-form" onSubmit={handleSubmit}>
            <section>
              <label htmlFor="name">Enter your display name</label>
              <input
                type="text"
                className="name-input"
                id="name"
                name="display_name"
                placeholder="Brainiac"
                value={formData.display_name}
                onChange={handleChange}
                required
              />
            </section>
            <div className="form-holder">
              <section>
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  placeholder="music"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="topic">Topic</label>
              </section>
              <section>
                <input
                  type="number"
                  name="number_of_players"
                  id="players"
                  min="1"
                  max="30"
                  placeholder="1"
                  value={formData.number_of_players}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="players">How many players</label>
              </section>
              <section>
                <input
                  type="number"
                  name="number_of_questions"
                  id="questions"
                  min="1"
                  max="25"
                  placeholder="1"
                  value={formData.number_of_questions}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="questions">How many Questions</label>
              </section>
            </div>
            <button className="create-btn" type="submit">
              Create
            </button>
          </form>
          <footer>
            <h4 className="footer-title">More info about Brain Defrost</h4>
          </footer>
        </div>
      )}
    </>
  );
}

export default Home;
