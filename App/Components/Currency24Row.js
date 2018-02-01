import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './Styles/Currency24RowStyles';

export default class Currency24Row extends Component {

  render() {
    return(
      <View style={{height: 14, backgroundColor: 'yellow', flex: 1, flexDirection: 'row', paddingTop: 5 }}>
        <Text style={styles.titleText}>24hr change:</Text>
        <Text style={styles.titleText}>Min: 12.3k</Text>
        <Text style={styles.titleText}>Max: 14.3k</Text>
        <Text style={styles.titleText}>-14.08%</Text>
        <Text style={styles.titleText}>Binance.com</Text>
      </View>
    )
  }
};