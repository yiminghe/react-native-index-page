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
  class Index extends React.Component {
    static navigationOptions = { title, headerStyle, headerTintColor: 'white' };
    render() {
      return (
        <List navigation={this.props.navigation} demos={demos} />
      );
    }
  }

  const scenes = {
    Home: { screen: Index },
  };

  demos.map((demo) => {
    const subTitle = demo.title;
    const Demo = demo.Demo;
    let Component = React.createClass({
      statics: {
        navigationOptions: {
          title: subTitle,
          headerStyle,
          headerTintColor: 'white',
        },
      },
      render() {
        return (
          <View style={styles.content}>
            <Demo />
          </View>
        );
      },
    })
    scenes[subTitle] = {screen: Component};
  });

  const App = StackNavigator(scenes);

  AppRegistry.registerComponent('index', () => App);
}

export default getIndex;
