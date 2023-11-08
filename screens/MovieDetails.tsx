import {ScrollView,View} from 'react-native';
import { Text, Card, Image, Button } from '@rneui/themed';
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
    const fetchMovieData = async ()=>{
        try{
            let {data} = await axiosInstance.get("tmdb/movie",{params:{id:id},headers:{Authorization:`Bearer ${token}`}})
            setMovieData(data)
            
            setLoading(false)
        }catch(e:any){
            console.log(e.message)
        }
    }
    useEffect(()=>{
        fetchMovieData().then(()=>{})
    },[])
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
                <Button title="Watch Trailer" onPress={() => {}} />
                </View>
            </Card>}
        </ScrollView>
    )
}