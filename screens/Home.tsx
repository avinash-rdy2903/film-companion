import React, { useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View,Text} from 'react-native';
import { useState } from "react";
import { Button, Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { deleteToken } from "../context/slice/loginSlice";
import Overview from "./overview";
import SearchWraper from "./searchWraper";
import Library from "./library";
import UserSettings from "./userSettings";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
export default function Home():React.ReactNode{
    
    
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
                <Tab.Screen name="Search" component={SearchWraper} options={{headerShown:false,tabBarIcon:({color,size})=>(<Icon name="search" color={color} size={size}/>)}}/>
                <Tab.Screen name="Library" component={Library} options={{headerShown:false,tabBarIcon:({color,size})=>(<Icon name="movie" color={color} size={size}/>)}}/>
                <Tab.Screen name="Settings" component={UserSettings} options={{headerShown:false,tabBarIcon:({color,size})=>(<Icon name="settings" color={color} size={size}/>)}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}