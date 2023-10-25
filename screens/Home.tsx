import React, { useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View,Text} from 'react-native';
import { useState } from "react";
import * as Location from 'expo-location';
import { Button, Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { deleteToken } from "../context/slice/loginSlice";
import getLocationPermission from "../components/config/userLocationPermission";
import Overview from "./overview";
import Search from "./search";
import Library from "./library";
import UserSettings from "./userSettings";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function Home():React.ReactNode{
    const [text,setText] = useState("")
    const dispatch = useDispatch();
    const [location,setLocation] = useState<any>();
    useEffect(()=>{
        const temp = async ()=>{
            const hasLocationAccess = await getLocationPermission();
            if(hasLocationAccess){
                let location = await Location.getCurrentPositionAsync()
                console.log(location)
                setLocation(location)
            }
        }
        temp()
    },[])
    
    // const {token} = route.params;
    // axiosInstance.get('tmdb',{headers: { Authorization: `Bearer ${token}` }})
    // .then((response)=>{

    //     setText(response.data)
    // }).catch((e)=>{
    //     console.log(e);
    // })
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={Overview} options={{headerShown:false,tabBarIcon:({color,size})=>(<Icon name="home" color={color} size={size}/>)}}/>
                <Tab.Screen name="Search" component={Search} options={{tabBarIcon:({color,size})=>(<Icon name="search" color={color} size={size}/>)}}/>
                <Tab.Screen name="Library" component={Library} options={{tabBarIcon:({color,size})=>(<Icon name="movie" color={color} size={size}/>)}}/>
                <Tab.Screen name="Settings" component={UserSettings} options={{tabBarIcon:({color,size})=>(<Icon name="settings" color={color} size={size}/>)}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}