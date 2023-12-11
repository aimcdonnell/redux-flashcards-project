import { createSlice } from '@reduxjs/toolkit';
//create a new file containing a slice for quizzes that:
//is named "quizzesSlice"
export const quizzesSlice = createSlice({
    name: 'quizzes',
//has initial state consisting of an object that includes
//one property, quizzes, which corresponds to an
//empty object
    initialState: {
//this inner quizzes object will eventually
//hold all quizzes keyed by id
        quizzes: {}
    },
    reducers: {
//has an addQuiz action - this action will receive
//the payload (additional info) of the form 
//{id: 123, name: "quiz name", topicId: '456', cardIds: ["1", "2", "3", ...]}
        addQuiz: (state, action) => {
            //same as const id = action.payload.id
            //because the topic was already created in topicsSlice,
            //you don't need to add the icon and name again
            //you're just using the quiz's id to get the topic
            const { id, name, topicId, cardIds } = action.payload;
            //insert your newly created quiz object as the value
            //associated with the id you receive in the action's payload
            //id becomes a key, e.g. '456' in the example code
            //the value assigned to it is an object containing the properties below
            //id, name, icon
            state.quizzes[id] = {
                id: id,
                name: name,
                topicId: topicId,
                cardIds: cardIds
            };
        }
    }
})


  

//has a selector which returns all quizzes from state
//export the selector as well as the action creators
export const selectQuizzes = (state) => state.quizzes.quizzes;
//export reducer that your slice generates
export const quizzesReducer = quizzesSlice.reducer;
//export action creators
export const { addQuiz } = quizzesSlice.actions;