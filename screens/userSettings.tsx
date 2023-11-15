import { Button, Header, Icon, Text, Input, InputProps } from "@rneui/themed";
import { View, Alert, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../context/slice/loginSlice";
import { deleteToken } from "../context/slice/loginSlice";
import { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axiosInstance from "../axios/axiosInstance";
export default function UserSettings(){
    const dispatch = useDispatch()
    const token = useSelector(getToken);
    const [loading,setLoading] = useState(true)

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [userId,setUserId] = useState(""),
        [emailError,setEmailError] = useState(""),
        [passwordError,setPasswordError] = useState(""),
        [fnError,setFnError] = useState(""),
        [lnError,setLnError] = useState("");


    const updateFormData = (data:any)=>[
        setFirstName(data.firstName),
        setLastName(data.lastName),
        setEmail(data.email),
        setUserId(data.userId),
    ]
    const loadUserDetails = async ()=>{
        try{
            let {data} = await axiosInstance.get("auth/user",{headers:{Authorization:`Bearer ${token}`}})
            updateFormData(data);
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
    }

    const onRenderGetter =async () => {
        setLoading(true);
        await loadUserDetails()
        setLoading(false);
    }

    useEffect(()=>{
        onRenderGetter().then(()=>{console.log(firstName)})
    },[])
    const handleSubmit = async ()=>{
        const emailResult:boolean = validateEmail();
        const fnResult:boolean = validateFn();
        const lnResult:boolean = validateLn();
        if(emailResult && fnResult && lnResult){
            setLoading(true);
            const payload = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                userId:userId
            }
            try{
                let {data} = await axiosInstance.put("auth/user",payload,{headers:{Authorization:`Bearer ${token}`}});
                updateFormData(data);
                
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
            
            setLoading(false);
            
        }   
    }
    const updateUserDetails = async () => {
        try{
            const payload = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                userId:userId
            }
            let {data} = await axiosInstance.put("auth/user",payload,{headers:{Authorization:`Bearer ${token}`}})
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            setUserId(data.userId)
        }catch(e:any){
            Alert.alert("Error",e.message)
        }
    }

    const emailRef = useRef<InputProps>(null),
        fnRef = useRef<InputProps>(null),
        lnRef = useRef<InputProps>(null);

    const validateFn = ():boolean=>{
        if(firstName.length<=0){
            setFnError("Empty Name");
            if(fnRef.current && fnRef.current.shake)fnRef.current.shake();            
            return false;
        }else{
            setFnError("");
            return true;
        }
    }
    const validateLn = ():boolean=>{
        if(firstName.length<=0){
            setLnError("Empty Name");
            if(lnRef.current && lnRef.current.shake)lnRef.current.shake();            
            return false;
        }else{
            setLnError("");
            return true;
        }
    }
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const validateEmail = ():boolean=>{
        if (!emailPattern.test(email)) {
            setEmailError("Invalid Email");
            if(emailRef.current && emailRef.current.shake)emailRef.current.shake();
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }
    return (
        <SafeAreaProvider>
            <Header 
                centerComponent={<Text style={styles.HeaderText}>Library</Text>}
                rightComponent={<Button loading={loading} onPress={()=> {}}><Icon name="refresh" color={"#fff"}></Icon></Button>}
            />
            
            <ScrollView contentContainerStyle={styles.container}>
        
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
        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
            <Button containerStyle={styles.button} loading={loading} color={"secondary"} title={"Update Details"} onPress={()=>updateUserDetails()}/>
            <Button containerStyle={styles.button} color={"error"} title={"Log out"} onPress={()=>dispatch(deleteToken({}))}/>
        </View>
                

        </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:"center",
        padding:20
    },
    HeaderText:{
        fontSize:24,
        fontWeight:"bold",
        color:"#fff"
    },
    button:{
        margin:10,
        borderRadius:5,        
    }
    
})