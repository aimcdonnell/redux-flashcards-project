import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import ROUTES from "../../app/routes";
// import selectors
import { selectTopics } from "./topicsSlice";
import { selectQuizzes } from "../quizzes/quizzesSlice";
export default function Topic() {
  //useSelector() takes the current state as an argument
  //and returns whatever data you want from it
  const topics = useSelector(selectTopics);  // replace with selector
  const quizzes = useSelector(selectQuizzes);
  //useParams allows you to access and use params inside the component
  //from the URL
  const { topicId } = useParams();
  const topic = topics[topicId];

  if(!topic) {
    return <Navigate to={ROUTES.topicsRoute()} replace/>
  }
  
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>{topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
