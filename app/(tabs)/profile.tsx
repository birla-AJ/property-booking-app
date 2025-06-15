import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import tw from "twrnc";
import CustomHeader from "@/components/CustomHeader";

export default function ProfileScreen() {
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await api.get("/profile");
            return res.data;
        },
    });

    if (isLoading || !profile) {
        return <Text style={tw`text-center mt-20 text-gray-500`}>Loading...</Text>;
    }

    return (
        <>
      
        <SafeAreaView style={tw`flex-1 bg-white pt-[${StatusBar.currentHeight || 20}px]`}>
                <CustomHeader title="Profile" />
        <View style={tw`flex-1 bg-white p-6`}>
                    <View style={tw`items-center mt-6 mb-6`}>
                        <View style={tw`bg-[#044270] rounded-full w-30 h-30 items-center justify-center overflow-hidden`}>
                            <Image
                                source={require('../../assets/images/user.png')}
                                style={tw`w-24 h-24 rounded-full`}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={tw`text-lg font-semibold mt-1`}> {profile.name}</Text>
                    </View>

            <View style={tw`bg-gray-100 p-4 rounded shadow mb-4`}>
                
                <Text style={tw`text-lg`}>Email: {profile.email}</Text>
                <Text style={tw`text-lg mt-2`}>Total Bookings: {profile.bookings.length}</Text>
            </View>

            <Text style={tw`text-lg font-bold mb-2`}>Booking IDs:</Text>
            {profile.bookings.map((id: string, index: number) => (
                <Text key={index} style={tw`text-gray-700`}>• Booking #{id}</Text>
            ))}
        </View>
        </SafeAreaView>
        </>
    );
}
