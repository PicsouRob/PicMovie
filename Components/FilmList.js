import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.page = this.props.page,
        this.totalPages = this.props.totalPages,
        this.state = {
            films: [],
        }
    }

    _displayDetailFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.film}
                keyExtractor={(item, index) => String(index)}
                extraData={this.props.favoriteFilm}
                renderItem={({item}) => (
                    <FilmItem 
                        films={item} 
                        isFavorite={(this.props.favoriteFilm.findIndex(index => index.id === item.id) !== -1) ? true : false}
                        detailFilm={this._displayDetailFilm}
                    />
                )}
                onEndReachedThreshold={0,5}
                onEndReached={ () => {
                    if(this.props.page < this.props.totalPages) {
                        return this.props.loadFilms()
                    }
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
        favoriteFilm: state.FavToggle.favoriteFilm,
    }
}

export default connect(mapStateToProps)(FilmList);