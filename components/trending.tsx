import { Card, Text } from '@rneui/themed';
import { useState } from 'react';
import {View,FlatList, StyleSheet} from 'react-native';
import axiosInstance from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { getToken } from '../context/slice/loginSlice';
import { getCountryCode } from '../context/slice/locationSlice';
interface Props {
    navigation: any,
    route: any
}
export default function Trending(Props: { route: { params: { tempList: any,listName:String,countryCode:String,route:any }; }; }){
    let {tempList,listName,} = Props.route.params
    const token = useSelector(getToken)
    const countryCode = useSelector(getCountryCode)
    const [page,setPage] = useState(1)
    const [list,setList] = useState(tempList)
    const renderMovieItem = (item:any) => (
        <Card containerStyle={styles.movieCard}>
            <Card.Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieDetails}>{`${item.release_date} | Rating: ${item.vote_average}`}</Text>
        </Card>
      );
    const keyExtractor = (item:any) => item.id;
    const fetchNextPage = async ()=>{
      
      const {data} = await axiosInstance.get(`tmdb/${listName}?region=${countryCode}`,{params:{region:countryCode,page:(page+1)},headers:{Authorization:`Bearer ${token}`}})
      // console.log(data)
      setList([...list,...data.results])
      setPage((page+1))
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({item})=>renderMovieItem(item)}
                keyExtractor={keyExtractor}
                numColumns={2}
                onEndReachedThreshold={0.8}
                onEndReached={fetchNextPage}
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