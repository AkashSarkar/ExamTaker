import {configureStore} from '@reduxjs/toolkit';
import QuestionReducer from '../features/QuestionsSlice';

export const store = configureStore({
  reducer: {
    questionData: QuestionReducer,
  },
});
