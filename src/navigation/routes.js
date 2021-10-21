import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Question from '../components/Question';
import CustomDrawerContent from './CustomDrawerContent';
import dummyData from '../dummydata.json';
import {RootContext} from '../../App';
import {useDispatch} from 'react-redux';
import {setQuestions} from '../features/QuestionsSlice';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setQuestions(dummyData));
  }, []);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Question" component={Question} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
