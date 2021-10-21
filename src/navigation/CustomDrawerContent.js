import React, {useContext, useEffect, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RootContext, SelectedQuestionContext} from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/routers';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedQuestion} from '../features/QuestionsSlice';

const styles = StyleSheet.create({
  headerContainer: {
    // paddingVertical: 10,
    elevation: 1,
    marginTop: -5,
    flexDirection: 'row',
    borderBottomWidth: 0.1,
  },
  topic: {
    flex: 2,
    elevation: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    // borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    marginLeft: 5,
    backgroundColor: 'white',
  },
  gridView: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingHorizontal: 5,
    // backgroundColor: 'red',
  },
  grid: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  gridItem: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  listView: {
    flex: 1,
    backgroundColor: 'red',
    marginBottom: 10,
    paddingVertical: 15,
  },
});

const CustomDrawerContent = ({navigation}) => {
  const dispatch = useDispatch();

  // const {questions, setSelectedQuestion} = useContext(RootContext);

  // const {selectedQuestion, setSelectedQuestion} = useContext(
  //   SelectedQuestionContext,
  // );

  const {selectedQuestion, questions} = useSelector(state => ({
    selectedQuestion: state.questionData.selectedQuestion,
    questions: state.questionData.questions,
  }));
  // console.log(selectedQuestion);

  const [selected, setSelected] = useState('list');

  /**
   * depending on the selected question
   * selectedQuestionContext value is updated to show on
   * the question page
   * @param {question} item
   */
  const handleQuestionSelection = item => {
    console.log('pressed', item);
    dispatch(setSelectedQuestion(item));
    // setSelectedQuestion(item);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.topic}>
          <Text style={{color: 'black'}}>Manovigyan</Text>
        </View>
        <View style={styles.gridView}>
          <TouchableOpacity
            onPress={() => setSelected('grid')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selected === 'grid' ? '#E6E6E6' : null,
            }}>
            <Ionicons name="ios-grid" size={20} color="#B8B8B8" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('list')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: selected === 'list' ? '#E6E6E6' : null,
            }}>
            <Ionicons name="list-outline" size={25} color="#B8B8B8" />
          </TouchableOpacity>
        </View>
      </View>
      {selected === 'list' ? (
        questions.map((item, idx) => (
          <View key={item.id} style={styles.listView}>
            <TouchableOpacity onPress={() => handleQuestionSelection(item)}>
              <Text style={{color: 'blue'}}>{item.question}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.grid}>
          {questions.map((item, idx) => (
            <View key={item.id} style={styles.gridItem}>
              <TouchableOpacity onPress={() => handleQuestionSelection(item)}>
                <Text style={{color: 'red', fontSize: 18}}>{idx + 1}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
