import { View,  StyleSheet, Text } from "react-native";
import Register from "./Register";
import Login from "./Login";
import { ReactNode, useState } from "react";
import { Tab, TabView } from "@rneui/themed";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Otp from "./otp";
import ResetPassword from "./resetPassword";


const Stack = createStackNavigator();
function TabViewWraper({navigation}:any):ReactNode{
    const [index,setIndex] = useState(0);
    
    return (
        <><View style={styles.tabContainer}>
            <Tab value={index} onChange={(e) => setIndex(e)}>
                <Tab.Item title="Login" titleStyle={styles.tabItem} />
                <Tab.Item title="Register" titleStyle={styles.tabItem}/>
            </Tab>
        </View><TabView value={index} onChange={setIndex} animationType="spring" tabItemContainerStyle={styles.tabViewContainer}>
                <TabView.Item style={styles.tabViewContainer}>
                    <Login navigation = {navigation}/>
                </TabView.Item>
                <TabView.Item style={styles.tabViewContainer}>
                    <Register />
                </TabView.Item>
        </TabView>
        </>
    );
}

export default function Landing(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="forms" >
                <Stack.Screen name="forms" component={TabViewWraper} options={{headerShown:false}} /> 
                <Stack.Screen name='otp' component={Otp} />
                <Stack.Screen name='resetPassword' component={ResetPassword}/>
            </Stack.Navigator>            
            
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    tabContainer:{
        flex:0.2,
        justifyContent:"center",
        alignItems:"center",
    },
    tabItem:{
        color: '#397af8'
    },
    tabViewContainer:{
        flex:0.8,
        justifyContent:"center",
        alignItems:"flex-start",
        
    }
})