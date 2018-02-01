import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Currency24Row from '../Components/Currency24Row/';
import { Images } from '../Themes';

import styles from './Styles/CurrencyCardStyles';

export default class CurrencyCard extends Component {


  render() {
    return(
      <View style={{ height: 74, backgroundColor: 'red', flex: 1 }} >
        <View style={{ height: 62, flex: 2, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
            <Image style={{ height: 20, width: 20 }} source={ Images.ignite }></Image>
            <Text style={{ marginLeft: 8, fontSize: 18 }}>BTC</Text>
          </View>
          <View style={{ flex:1, flexDirection: 'row', alignSelf: 'flex-end', paddingBottom: 10 }}>
            <Text style={{ marginRight: 10, fontSize: 10 }}>16.4k</Text>
            <Text style={{ fontSize: 10 }}>10.4k</Text>
          </View>
          <View style={{ marginRight: 5, marginTop: 4 }}>
            <Text style={{ textAlign: 'right', fontSize: 11 }}>Price</Text>
            <Text style={{ marginTop: 2, fontSize: 14 }}>$14,048.54</Text>
          </View>
        </View>
        <Currency24Row/>
      </View>
    )
  }
};

