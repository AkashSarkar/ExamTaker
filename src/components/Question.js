import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import {DrawerLayoutAndroid} from 'react-native-gesture-handler';
import dummyData from '../dummydata.json';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  headerContainer: {
    // paddingVertical: 10,
    elevation: 1,
    marginTop: -5,
    flexDirection: 'row',
    borderBottomWidth: 0.1,
    backgroundColor: 'white',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  listView: {
    // width: 240,
    flex: 1,
    // marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const Question = ({route, navigation}) => {
  const swiperRef = useRef(null);
  const drawerRef = useRef(null);

  const [data, setData] = useState(dummyData);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('मनोविज्ञान');
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [type, setType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [prevIndex, setPrevIndex] = useState(null);
  const [pageX, setPageX] = useState(0);
  const [selected, setSelected] = useState('list');

  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown(countDown => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log('expired');
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  useEffect(() => {
    setQuestions(data.questions[selectedCategory]);
  }, [data.questions, selectedCategory]);

  const updateViewedItem = useCallback(
    index => {
      if (questions) {
        setQuestions(qsn => {
          let tempQsns = [...qsn];
          if (tempQsns[index] && !tempQsns[index].viewed) {
            tempQsns[index].viewed = true;
            tempQsns.splice(index, 1, tempQsns[index]);
            // setData(prevState => {
            //   const temp = prevState;
            //   temp.questions[selectedCategory] = tempQsns;
            //   return temp;
            // });
          }
          return tempQsns;
        });
      }
    },
    [questions, selectedCategory],
  );

  useEffect(() => {
    if (questions.length > 0) {
      swiperRef.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  }, [selectedCategory]);

  // const onSwipe = index => {
  //   setPrevIndex(index);
  //   if (prevIndex !== null && prevIndex < index) {
  //     updateViewedItem(prevIndex);
  //   } else if (prevIndex !== null && prevIndex > index) {
  //     updateViewedItem(prevIndex);
  //   } else if (prevIndex === null) {
  //     updateViewedItem(0);
  //   }
  // };

  useEffect(() => {
    if (selectedQuestion) {
      const index = questions.findIndex(
        item => item.id === selectedQuestion.id,
      );
      // console.log(index);

      if (index >= 0) {
        // console.log('hello');
        swiperRef.current.scrollToIndex({
          animated: true,
          index: index,
        });
        // updateViewedItem(index);
      }
    }
  }, [selectedQuestion, selectedCategory]);

  const handleQuestionSelection = item => {
    setSelectedQuestion(item);
    drawerRef.current.closeDrawer();
  };

  const truncate = (str, len = 16) => {
    return str.length < len ? str.slice(0, len) : str.slice(0, len) + '...';
  };

  const showQuestionColor = type => {
    switch (type) {
      case 'viewed':
        return 'red';
      case 'answered':
        return 'green';
      default:
        return '#f2f2f2';
    }
  };

  const generateType = item => {
    // console.log(item);
    if (item.selectedOption) {
      setType('answered');
      return 'answered';
    }

    if (item.viewed) {
      setType('viewed');
      return 'viewed';
    }
  };

  const renderDrawer = () => {
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.topic}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'black'}}>{selectedCategory}</Text>
          </TouchableOpacity>
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
                <View
                  style={{
                    // flex: 1,
                    width: 210,
                    flexDirection: 'row',
                    // justifyContent: 'space-around',
                    alignItems: 'center',
                    // marginRight: 25,
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: showQuestionColor(generateType(item)),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}>
                    {item.liked === true ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: -5,
                          right: -5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* replace with svg icon */}
                        <Ionicons name="star" size={20} color="orange" />
                      </View>
                    ) : null}

                    <Text style={{color: 'blue'}}>{idx + 1}</Text>
                  </View>
                  <Text style={{color: 'black'}}>
                    {truncate(item.title, 60)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.grid}>
            {questions.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.gridItem,
                  {backgroundColor: showQuestionColor(generateType(item))},
                ]}>
                {item.liked === true ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* replace with svg icon */}
                    <Ionicons name="star" size={20} color="orange" />
                  </View>
                ) : null}
                <TouchableOpacity onPress={() => handleQuestionSelection(item)}>
                  <Text style={{color: 'black', fontSize: 18}}>{idx + 1}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  const handleSelection = (item, questionIndex) => {
    let tempQsns = [...questions];
    let prevQuestion = tempQsns[questionIndex];
    prevQuestion.selectedOption = item;
    tempQsns.splice(questionIndex, 1, prevQuestion);
    setQuestions(tempQsns);

    setData(prevState => {
      const temp = prevState;
      temp.questions[selectedCategory] = tempQsns;
      return temp;
    });
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const RadioButton = ({options, selectedOption, questionIndex}) => {
    const [selectedItem, setSelectedItem] = useState(selectedOption || {});
    // console.log('selected', selectedOption);
    return options.map(item => (
      <TouchableOpacity
        key={item.key}
        style={styles.buttonContainer}
        onPress={() => {
          setSelectedItem(item.key);
          handleSelection(item.key, questionIndex);
        }}>
        <View
          style={[
            styles.circle,
            {
              borderColor: 'black',
            },
          ]}>
          {selectedItem === item.key && (
            <View
              style={[
                styles.checkedCircle,
                {
                  backgroundColor: 'green',
                },
              ]}
            />
          )}
        </View>
        <Text style={{color: 'black'}}>{item.value}</Text>
      </TouchableOpacity>
    ));
  };

  const handleLike = questionIndex => {
    let tempQsns = [...questions];
    let prevQuestion = tempQsns[questionIndex];
    if (!prevQuestion.liked) {
      prevQuestion.liked = true;
      tempQsns.splice(questionIndex, 1, prevQuestion);
      setQuestions(tempQsns);

      setData(prevState => {
        const temp = prevState;
        temp.questions[selectedCategory] = tempQsns;
        return temp;
      });
    }
  };

  const RenderItem = ({item, questionNum, questionIndex}) => {
    return (
      <View
        style={{
          width: width - 20,
          margin: 10,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          elevation: 1,
          backgroundColor: 'white',
          // height: '70%',
          // paddingVertical: 20,
        }}>
        <View
          style={{
            padding: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: '#d9d9d9',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <Text style={{color: 'black'}}>Q.{questionNum}</Text>
          <TouchableOpacity onPress={() => handleLike(questionIndex)}>
            <Ionicons name="star" size={20} color="orange" />
          </TouchableOpacity>
        </View>
        <View style={{padding: 10, width: '100%'}}>
          <Text style={{color: 'black', fontWeight: '500'}}>{item.title}</Text>
        </View>
        <View
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#d9d9d9',
          }}>
          <Text>{item.description}</Text>
        </View>
        <View style={{padding: 10}}>
          <RadioButton
            options={[
              {key: item.option1, value: item.option1},
              {key: item.option2, value: item.option2},
              {key: item.option3, value: item.option3},
              {key: item.option4, value: item.option4},
            ]}
            selectedOption={item.selectedOption}
            questionIndex={questionIndex}
          />
        </View>
      </View>
    );
  };

  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      // setPrevIndex(viewableItems[0].index);
      updateViewedItem(viewableItems[0].index);
      console.log('Visible items are', viewableItems[0].index);
    }
    // setPrevIndex(changed[0].index);
    // console.log('Changed in this iteration', changed);
    // updateViewedItem(changed[0].index);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={280}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerType="front"
        drawerBackgroundColor="white"
        renderNavigationView={renderDrawer}>
        <View>
          <View
            style={{
              width: '100%',
              padding: 5,
              borderColor: 'grey',
              elevation: 1,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: 'grey',
            }}>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => drawerRef.current.openDrawer()}>
              <Ionicons name="ios-grid" size={30} color="#B8B8B8" />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                // paddingLeft: -50,
                marginLeft: -50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              {runTimer ? (
                <TouchableOpacity onPress={() => setRunTimer(false)}>
                  <Ionicons
                    name="pause-circle-outline"
                    size={25}
                    color="#B8B8B8"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setRunTimer(true)}>
                  <Ionicons
                    name="play-circle-outline"
                    size={25}
                    color="#B8B8B8"
                  />
                </TouchableOpacity>
              )}

              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 10,
                }}>
                00:{minutes}:{seconds}
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 10,
              borderColor: 'grey',
              elevation: 1,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                {selectedCategory}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          ref={swiperRef}
          data={questions}
          renderItem={({item, index}) => (
            <RenderItem
              item={item}
              questionNum={index + 1}
              questionIndex={index}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          onScrollBeginDrag={e => {
            setPageX(e.nativeEvent.contentOffset.x);
          }}
          onScrollEndDrag={e => {
            // console.log(e.currentTarget);
            if (pageX > e.nativeEvent.contentOffset.x) {
              console.log('swipe left');
            } else {
              console.log('swipe right');
            }
          }}
          // getItemLayout={(data, index) => console.log(index, index)}
          viewabilityConfig={{
            minimumViewTime: 10,
            viewAreaCoveragePercentThreshold: 100,
          }}
          maxToRenderPerBatch={15}
          updateCellsBatchingPeriod={50}
          onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />

        {/* <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={false}
          // index={selectedQuestion}
          onIndexChanged={onSwipe}>
          {questions.map((item, idx) => (
            <RenderItem
              key={item.id}
              item={item}
              questionNum={idx + 1}
              questionIndex={idx}
            />
          ))}
        </Swiper> */}
      </DrawerLayoutAndroid>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            {Object.keys(data.questions).map(item => (
              <TouchableOpacity
                key={item}
                style={{paddingVertical: 15, paddingHorizontal: 20}}
                onPress={() => {
                  setSelectedCategory(item);
                  setModalVisible(false);
                }}>
                <Text style={{color: 'black', fontSize: 14}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Question;
