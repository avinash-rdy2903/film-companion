import { NavigationContainer } from '@react-navigation/native';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import HomeOverview from '../components/homeOverview';
import Trending from '../components/trending';
import MovieDetails from './MovieDetails';
const Stack = createStackNavigator();
export default function Overview(){



    return (
            
        <Stack.Navigator initialRouteName="main">
             
            <Stack.Screen name="main" component={HomeOverview} options={{headerShown:false}}/>
            <Stack.Screen name="moreOverview" component={Trending} options={{headerShown:false}}/>
            <Stack.Screen name="movieDetails" component={MovieDetails} options={{headerShown:false}}/>
            
        </Stack.Navigator>
        
        
    )
}