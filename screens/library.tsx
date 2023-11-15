import { StyleSheet, View, StatusBar, Alert, TouchableOpacity, FlatList } from "react-native";
import { Button, Header, Text, Tab, TabView,Card, Icon } from "@rneui/themed";
import {useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../axios/axiosInstance";

interface Props {
    navigation: any,
}
export default function Library(Props:Props){
    let {navigate} = Props.navigation
    const [loading,setLoading] = useState(true)
    const [favoriteList,setFavoriteList] = useState([]);
    const [watchList,setWatchList] = useState([]);

    const [index,setIndex] = useState(0);
    const token = useSelector(getToken);
    const getFavoriteList =async () => {
        try{

            let {data} = await axiosInstance.get("tmdb/movie/favorite",{headers:{Authorization:`Bearer ${token}`}})
            console.log(data)
            setFavoriteList(data)
        
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
        
    }
    const getWatchList =async () => {
        try{

            let {data} = await axiosInstance.get("tmdb/movie/watchlist",{headers:{Authorization:`Bearer ${token}`}})
            console.log(data)
            setWatchList(data)
        
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
    }
    const onRenderGetter =async () => {
        setLoading(true);
        await getFavoriteList();
        await getWatchList();
        setLoading(false);
    }
    useEffect(()=>{
        onRenderGetter().then(()=>{

        })
    },[])

    const deleteFromList =async (listName:string,id:number) => {
        setLoading(true)
        try{

            let {data} = await axiosInstance.delete(`tmdb/movie/${listName}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            console.log(data)
            let list = favoriteList
            if(listName==="watchlist"){
                list = watchList
            }
            setWatchList(list.filter((movie:any)=>{
                movie.id!=id
            }))
        
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
        setLoading(false)
    }

    const renderMovieItem = (movie:any,listName:string) => (
        <Card key={movie.id} containerStyle={styles.cardContainer}>
            <TouchableOpacity style={{flex:1}} onPress={()=>navigate("movieDetails",{id:movie.id})}>

                <Card.Image style={styles.moviePoster} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.posterPath}` }} />
                <View style={styles.cardInfoWrap}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.movieDetails}>{`${movie.releaseDate} | Rating: ${movie.voteAverage}`}</Text>
                    </View>
                    <View style={styles.cardButton}>
                        <TouchableOpacity onPress={()=>deleteFromList(listName,movie.id)}><Icon name="delete"></Icon></TouchableOpacity>
                    </View>
                </View>
                
            </TouchableOpacity>
        
        </Card>
    
    );
    const keyExtractor = (item:any) => item.id;
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Header 
                    centerComponent={<Text style={styles.HeaderText}>Library</Text>}
                    rightComponent={<Button loading={loading} onPress={()=> onRenderGetter()}><Icon name="refresh" color={"#fff"}></Icon></Button>}
                />
                <View style={styles.tabContainer}>
            <Tab indicatorStyle={{
                    backgroundColor: '#397af8',
                    height: 2,
                }} value={index} onChange={(e) => setIndex(e)}>
                <Tab.Item title="Favorites" titleStyle={styles.tabItem}/>
                <Tab.Item title="Watchlist" titleStyle={styles.tabItem}/>
            </Tab>
        </View><TabView value={index} onChange={setIndex} animationType="spring" tabItemContainerStyle={styles.tabViewContainer}>
                <TabView.Item style={styles.tabViewContainer}>
                    <FlatList
                        data={favoriteList}
                        renderItem={({item})=>renderMovieItem(item,"favorite")}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                        columnWrapperStyle={styles.movieGrid}
                    />
                </TabView.Item>
                <TabView.Item style={styles.tabViewContainer}>
                <FlatList
                        data={watchList}
                        renderItem={({item})=>renderMovieItem(item,"watchlist")}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                        columnWrapperStyle={styles.movieGrid}
                    />
                </TabView.Item>
        </TabView>

            </View>
        </SafeAreaProvider>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    HeaderText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#fff"
    },
    tabItem:{
        color: '#397af8',
        fontSize:18
    },
    tabContainer:{
        flex:0.2,
        justifyContent:"flex-start",
        alignItems:"center",
    },
    tabViewContainer:{
        flex:0.8,
        justifyContent:"center",
        alignItems:"flex-start",
        
    },
    cardInfoWrap:{
        flexDirection:"row"
    },
    cardInfo:{
        flex:0.75
    },
    cardButton:{
        flex:0.25,
        justifyContent:"center",
        
    },
    cardContainer: {
        
        backgroundColor:"parent",
        width:120,
        borderWidth:0,
        padding:0,
        // marginRight: 10,
        shadowColor:"#fff"
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
    movieGrid: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
    }
})