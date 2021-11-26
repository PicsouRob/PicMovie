import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import FilmList from './FilmList';
import { getNewFilmFromApi } from '../TMdb/TMdbapi';

class NewMovies extends PureComponent {

    constructor(props) {
        super(props)
        this.pages = 0,
        this.totalPages = 0,
        this.state = {
            film: [],
            isLoadFilms: true,
        }
        // this._loadFilms = this._loadFilms.bind(this)
    }

    componentDidMount() {
        this._loadFilms();
    }

    _displayLoading() {
        if(this.state.isLoadFilms) {
            return (
                <View style={ styles.loading_container }>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }

    _loadFilms = () => {
        this.setState({ isLoadFilms: true })
        getNewFilmFromApi(this.pages+1).then((data) => {
            this.pages = data.page,
            this.totalPages = data.total_pages,
            this.setState({
                film: [...this.state.film, ...data.results],
                isLoadFilms: false,
            })
        });
    }

    render() {
        return (
            <FilmList
                film={this.state.film}
                navigation={this.props.navigation}
                loadFilms={this._loadFilms}
                page={this.pages}
                totalPages={this.totalPages}
                favoriteList={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: "blue"
    }
})

export default NewMovies;
