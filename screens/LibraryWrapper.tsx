import { createStackNavigator } from "@react-navigation/stack";
import Library from "./library";
import MovieDetails from "./MovieDetails";

const Stack = createStackNavigator()

export default function LibraryWraper(){

    return (
        <Stack.Navigator>
            <Stack.Screen name="default" component={Library} options={{headerShown:false}}/>
            <Stack.Screen name="movieDetails" component={MovieDetails} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}