import React from "react";
import axiosInstance from "../axios/axiosInstance";
import {View,Text} from 'react-native';
import { useState } from "react";
import { Test } from "tslint";

export default function Home({route,navigation}):React.ReactNode{
    const [text,setText] = useState("")
    const {token} = route.params;
    axiosInstance.get('tmdb',{headers: { Authorization: `Bearer ${token}` }})
    .then((response)=>{

        setText(response.data)
    }).catch((e)=>{
        console.log(e);
    })
    return (
        <View>
            <Text>Result authenticated route</Text>
            <Text>{text}</Text>
        </View>
    )
}