import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getTopRAtedMovies } from '../TMdb/TMdbapi';
import FilmList from './FilmList';

class TopRated extends React.Component {

    constructor(props) {
        super(props)
        this.pages = 0,
        this.totalPages = 0,
        this.state = {
            film: [],
            isLoading: false,
        }
        // this._loadFilms = this._loadFilms.bind(this)
    }

    componentDidMount() {
        this._loadFilms();
    }

    _loadFilms = () => {
        this.setState({ isLoading: true })
        getTopRAtedMovies(this.pages+1).then((data) => {
            this.pages = data.page,
            this.totalPages = data.total_pages,
            this.setState({
                film: [...this.state.film, ...data.results],
                isLoading: false,
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
        )
    }
}

const styles = StyleSheet.create({})

export default TopRated;

