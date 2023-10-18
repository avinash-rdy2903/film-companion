import { View,  StyleSheet, Text } from "react-native";
import Register from "../screens/Register";
import Login from "../screens/Login";
import { useState } from "react";
import { Tab, TabView } from "@rneui/themed";
export default function Landing({navigation}){
    const [index,setIndex] = useState(0);
    return (
        <>
            {/* 
            <Text style={styles.login} onPress={()=>{styles.login= styles.focus;styles.register = styles.unFocus;setCurr(LandingType.LOGIN)}}>Login</Text>
            <Text style={styles.register}onPress={()=>{styles.register= styles.focus;styles.login = styles.unFocus;setCurr(LandingType.REGISTER)}}>Register</Text>
            <Text>curr:{curr}</Text>
            {curr===LandingType.LOGIN && <Login/>}
            {curr===LandingType.REGISTER && <Register/>} */}
      

            
      <View style={styles.tabContainer}>
        <Tab value={index} onChange={(e)=>setIndex(e)} >
            <Tab.Item title="Login" />
            <Tab.Item title="Register" />
        </Tab>
      </View>
      <TabView value={index} onChange={setIndex} animationType="spring" tabItemContainerStyle={styles.tabViewContainer}>
        <TabView.Item style={styles.tabViewContainer}>
            <Login navigation={navigation}/>
        </TabView.Item>
        <TabView.Item >
            <Register navigation={navigation}/>
        </TabView.Item>
      </TabView>
        </>
    );
}
const styles = StyleSheet.create({
    tabContainer:{
        flex:0.2,
        justifyContent:"center",
        alignItems:"center",
    },
    tabViewContainer:{
        flex:0.8,
        justifyContent:"center",
        alignItems:"flex-start",
        
    }
})