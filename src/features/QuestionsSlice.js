import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  selectedQuestion: {},
};

export const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateViewStatus: (state, action) => {
      let updatedItem = state.questions[action.payload];
      //   console.log(updatedItem);
      if (!updatedItem.shown) {
        updatedItem.shown = true;
        state.questions.splice(action.payload, 1, updatedItem);
      }
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },
  },
});

export const {setQuestions, setSelectedQuestion, updateViewStatus} =
  QuestionSlice.actions;

export default QuestionSlice.reducer;
