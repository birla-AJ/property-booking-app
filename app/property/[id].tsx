import {
    View,
    Text,
    Image,
    ScrollView,
    Button,
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "@/components/CustomHeader";

export default function PropertyDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data: property, isLoading, error } = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
            const res = await api.get(`/properties/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Text style={tw`text-center mt-10`}>Loading...</Text>;
    if (error) return <Text style={tw`text-center mt-10 text-red-500`}>Something went wrong</Text>;
    if (!property) return null;
    return (
        <>
            <StatusBar backgroundColor="#044270" barStyle="light-content" />
            <SafeAreaView style={tw`flex-1 bg-white`}>
                <CustomHeader title="Property Details" showBackButton={true} />
                <ScrollView
                    style={tw`flex-1 bg-white`}
                    contentContainerStyle={tw`p-4 pb-20`} 
                    showsVerticalScrollIndicator={false} >
                    <Text style={tw`text-2xl font-bold mb-2`}>{property.title}</Text>

                    <ScrollView horizontal pagingEnabled style={tw`h-56 mb-4`}>
                        {property.images.map((img: string, idx: number) => (
                            <Image
                                key={idx}
                                source={{ uri: img }}
                                style={tw`w-80 h-56 mr-2 rounded-lg`}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>

                    <Text style={tw`text-gray-500 mb-2`}>
                        {property.location.city}, {property.location.state}
                    </Text>

                    <Text style={tw`text-xl text-blue-500 font-semibold mb-4`}>
                        ₹{property.price}/night
                    </Text>

                    <Text style={tw`text-lg font-semibold mb-1`}>Features:</Text>
                    <View style={tw`mb-4`}>
                        {property.features.map((feat: string, idx: number) => (
                            <Text key={idx} style={tw`text-gray-700 ml-2`}>• {feat}</Text>
                        ))}
                    </View>

                    <Text style={tw`text-lg font-semibold mb-2`}>Location Map:</Text>
                    <MapView
                        style={tw`h-48 w-full rounded-lg mb-6`}
                        initialRegion={{
                            latitude: property.location.coordinates.latitude,
                            longitude: property.location.coordinates.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: property.location.coordinates.latitude,
                                longitude: property.location.coordinates.longitude,
                            }}
                            title={property.title}
                        />
                    </MapView>
                    <TouchableOpacity
                        style={[tw`h-12 w-full rounded-lg mb-6 items-center justify-center`, { backgroundColor: "#044270" }]}
                        onPress={() => router.push(`/bookings/new/${property.id}`)}
                    >
                        <Text style={tw`text-white text-lg font-semibold`}>Book Now</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </>
    );
}
  