import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
import QuestionItem from '../../components/QuestionItem';

import TestPaperDrawerIcon from '../../icons/testpaperdrawericon';
import PauseIcon from '../../icons/pauseicon';

import profile from '../../assets/profile.png';
// Tab ICons...
import home from '../../assets/home.png';
import search from '../../assets/search.png';
import notifications from '../../assets/bell.png';
import settings from '../../assets/settings.png';
import logout from '../../assets/logout.png';

const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
}));

const addZeroBefore = n => {
  return (n < 10 ? '0' : '') + n;
};

const TestPaper = ({route}) => {
  const drawerAnumation = () => {
    {
      Animated.timing(scaleValue, {
        toValue: showMenu ? 1 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(offsetValue, {
        // YOur Random Value...
        toValue: showMenu ? 0 : 290,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(closeButtonOffset, {
        // YOur Random Value...
        toValue: !showMenu ? -30 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowMenu(!showMenu);
    }
  };

  const [currentTab, setCurrentTab] = useState('Home');
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [showMenu, setShowMenu] = useState(false);

  const [timersec, setTimersec] = useState(320);
  const {test_id, package_id} = route.params;

  let hours = addZeroBefore(Math.floor(timersec / 3600));
  let minutes = addZeroBefore(Math.floor((timersec - hours * 3600) / 60));
  let seconds = addZeroBefore(timersec - hours * 3600 - minutes * 60);
  const result = {
    questions: {
      मनोविज्ञान: [
        {
          id: '14985',
          title:
            'लॉरेन्स कोहलबर्ग के अनुसार निम्नलिखित में से कौन सा, नैतिकता के विकास का निश्चित और सार्वभौमिक स्तर नहीं है ?',
          description: '',
          option1: 'पूर्व-नैतिक स्तर',
          option2: 'परम्परागत नैतिक स्तर',
          option3: 'पश्च नैतिक स्तर',
          option4: 'आत्म अंगीकृत नैतिक स्तर',
        },
      ],
      'सामान्य ज्ञान': [
        {
          id: '7739',
          title: 'पवन ऊर्जा के क्षेत्र मे राजस्थान का कौनसा स्थान है ?',
          description: '',
          option1: '3rd',
          option2: '2nd',
          option3: '1st',
          option4: '4th',
        },
      ],
    },
    per_question_time: 0.8,
  };

  const sections = Object.keys(result.questions);

  const [dataList, setDataList] = useState(result.questions);
  useEffect(() => {
    const gameStartInternal = setInterval(() => {
      setTimersec(timersec => {
        return timersec - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameStartInternal);
    };
  }, []);
  //  console.log(dataList);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'flex-start', padding: 15}}>
        <Image
          source={profile}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            marginTop: 8,
          }}></Image>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20,
          }}>
          Jenna Ezarik
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              marginTop: 6,
              color: 'white',
            }}>
            View Profile
          </Text>
        </TouchableOpacity>

        <View style={{flexGrow: 1, marginTop: 50}}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, 'Home', home)}
          {TabButton(currentTab, setCurrentTab, 'Search', search)}
          {TabButton(currentTab, setCurrentTab, 'Notifications', notifications)}
          {TabButton(currentTab, setCurrentTab, 'Settings', settings)}
        </View>

        <View>{TabButton(currentTab, setCurrentTab, 'LogOut', logout)}</View>
      </View>
      <Animated.View
        style={[
          styles.testpapercontainer,
          {
            borderRadius: showMenu ? 15 : 0,
            transform: [{scale: scaleValue}, {translateX: offsetValue}],
          },
        ]}>
        <Animated.View>
          <View style={styles.header}>
            <View style={styles.drawerIcon}>
              <TouchableOpacity onPress={() => drawerAnumation()}>
                <TestPaperDrawerIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.timer}>
              <Text style={styles.timercontent}>
                {hours + ':' + minutes + ':' + seconds}
              </Text>
            </View>
            <View style={styles.pp}>
              <PauseIcon />
            </View>
          </View>

          <View style={styles.slidercontainer}>
            <Animated.FlatList
              data={data}
              horizontal
              pagingEnabled
              keyExtractor={(item, index) => 'key' + index}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return <QuestionItem item={item} />;
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == 'LogOut') {
          // Do your Stuff...
        } else {
          setCurrentTab(title);
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? '#5359D1' : 'white',
          }}></Image>

        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? '#5359D1' : 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  testpapercontainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    height: 48,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  drawerIcon: {width: '20%', paddingTop: 10, paddingLeft: 10},
  timer: {
    width: '60%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timercontent: {
    lineHeight: 48,
    color: '#515C6F',
    fontSize: 20,
    fontFamily: 'nunito_semibold',
  },
  pp: {
    width: '20%',
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row-reverse',
  },
  slidercontainer: {},
});

export default withNavigation(TestPaper);
