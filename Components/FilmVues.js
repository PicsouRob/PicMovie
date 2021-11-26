import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import FilmList from './FilmList';

export class FilmVues extends Component {

    _vueFilm() {
        if(this.props.vueMovies.length == 0) {
            const imageSource = require('../image/empty.jpg');
            return (
                <View style={styles.vue_empty}>
                    <Image style={styles.image} source={imageSource} />
                    <Text style={styles.text_bold}>Votre liste de film vu est vide</Text>
                    <Text style={styles.text_guide}>Pour ajouter les films que vous avez deja vu, veillez cliquez sur le boutton "Ajouter comme deja vu" retrouvrer tout en bas dans les details du film...</Text>
                </View>
            )
        } else {
            return (
                <FilmList
                    film={this.props.vueMovies.reverse()}
                    navigation={this.props.navigation}
                    favoriteList={false}
                />
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._vueFilm()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vueMovies: state.VueReducers.vueMovies,
    }
}

const styles = StyleSheet.create({
    vue_empty: {
        marginTop: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 230,
    },
    text_bold: {
        marginVertical: 20,
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
    },
    text_guide: {
        paddingHorizontal: 30,
        textAlign: "center",
    },
});

export default connect(mapStateToProps)(FilmVues);