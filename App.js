import React, { Component } from 'react';
import { Dimensions, Easing, Animated, TouchableHighlight, FlatList, ScrollView, Platform, TouchableNativeFeedback, DrawerLayoutAndroid, View, Image, Button, StyleSheet, Text, StatusBar } from 'react-native';
import { NavigationActions, DrawerItems, SafeAreaView, createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
const { width, height } = Dimensions.get("window");
import GlobalFont from 'react-native-global-font'
// import SplashScreen from 'react-native-splash-screen';
import Routes from "./screens";
import Icon from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
  dot: {
    width: 15,
    height: 15,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    top: height / 2,
    left: (width / 2)
  }
})

const AppNavigator = createStackNavigator(
  {
    ...Routes
  },
  {
    initialRouteName: 'Home',
    // headerBackTitleVisible: false,
    defaultNavigationOptions: ({ screenProps, navigation }) => {
      return {
        transitionConfig: {
          transitionProps: {},
          prevTransitionProps: {},
          isModal: true
        },
        headerTitle: <Text style={{ fontSize: 21, paddingLeft: 15, color: 'white', justifyContent: 'center', alignItems: 'center' }}>باشگاه مشتریان ام وی</Text>,
        // headerTitle: <Image
        //   source={require('./assets/emwaylogo.png')}
        //   resizeMode="contain"
        //   style={{ width: 90, height: 50, marginLeft: 10 }}
        // />,
        headerRight: (
          <TouchableNativeFeedback
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
            onPress={screenProps.open}
            title="+1"
          >
            <Image
              resizeMode="contain"
              style={{ width: 22, height: 22, marginRight: 10 }}
              source={require('./images/menu-4-32.png')}
            // style={[styles.icon, { tintColor: tintColor }]}
            />
          </TouchableNativeFeedback>
        ),
        headerStyle: {
          // backgroundColor: '#f15f2a',
          backgroundColor: '#f15f2a',
        },
        headerTintColor: '#x`',
        headerTitleStyle: {
          color: 'white',
        },
      }
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {

  state = {
    showSplashScreen: true
  }

  constructor(props) {
    super(props);


    this.imgAnimValue = new Animated.Value(0);
    this.backgroundAnimValue = new Animated.Value(1);

    this.runSplashScreenAnim();
    // this.dotsAnimtedValues = [
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0),
    //   new Animated.Value(0)
    // ].map((dot, i) => {
    //   Animated.timing(dot, {
    //     toValue: 1,
    //     delay: i * 100,
    //     duration: 1000,
    //     easing: Easing.ease,
    //     useNativeDriver: true
    //   }).start();
    //   return dot
    // });
    GlobalFont.applyGlobal('IRANYekanMsn')
  }
  componentDidMount() {
    // SplashScreen.hide()
    setTimeout(() => {
      this.setState({ showSplashScreen: false })
    }, 3500)
  }

  runSplashScreenAnim() {
    return Animated.timing(this.imgAnimValue, {
      toValue: 4,
      delay: 0,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.state.showSplashScreen ? this.runSplashScreenAnim() : null);
  }
  openDrawer() {
    this.menudrawer.openDrawer();
  }
  closeDrawer() {
    this.menudrawer.closeDrawer();
  }
  handleNavigationChange() {
    this.closeDrawer()
  }
  navigationView() {
    return (
      <FlatList
        // style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "rgba(0,0,0,0.7)" }}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)" }}
        data={Object.keys(Routes)}
        renderItem={({ item }) => {
          if (Routes[item].isPublic === false)
            return null
          return (
            <TouchableHighlight
              onPress={() => {
                this.navigator.dispatch(
                  NavigationActions.navigate({ routeName: item })
                )
                this.closeDrawer()
              }}
              underlayColor="#505050"
              style={{ flex: 1, }}>
              <View style={{ flex: 1, flexDirection: 'row-reverse', marginBottom: 1, padding: 10 }}>
                {
                  Routes[item].isFaIcon ? (<Icon name={Routes[item].icon} size={30} color="white"></Icon>) :
                    <Image
                      resizeMode="contain"
                      style={{ width: 30, height: 30, }}
                      source={Routes[item].icon}
                    />
                }
                <Text style={{ color: 'white', padding: 5, marginStart: 5 }}>{Routes[item].title} </Text>
              </View>
            </TouchableHighlight>
          )

        }} />

    )
  }
  render() {
    if (this.state.showSplashScreen) {
      return (
        <View style={{ backgroundColor: '#f15f2a', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <Animated.Image
            source={require('./images/logo.png')}
            resizeMode="contain"
            style={
              {
                width: 200, transform: [
                  {
                    rotate: this.imgAnimValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ]
              }
            }
          />

          {/* {
            this.dotsAnimtedValues.map((dot, i) => {
              // const x = i + 1
              return (
                <Animated.View style={[
                  styles.dot, {
                    transform: [{
                      scale: dot
                    }, {
                      translateX: (Math.cos(((360 / 8) * i)) * 50)
                    }, {
                      translateY: -(Math.sin(((360 / 8) * i)) * 50)
                    }]
                  }
                ]}>
                  <Text>{i}</Text>
                </Animated.View>
              )
            })
          } */}
        </View>
      )
    }
    return (
      <DrawerLayoutAndroid
        ref={(_menudrawer) => this.menudrawer = _menudrawer}
        drawerLockMode="unlocked"
        drawerBackgroundColor="transparent"
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={this.navigationView.bind(this)}>
        {/* <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.5)"
          animated
        /> */}
        {/* <View style={{ height: StatusBar.currentHeight, backgroundColor: '#606060' }}></View> */}
        <AppContainer
          onNavigationStateChange={this.handleNavigationChange.bind(this)}
          ref={nav => {
            this.navigator = nav;
          }}
          screenProps={{ open: this.openDrawer.bind(this) }} />

      </DrawerLayoutAndroid>

    );
  }
}
