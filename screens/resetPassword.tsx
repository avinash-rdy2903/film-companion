import { Alert, View } from "react-native";
import {Text, Button, Input, InputProps, Icon, Tooltip} from '@rneui/themed'
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import {useRef,useState} from 'react';
import axiosInstance from "../axios/axiosInstance";

interface Props {
    navigation: any
}
export default function ResetPassword(Props:{ navigation: { navigate: any }}){
    let token = useSelector(getToken)

    const passwordRef = useRef<InputProps>(null),
        otpRef = useRef<InputProps>(null);

    const [passwordError,setPasswordError] = useState(""),
        [otpError,setOtpError] = useState(""),
        [otp,setOtp] = useState<string>(""),
        [password,setPassword] = useState(""),
        [passwordRetype,setPasswordRetype] = useState(""),
        [showPassword,setShowPassword] = useState(false),
        [isLoading,setIsLoading] = useState(false),
        [passwordRetypeError,setPasswordRetypeError] = useState(""),
        [showOtp,setShowOtp]  = useState<Boolean>(false),
        [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };
    const handleSubmit = async ()=>{
        const otpResult:boolean = validateOtp(),
            passwordResult = validatePassword(),
            passwordRetypeResult = validateEqualPassword();
        if(otpResult && passwordResult && passwordRetypeResult){
            setIsLoading(true)
            try{

                const payload = {
                    otp:otp,
                    newPassword:password,
                }

                let {data} = await axiosInstance.post('auth/reset-password',payload,{
                    headers:{Authorization:`Bearer ${token}`}
                })
                
                Alert.alert('Password changed')
                Props.navigation.navigate('forms')

            }catch(e:any){
                if(e.response){                    
                    Alert.alert(`Status:${e.response.status}, ${e.response.data}`)
                    
                }else if(e.request){
                    Alert.alert("Request Timeout, check connectivity");
                }
            }
            setIsLoading(false)
        }
    }
    
    const validateOtp = ():boolean=>{
        if(!/^[0-9]{6,6}$/.test(otp)){
            setOtpError("Invalid Otp")
            if(otpRef.current!=null && otpRef.current.shake) otpRef.current.shake();
            return false
        }else{
            setOtpError("")
            return true
        }
    }
    const validatePassword = ():boolean=>{
        if(password.length>0 && (password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[!@#$%^&*]/.test(password) ||
            !/\d/.test(password))){
            setPasswordError("Invalid Password");
            if(passwordRef.current!=null && passwordRef.current.shake)passwordRef.current.shake();
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
            if(passwordRef.current!=null && passwordRef.current.shake)passwordRef.current.shake();
            return false;
        }else{
            setPasswordRetypeError("")
            return true;
        }
    }
    return (
        <View>

<Input ref={otpRef}
          label="OTP"
          placeholder="one-time-password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          rightIcon={
            <Icon
              name={showOtp ? 'eye' : 'eye-slash'}
              type="font-awesome"
              onPress={(e)=>setShowOtp(!showOtp)}
            />
          }
          secureTextEntry={!showOtp}
          onChangeText={(text)=>{setOtp(text)}}
          value={otp}
          errorMessage={otpError}
          onBlur={validateOtp}
        />
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
        </View>
    )
}