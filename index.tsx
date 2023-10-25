

import { StyleSheet,  StatusBar, View } from 'react-native';
import Landing from './screens/Landing';

import Home from './screens/Home';
import { connect, useSelector } from 'react-redux';
import { getIsLoggedIn } from './context/slice/loginSlice';
import { RootState } from './context/store';
import React, { ReactNode } from 'react';

export default function Index():ReactNode{
  let isLoggedIn = useSelector(getIsLoggedIn)  
  return (
    <>
      
      <View style={styles.container}>
        
       </View>
        {isLoggedIn?<Home/>:<Landing/>}
        {/* {!isLoggedIn && <Landing/>} */}
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight || 0,    
  },
});
