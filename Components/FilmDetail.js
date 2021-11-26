import React, { useEffect } from 'react';
import { View, Share, FlatList, Platform, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { getFilmDetailFromApi } from '../TMdb/TMdbapi';
import { getImageApi } from '../TMdb/TMdbapi';
import { favAction } from '../Store/Action/FavAction';
import { vueAction } from '../Store/Action/VueAction';

class FilmDetail extends React.Component {
  constructor (props) {
    super(props)
    this.isLoading = ""
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._shareFilm = this._shareFilm.bind(this);
  }

  _displayLoading () {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  }

  componentDidMount () {
    const favFilmIndex = this.props.favoriteFilm.findIndex(item => item.id === this.props.route.params.idFilm.id);
    if(favFilmIndex !== -1) {
      this.setState = ({
        film: this.props.favoriteFilm[favFilmIndex],
      }); //() => this._updateNavigationParam() in callack
    }

    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.route.params.idFilm).then((data) => {
      this.isLoading = false
      this.setState({
        film: data,
        isLoading: false
      }); //() => this._updateNavigationParam() in callack
    })
  }

  componentDidUpdate () {
    // console.log(this.props)
  }

  _favoriteFilmToggle () {
    this.props.dispatch(favAction(this.state.film));
  }

  _isFavoriteToggle () {
    var imageSource = require("../image/heart-131965017458786724.png");
    if(this.props.favoriteFilm.findIndex((item) => item.id === this.state.film.id) !== -1) {
      imageSource = require("../image/fav1.png"); 
    }
    return (
      <Image style={styles.image_fav} source={imageSource} />
    )
  }

  _isVueToggle() {
    if(this.props.vueMovies.findIndex(item => item.id === this.state.film.id) !== -1) {
      return (
        <TouchableOpacity style={styles.vue_text} onPress={() => this._vueFilmToggle()}>
          <Text style={styles.vue_font}>Deja Vu</Text>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity style={styles.non_vue_text} onPress={() => this._vueFilmToggle()}>
        <Text style={{ color: 'black', fontWeight: "bold" }}>Ajouter comme film Vu</Text>
      </TouchableOpacity>
    )
  }

  _vueFilmToggle() {
    this.props.dispatch(vueAction(this.state.film));
  }

  _castingMovies() {
    const { film } = this.state
    return (
      <FlatList 
          data={film.credits.cast.map( (name) => name)}
          keyExtractor={(item, index) => String(index)}
          renderItem={ ({item}) => (
            <View style={styles.cast_container}>
              <Image style={styles.cast_image} source={{ uri: getImageApi(item.profile_path) }} />
              <Text style={styles.cast_name}>{item.name}</Text>
              <Text style={styles.cast_name_movie}>{item.character}</Text>
            </View>
          )}
          horizontal={true}
      />
    )
  }

  _dateMovies() {
    const { film } = this.state
    const time = film.runtime.toString();
    const hr = time.slice(0, 1)
    const min = time.slice(1, 3)

    
    if(min > 59) {
      return `2 h ${min-60} min`
    }

    return `${hr} h ${min} mn` 
  }

  _playerVideo() {
    const { film } = this.state;
    this.props.navigation.navigate("Video", { title: film.title , link: film.videos.results[1].key });
  }

  _dispalyFilms () {
    const { film } = this.state
    if (this.state.film != undefined) {
      return (
        <View style={{ paddingBottom: 50 }}>
          <View style={styles.header}>
            <TouchableOpacity style={{  }} onPress={ () => this.props.navigation.goBack() } >
              <Icon size={28} color="#fff" name="arrow-back-outline" type="ionicon" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>{film.title}</Text>
            <TouchableOpacity style={{  }} onPress={ () => this._shareFilm() }>
              <Icon size={28} color="#fff" name="share-social-outline" type="ionicon" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.image_container}>
              <ImageBackground style={styles.image_background} source={{ uri: getImageApi(film.backdrop_path)}}>
                  <TouchableOpacity style={styles.bottom_play} onPress={ () => null } >
                    <Icon size={40} color="#fff" name="play" type="ionicon" style={styles.play_video} />
                  </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.score}>
              <View style={styles.score_align}>
                <Icon name='star' type='font-awesome' color='#f1c40f' />
                <Text style={styles.score_bold}>{film.vote_average}</Text>
                <Text style={styles.score_gray}>{film.popularity}</Text>
              </View>
              <View style={styles.score_align}>
                <Icon
                  style={{ color: 'yellow' }} name='star'
                  type='font-awesome' color='green' />
                <Text style={styles.score_bold}>Rate This</Text>
                <Text></Text>
              </View>
              <View style={styles.score_align}>
                <Icon name='lastfm-square' type='font-awesome' color='green' />
                <Text style={styles.score_bold}>Metascore</Text>
                <Text style={styles.score_gray}>Critic Reviews</Text>
              </View>
            </View>
            <View style={styles.text_container}>
              <View style={styles.title_container}>
                <Text style={styles.title}>{film.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.info}>{film.release_date.slice(0, 4)}</Text>
                  <Text style={styles.info}>{this._dateMovies()}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.genre}>{film.genres.map((genre) => genre.name).join(' / ')}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.fav} onPress={() => this._favoriteFilmToggle()}>
                {this._isFavoriteToggle()}
              </TouchableOpacity>
            </View>
            <View style={styles.plot}>
              <Text style={styles.plot_text}>Plot Summary</Text>
              <Text style={styles.score_gray}>{film.overview}</Text>
            </View>
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>Cast</Text>
              {this._castingMovies()}
            </View>
            <View style={styles.info_sup}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text  style={{ fontWeight: "bold", fontSize: 17 }}>Budget: </Text>
                <Text style={{ fontSize: 15 }}>
                  {numeral(film.budget).format('0,0[.]00 $')}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text  style={{ fontWeight: "bold", fontSize: 17 }}>Nombres de votes: </Text>
                <Text style={{ fontSize: 15 }}>
                  {film.vote_count}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Text  style={{ fontWeight: "bold", fontSize: 17, }}>Companie(s): </Text>
                <View style={{ flexShrink: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, paddingTop: 3 }}>
                    {film.production_companies.map((company) => company.name).join(' / ')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text  style={{ fontWeight: "bold", fontSize: 17 }}>Countrie: </Text>
                <Text style={{ fontSize: 15 }}>
                  {film.production_countries.map((company) => company.name)}
                </Text>
              </View>
            </View>
            <View style={styles.vue_movie}>
              {this._isVueToggle()}
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._dispalyFilms()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  header: {
    height: 50,
    flexDirection: 'row', 
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#0171b7',
    paddingHorizontal: 10,
  },
  image_container: {
    // margin: 10,
    height: 230,
    borderRadius: 20,
    justifyContent: "center",
  },
  image_background: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  bottom_play: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "red",
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flexDirection: 'column'
  },
  text_container: {
    marginTop: 40,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  title_container: {
    flex: 7,
    paddingVertical: 15,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  plot_text: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  plot: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  cast_container: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 7,
    marginTop: 10,
  },
  cast_image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  cast_name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cast_name_movie: {
    color: "gray",
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  genre: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "#f0dadb",
    borderColor: "#c7101a",
    color: "#c7101a",
    fontWeight: "bold",
    marginRight: 5
  },
  fav: {
    width: 50,
    height: 50,
    marginTop: 40,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowRadius: 20,
    shadowOffset: {
      height: 5,
      width: 15
    },
    shadowColor: 'black',
    elevation: 25,
    shadowOpacity: 1,
  },
  image_fav: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginVertical: 10,
    marginRight: 15,
  },
  score: {
    position: 'absolute',
    right: 0,
    width: 350,
    height: 70,
    marginTop: 195,
    paddingHorizontal: 20,
    borderTopStartRadius: 50,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowRadius: 10,
    shadowOffset: {
      height: 4,
      width: 14
    },
    shadowColor: 'black',
    elevation: 25,
    shadowOpacity: 1
  },
  score_align: {
    flex: 3,
    alignItems: 'center'
  },
  score_bold: {
    fontWeight: 'bold',
  },
  score_gray: {
    color: 'gray',
    fontSize: 17,
  },
  info_sup: {
    marginHorizontal: 15,
    marginTop: 20
  },
  header_right_botton: {
    marginRight: 7,
  },
  vue_movie: {
    justifyContent: "center",
    alignItems: "center",
  },
  non_vue_text: {
    width: 250,
    height: 40,
    backgroundColor: "#fff",
    marginVertical: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 10,
    shadowOffset: {
      height: 20,
      width: 45
    },
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 1,
  },
  vue_font: {
    color: "#fff",
    fontWeight: "bold",
  },
  vue_text: {
    width: 250,
    height: 40,
    backgroundColor: "#0171b7",
    marginVertical: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 30,
    shadowOffset: {
      height: 10,
      width: 45
    },
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.FavToggle.favoriteFilm,
    vueMovies: state.VueReducers.vueMovies,
  }
}

export default connect(mapStateToProps)(FilmDetail);
