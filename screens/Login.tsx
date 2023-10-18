import { Button, Icon, Input } from '@rneui/themed';
import React, { useState, useRef } from 'react';
import { ReactNode } from 'react';
import { Alert } from 'react-native';
import axiosInstance from '../axios/axiosInstance';



export default function Login({navigation}):ReactNode{
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailRef = useRef(),
        passwordRef = useRef();
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [email,setEmail] = useState(""),
        [password,setPassword] = useState(""),
        [showPassword,setShowPassword] = useState(false),
        [isLoading,setIsLoading] = useState(false);
    const handleSubmit = async ()=>{
        const emailResult:boolean = validateEmail();
        const passwordResult:boolean = validatePassword();
        if(emailResult && passwordResult){
            setIsLoading(!isLoading);
            const formData = {
                email:email,
                password:password
            }
            try{
                let res = await axiosInstance.post("auth/authenticate",formData);
                console.log(res);
                Alert.alert(`Login Success check console for toekn`);
                console.log(`token: ${res.data.token}`);
                navigation.navigate('Home',{token:res.data.token})
            }catch(e:any){
                if(e.response){
                    console.log(e.response);
                    Alert.alert(`Status:${e.response.status}, ${e.response.data}`)
                    
                }else if(e.request){
                    Alert.alert("Timeout check connectivity");
                }
                
            }
            
            setIsLoading(false);
        }   
    }
    const validateEmail = ():boolean=>{
        if (!emailPattern.test(email)) {
            setEmailError("Invalid Email");
            emailRef.current.shake();
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
    const validatePassword = ():boolean=>{
        if(password.length<=0){
            setPasswordError("Empty Password");
            passwordRef.current.shake();
            console.log("here"+passwordError.length);
            return false;
        }else{
            setPasswordError("")
            return true;
        }
    }
    return (
        <>
        <Input ref={emailRef} label="Email"
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text)=>setEmail(text)}
          value={email}
          onBlur={validateEmail}
          errorMessage={emailError}
        ></Input>

        <Input ref={passwordRef}
          label="Password"
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              type="font-awesome"
              onPress={(e)=>setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
          onChangeText={(text)=>{setPassword(text)}}
          value={password}
          errorMessage={passwordError}
          onBlur={validatePassword}
        />
        <Button
              title="LOG IN"
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
    
        </>
    );
        
}