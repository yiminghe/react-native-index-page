// for demo & test

import getIndex from './lib/';

getIndex({
  title: 'react-native-index-page test',
  demos: [
    require('./tests/A'),
    require('./tests/B'),
  ],
});
