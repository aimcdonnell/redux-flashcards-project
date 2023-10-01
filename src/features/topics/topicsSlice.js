import { createSlice } from "@reduxjs/toolkit";
//create a file containing a slice that:
// is named topicsSlice
export const topicsSlice = createSlice({
   name: "topics",
//has initial state consisting of an object that includes one property topics
//which corresponds to an empty object
//this inner topics object will eventually hold all topics keyed by id
   initialState: {
    topics: {}
   },
   reducers: {
    //has an addTopic action 
    //store name, id, and icon in the state as a new topic object
    addTopic: (state, action) => {
       const { id, name, icon } = action.payload;
       //your addTopic action should modify the state.topics object
       //by adding an object representing a single topic to the state.topics object
       //to be keyed by the topic's id which you receive in the action's payload
       state.topics[id] = {
        name: name,
        id: id,
        icon: icon,
        //each topic object added to the state should also have a quizIds property
        //which will correspond to an array containing the ids of each quiz
        //associated with the topic
        //you should create an empty quizIds array so that all topics
        //in the state conform to the same shape
        quizIds: [],
        };
    },
    //add an action to your topics slice that adds a quiz's id to the quizIds array
    //of the topic with which the newly created quiz is associated
    //this action will receive the same payload the quizzes slice addQuiz action
    //received in the form {id: "123", name: "quiz name", topicId: "456", cardIds: ["1", "2", "3", ...]}
    extraReducers: {
        "quizzes/addQuiz": (state, action) => {
            const { topicId, id } = action.payload;
            state.topics[topicId].quizIds.push(id);
        }
    }
   }
})

//export the selector as well as the action creators and reducer
export const { addTopic, addQuizForTopic } = topicsSlice.actions;
//create a selector that selects
//the topics object nested within initialState
export const selectTopics = (state) => state.topics.topics;
export const topicsReducer = topicsSlice.reducer;