import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import List from './getList';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

const headerStyle = {
  backgroundColor: 'black',
};

function getIndex({ demos, title = "demos" }) {
  let scenes = {};
  if (demos.length > 1) {
    let Index = (props) => (
      <List navigation={props.navigation} demos={demos} />
    );
    Index.navigationOptions = {
      title,
      headerStyle,
      headerTintColor: 'white',
    };

    scenes = {
      Home: { screen: Index },
    };
  }

  // directly show demo if demos.length is 1
  demos.map((demo) => {
    const subTitle = demo.title;
    const Demo = demo.Demo;
    let Component = () => (
      <View style={styles.content}>
        <Demo />
      </View>
    );
    Component.navigationOptions = {
      title: subTitle,
      headerStyle,
      headerTintColor: 'white',
    };
    scenes[subTitle] = {screen: Component};
  });

  const App = StackNavigator(scenes);

  AppRegistry.registerComponent('index', () => App);
}

export default getIndex;
