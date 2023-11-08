import { View, StyleSheet, ScrollView} from "react-native";
import { Text, Card, Button, Overlay } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import { getCountryCode} from "../context/slice/locationSlice";
import axiosInstance from "../axios/axiosInstance";
import axios from "axios";
interface Props {
    navigation: any
}
export default function HomeOverview(Props: { navigation: { navigate: any; }; }){

    const dispatch = useDispatch<any>()

    let {navigate} = Props.navigation
    const token = useSelector(getToken)
    const countryCode = useSelector(getCountryCode)
    
    const [popularList,setPopularList] = useState<Array<Object>>([])
    const [topRatedList,setTopRatedList] = useState<Array<Object>>([])
    const [nowPlayingList,setNowPlayingList] = useState<Array<Object>>([])
    const [upcomingList,setUpcomingList] = useState<Array<Object>>([])
    const [loading,setLoading] = useState(true)
    const resultFromApi=async ()=>{
        try{
            let {data} = await axiosInstance.get('tmdb/popular',{params:{region:countryCode},headers:{Authorization:`Bearer ${token}`}})
            setPopularList(data.results)
            data = (await axiosInstance.get('tmdb/top-rated',{params:{region:countryCode},headers:{Authorization:`Bearer ${token}`}})).data
            setTopRatedList(data.results)
            data = (await axiosInstance.get('tmdb/now-playing',{params:{region:countryCode},headers:{Authorization:`Bearer ${token}`}})).data
            setNowPlayingList(data.results)
            data = (await axiosInstance.get('tmdb/upcoming',{params:{region:countryCode},headers:{Authorization:`Bearer ${token}`}})).data
            setUpcomingList(data.results)
            setLoading(false)
        }catch(e:any){
            console.log(JSON.stringify(e))
        }  
    }
    const renderMovieList = (list:Array<Object>,navigateTo:string,listName:String)=>{
        
        let temp = list.slice(0,7).map((movie:any, index) => (
                <Card key={index} containerStyle={styles.cardContainer}>
                    <Card.Image style={styles.cardImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} />
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieDetails}>{`${movie.release_date} | Rating: ${movie.vote_average}`}</Text>
                </Card>
              ));
        return temp.concat([
                <View key={temp.length} style={styles.center}>
                   <Button title={"Load More"} loading={loading} onPress={()=>navigate(navigateTo,{tempList:list,listName:listName})}></Button>
                </View>
            ])
        
    }
    useEffect(()=>{
        resultFromApi()
        console.log(countryCode)

    },[])

    if(loading){
        return (
            <View style={styles.container}>
            <ScrollView >
                <Text style={styles.sectionTitle}>Trending</Text>
                <View style={[styles.moviesListContainer]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(popularList,"moreOverview","popular")}
                    </ScrollView>
                </View>
                <Text style={styles.sectionTitle}>Top Rated</Text>
                <View style={[styles.moviesListContainer]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(topRatedList,"moreOverview",'top-rated')}
                    </ScrollView>
                </View>
                
                <Text style={styles.sectionTitle}>Now Playing in Theaters</Text>
                <View style={styles.moviesListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(nowPlayingList,"moreOverview","now-playing")}
                    </ScrollView>
                </View>
                <Text style={styles.sectionTitle}>Up Comming</Text>
                <View style={styles.moviesListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(upcomingList,"moreOverview","upcoming")}
                    </ScrollView>
                </View>
            </ScrollView>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
            <ScrollView >
                <Text style={styles.sectionTitle}>Trending</Text>
                <View style={[styles.moviesListContainer]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(popularList,"moreOverview","popular")}
                    </ScrollView>
                </View>
                <Text style={styles.sectionTitle}>Top Rated</Text>
                <View style={[styles.moviesListContainer]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(topRatedList,"moreOverview",'top-rated')}
                    </ScrollView>
                </View>
                
                <Text style={styles.sectionTitle}>Now Playing in Theaters</Text>
                <View style={styles.moviesListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(nowPlayingList,"moreOverview","now-playing")}
                    </ScrollView>
                </View>
                <Text style={styles.sectionTitle}>Up Comming</Text>
                <View style={styles.moviesListContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moviesListContainer}>
                        {renderMovieList(upcomingList,"moreOverview","upcoming")}
                    </ScrollView>
                </View>
            </ScrollView>
            </View>
        )
    }

    

    
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
      backgroundColor:"parent",
      width:120,
      borderWidth:0,
      padding:0,
      marginRight: 10,
      shadowColor:"#fff"
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