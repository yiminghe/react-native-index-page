import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  BackAndroid,
  DeviceEventEmitter,
} from 'react-native';
import { Scene, Router, Reducer, Actions, ActionConst } from 'react-native-router-flux';
import getList from './getList';

const styles = StyleSheet.create({
  content: {
    ...Platform.select({
      ios: {
        marginTop: 64,
      },
      android: {
        marginTop: 54,
      },
    }),
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigationBarStyle: {
    backgroundColor: '#2e2e2e',
  },
  titleStyle: {
    color: 'white',
  },
});

let isMainScreen = false;
const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    isMainScreen = !!(action.type === ActionConst.FOCUS && action.scene && action.scene.initial);
    if (action.type === ActionConst.BACK_ACTION || action.type === ActionConst.BACK) {
      DeviceEventEmitter.emit('navigatorBack');
    }
    return defaultReducer(state, action);
  };
};

function getIndex({ demos, title = "demos" }) {
  const List = getList(demos);

  const rendered = (()=> {
    const scenes = demos.map(({ Demo, title }) => {
      let Component = React.createClass({
        render() {
          return (
            <View style={styles.content}>
              <Demo />
            </View>
          );
        },
      });

      return <Scene key={title} component={Component} title={title} />;
    });

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Router createReducer={reducerCreate}>
          <Scene key="root" navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
            <Scene key="home" component={List} title={title} initial />
            {scenes}
          </Scene>
        </Router>
      </View>);
  })();

  class Index extends React.Component {
    componentWillMount() {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (!isMainScreen) {
          Actions.pop();
          return true;
        }
        return false;
      });
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
      return rendered;
    }
  }

  AppRegistry.registerComponent('index', () => Index);
}

export default getIndex;
