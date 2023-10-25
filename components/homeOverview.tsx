import { View, StyleSheet, ScrollView} from "react-native";
import { Text, Card, Button } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import axiosInstance from "../axios/axiosInstance";
interface Props {
    navigation: any
}
export default function HomeOverview(Props: { navigation: { navigate: any; }; }){
    let {navigate} = Props.navigation
    const token = useSelector(getToken)
    const [popularList,setPopularList] = useState<Array<Object>>([])
    const [topRatedList,setTopRatedList] = useState<Array<Object>>([])
    const [nowPlayingList,setNowPlayingList] = useState<Array<Object>>([])
    const [upcomingList,setUpcomingList] = useState<Array<Object>>([])

    const renderMovieList = (list:Array<Object>,navigateTo:string)=>{
        
        let temp = list.slice(0,7).map((movie:any, index) => (
                <Card key={index} containerStyle={styles.cardContainer}>
                    <Card.Image style={styles.cardImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }} />
                    <Text style={styles.movieTitle}>{movie.original_title}</Text>
                    <Text style={styles.movieDetails}>{`${movie.release_date} | Rating: ${movie.vote_average}`}</Text>

                </Card>
              ));
        return temp.concat([
                <View key={temp.length} style={styles.center}>
                   <Button title={"Load More"} onPress={()=>navigate(navigateTo,{list:list})}></Button>
                </View>
            ])
        
    }
    useEffect(()=>{
        const resultFromApi=async ()=>{
            try{

                let {data} = await axiosInstance.get('tmdb/popular',{headers:{Authorization:`Bearer ${token}`}})
                setPopularList(data.results)
                data = (await axiosInstance.get('tmdb/top-rated',{headers:{Authorization:`Bearer ${token}`}})).data
                setTopRatedList(data.results)
                data = (await axiosInstance.get('tmdb/now-playing',{headers:{Authorization:`Bearer ${token}`}})).data
                setNowPlayingList(data.results)
                data = (await axiosInstance.get('tmdb/upcoming',{headers:{Authorization:`Bearer ${token}`}})).data
                setUpcomingList(data.results)
            }catch(e:any){
                console.log(e.message)
            }
        }
        resultFromApi();
    },[])

    return (
        <View style={styles.container}>
        <ScrollView >
            
            <Text style={styles.sectionTitle}>Trending</Text>
            <View style={[styles.moviesListContainer]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                    {renderMovieList(popularList,"moreTrending")}

                </ScrollView>

            </View>
            <Text style={styles.sectionTitle}>Top Rated</Text>
            <View style={[styles.moviesListContainer]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                    {renderMovieList(topRatedList,"")}
                </ScrollView>
            </View>
            
            <Text style={styles.sectionTitle}>Now Playing in Theaters</Text>
            <View style={styles.moviesListContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                    {renderMovieList(nowPlayingList,"")}
                </ScrollView>
            </View>
            <Text style={styles.sectionTitle}>Up Comming</Text>
            <View style={styles.moviesListContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                    {renderMovieList(upcomingList,"")}
                </ScrollView>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding:10
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    recommendationsContainer: {
      padding: 20,
    },
    cardContainer: {
        
      width:120,
      borderWidth:0,
      padding:0,
      marginRight: 10,
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardImage:{
        width:100,
        height:100
    },
    movieDetails: {
      fontSize: 14,
      color: 'gray',
    },
    moviesListContainer: {
      flexDirection: 'row',
    },
    center:{
        justifyContent:"center",
        alignItems:"center"
    }
  });