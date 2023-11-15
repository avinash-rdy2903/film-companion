import {ScrollView,View, StyleSheet, Alert} from 'react-native';
import { Text, Card, Image, Button, Icon } from '@rneui/themed';
import {useState,useEffect} from 'react';
import axiosInstance from '../axios/axiosInstance';
import { useSelector } from 'react-redux';
import { getToken } from '../context/slice/loginSlice';
interface Props {
    navigation: any,
    route: any
}
export default function MovieDetails(Props: { route: { params: { id: any,route:any }; }; }){
    let id = Props.route.params.id
    const token = useSelector(getToken)
    const [movieData,setMovieData] = useState<any>({})
    const [loading,setLoading] = useState(true)
    const [watchLoading,setWatchLoading] = useState(false)
    const [favoriteLoading,setFavoriteLoading] = useState(false)

    const fetchMovieData = async ()=>{
        try{
            let {data} = await axiosInstance.get(`tmdb/movie/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            setMovieData(data)
            
            setLoading(false)
        }catch(e:any){
            console.log(e.message)
        }
    }
    useEffect(()=>{
        fetchMovieData().then(()=>{
            
        })
    },[])

    const addFavorite = async ()=>{
        setFavoriteLoading(true)
        try{ 
            const payload = {
                id:movieData.id,
                title:movieData.title,
                posterPath:movieData.poster_path,
                releaseDate:movieData.release_date,
                voteAverage:movieData.vote_average
            }   
            console.log(payload)        
            let {data} = await axiosInstance.put("tmdb/movie/favorite",payload,{headers:{Authorization:`Bearer ${token}`}})
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
        setFavoriteLoading(false)
    }

    const addWatchList =async () => {
        setWatchLoading(true)
        try{
            const payload = {
                id:movieData.id,
                posterPath:movieData.poster_path,
                releaseDate:movieData.release_date,
                voteAverage:movieData.vote_average,
                title:movieData.title
            } 
            let {data} = await axiosInstance.put("tmdb/movie/watchlist",payload,{headers:{Authorization:`Bearer ${token}`}})

        }catch(e:any){
            Alert.alert("Error",e.message)
        }
        setWatchLoading(false)
    }
    return (
        <ScrollView>
            {loading?<Button loading={loading}/>:<Card containerStyle={{ padding: 0 }}>
                <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}}
                style={{ width: '100%', height: 300 }}
                />
                <View style={{ padding: 20 }}>
                <Text h4>{movieData.title}</Text>
                <Text style={{ marginBottom: 10 }}>{movieData.tagline}</Text>
                <Text style={{ marginBottom: 10 }}>{movieData.overview}</Text>
                <Text style={{ marginBottom: 10 }}>
                    Genres: {movieData.genres.map((genre:any) => genre.name).join(', ')}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Release Date: {movieData.release_date}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Runtime: {movieData.runtime} minutes
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Language: {movieData.original_language}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    IMDb Rating: {movieData.vote_average}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Status: {movieData.status}
                </Text>
                <View style={styles.rowView}>
                    <Button loading={favoriteLoading} buttonStyle={{
                            backgroundColor: 'rgba(252, 40, 93, 1)',
                            borderRadius: 5,
                        }} icon={<Icon name="favorite" color="white" style={{marginRight:5}} />} color={""} title="Favorite" onPress={() => addFavorite()} />
                    <Button loading={watchLoading} buttonStyle={{
                            backgroundColor: 'rgba(143, 143, 141, 1)',
                            borderRadius: 5,
                        }} icon={<Icon name="schedule" color="white" style={{marginRight:5}} />} radius={"sm"} title="Watch List" onPress={() => addWatchList()} />
                </View>
                    

                </View>
                
            </Card>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rowView:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    }
})