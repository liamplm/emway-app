import React, { Component } from 'react';
import { Text, View, Linking, TouchableHighlight, StyleSheet } from 'react-native';

var pageStyle = StyleSheet.create({
    circle: {
        width: 120,
        height: 120,
        margin: 10,
        borderRadius: 60,
        backgroundColor: '#842833',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'white'
    },
    circleText: { textAlign: 'center', color: 'white' }
})
export default class RataServices extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View>
                    <Text style={{ padding: 10, textAlign: 'center', fontSize: 25, color: 'black' }}>
                        خدمات گروه نرم افزاری راتا
                    </Text>
                    <View style={{ height: 2, width: '70%', backgroundColor: '#f15f2a', alignSelf: 'center', }}></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            {/* <TouchableHighlight  onPress={() => Linking.openURL('http://www.emwayweb.ir')}> */}
                            <Text style={pageStyle.circleText}>
                                بانک مشاغل
                               </Text>
                            {/* </TouchableHighlight> */}
                        </TouchableHighlight>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            <Text style={pageStyle.circleText}>
                                پرواز
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            <Text style={pageStyle.circleText}>
                                اماکن
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            <Text style={pageStyle.circleText}>
                                مشاور املاک

                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            <Text style={pageStyle.circleText}>
                                بازار خرید
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={pageStyle.circle} onPress={() => Linking.openURL('http://www.emwayweb.ir')}>
                            <Text style={pageStyle.circleText}>
                                تور
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{ height: 2, width: '70%', backgroundColor: '#f15f2a', alignSelf: 'center', }}></View>
                    <TouchableHighlight onPress={() => Linking.openURL('http://www.RataTec.com')}>
                        <Text style={{ padding: 10, textAlign: 'center', fontSize: 25, color: 'white' }}>
                            WWW.RataTec.com
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
