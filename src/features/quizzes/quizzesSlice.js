import { createSlice } from "@reduxjs/toolkit";
//create a new file containing a slice for quizzes that:
//is named "quizzesSlice"
export const quizzesSlice = createSlice({
    name: "quizzes",
//has initial state consisting of an object that includes
//one property, quizzes, which corresponds to an
//empty object
//this inner quizzes object will eventually
//hold all quizzes keyed by id
    initialState: {
        quizzes: {}
    },
//has an addQuiz action - this action will receive
//the payload (additional info) of the form {id: 123, name: "quiz name", topicId: '456', cardIds: ["1", "2", "3", ...]}
reducers: {
    addQuiz: (state, action) => {
        const { id } = action.payload;
        state.quizzes[id] = action.payload;
        }
    }
})

//export the selector as well as the action creators
//and reducer that your slice generates
export const { addQuiz } = quizzesSlice.actions;
//has a selector which returns all quizzes from state
export const selectQuizzes = state => state.quizzes.quizzes;
export const quizzesReducer = quizzesSlice.reducer; 