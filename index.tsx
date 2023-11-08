

import { StyleSheet,  StatusBar, View } from 'react-native';
import Landing from './screens/Landing';
import * as Location from 'expo-location';
import getLocationPermission from "./components/config/userLocationPermission";
import axios from "axios";
import Home from './screens/Home';
import { connect, useSelector,useDispatch } from 'react-redux';
import { getIsLoggedIn } from './context/slice/loginSlice';
import { saveCountryCode } from './context/slice/locationSlice';
import { RootState } from './context/store';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button } from '@rneui/base';

export default function Index():ReactNode{
  let isLoggedIn = useSelector(getIsLoggedIn)
  let dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const fetchLocation = async ()=>{
    const hasLocationAccess = await getLocationPermission();
    let location = null;
    if(hasLocationAccess){
        location = await Location.getCurrentPositionAsync()
        let {data} = await axios.get(`http://api.geonames.org/countryCodeJSON?lat=${location["coords"]["latitude"]}&lng=${location["coords"]["longitude"]}&username=avinash_reddy2903`)
        console.log(data)
        return data["countryCode"]
    }    
    return "US";
  }
  useEffect(()=>{
    fetchLocation().then((val)=>{setLoading(false); dispatch(saveCountryCode({countryCode:val}))}).catch()
  },[])  
  return (
    <>
      
      <View style={styles.container}>
        
       </View>
        {isLoggedIn?loading?<Button loading={loading}/>:<Home/>:<Landing/>}
        {/* {!isLoggedIn && <Landing/>} */}
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight || 0,    
  },
});
