/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Question from './src/components/Question';
import Drawerable from './src/components/Drawerable';

/**
 * root context is used for the question list
 */
export const RootContext = React.createContext({
  questions: {},
  selectedQuestion: {},
  setSelectedQuestion: () => {},
  setQuestions: () => {},
});

/**
 * selectedQuestion is used for the question selected from drawer
 * or after swipe which question is showing
 */

export const SelectedQuestionContext = React.createContext({
  selectedQuestion: {},
  setSelectedQuestion: () => {},
});

const App = () => {
  // simulates the api call
  // const [questions, setQuestions] = useState(dummyData);
  // const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  // const value = {
  //   questions,
  //   selectedQuestion,
  //   setSelectedQuestion,
  //   setQuestions,
  // };
  // const selectedValue = useCallback(
  //   () => ({selectedQuestion, setSelectedQuestion}),
  //   [selectedQuestion, setSelectedQuestion],
  // );

  return (
    <Question />
    // <NavigationContainer>
    //   {/* <RootContext.Provider value={value}> */}
    //   {/* <SelectedQuestionContext.Provider value={selectedValue()}> */}
    //   <Provider store={store}>
    //     <MyDrawer />
    //   </Provider>
    //   {/* </SelectedQuestionContext.Provider> */}
    //   {/* </RootContext.Provider> */}
    // </NavigationContainer>
  );
};

export default App;
