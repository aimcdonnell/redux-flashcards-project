import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
//import the selector defined in your slice and use it to access
//all the topics in state and replace the empty object
//currently assigned to topics with the topics in state
import { useSelector } from "react-redux";
import { selectTopics } from "./topicsSlice";
export default function Topics() {
  //selectTopics and useSelector allows you to select all the topics in state (state.topics.topics)
  //useSelector() allows you to extract data from the Redux store state for use in this component, using a selector function
  const topics = useSelector(selectTopics); // replace this with a call to your selector to select all the topics in state

  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
          <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
           <div className="topic-container">
             <img src={topic.icon} alt="" />
             <div className="text-content">
               <h2>{topic.name}</h2>
               <p>{topic.quizIds.length} Quizzes</p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  );
}
