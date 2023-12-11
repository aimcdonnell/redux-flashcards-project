//First, import createSlice from reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit';

//slice is named topicsSlice
export const topicsSlice = createSlice({
    name: 'topics',
//topicsSlice's initial state consists of an object
//that includes one property, topics, which corresponds
//to an empty object
    initialState: {
//this object will eventually hold all topics keyed by id
        topics: {}
},
    reducers: {
//the slice has an addTopic action
//the payload should look like {id: '123456, name: 'name of topic' icon: 'icon url'}
        addTopic: (state, action) => {
            //meaning const id = action.payload.id
            //const name = action.payload.name
            //const icon = action.payload.icon
            const {id, name, icon} = action.payload;
            //also can be written as state.topics.id
            state.topics[id] = {
                id: id, 
                name: name, 
                icon: icon,
    //each topic added to the state should also have a quizIds property
    //which will correspond to an array containing the ids of each quiz
    //associated with that topic
                quizIds: [],
        }
    }

},
//action that adds a quiz's id to the quizIds array
//of the topic with which the newly created quiz is associated
extraReducers: {
    "quizzes/addQuiz": (state, action) => {
        //the same as const id = action.payload.id
        //const topicId = action.payload.topicId
        const { id, topicId } = action.payload;
        //topicId becomes the key and within that object
        //the new id is added to the quizIds array
        state.topics[topicId].quizIds.push(id);
    }
}
})

//export action creators
export const { addTopic, addQuiz } = topicsSlice.actions;
//export reducers
export const topicsReducer = topicsSlice.reducer;
//create and export a selector that selects the topics object nested within initialState
export const selectTopics = (state) => state.topics.topics;