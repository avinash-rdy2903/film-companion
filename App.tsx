
import { StyleSheet,  StatusBar, View } from 'react-native';
import Landing from './components/Landing';
import { Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

const Stack = createStackNavigator();
export default function App() {
  return (
    
    <ThemeProvider>
      
      <View style={styles.container}>
        
      </View>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
      </NavigationContainer>
      
    
    </ThemeProvider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight || 0,    
  },
});
