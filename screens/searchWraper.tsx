import { createStackNavigator } from "@react-navigation/stack";
import Search from "./search";
import MovieDetails from "./MovieDetails";

const Stack = createStackNavigator()

export default function SearchWraper(){

    return (
        <Stack.Navigator>
            <Stack.Screen name="default" component={Search} options={{headerShown:false}}/>
            <Stack.Screen name="movieDetails" component={MovieDetails} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}