import React from 'react';
import {View, Text} from 'react-native';
import {DrawerLayoutAndroid} from 'react-native-gesture-handler';

class Drawerable extends React.Component {
  handleDrawerSlide = status => {
    // outputs a value between 0 and 1
    console.log(status);
  };

  renderDrawer = () => {
    return (
      <View>
        <Text>I am in the drawer!</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerLayoutAndroid
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerType="front"
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}
          onDrawerSlide={this.handleDrawerSlide}>
          <View>
            <Text>Hello, it's me</Text>
          </View>
        </DrawerLayoutAndroid>
      </View>
    );
  }
}
export default Drawerable;
