import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView ,ActivityIndicator} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

var styles = StyleSheet.create({
    header: {
        padding: 10,
        backgroundColor: '#404040',
    },
    headerText: { color: 'white' },
    content: {
        padding: 10,
        backgroundColor: 'whitesmoke'
    },
    section: {
        margin: 5,
        borderRadius: 5,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})
export default class FAQ extends Component {
    componentWillMount() {
        this.setState({ isLoad: true })
        fetch('http://emwayweb.ir:2086/api/General/FAQManagement/select', { method: 'POST', headers: { projectid: '283c64cf-b245-e911-911d-0050560971c6' } })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                  Alert.alert('مشکل در اتصال به سررور !!!', `
                  -اتصال خود را به اینترنت بررسی کنید
                  `)
                  this.props.navigation.navigate('Home');
                }
            })
            .then(response => {
                this.state.isLoad = false;
                this.setState({ questions: response, isLoad: false })
                // ...
            }).catch(error => {
              Alert.alert('مشکل در اتصال به سررور !!!', `
              -اتصال خود را به اینترنت بررسی کنید
              `)
              this.props.navigation.navigate('Home');;
            });
    }
    state = {
        activeSections: [],
        questions: []
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.Questiontext}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.Responsetext}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        if (this.state.isLoad)
            return <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                <ActivityIndicator color="#f15f2a" size="large" />
            </View>
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <ScrollView style={{ flex: 1, textAlign: 'center' }} >
                    <Text style={{ padding: 10, textAlign: 'center', flex: 1, fontSize: 25, color: 'black' }}>
                        سوالات متداول
                    </Text>
                    <View style={{ height: 2, width: '70%', backgroundColor: '#f15f2a', alignSelf: 'center', marginBottom: 50 }}></View>
                    {/* <View style={{ backgroundColor: 'red',flex:1 }}> */}
                    <Accordion
                        sectionContainerStyle={styles.section}
                        // containerStyle={{marginTop:10}}
                        sections={this.state.questions}
                        touchableProps={{ underlayColor: "#505050" }}
                        activeSections={this.state.activeSections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                    {/* </View> */}
                </ScrollView>
            </View>
        );
    }
}
