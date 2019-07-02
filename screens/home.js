

import React, { Component } from 'react';
import { Linking, SafeAreaView, Image, TouchableHighlight, StyleSheet, Text, View, } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Icon from "react-native-vector-icons/Ionicons";

export default class Home extends Component {
  state = { catList: [] }
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    let catlist = []
    for (let index = 0; index < 10; index++) {
      catlist.push(
        <Text>hello {index}</Text>
      )
    }
    this.setState({ catList: catlist })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>

        {/* {(this.state.catList)} */}
        <View style={{ flex: 1, flexDirection: 'row', }}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Search');
            }}
            style={styles.box}>
            <View style={styles.boxContent}>
              <Icon
                name="md-search"
                color="#9C27B0"
                size={60}
              />
              <Text style={styles.boxContentText}>جست و جوی فروشگاه ها</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Categories');
            }}
            style={styles.box}>
            <View style={styles.boxContent}>
              <Icon
                name="md-grid"
                color="#9C27B0"
                size={60}
              />
              <Text style={styles.boxContentText}>دسته بندی ها</Text>
            </View>

          </TouchableHighlight>
        </View>
        {/* <View style={styles.middleBox}></View> */}

        <View style={styles.middleBox}>
          <ImageSlider
            style={{ height: 200 }}
            // autoPlayWithInterval={3000}
            images={['/SiteLayout/assets/images/pages/timeline-1-1-thumbnail.jpg', '/SiteLayout/assets/images/pages/timeline-1-2-thumbnail.jpg', '/SiteLayout/assets/images/pages/timeline-1-3-thumbnail.jpg'].map(img => 'https://emway.ir' + img)}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', }}>
          <TouchableHighlight style={styles.box} onPress={() => this.props.navigation.navigate('Services')}>
            <View style={styles.boxContent}>
              <Icon
                name="md-list"
                color="#9C27B0"
                size={60}
              />
              {/* <Image
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
                source={require('../images/report-3-64.png')}
              /> */}
              <Text style={styles.boxContentText}>خدمات</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.box} onPress={() => Linking.openURL('https://emway.ir')}>
            <View style={styles.boxContent}>
              <Icon
                name="md-globe"
                color="#9C27B0"
                size={60}
              />
              <Text style={styles.boxContentText}>وب سایت</Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>

    );
  }
}
var styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 7,
    alignItems: "center",
    alignContent: 'center',
    flexDirection: "row",
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 0.5
    // borderColor: '#9C27B0',
  },
  boxContent: { alignSelf: 'center', alignItems: "center", flex: 1 },
  boxContentText: { color: '#9C27B0' },
  middleBox: {
    flex: 1,
    margin: 7,
    borderRadius: 5,
    // backgroundColor: "rgba(214, 86, 40,0.9)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
