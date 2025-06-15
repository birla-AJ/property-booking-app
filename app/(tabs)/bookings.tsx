import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import tw from "twrnc";
import CustomHeader from "@/components/CustomHeader";

type Booking = {
    id: string;
    propertyId: string;
    checkIn: string;
    checkOut: string;
    status: string;
};

export default function BookingsScreen() {
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await api.get("/bookings");
            return res.data;
        },
    });

    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await api.get("/properties");
            return res.data;
        },
    });

    const getPropertyTitle = (propertyId: string) => {
        const property = properties.find((p: any) => p.id.toString() === propertyId.toString());
        return property?.title || "Unknown Property";
    };

    return (
<>
            <StatusBar backgroundColor="#044270" barStyle="light-content" />
            <CustomHeader title="My Bookings" />
        <SafeAreaView style={tw`flex-1 bg-white pt-[${StatusBar.currentHeight || 20}px]`}>
        <View style={tw`flex-1 bg-white p-4`}>
            {isLoading ? (
                <Text style={tw`text-center mt-10 text-gray-500`}>Loading...</Text>
            ) : (
                            <FlatList
                                data={bookings}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={tw`pb-4`}
                                renderItem={({ item }) => (
                                    <View style={tw`bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200`}>
                                        <Text style={tw`text-lg font-semibold text-[#044270] mb-1`}>
                                            {getPropertyTitle(item.propertyId)}
                                        </Text>
                                        <View style={tw`mb-1`}>
                                            <Text style={tw`text-gray-600`}>
                                                <Text style={tw`font-semibold`}>Check-In: </Text>
                                                {item.checkIn || "--"}
                                            </Text>
                                            <Text style={tw`text-gray-600`}>
                                                <Text style={tw`font-semibold`}>Check-Out: </Text>
                                                {item.checkOut || "--"}
                                            </Text>
                                        </View>
                                        <Text style={tw`text-green-600 font-semibold`}>
                                            Status: {item.status || "--"}
                                        </Text>
                                    </View>
                                )}
                            />
              
            )}
        </View>
        </SafeAreaView>
        </>
    );
}
