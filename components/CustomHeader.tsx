import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import tw from "twrnc";

type Props = {
    title: string;
    showBackButton?: boolean;
};

export default function CustomHeader({ title, showBackButton = false }: Props) {
    const router = useRouter();
    const navigation = useNavigation();

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            router.replace("/");
        }
    };

    return (
        <View style={tw`w-full bg-[#044270]`}>
            <View style={tw`flex-row items-center justify-between px-4 py-3`}>
                {showBackButton ? (
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 24 }} />
                )}

                <Text style={tw`text-white text-lg font-bold text-center flex-1`}>
                    {title}
                </Text>

                <View style={{ width: 24 }} />
            </View>
        </View>
    );
}
