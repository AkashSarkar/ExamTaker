import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const QuestionItem = ({item}) => {
  return (
    <View style={{width: width, height: height}}>
      <Text>
        dsfg sdgjsdfg dkfl gsdf hgsdjlfh gsdlkfh gsdklfhg sdkjlfh
        gsdkjlfhgsdkjlfh gsdklfhg skdljfh gskdjfgh sdkjfgh kd gsld fgsdlfj
        gsl;dfj gs;dfjgs;dfkl jgsd;klf gjd;slkfj gs;dlkfjgsdl;kf jgsldk;fjg sdl
      </Text>
      <Image source={{uri: item.image}} style={{width: 50, height: 100}} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 3,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default QuestionItem;
