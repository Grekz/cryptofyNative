import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import CurrencyCard from '../Components/CurrencyCard/';
import { Images } from '../Themes';
import BinanceRequest from '../Services/BinanceRequest/';

// Styles
import styles from './Styles/LaunchScreenStyles';

var Configs = {
  endPointUrl: 'https://www.binance.com/api/',
  APIKey: '5o9jeWDzI4WE3kYTYQdzWF4w8fvo0iKza6JN9U8VrFumOb8Cl9uHRH7gl4jrmFiD',
  secretKey: ''
};

const binanceRequest = new BinanceRequest(Configs);

// const allPricesTickers = binanceRequest.allPricesTickers();

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { homeTiles: [] };

    binanceRequest.allPricesTickers()
  }

  componentDidMount(){
    // this.fetchData.done()    
  }

  // async fetchData() {
  //   const aTiles = await binanceRequest.allPricesTickers();
  //   this.setState({ homeTiles: aTiles });
  // }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <Text>Cryptofy</Text>
          {this.state.homeTiles.map(item => {
              return <CurrencyCard/>
            })
          }
        </ScrollView>
      </View>
    )
  }
}
