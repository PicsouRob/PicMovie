import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import FadeIn from '../Animations/FadeIn';
import { getImageApi } from '../TMdb/TMdbapi';

class FilmItem extends React.Component {
    _displayFavoriteImage() {
        if (this.props.isFavorite) {
          return (
            <Icon
                name='heart'
                type='font-awesome'
                iconStyle={{ marginTop: 7, paddingRight: 5 }}
                color='red'
                size={15}
            />
          )
        }
    }

    render() {
        const { films, detailFilm } = this.props;
        return (
            <FadeIn>
                <TouchableOpacity style={styles.main_container}
                    onPress={() => detailFilm(films.id)}
                >
                    <Image style={styles.image_container} source={{uri: getImageApi(films.poster_path)}}/>
                    <View style={styles.text_container}>
                        <View style={styles.header_conntainer}>
                            {this._displayFavoriteImage()}
                            <Text style={styles.text_title}>{films.title}</Text>
                            <Text style={styles.text_vote}>{films.vote_average}</Text>
                        </View>
                        <View style={styles.desc_container}>
                            <Text numberOfLines={5}>{films.overview}</Text>
                        </View>
                        <Text style={{color: "#c0392b", fontWeight: "bold"}}>{films.popularity}</Text>
                        <View style={styles.date_container}>
                            <Text>Sorti le {films.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        );
    }
}

const styles = StyleSheet.create ({
    main_container: {
        height: 160,
        backgroundColor: "#fff",
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowRadius: 10,
        shadowOffset: {height: 35, width: 15},
        shadowColor: "black",
        elevation: 10,
        shadowOpacity: 0.8,
    },
    image_container: {
        flex: 1,
        backgroundColor: "#dff9fb",
        borderRadius: 5,
    },
    favorite_image: {
        padding: 10
    },
    text_container: {
        flex: 3,
        paddingLeft: 10
    },
    header_conntainer: {
        flex: 0,
        flexDirection: "row"
    },
    text_title: {
        fontSize: 23,
        flex: 4,
        flexWrap: "wrap"
    },
    text_vote: {
        fontSize: 20,
        color: "#ffae00",
        fontWeight: "bold",
    },
    desc_container: {
        flex: 4,
        fontSize: 15,
        paddingRight: 35
    },
    date_container: {
        fontSize: 20,
        flex: 1,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
});


export default FilmItem;