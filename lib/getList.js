import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import List from 'antd-mobile/lib/list';
import SearchBar from 'antd-mobile/lib/search-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 64 : 54,
  },
});

function getList(allDemos) {
  const DemoList = React.createClass({
    getInitialState() {
      return {
        searchText: '',
        demos: allDemos,
      };
    },

    componentDidMount() {
      this.search(this.state.searchText);
    },

    onPressRow(title) {
      if (title) {
        Actions[title]();
      } else {
        console.warn('demo module must has title');
      }
    },

    search(text) {
      this.setState({
        demos: allDemos.filter(({ title }) => {
          return title.indexOf(text) !== -1;
        }),
        searchText: text,
      });
    },

    render() {
      return (
        <View style={styles.container}>
          <SearchBar
            onChange={(text) => {
              this.search(text);
            }}
          />
          <ScrollView>
            <List
              style={{
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {
                this.state.demos.map(({ title }, i) => (
                  <List.Item
                    onClick={() => {
                      this.onPressRow(title);
                    }}
                    arrow="horizontal"
                    key={title}
                  >
                    {title}
                  </List.Item>
                ))
              }
            </List>
          </ScrollView>
        </View>
      );
    },
  });
  return DemoList;
}

export default getList;
