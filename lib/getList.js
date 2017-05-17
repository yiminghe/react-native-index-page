import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  rowText: {
    fontSize: 14,
    flex: 1,
  },
  rowArrow: {
    width: 16,
  }
});

export default class List extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.demos),
    };
  }

  _renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const { navigate }  = this.props.navigation;
    const { title } = rowData;
    return (
      <TouchableHighlight onPress={() => {
        navigate(title);
        highlightRow(sectionID, rowID);
      }}>
        <View style={styles.row}>
          <Text style={styles.rowText}>{title}</Text>
          <Text style={styles.rowArrow}>></Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
}
