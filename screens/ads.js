import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native';
import ImageSlider from 'react-native-image-slider';

const styles = StyleSheet.create({

})
export default class Ads extends Component {
  state = { ads: [] }
  componentWillMount() {
    fetch('http://37.187.204.53:2086/api/EMway/EMwayAdvertisementManagement/select', { method: 'POST' })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        // alert(JSON.stringify(response))
        this.setState({ ads: response })
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (

      <ImageSlider
        autoPlayWithInterval={5000}
        images={this.state.ads}
        customSlide={({ index, item, style, width }) => (
          // It's important to put style here because it's got offset inside
          <TouchableHighlight style={{flex:1, backgroundColor: 'white'}} onPress={() => { Linking.openURL(item.Link) }}>
            <View key={index} style={[style, { flex: 1 }]}>
              <Image source={{ uri: `http://37.187.204.53:2086/api/UploadedFiles/${item.GUID}.${item.Extension}` }} style={{ width: '100%', height: '100%' }} />
            </View>
          </TouchableHighlight>
        )}
        customButtons={() => null}
      />

    );
  }
}
