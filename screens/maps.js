import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    VStack,
    Button,
    useToast,
    Input,
    Center,
    Modal,
    FormControl,
} from "native-base";
import Header from "../components/header";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';

const Maps = () => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [address, setAddress] = useState("");     // New state for address input
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const toast = useToast();

    // Fetch user's current location
    const fetchLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            toast.show({
                title: "Location permission denied",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;
        setLocation({ latitude, longitude });
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    // Handle user input for place name
    const handleDestinationSet = async () => {
        try {
            const geocode = await Location.geocodeAsync(address);
            if (geocode.length > 0) {
                const { latitude, longitude } = geocode[0];
                setDestinationCoords({ latitude, longitude });
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                toast.show({
                    title: "Destination set!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                toast.show({
                    title: "Location not found",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast.show({
                title: "Error fetching location",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box flex={1}>
            <Header title="Where to today?" withBack={true} />
            <Box bg={"white"} p={3}>
                <VStack space={4}>
                    <FormControl>
                        <Input
                            placeholder="Current Location"
                            value={location ? `Lat: ${location.latitude}, Lng: ${location.longitude}` : "Waiting for location..."}
                            isReadOnly
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Enter destination (e.g., Surabaya)"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </FormControl>
                    <Button colorScheme="blue" onPress={handleDestinationSet} isDisabled={!address}>
                        Set Destination
                    </Button>
                </VStack>
            </Box>

            <Box flex={4}>
                {location && region ? (
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        showsUserLocation={true}
                        onPress={(event) => setPickupCoords(event.nativeEvent.coordinate)}
                    >
                        <Marker coordinate={location} title="My Location" />
                        {pickupCoords && (
                            <Marker coordinate={pickupCoords} title="Pickup Point" pinColor="green" />
                        )}
                        {destinationCoords && (
                            <Marker coordinate={destinationCoords} title="Destination" pinColor="blue" />
                        )}
                    </MapView>
                ) : (
                    <Center flex={1}>
                        <Text>Loading location...</Text>
                    </Center>
                )}
            </Box>
        </Box>
    );
};

export default Maps;
