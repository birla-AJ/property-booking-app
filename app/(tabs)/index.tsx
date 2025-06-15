import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";
import tw from "twrnc";
import { useRouter } from "expo-router";
import CustomHeader from "@/components/CustomHeader";

type Property = {
    id: number;
    title: string;
    price: number;
    location: {
        address: string;
        city: string;
        state: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
    };
    images: string[];
};

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const { data: properties = [], isLoading } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await api.get("/properties");
            return res.data;
        },
    });

    const filtered = properties.filter((item: Property) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <StatusBar
                backgroundColor="#044270"
                barStyle="light-content"
                translucent={false}
            />

            <SafeAreaView style={tw`flex-1 bg-white`}>
                <CustomHeader title="Home"  />

                <View style={tw`flex-1 p-4 bg-white`}>
                    <TextInput
                        placeholder="Search properties..."
                        value={search}
                        onChangeText={setSearch}
                        style={tw`border border-gray-300 rounded p-2 mb-4`}
                    />

                    {isLoading ? (
                        <Text style={tw`text-center mt-10 text-gray-500`}>Loading...</Text>
                    ) : (
                        <FlatList
                            data={filtered}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => router.push(`/property/${item.id}`)}
                                    style={tw`mb-4 bg-gray-100 rounded-lg overflow-hidden shadow`}
                                >
                                    <Image
                                        source={{ uri: item.images[0] }}
                                        style={tw`h-40 w-full`}
                                        resizeMode="cover"
                                    />
                                    <View style={tw`p-2`}>
                                        <Text style={tw`text-lg font-bold`}>{item.title}</Text>
                                        <Text style={tw`text-gray-600`}>
                                            {item.location.city}, {item.location.state}
                                        </Text>
                                        <Text style={tw`text-blue-500 mt-1`}>
                                            ₹{item.price.toLocaleString()}/night
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}
  