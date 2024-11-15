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
    Divider,
    Pressable,
    KeyboardAvoidingView,
} from "native-base";
import Header from "../components/header";
import { Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

const driverLocations = [
    { id: 1, latitude: -6.1751, longitude: 106.8650 },
    { id: 2, latitude: -6.1753, longitude: 106.8652 },
    { id: 3, latitude: -6.1760, longitude: 106.8660 },
];

const Mobil = () => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [destination, setDestination] = useState("");
    const [pickupCoords, setPickupCoords] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputType, setInputType] = useState("pickup");
    const toast = useToast();

    const fetchLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            toast.show({
                title: "Izin lokasi ditolak",
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

    const handleMapPress = (event) => {
        const coords = event.nativeEvent.coordinate;
        setPickupCoords(coords);
        toast.show({
            title: "Titik jemput ditentukan!",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    const confirmPickup = () => {
        if (!destination || !pickupCoords) {
            toast.show({
                title: "Silakan masukkan tujuan dan pastikan titik jemput",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsConfirming(false);
        toast.show({
            title: `Permintaan ride ke ${destination} dari titik jemput telah dikirim!`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const openModal = (type) => {
        setInputType(type);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const setCurrentLocationAsPickup = () => {
        if (location) {
            setPickupCoords(location);
            toast.show({
                title: "Lokasi saat ini dipilih sebagai titik jemput!",
                status: "info",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box flex={1}>
            <Header title={"Mobil"} withBack={true} />
            
            <Box flex={4}>
                {location && region ? (
                    <MapView
                        style={{ flex: 1 }}
                        region={region}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                        onPress={handleMapPress}
                    >
                        <Marker coordinate={location} title="Lokasi Saya" />
                        {pickupCoords && (
                            <Marker coordinate={pickupCoords} title="Titik Jemput" pinColor="green" />
                        )}
                        {driverLocations.map(driver => (
                            <Marker
                                key={driver.id}
                                coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
                                title={`Driver ${driver.id}`}
                                pinColor="red"
                            />
                        ))}
                    </MapView>
                ) : (
                    <Center flex={1}>
                        <Text textAlign={"center"}>Sedang mengambil lokasi...</Text>
                    </Center>
                )}
            </Box>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                flex={2}
                bg="white"
                px={5}
                py={4}
            >
                <VStack space={4}>
                    <Text fontSize="lg">Mau kemana hari ini?</Text>
                    <FormControl>
                        <Pressable onPress={() => openModal("pickup")}>
                            <Input
                                placeholder="Lokasi asal"
                                value={pickupCoords ? `Lat: ${pickupCoords.latitude}, Lng: ${pickupCoords.longitude}` : ""}
                                isReadOnly
                            />
                        </Pressable>
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Masukkan tujuan"
                            variant="filled"
                            onChangeText={setDestination}
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        onPress={openModal}
                    >
                        Pesan
                    </Button>
                </VStack>
            </KeyboardAvoidingView>
            
            <Modal isOpen={modalVisible} onClose={closeModal} size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Konfirmasi Pemesanan</Modal.Header>
                    <Modal.Body>
                        <Text>Pickup dari titik:</Text>
                        <Text>{pickupCoords ? `Lat: ${pickupCoords.latitude}, Lng: ${pickupCoords.longitude}` : "Titik jemput belum ditentukan."}</Text>
                        <Divider my={2} />
                        <Text>Menuju tujuan:</Text>
                        <Text>{destination || "Tujuan belum diinput."}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button colorScheme="red" onPress={closeModal}>
                                Batal
                            </Button>
                            <Button onPress={() => {
                                setIsConfirming(true);
                                closeModal();
                            }}>Konfirmasi</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Box>
    );
};

export default Mobil;