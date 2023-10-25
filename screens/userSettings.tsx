import { Button } from "@rneui/base";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { deleteToken } from "../context/slice/loginSlice";
export default function UserSettings(){
    const dispatch = useDispatch()
    return (
        <View>
            <Button title={"Log out"} onPress={()=>dispatch(deleteToken({}))}/>
        </View>
    )
}