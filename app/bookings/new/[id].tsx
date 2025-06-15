import { View, Text, Button, Alert, TouchableOpacity, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import tw from "twrnc";
import CustomHeader from "@/components/CustomHeader";

export default function BookingScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const newBooking = {
                propertyId: Number(id),
                userId: 1, // mock user
                date: new Date().toISOString(),
            };
            const res = await api.post("/bookings", newBooking);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            Alert.alert("Success", "Booking Confirmed!");
            router.push("/bookings");
        },
    });

    return (
<>
 <StatusBar backgroundColor="#044270" barStyle="light-content" />
<CustomHeader title="confirm booking"/>
        <View style={tw`flex-1 justify-center items-center bg-white px-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Confirm Booking</Text>
            <Text style={tw`text-gray-600 mb-6`}>Are you sure you want to book property #{id}?</Text>
            <TouchableOpacity
                style={[tw`h-12 w-full rounded-lg mb-6 items-center justify-center`, { backgroundColor: "#044270" }]}
                onPress={() => mutation.mutate()}
            >
                <Text style={tw`text-white text-lg font-semibold`}>Confirm Booking</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}
