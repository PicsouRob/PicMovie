import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FilmList from './FilmList';

class FavFilm extends React.Component {    

    _favoriteFilmTog() {
        if(this.props.favoriteFilm.length === 0) {
            const imageSource = require('../image/empty.jpg');
            return (
                <View style={styles.vue_empty}>
                    <Image style={styles.image} source={imageSource} />
                    <Text style={styles.text_bold}>Votre liste de film favori est vide</Text>
                    <Text style={styles.text_guide}>Pour ajouter vos films favoris au component "Favoris", veillez cliquez sur le boutton "Avec l'image du coeur" retrouvrer au milieu dans les details du film...</Text>
                </View>
            )
        } else {
            return (
                <FilmList
                    film={this.props.favoriteFilm.reverse()}
                    navigation={this.props.navigation}
                    favoriteList={true}
                />
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._favoriteFilmTog()}
            </View>
        )
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
})

const mapStateToProps = state => {
    return {
        favoriteFilm: state.FavToggle.favoriteFilm,
    }
}

export default connect(mapStateToProps)(FavFilm);
