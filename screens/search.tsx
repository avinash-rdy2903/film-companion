import { Card, Input, Text, Icon, Overlay, Button, Switch } from "@rneui/themed";
import { View, StyleSheet, FlatList, TouchableOpacity, Pressable } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react';
import axiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import { getLanguages } from "../context/slice/configurationSlice";
interface Props {
    navigation: any,
}
export default function Search(Props: any ){
    let {navigate} = Props.navigation;
    const countryCode = "US"
    const token = useSelector(getToken)
    const languages = useSelector(getLanguages)
    const [text,setText] = useState<string>("")
    const [visible,setVisible] = useState(false)
    const [language,setLanguage] = useState<string>("")
    const [isRated,setIsRated] = useState(false)
    const [page,setPage] = useState(0)
    const [list,setList] = useState<any>([])
    const [sortBy,setSortBy] = useState("")
    const [currentYear,x] = useState(new Date().getFullYear());
    const [releaseYear, setReleaseYear] = useState()
    const years = Array.from({ length: 10 }, (_, index) =>{ return {key:index,value:currentYear - index}});
    // console.log(years)
    const [loading,setLoading] = useState(false)
    
    const handleYearChange = (year:any,index:number) => {
        setReleaseYear(year); 
    };
    const toggleVisibility = ()=>{
        setVisible(!visible)
    }
    const renderMovieItem = (movie:any) => (
            <Card key={movie.id} containerStyle={styles.cardContainer}>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigate("movieDetails",{id:movie.id})}>

                    <Card.Image style={styles.moviePoster} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} />
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieDetails}>{`${movie.release_date} | Rating: ${movie.vote_average}`}</Text>
                </TouchableOpacity>
            
            </Card>
        
      );
    const keyExtractor = (item:any) => item.id;
    const fetchNextPage = async ()=>{  
        setLoading(true)    
      const {data} = await axiosInstance.get(`tmdb/search`,{params:{query:text,page:(page+1)},headers:{Authorization:`Bearer ${token}`}})
      console.log(data)
      
      setList([...list,...data.results].sort((a,b)=>{
        return b[sortBy]-a[sortBy]
      }))
      setPage((page+1))
      setLoading(false)
    }
    const handlePress = async (e: any)=>{
        setList([])
        setPage(0)
        console.log(sortBy)
        console.log()
        try{
            await fetchNextPage();
        }catch(e){
            console.log(e)
        }
    }
    const clearFilter = ()=>{
        setIsRated(false)
        setLanguage("en")
        setReleaseYear(undefined)
        setVisible(false)
    }
    return (
        <View>
            <Input 
            leftIcon={<Icon name="search"></Icon>} rightIcon={<Icon name="sort" onPress={()=>{toggleVisibility()}}></Icon>}
            value={text}
            onChangeText={(text)=>setText(text)}
            onSubmitEditing={handlePress}
            />
            <View style={{width:"100%",marginLeft:10,paddingRight:20,top:-20,flexDirection:"row",justifyContent:"space-between"}}>
                <SelectList
                setSelected={(val:any)=>{setSortBy(val);if(list.length!=0){setPage(0);handlePress(null)}}}
                data={[{key:"popularity",value:"Relevant"},{key:"title",value:"Movie Title"}]}
                save="key"
                defaultOption={{key:"popularity",value:"Relevant"}}
                search={false}
                />
                <Button title={"Clear Results"} onPress={()=>{setText("");setList([]);setPage(0);clearFilter();setLoading(false)}} color={"error"}/>
            </View>
            <Overlay isVisible={visible} style={styles.container}
            onBackdropPress={()=>{toggleVisibility()}}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Release Year</Text>
                    <SelectList 
                    setSelected={(val:any)=>{setReleaseYear(val)}}
                    data={years}
                    save="value"
                    />
                </View> 
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Language</Text>
                    <SelectList 
                    setSelected={(val:any)=>setLanguage(val)}
                    data={languages}
                    defaultOption={{key:"en",value:"English"}}
                    save="key"
                    />
                </View> 
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>R-Rated</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isRated ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setIsRated}
                        value={isRated}
                    />
                </View>
                
                <View style={styles.rowContainer}>
                    <Button color={"primary"}onPress={()=>{toggleVisibility();handlePress(undefined)}} title={"Search"}></Button>
                    <Button color={"error"} onPress={clearFilter} title={"Clear All"}></Button>
                </View>
                
            </Overlay>
            <FlatList
                data={list}
                renderItem={({item})=>renderMovieItem(item)}
                keyExtractor={keyExtractor}
                numColumns={2}
                onEndReachedThreshold={0.8}
                onEndReached={fetchNextPage}
                columnWrapperStyle={styles.movieGrid}
            />
            {loading && <Button loading={loading}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    rowContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    inputContainer:{
        margin:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    label:{
        fontWeight:"bold",
        fontSize:15,
        marginRight:5
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
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
    detailsButton: {
      marginVertical: 10,
    },
    movieGrid: {
      flexDirection: 'row',
      flexWrap: "wrap",
      justifyContent: 'space-evenly',
    },
  });