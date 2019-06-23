import React, { Component } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, SafeAreaView, Linking, ActivityIndicator, FlatList } from 'react-native';
import ImageSlider from 'react-native-image-slider';

var styles = StyleSheet.create({
    customSlide: { height: 200, },
    customImage: { flex: 1 },
    container: { flex: 1, height: 200, },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#303030'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    detail: {
        flex: 1,
        // backgroundColor: "black"
    },
    off: {
        backgroundColor: '#f15f2a',
        // backgroundColor: '#00e676',
        width: 80,
        textAlign: "center",
        fontSize: 13,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        fontFamily: 'IRANYekanMsn',
        fontSize: 20,
        // fontWeight:'bold',
        // paddingBottom: 20,
        // paddingTop: 20,
        paddingRight: 10,
        // flex: 1,
        // flexDirection:'row'
        color: 'black'
    },
    titleContainer: {
        textAlign:'right',
        alignItems:'flex-end',
        marginTop:10,
        marginBottom:10
        // flex: 1,
        // flexDirection: "row-reverse",
        // alignItems: 'center'
    },
    openTime: {
        flex: 1,
        textAlign: "center",
        color: 'black'
    },
    openTimeContainer: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: 5,
        // backgroundColor: '#404040',
        // backgroundColor: '#9C27B0'
        backgroundColor: 'whitesmoke'
    },
    featuresContainer: {
        // flexDirection: "row-reverse",
        // alignItems: 'center',
        padding: 5,
        // backgroundColor: '#404040',
        // backgroundColor: "#9C27B0",
        backgroundColor: 'whitesmoke',
        color: 'black'
    },
    featuresText: { color: 'black', flex: 1, padding: 5, fontSize: 13 },
    phoneNumber: {
        // backgroundColor: '#606060',
        // backgroundColor: "#77008b",
        backgroundColor: '#ccc',
        color: 'white',
        padding: 2,
        margin: 2,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    white: { color: 'white' },
    black: { color: 'black' }
})
export default class Detail extends Component {
    sampleData = {
        "Images": [
            "/Content/ServiceImages/46.jpg",
            "/Content/ServiceImages/48.jpg",
            "/Content/ServiceImages/49.jpg",
            "/Content/ServiceImages/315.jpg"],
        "Id": 6,
        "Title": "بیرون بر غدیر با غذاهای خوشمزه",
        "Category": "رستوران و فست فود و کافه و بستنی",
        "Location": "شاهزاده قاسم",
        "City": "شیراز",
        "Province": "فارس",
        "OfferPercent": 18.4,
        "Description": "\u003cp\u003eارائه انواع غذا های خوشمزه\u003c/p\u003e\r\n\r\n\u003cp\u003eپخت انواع غذا برای نذری و مجالس شما\u003c/p\u003e\r\n",
        "CompleteDescription": "\u003cp\u003eمنافع این مجموعه جهت ایتام انجمن نیکوکاری امام علی (ع) شیراز صرف میگردد.\u003c/p\u003e\r\n",
        "ExpiryDate": "1399/03/29",
        "OpenHours": "11 صبح لغایت 15:30 ظهر",
        "OpenDays": "هر روز هفته به جز جمعه ها",
        "LandPhoneNumber": "07137366222 -07137366۳۳3",
        "Address": "چهار راه شاهزاده قاسم - کوچه جنب هتل نصیرالملک - وسط کوچه بیرون بر غدیر",
        "ServiceFeatures": [
            "کارت خوان",
            "پذیرایی در محل",
            "جای پارک آسان"],
        "ServiceAdditionalFeatures": [
            "کیفیت بالا",
            "قیمت مناسب ",
            "بیرون بر غدیر با غذاهای خوشمزه و عالی",
            "کافیست یکبار امتحان کنید تا برای همیشه مشتری شوید",
            "در صورت بسته بودن تماس حاصل فرمایید",
            " انواع غذاهای خوشمزه و با کیفیت ایرانی را در رستوران و بیرون بر غدیر  نوش جان کنید"],
        "ServiceConditions": [
            "جهت پخت های سنگین و مجالس از قبل هماهنگ شود\t",
            "ارایه خدمات بیرون بری فقط ناهار انجام میشود",
            "شام بصورت سفارشی پذیرفته می شود",
            "آماده دریافت نذورات جهت ایتام و مستمندان انجمن نیکوکاری امام علی (ع) می باشد"]
    }

