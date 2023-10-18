import { Button, Icon, Input, Tooltip } from '@rneui/themed';
import {View,Text, ScrollView} from 'react-native';
import { useState, useRef } from 'react';
import axiosInstance from '../axios/axiosInstance';
import { Alert } from 'react-native';
export default function Register({navigation}){
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailRef = useRef(null),
        passwordRef = useRef(null),
        fnRef = useRef(null),
        lnRef = useRef(null),
        tooltipRef = useRef(null);
    const [emailError,setEmailError] = useState(""),
     [passwordError,setPasswordError] = useState(""),
     [fnError,setFnError] = useState(""),
     [lnError,setLnError] = useState("");
    const [email,setEmail] = useState(""),
        [password,setPassword] = useState(""),
        [passwordRetype,setPasswordRetype] = useState(""),
        [firstName,setFirstName] = useState(""),
        [lastName,setLastName] = useState(""),
        [showPassword,setShowPassword] = useState(false),
        [isLoading,setIsLoading] = useState(false),
        [passwordRetypeError,setPasswordRetypeError] = useState(""),
        [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };
    const handleSubmit = async ()=>{
        const emailResult:boolean = validateEmail();
        const passwordResult:boolean = validatePassword();
        const fnResult:boolean = validateFn();
        const lnResult:boolean = validateLn();
        const passwordRetype:boolean = validateEqualPassword();
        if(emailResult && passwordResult && fnResult && lnResult && passwordRetype){
            setIsLoading(!isLoading);
            const formData = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password
            }
            try{
                let res = await axiosInstance.post("auth/register",formData);
                console.log(res);
                Alert.alert(`registration Success`);
                console.log(res.data.token);
                navigation.navigate('Home',{token:res.data.token})
            }catch(e:any){
                if(e.response){
                    if(e.response.data.includes("user_details_email_key")){
                        setEmailError("Email already exists");
                    }else{
                        Alert.alert(`Status:${e.response.status}, ${e.response.data}`)
                    }
                }else if(e.request){
                    Alert.alert("Timeout check connectivity");
                }
                
            }
            
            setIsLoading(false);
            
        }   
    }
    const validateFn = ():boolean=>{
        if(firstName.length<=0){
            setFnError("Empty Name");
            fnRef.current.shake();            
            return false;
        }else{
            setFnError("");
            return true;
        }
    }
    const validateLn = ():boolean=>{
        if(firstName.length<=0){
            setLnError("Empty Name");
            lnRef.current.shake();            
            return false;
        }else{
            setLnError("");
            return true;
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
        if(password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[!@#$%^&*]/.test(password) ||
            !/\d/.test(password)){
            setPasswordError("Invalid Password");
            passwordRef.current.shake();
            console.log("here"+passwordError.length);
            return false;
        }else{
            setPasswordError("")
            return true;
        }
    }
    const validateEqualPassword = ():boolean=>{
        if(passwordRetype!==password){
            setPasswordRetypeError("Password's does not match");
            passwordRef.current.shake();
            return false;
        }else{
            setPasswordRetypeError("")
            return true;
        }
    }
    return (
        <ScrollView>
        
        <Input ref={fnRef} label="First Name"
          placeholder="First Name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text)=>setFirstName(text)}
          value={firstName}
          onBlur={validateFn}
          errorMessage={fnError}
        ></Input>
        <Input ref={lnRef} label="Last Name"
          placeholder="last Name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text)=>setLastName(text)}
          value={lastName}
          onBlur={validateLn}
          errorMessage={lnError}
        ></Input>
        <Input ref={emailRef} label="Email"
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
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
        <Tooltip
        height={200}
        visible={isTooltipVisible}
        // closeOnlyOnBackdropPress={true}
        popover={
          <View>
            <Text>Password must meet the following criteria:</Text>
            <Text>1. At least 8 characters in length</Text>
            <Text>2. At least one uppercase letter</Text>
            <Text>3. At least one special character</Text>
            <Text>4. At least one number</Text>
          </View>
        }
      >
        <Icon
            style={{alignItems:"flex-start",margin:0}}
              name="question"
              type="font-awesome"
              onPress={toggleTooltip}
            />
      </Tooltip>
        <Input 
          placeholder="Retype Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          rightIcon={
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              type="font-awesome"
              onPress={(e)=>setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
          onChangeText={(text)=>setPasswordRetype(text)}
          value={passwordRetype}
          errorMessage={passwordRetypeError}
          onBlur={validateEqualPassword}
        />
        <Button
              title="REGISTER"
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
    
        </ScrollView>
    );
}