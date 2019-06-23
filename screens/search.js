import React, { Component } from 'react';
import { PermissionsAndroid, Image, TouchableHighlight, StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Picker, Button } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from "react-native-vector-icons/FontAwesome5";
import GlobalFont from 'react-native-global-font'


export default class Search extends Component {
  // static navigationOptions = {
  //     drawerLabel: 'Home',
  //     drawerIcon: ({ tintColor }) => (
  //         <Image
  //             resizeMode="contain"
  //             style={{ width: 30, height: 30, marginStart: 10 }}
  //             source={require('../images/house-64.png')}
  //         />
  //     ),
  // };

  state = {
    count: 0,
    heh: true,
    text: '',
    categories: [{ name: "همه", id: 'omg' }, ...require('../assets/cats.json')],
    shops: require('../assets/shops.json'),
    isLoad: false,
    refresh: false,
    selectedCat: this.props.navigation.getParam('catId', 'NO-ID'),
    activeSections: [],
    cityList: [{ name: "-----", provinceId: "omg", id: 'omg' }, ...require('../assets/cities.json')],
    provinceList: [{ name: "-----", id: 'omg' }, ...require('../assets/provinces.json')],
    pc: [],
    selectedProvince: 'select',
    selectedCity: 'select'
  };

  constructor(props) {
    super(props);
    GlobalFont.applyGlobal('IRANYekanMsn')
    // this.getShops.bind(this)

  }
  componentDidMount() {
    this.selectCategoty(this.state.selectedCat, false);

    this.syncWithCurrentLocation();

    // this.syncWithCurrentLocation();
  }
  chnageText(text) {
    this.setState({ text })
  }
  selectCategoty(catId, refresh = true) {
    this.state.selectedCat = catId
    this.setState({ selectedCat: catId, refresh: !this.state.refresh })
    if (refresh) {
      this.getShops()
    }

  }
  getShops(check) {
    if (check) {

      this.state.selectedCat = 'omg'
      this.state.selectedProvince = 'omg'
      this.state.selectedCity = 'omg'
      this.state.text = ''
    }
    this.setState({ isLoad: true });
    fetch(`https://emway.ir/api/services?catId=${this.state.selectedCat}&provinceId=${this.state.selectedProvince}&cityId=${this.state.selectedCity}&searchQ=${this.state.text}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          Alert.alert('مشکل در اتصال به سررور !!!', `
        -اتصال خود را به اینترنت بررسی کنید
        `)
          // this.props.navigation.navigate('Home');
        }
      })
      .then(response => {
        this.setState({ shops: response, isLoad: false, refresh: !this.state.refresh })
      }).catch(error => {
        Alert.alert('مشکل در اتصال به سررور !!!', `
        -اتصال خود را به اینترنت بررسی کنید
        `)
        // this.props.navigation.navigate('Home');
      });
  }
  press() {
    this.props.navigation.navigate('Ads')
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  syncWithCurrentLocation() {
    PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION', {
      title: 'درخواست دسترسی موقعیت مکانی',
      message: 'این دسترسی برای پیدا کردن نزدیک ترین مراکز به شما مورد نیاز است.',
      buttonPositive: 'خب'
    }).then((permssionResult) => {
      if (permssionResult === 'granted') {
        this.setState({ isLoad: true });
        navigator.geolocation.getCurrentPosition((loc) => {
          // alert(loc.coords.latitude + ' - ' + loc.coords.longitude);
          this._getLocationInfo(loc.coords.latitude, loc.coords.longitude).then((locInfo) => {
            // locInfo['object']['city_fa'] = 'جهرم'
            const { province: provinceName, city_fa: cityName } = locInfo['object'],
              province = this.state.provinceList.find(
                (province) => province.name.indexOf(provinceName) > -1 || provinceName.indexOf(province.name) > -1
              ),
              city = this.state.cityList.find(
                (city) => city.provinceId === province.id && (city.name.indexOf(cityName) > -1 || cityName.indexOf(city.name) > -1)
              )

            this.setState({
              selectedProvince: province.id,
              pc: this.state.cityList.filter(c => c.provinceId == province.id).map(el => <Picker.Item key={el.id} value={el.id} label={el.name} />)
            }, () => {
              this.setState({
                selectedCity: city.id
              }, () => {
                this.getShops()
              })
            });
          })
        }, (err) => {
          console.log('err', err);
          alert(err.code)
          if (err.code === err.PERMISSION_DENIED) {
            this.getShops()
          }
        })
      }
    })
  }

  _getLocationInfo(lat, lng) {
    return fetch(`https://sandbox-api.alopeyk.com/api/v2/locations?latlng=${lat}%2C${lng}`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM1MTksImlzcyI6Imh0dHA6Ly9zYW5kYm94LXBhbmVsLmFsb3BleWsuY29tL2dlbmVyYXRlLXRva2VuLzM1MTkiLCJpYXQiOjE1NDM2NDk5NDcsImV4cCI6NTE0MzY0OTk0NywibmJmIjoxNTQzNjQ5OTQ3LCJqdGkiOiJDamRDMlIwUWFyTUNVdWo2In0.ODLypRurJGsFz2rxYQczJliqnDqjl7CsyBv9WXa2764",
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then((res) => {
      return res.json();
    }).catch(error => {
      Alert.alert('مشکل در اتصال به سررور !!!', `
      -اتصال خود را به اینترنت بررسی کنید
      `)
      // this.props.navigation.navigate('Home');
    });
  }

  render() {
    // return (
    //   <View>
    //     <Button onPress={() => this.setState({ visible: true })} title="Open emflebfkrlgkndjhhegbruk" />
    //     <Dialog.Container visible={this.state.visible}>
    //       <Dialog.Title>Account delete</Dialog.Title>
    //       <Dialog.Description>
    //         Do you want to delete this account? You cannot undo this action.
    //       </Dialog.Description>
    //       <Dialog.Button label="Cancel"  />
    //       <Dialog.Button label="Delete" onPress={() => this.setState({ visible: false })} />
    //     </Dialog.Container>
    //   </View>
    // )

    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.categories}
            extraData={this.state.refresh}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  onPress={() => { this.selectCategoty(item.id) }}
                  underlayColor="#b0b0b0"
                  style={[styles.catView, (this.state.selectedCat == item.id ? styles.selecedCat : {})]}>
                  <Text style={{ color: (this.state.selectedCat == item.id ? 'white' : 'black'), lineHeight: 13, fontSize: 12, textAlign: "center", padding: 5 }}>{item.name}</Text>
                </TouchableHighlight>
              )
            }}
          />
          <View style={{}}>
            <Accordion
              sectionContainerStyle={styles.section}
              sections={[{ name: 'asdasd' }]}
              touchableProps={{ underlayColor: "#505050" }}
              activeSections={this.state.activeSections}
              renderHeader={
                section => {
                  return (
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', backgroundColor: '#404040', padding: 10 }}>
                      <Text style={{ color: 'white' }}>
                        جستجوی پیشرفته
                                            </Text>
                      <Image source={require('../images/empty-filter-64.png')} style={{ width: 20, height: 20 }} />
                    </View>
                  );
                }
              }
              renderContent={
                section => {
                  return (
                    <View style={{ padding: 10, backgroundColor: '#fff' }}>
                      <TextInput
                        value={this.state.text}
                        style={{ height: 40, borderWidth: 1, borderColor: '#a0a0a0', borderRadius: 5, color: 'black', margin: 5 }}
                        placeholder="متن جستجو را تایپ کنید"
                        onChangeText={(text) => this.setState({ text })}
                      />
                      <View style={{ flex: 1, flexDirection: 'row', width: '100%', }}>
                        <View style={{ flex: 1, borderWidth: 1, borderColor: '#a0a0a0', borderRadius: 5, margin: 5 }}>
                          <Picker
                            selectedValue={this.state.selectedCity}
                            style={styles.Picker}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ selectedCity: itemValue })
                            }>
                            {
                              this.state.pc
                            }
                          </Picker>
                        </View>
                        <View style={{ flex: 1, borderWidth: 1, borderColor: '#a0a0a0', borderRadius: 5, margin: 5 }}>
                          <Picker
                            selectedValue={this.state.selectedProvince}
                            style={styles.Picker}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ selectedProvince: itemValue, pc: this.state.cityList.filter(c => c.provinceId == itemValue).map(el => <Picker.Item key={el.id} value={el.id} label={el.name} />) })
                            }>
                            {
                              this.state.provinceList.map((item, i) => {
                                return <Picker.Item key={item.id} value={item.id} label={item.name} />
                              })
                            }
                          </Picker>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', width: '100%', flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ flex: 3 }}>
                          {/* <Button
                                                        onPress={() => { this.getShops() }}
                                                        style={{ margin: 10, }}
                                                        title="جستجو"
                                                        color="#9C27B0"
                                                        accessibilityLabel="Learn more about this purple button"
                                                    >
                                                    </Button> */}

                          <TouchableHighlight
                            onPress={() => { this.getShops() }}
                            disabled={this.state.isLoad}
                            style={[styles.searchButton, this.state.isLoad ? { opacity: 0.6 } : {}]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                              <Icon name="search" size={20} color={'#777'} style={{ marginRight: 5, position: 'relative', bottom: -4 }}></Icon>
                              <Text style={{ fontSize: 19 }}>جست و جو</Text>
                            </View>
                            {/* <Image source={require('../images/sinchronize-48.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} /> */}
                          </TouchableHighlight>

                          {/* <TouchableHighlight onPress={() => {
                                                        this.setState({ pc: <Picker.Item key={'omg'} value={'omg'} label={'-----'} />, refresh: !this.state.refresh, selectedCat: 'omg', selectedCity: '', selectedProvince: '', text: '' })
                                                        this.getShops(true)
                                                    }} style={{ backgroundColor: "#3062e6", borderRadius: 3, padding: 5 }}>
                                                        <Image source={require('../images/sinchronize-48.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                                                    </TouchableHighlight> */}
                        </View>

                        <View style={{ flex: 1 }}>
                          <TouchableHighlight disabled={this.state.isLoad} onPress={() => {
                            this.syncWithCurrentLocation()
                          }} style={[{ backgroundColor: "#505050", borderRadius: 3, padding: 10, marginRight: 5, justifyContent: 'center', alignItems: 'center' }, this.state.isLoad ? { opacity: 0.6 } : {}]}>
                            {/* <Image source={require('../images/sinchronize-48.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} /> */}
                            <Icon name="location-arrow" size={25} color={'white'} style={{}}></Icon>
                          </TouchableHighlight>
                        </View>
                        <View style={{ flex: 1 }}>
                          <TouchableHighlight disabled={this.state.isLoad} onPress={() => {
                            this.setState({ pc: <Picker.Item key={'omg'} value={'omg'} label={'-----'} />, refresh: !this.state.refresh, selectedCat: 'omg', selectedCity: '', selectedProvince: '', text: '' })
                            this.getShops(true)
                          }} style={[{ backgroundColor: "#f15f2a", borderRadius: 3, padding: 10, justifyContent: 'center', alignItems: 'center' }, this.state.isLoad ? { opacity: 0.6 } : {}]}>
                            {/* <Image source={require('../images/sinchronize-48.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} /> */}
                            <Icon name="backspace" size={25} color={'white'} style={{}}></Icon>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  );
                }
              }
              onChange={this._updateSections.bind(this)}
            />
          </View>
        </View>
        {this.state.isLoad && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator color="#f15f2a" size="large" />
          </View>
        )}
        {this.state.shops.length == 0 && !this.state.isLoad &&
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ textAlign: 'center', color: '#9C27B0', fontFamily: 'IRANYekanMsn', fontSize: 20, fontWeight: 'bold' }}>بزودی این امکان در شهر شما ارائه میگردد</Text>
          </View>
        }
        {
          !this.state.isLoad &&
          <FlatList
            // style={styles.redBack}
            data={this.state.shops}
            // style={{height:200}}
            collapsable={true}
            removeClippedSubviews={true}
            style={{ flex: 0 }}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  style={styles.shops}
                  onPress={() => {
                    this.props.navigation.navigate('Detail', {
                      id: item.Id,
                    });
                  }}
                  underlayColor="#505050">
                  <View style={{ flex: 1, flexDirection: "row-reverse", }}>
                    <Image
                      loadingIndicatorSource={require('../assets/ajax-loader.gif')}
                      //defaultSource={require('../assets/ajax-loader.gif')}
                      source={{ uri: 'https://emway.ir/' + item.MainImageUri }}

                      style={{ flex: 1 }}
                    />
                    <View style={{ flex: 2 }}>
                      <Text style={styles.itemTitle}>{item.Title} </Text>
                      <Text style={styles.item}>{item.Category} </Text>
                      <Text style={styles.item}>{item.Province} {item.City} {item.Location} </Text>
                      <Text style={styles.off}>{item.OfferPercent}% OFF </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )
            }}
          />
        }

        {/* <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title style={{fontFamily: 'IRANYekanMsn'}}>درخواست دسترسی</Dialog.Title>
          <Dialog.Description>
            آیا مایل به دریافت نزدیک ترین مراکز به خود هستید ؟
          </Dialog.Description>
          <Dialog.Button style={{width: 50, textAlign: 'left', alignSelf: 'center'}} label="خیر" onPress={() => this.dialogHandler(false)} />
          <Dialog.Button style={{width: 50}} label="بله" onPress={() => this.dialogHandler(true) } />
        </Dialog.Container> */}

      </View>


    );
  }
}
var styles = StyleSheet.create({
  shops: {
    flex: 1,
    margin: 5,
    height: 120,
    backgroundColor: '#fff',
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#f15f2a',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,47,247,0.5)',
  },
  itemTitle: {
    padding: 5,
    fontSize: 15,
    color: 'black'
  },
  item: {
    color: '#909090',
    padding: 2,
    fontSize: 13,
  },
  off: {
    fontSize: 13,
    left: 0,
    bottom: 0,
    alignSelf: "flex-end",
    position: "absolute",
    backgroundColor: "#f15f2a",
    fontWeight: 'bold',
    padding: 5,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: -3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 10,
    color: 'white'

  },
  redBack: { backgroundColor: 'red', },

  catView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#909090',
    width: 90,
    height: 50,
    margin: 3,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'black'

  },
  selecedCat: {
    backgroundColor: '#555',
    color: 'white',
    borderColor: 'transparent'
  },
  section: {
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  Picker: {
    color: 'black',
    flex: 1,

  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 9,
    marginRight: 5,
    backgroundColor: "#eee",
    borderRadius: 3
  }
});
