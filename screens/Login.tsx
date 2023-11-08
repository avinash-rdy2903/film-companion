import { Button, Icon, Input } from '@rneui/themed';
import { InputProps } from '@rneui/themed';
import React, { useState, useRef } from 'react';
import { ReactNode } from 'react';
import { Alert } from 'react-native';
import axiosInstance from '../axios/axiosInstance';

import { saveToken } from '../context/slice/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from '../context/slice/loginSlice';

export default function Login():ReactNode{
    const dispatch = useDispatch();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailRef = useRef<InputProps>(),
        passwordRef = useRef<InputProps>();
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
            const payload = {
                email:email,
                password:password
            }
            try{
                console.log("here")
                // let temp = useSelector(state=>state.login.isLoggedIn)
                // console.log("here"+temp)
                let res = await axiosInstance.post("auth/authenticate",payload);
                // console.log(res);                
                dispatch(saveToken({token:res.data.token,email:email,isLoggedIn:true}))
                
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
            if(emailRef.current!=null && emailRef.current.shake)emailRef.current.shake();
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
    const validatePassword = ():boolean=>{
        if(password.length<=0){
            setPasswordError("Empty Password");
            if(passwordRef.current!=null  && passwordRef.current.shake)passwordRef.current.shake();
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