import React from 'react';
import { StyleSheet, View, TextInput, Platform, Animated,
    Text, ActivityIndicator, TouchableOpacity, StatusBar,
    Dimensions, ScrollView
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Image, Input, Icon } from 'react-native-elements';

import FilmList from './FilmList';
import { getSearchFilm, getNewFilmFromApi, getImageApi } from '../TMdb/TMdbapi';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.inputText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoadFilms: false,
            position: new Animated.Value(-400),
            isConnected: true,
            newFilms: [],
        }
        // this._loadFilm = this._loadFilm.bind(this)
    }

    componentDidMount() {
        Animated.spring(this.state.position,
            {
                toValue: 0,
                useNativeDriver: false,
            }
        ).start();
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

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: []
        }, () => {
            this._loadFilm();
        }) 
    }

    _loadFilm = () => {
        if(this.inputText.length > 0) {
            this.setState({ isLoadFilms: true });
            NetInfo.fetch().then(networkState => {
                if(!networkState.isConnected) {
                    this.setState({ isConnected: false });
                }
            });
            getSearchFilm(this.inputText, this.page+1)
            .then(data => {
                this.page = data.page,
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [ ...this.state.films, ...data.results ],
                    isLoadFilms: false
                });
            });
        };
    };

    componentDidMount() {
        this._loadNewMovies();
    }

    _loadNewMovies = () => {
        getNewFilmFromApi(1).then((data) => {
            this.setState({ 
                newFilms: data.results,
            });
        })
    }

    _filmNameTextInput = (text) => {
        this.inputText = text;
    }

    _networkRequestFailled() {
        if(!this.state.isConnected) {
            return (
                <Animated.View style={[styles.modalContainer, { bottom: this.state.position }]}>
                    <View style={styles.top}></View>
                    <Text style={styles.modalTitle}>Erreur de connexion</Text>
                    <Text style={styles.modalText}>
                        Oups! Il semble que votre appareil ne soit pas connecté à Internet.
                    </Text>
                    <TouchableOpacity style={styles.network_btn} 
                        onPress={() => this.setState({ isConnected: true })}
                    >
                        <Text style={styles.button_text}>Réessayer</Text>
                    </TouchableOpacity>
                </Animated.View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#0171b7"/>
                <Input 
                    placeholder="Titre du film"
                    containerStyle={styles.textinput}
                    onSubmitEditing={() => this._searchFilms()}
                    onChangeText={(text) => this._filmNameTextInput(text)}
                    inputContainerStyle={styles.input}
                    leftIcon={() => (
                        <Icon type='ionicon' name='search' size={20} color='grey' />
                    )}
                    rightIcon={() => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5, fontSize: 20 }}>|</Text>
                            <Icon type='ionicon' name='mic-outline' size={25} color='grey' />
                        </View>
                    )}
                />
                <TouchableOpacity style={styles.button} onPress={ () => this._searchFilms()}>
                    <Text style={styles.button_text}>Rechercher</Text>
                </TouchableOpacity>
                {this.state.films.length !== 0 ? (
                    <FilmList
                        film={this.state.films}
                        navigation={this.props.navigation}
                        loadFilms={this._loadFilm}
                        page={this.page}
                        totalPages={this.totalPages}
                        favoriteList={false}
                    />
                ) : (
                    <View style={{ width }}>
                        <Text style={styles.text}>Nouveau Film</Text>  
                        <ScrollView style={{ width }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 15 }}
                        >
                            {this.state.newFilms.map((item, index) => (
                                    <TouchableOpacity style={{ marginRight: 20 }} key={index}
                                        onPress={() => this.props.navigation.navigate('FilmDetail', { 
                                            idFilm: item.id 
                                        })}
                                    >
                                        <Image style={styles.image} source={{ uri: getImageApi(item.poster_path) }} />
                                    </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
                { this._displayLoading() }
                { this._networkRequestFailled() }
            </View>
        );
    }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#e7ebee"
    },
    textinput: {
        width: width - 20,
        marginTop: 10,
        marginHorizontal: 10,
        height: 50,
        backgroundColor: "#FFF",
        paddingLeft: 10,
        borderRadius: 30,
        shadowRadius: 10,
        shadowOffset: {height: 35, width: 15},
        shadowColor: "#000",
        elevation: 6,
        shadowOpacity: 1,
        color: "#0171b7",
        fontSize: 18,
        marginRight: 20,
    },
    input: {
        borderBottomColor: 'transparent',
        borderWidth: 0,
    },
    button: {
        height: 50, 
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#0171b7",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    button_text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: "blue"
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 40,
        alignItems: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    network_btn: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    top: {
        width: 50,
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
        marginBottom: 5,
    },
    text: {
        marginVertical: 20,
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.7)',
    },
    image: {
        width: 260,
        height: 390,
        borderRadius: 20,
    }
});

export default Search;