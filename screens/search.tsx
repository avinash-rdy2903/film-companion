import { Input } from "@rneui/themed";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { useState } from 'react';

export default function Search(){
    const [text,setText] = useState<String>("")
    return (
        <View>
            <Input leftIcon={<Icon name="search"></Icon>} />
        </View>
    )
}