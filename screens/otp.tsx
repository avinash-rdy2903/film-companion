import { Alert, StyleSheet, View } from "react-native";
import {Text, Button, Input} from "@rneui/themed";
import { InputProps } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { ReactNode, useRef, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { AxiosError } from "axios";
import { saveToken } from "../context/slice/loginSlice";

interface Props {
    navigation: any
}
export default function Otp(Props: { navigation: { navigate: any; }; }):ReactNode{
    const {navigate} = Props.navigation
    const dispatch = useDispatch();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailRef = useRef<InputProps>()
    const [email,setEmail] = useState(""),
        [isLoading,setIsLoading] = useState(false),
        [emailError,setEmailError] = useState("");
    const validateEmail = ():boolean=>{
        if (!emailPattern.test(email)) {
            setEmailError("Invalid Email");
            if(emailRef.current!=null && emailRef.current.shake)emailRef.current.shake();
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
    const handleSubmit = async ()=>{
        if(validateEmail()){
            setIsLoading(true)
            const payload = {email:email}
            try{
                let {data} = await axiosInstance.post("auth/generate-otp",payload)
                dispatch(saveToken({token:data.token,email:email,isLoggedIn:false}))
                navigate('resetPassword')
            }catch(e:any){
                if(e.response){
                    console.log(e.response);
                    Alert.alert(`Status:${e.response.status}, ${e.response.data}`)
                    
                }else if(e.request){
                    Alert.alert("Timeout check connectivity");
                }
                return ;
            }
            setIsLoading(false)
        }
    }

    return (
    <View style={styles.container}>
        <Text style={styles.text}>Enter your email for OTP</Text>
        <Input ref={emailRef} label="Email"
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text)=>setEmail(text)}
          value={email}
          onBlur={validateEmail}
          errorMessage={emailError}
        ></Input>
        <Button
              title="Get OTP"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={handleSubmit}
              loading={isLoading}
            />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:15,
        alignItems:"center"
    },
    text:{
        fontSize:30
    }
})