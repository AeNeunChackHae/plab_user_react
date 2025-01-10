import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import FeedbackForm from '../../components/mypage/matchfeedback/FeedbackForm.jsx';
import TeamDisplay from '../../components/mypage/matchfeedback/TeamDisplay.jsx'

const FeedbackPage = () => {
  const { matchId } = useParams();
  const currentUserId = localStorage.getItem("userId")

  console.log("matchId from useParams:", matchId); // matchId 확인

  return (
    <div>
      <h1>매치 피드백</h1>
      <TeamDisplay matchId={matchId} />
      <FeedbackForm matchId={matchId} currentUserId={currentUserId} />
    </div>
  );
};

export default FeedbackPage;