    state = { data: {}, isLoad: false }
    componentWillMount() {
        this.state.isLoad = true;
        fetch('https://emway.ir/api/service/' + this.props.navigation.getParam('id', 'NO-ID'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            })
            .then(response => {
                this.state.isLoad = false;
                this.setState({ data: response })
                // ...
            }).catch(error => {
              Alert.alert('مشکل در اتصال به سررور !!!', `
              -اتصال خود را به اینترنت بررسی کنید
              `)
              this.props.navigation.navigate('Home');
            });
    }
    render() {
        if (this.state.isLoad)
            return <View style={[styles.loadingContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#f15f2a"/>
            </View>
        return (
            <ScrollView style={{ flex: 1, /*backgroundColor: "#303030", backgroundColor: '#4e015b',*/backgroundColor: 'white' }}>
                <SafeAreaView style={styles.container}>
                    <ImageSlider

                        style={{ height: 200 }}
                        loopBothSides
                        // autoPlayWithInterval={3000}
                        images={this.state.data.Images.map(img => 'https://emway.ir' + img)}
                    />

                </SafeAreaView>

                <View style={styles.detail}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.state.data.Title}
                        </Text>
                        <Text style={[styles.off,]}>
                            {this.state.data.OfferPercent}% OFF
                        </Text>
                    </View>
                    <View style={styles.openTimeContainer}>
                        <Text style={styles.openTime}>
                            {this.state.data.OpenDays}
                        </Text>
                        <Text style={styles.openTime}>
                            {this.state.data.OpenHours}
                        </Text>
                    </View>

                    <View style={[styles.openTimeContainer, { marginTop: 10 }]}>
                        <Text style={[styles.openTime, {}]}>
                            <Image source={require('../images/pin-8-32.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
                            {this.state.data.Province} - {this.state.data.City} - {this.state.data.Address}
                        </Text>
                    </View>

                    <View style={[styles.openTimeContainer, { marginTop: 10 }]}>
                        <Text style={styles.openTime}>
                            شماره تماس
                        </Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={this.state.data.LandPhoneNumber.split('-')}
                                renderItem={({ item }) => {
                                    return (
                                        <Text style={styles.phoneNumber} onPress={() => { Linking.openURL('tel:' + item); }}>
                                            <Image
                                                source={require('../images/phone-18-32.png')}
                                                style={{ width: 20, height: 20 }} />
                                            {item}
                                        </Text>
                                    )

                                }}
                            />
                            {/* <Text style={styles.phoneNumber} onPress={() => { Linking.openURL('tel:' + this.state.data.LandPhoneNumber.split('-')[0]); }}>
                                <Image
                                    source={require('../images/phone-18-32.png')}
                                    style={{ width: 20, height: 20 }} />
                                {this.state.data.LandPhoneNumber.split('-')[0]}
                            </Text>
                            <Text style={styles.phoneNumber} onPress={() => { Linking.openURL('tel:' + this.state.data.LandPhoneNumber.split('-')[1]); }}>
                                <Image
                                    source={require('../images/phone-18-32.png')}
                                    style={{ width: 20, height: 20 }} />
                                {this.state.data.LandPhoneNumber.split('-')[1]}
                            </Text> */}
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, backgroundColor: '#f15f2a', padding: 10, borderTopRightRadius: 5,borderTopLeftRadius:5, ...styles.white }}>ویژگی ها</Text>
                    <View style={[styles.featuresContainer, ]}>
                        <FlatList
                            style={{ padding: 10 }}
                            data={this.state.data.ServiceAdditionalFeatures}
                            renderItem={({ item }) => (

                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                    <Text style={[styles.black, { fontSize: 22 }]}>{'\u2022'}</Text>
                                    <Text style={styles.featuresText}>{item}</Text>
                                </View>

                            )
                            }
                        />
                    </View>
                    <Text style={{ marginTop: 10, backgroundColor: '#f15f2a', padding: 10, borderTopRightRadius: 5,borderTopLeftRadius:5, ...styles.white }}>شرایط</Text>
                    <View style={[styles.featuresContainer]}>
                        <FlatList
                            style={{ padding: 10 }}
                            data={this.state.data.ServiceConditions}
                            renderItem={({ item }) => (

                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                    <Text style={[styles.black, { fontSize: 22 }]}>{'\u2022'}</Text>
                                    <Text style={styles.featuresText}>{item}</Text>
                                </View>

                            )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
