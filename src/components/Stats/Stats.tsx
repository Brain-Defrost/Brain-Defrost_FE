import "./Stats.css";
import { getFinalStats } from "../Util/fetchCalls";
import { useEffect, useState } from "react";
import { GetFinalGameStatsResponse, Player } from "../Util/interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { Award } from "react-feather";
import SendStatsForm from "../SendStatsForm/SendStatsForm";

function Stats() {
  const [finalStats, setFinalStats] = useState<GetFinalGameStatsResponse>();
  const [rankings, setRankings] = useState<Player[]>([]);
  const [openDialoge, setOpenDialoge] = useState<boolean>(false);
  const {gameid} = useParams();
  const Navigate = useNavigate();
  const fetchStat = async () => {
    setFinalStats(await getFinalStats(gameid));
  };

  useEffect(() => {
    fetchStat();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (finalStats) {
      const sortedStats = finalStats.data.relationships.players.data.sort(
        (a, b) => b.attributes.answers_correct - a.attributes.answers_correct
      );
      setRankings(sortedStats);
    }
  }, [finalStats]);
  function goHome() {
    Navigate("/");
  }
  function displayRankings() {
    return rankings.map((player) => (
      <li key={player.id}>
        {player.attributes.display_name} {player.attributes.answers_correct}Pts
      </li>
    ));
  }

  function displayTopThree() {
    return (
      <div className="top-three">
        <div className="second-place">
          {rankings[1] && (
            <h3 className="podium-holders">
              {rankings[1].attributes.display_name}
            </h3>
          )}
          <h3 className="second">2nd</h3>
        </div>
        <div className="first-place">
          {rankings[0] && (
            <h3 className="podium-holders">
              {rankings[0].attributes.display_name}
            </h3>
          )}
          <h3 className="first">1st</h3>
        </div>
        <div className="third-place">
          {rankings[2] && (
            <h3 className="podium-holders">
              {rankings[2].attributes.display_name}
            </h3>
          )}
          <h3 className="third">3rd</h3>
        </div>
      </div>
    );
  }

  function showForm() {
    setOpenDialoge(true);
  }

  function closeForm() {
    setOpenDialoge(false);
  }

  return (
    <div className="stats-display">
      <h1 className="stats-header">Good game!</h1>
      <section className="podium">
        <h2>Top Scorers</h2>
        {displayTopThree()}
      </section>
      <section className="rankings-display">
        <h2><Award></Award>Rankings</h2>
        <ol className="rankings-list">
          {rankings.length > 0 && displayRankings()}
        </ol>
      </section>
      <div className="btns">
      <button className='send-stats-btn' onClick={showForm}>Send Me The Stats</button>
      <button className='new-game-btn' onClick={goHome}>Generate A New Game</button>
      </div>
      {openDialoge && <SendStatsForm closeForm={closeForm} gameId={gameid}/>}
    </div>
  );
}

export default Stats;
