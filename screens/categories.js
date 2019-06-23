

import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet, Text, View, FlatList } from 'react-native';

import Icon from "react-native-vector-icons/FontAwesome5";

export default class Categories extends Component {
    state = {
        catList: require('../assets/cats.json')
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // let catlist = []
        // for (let index = 0; index < 10; index++) {
        //     catlist.push(
        //         index
        //     )
        // }
        // this.setState({ catList: catlist })
    }

    
    render() {
        return (
            <FlatList
                style={{ backgroundColor: "#ffffff", }}
                numColumns={2}
                keyExtractor={(item, index) => index}
                data={this.state.catList}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.navigation.navigate('Search', {
                                catId: item.id,
                            });
                        }}
                        style={styles.item}>
                        <View style={{ alignSelf: 'center', alignItems: "center", flex: 1, }}>
                            <Icon name={item.icon} size={50} color={'#9C27B0'}></Icon>
                            <Text style={{ color: '#9C27B0', fontSize: 12, textAlign: 'center' }}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                }
            />
            // <ScrollView style={{ flex: 1, backgroundColor: "#303030", flexDirection: 'row', flexWrap: 'wrap',alignItems: 'flex-start', }}>
            //     {(this.state.catList)}
            // </ScrollView>

        );
    }
}
var styles = StyleSheet.create({

    item: {
        backgroundColor: '#fff',//'rgba(0,0,0,1)',
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        height: 150,
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
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#9C27B0',
    },
});
