import React, { useState } from "react";
import { vote } from "../utils/hn";

//Funció per donar like
function VoteButton({ id }) {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    vote(id, voted ? "un" : "up");
    setVoted(!voted);
  };

  return (
    <div onClick={handleVote} className={`votelinks`}>
      <div className={`votearrow ${voted ? "rotate180" : ""}`} title="upvote"></div>
    </div>
  );
}

export default VoteButton;

