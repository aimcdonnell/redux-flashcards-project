import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
// import selectors - selectTopics, addCard and addQuiz
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  //initial state is an empty string
  //name is the current state
  //setName is the function used to change the state
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  //replace the variable topics with a call to the selector selectTopics
  const topics = useSelector(selectTopics);  // Replace with topics 
  //useDispatch returns a reference to the dispatch function
  //useDispatch is used to dispatch functions, as needed
  const dispatch = useDispatch();

  //dispatch addQuiz from the handleSubmit event handler 
  const handleSubmit = (e) => {
    //preventDefault() prevents a default event from running
    e.preventDefault();
    if (name.length === 0 || !topicId) {
      alert('Please create a topic to link to the quiz first!')
      return;
    }

    const cardIds = [];

    // create the new cards here and add each card's id to cardIds
    cards.forEach((card) => {
      //you will have to generate an id for each card using uuidv4
      let cardId = uuidv4();
      //store the id you create for each card in the cardIds array
      //we've provided for you
      //your action creator expects to receive a payload of the form
      //{id: "123", front: "front of card", back: "back of card"}
      //you want to collect all the cardIds in an array so that you can
      //pass the ids to the action creator that generates new quizzes
      cardIds.push(cardId);
    //dispatch your addCard action creator
      dispatch(addCard({ ...card, id: cardId }));
    });
    // create the new quiz here
    //to create an id call the function like so uuidv4()
    const quizId = uuidv4();

    // dispatch addQuiz action 
    //the id: quizIds is required for when you click on a particular quiz that has been added; it will show the quizId
    dispatch(
      addQuiz({
      name: name, 
      topicId: topicId, 
      cardIds: cardIds, 
      id: quizId,
    })
    );
    navigate(ROUTES.quizzesRoute())
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
