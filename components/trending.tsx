import { Card, Text } from '@rneui/themed';
import {View,FlatList, StyleSheet} from 'react-native';

interface Props {
    navigation: any,
    route: any
}
export default function Trending(Props: { route: { params: { list: any; }; }; }){
    let {list} = Props.route.params
    const renderMovieItem = (item:any) => (
        <Card containerStyle={styles.movieCard}>
            <Card.Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }} />
            <Text style={styles.movieTitle}>{item.original_title}</Text>
            <Text style={styles.movieDetails}>{`${item.release_date} | Rating: ${item.vote_average}`}</Text>
        
        </Card>
      );
    const keyExtractor = (item:any) => item.id;
    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({item})=>renderMovieItem(item)}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={styles.movieGrid}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    recommendationsContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    movieCard: {
      width: '45%',
      margin: 5,
    },
    moviePoster: {
      height: 200,
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    movieDetails: {
      fontSize: 14,
      color: 'gray',
    },
    detailsButton: {
      marginVertical: 10,
    },
    movieGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  });