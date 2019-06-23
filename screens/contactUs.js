import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
    parent: { flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-evenly', height: 200 },
    section: { margin: 2, flexDirection: 'row', alignItems: 'stretch', padding: 10, marginTop: 20, marginBottom: 20 },
    sectionIcon: { flex: 1, alignItems: 'center', paddingTop: 10 },
    sectionContent: { flex: 4, },
    desc: { textAlign: 'right', color: 'black' },
    title: { color: 'black' },
})

export default class ContactUs extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <Text style={{ padding: 10, textAlign: 'center', fontSize: 25, color: 'black' }}>
                        تماس با ما
                     </Text>
                    <View style={{ height: 2, width: '70%', backgroundColor: '#f15f2a', alignSelf: 'center', }}></View>
                </View>
                <View style={styles.parent}>

                    <View >
                        <View style={styles.section}>
                            <View style={styles.sectionContent}>
                                <Text style={styles.title}>دفتر مرکزی ام وی</Text>
                                <Text style={styles.desc}>
                                    فارس شيراز بلوار استقلال نبش بعثت ساختمان پارسیس 5 طبقه اول واحد 2
                                </Text>
                            </View>
                            <View style={styles.sectionIcon}>
                                {/* <Image source={require('../images/pin-8-32.png')}></Image> */}
                                <Icon color="#333" name="map-marker-alt" size={35}></Icon>
                            </View>
                        </View>
                        <TouchableHighlight style={styles.section} onPress={() => Linking.openURL('tel:07138317203')}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.title}>
                                        شماره تماس
                                    </Text>
                                    <Text style={styles.desc}>
                                        (071) 38317203
                         </Text>
                                </View>

                                <View style={styles.sectionIcon}>
                                    {/* <Image
                                        source={require('../images/phone-18-32.png')}
                                    /> */}
                                    <Icon color="#333" name="phone" size={40}></Icon>
                                </View>
                            </View>

                        </TouchableHighlight>
                        <TouchableHighlight style={styles.section} onPress={() => Linking.openURL('mailto:emway.ir@gmail.com')}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.title}>
                                        ایمیل
                         </Text>
                                    <Text style={styles.desc}>
                                        emway.ir@gmail.com
                         </Text>
                                </View>
                                <View style={styles.sectionIcon}>
                                    {/* <Image source={require('../images/message-outline-32.png')}></Image> */}
                                    <Icon color="#333" name="envelope" size={40}></Icon>
                                </View>
                            </View>

                        </TouchableHighlight>
                    </View>

                </View>
            </View>


        );
    }
}