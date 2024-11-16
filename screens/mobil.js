import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Button,
    useToast,
    Input,
    Center,
    FormControl,
    Modal,
    Image,
    Spinner,
    Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/header";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import successAnimation from "../assets/success.json";

const Mobil = () => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [address, setAddress] = useState("");
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [isDestinationSet, setIsDestinationSet] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [mobilPosition, setMobilPosition] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSearchingDriver, setIsSearchingDriver] = useState(false);
    const mapRef = useRef(null);
    const toast = useToast();

    const fetchLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
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


    const handleDestinationChange = (newAddress) => {
        setAddress(newAddress); // Update alamat tujuan
    
        // Jika ada timeout sebelumnya, bersihkan
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    
        // Set timeout baru untuk menunggu pengguna selesai mengetik
        const newTimeout = setTimeout(async () => {
            try {
                const geocode = await Location.geocodeAsync(newAddress);
                if (geocode.length > 0) {
                    const { latitude, longitude } = geocode[0];
                    setDestinationCoords({ latitude, longitude });
    
                    // Update region peta agar sesuai dengan lokasi tujuan baru
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    setIsDestinationSet(true); // Menandakan bahwa tujuan sudah ditetapkan
                } else {
                    // Tidak menampilkan toast "lokasi tidak ditemukan"
                    setIsDestinationSet(false); // Reset jika lokasi tidak ditemukan
                }
            } catch (error) {
                // Menampilkan toast kesalahan hanya setelah pengguna selesai mengetik
                toast.show({
                    title: "Terjadi kesalahan saat mencari lokasi",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }, 1000); // Delay selama 1 detik (atau sesuaikan sesuai kebutuhan)
    
        setTypingTimeout(newTimeout); // Set timeout baru
    };


    const handleBooking = () => {
        setIsSearchingDriver(true);

        setTimeout(() => {
            setIsSearchingDriver(false);
            setIsModalVisible(true);
            setMobilPosition({
                latitude: location.latitude + 0.002,
                longitude: location.longitude + 0.001,
            });
            setIsBooking(true); // Mengindikasikan proses booking selesai
        }, 5000);
    };

    return (
        <Box flex={1} bg="coolGray.100">
        <Header title="Kemana Hari Ini?" withBack={true} />
        {/* Form Input */}
        <Box bg="white" px={4} py={3} borderBottomWidth={1} borderColor="coolGray.200">
            {!isBooking ? (
                <VStack space={4}>
                    {/* Input fields */}
                    <FormControl>
                        <Input
                            value={location ? "Lokasi Anda Saat Ini" : "Menunggu lokasi..."}
                            isReadOnly
                            bg="coolGray.100"
                            InputLeftElement={<Icon as={Ionicons} name="location-outline" size="sm" ml={3} />}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Masukkan tujuan (contoh: Surabaya)"
                            value={address}
                            onChangeText={setAddress}
                            InputLeftElement={<Icon as={Ionicons} name="search" size="sm" ml={3} />}
                        />
                    </FormControl>

                    {/* Tombol Pesan yang muncul hanya ketika lokasi tujuan sudah diinput */}
                        {address && isDestinationSet && (
                            <HStack space={2}>
                                <Button bgColor={"#A7E92F"} flex={1} onPress={handleBooking}>
                                    Pesan
                                </Button>
                            </HStack>
                        )}
                    </VStack>
            ) : (
                <Text fontSize="md" color="gray.600" textAlign="center">
                    Permintaan Anda sedang diproses. Driver akan segera tiba.
                </Text>
            )}
        </Box>

        {/* Map View */}
        <Box flex={1}>
            {location && region ? (
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation={true}
                >
                    <Marker coordinate={location} title="Lokasi Saya" />
                    {destinationCoords && (
                        <Marker coordinate={destinationCoords} title="Tujuan" pinColor="blue" />
                    )}
                    {mobilPosition && (
                        <Marker coordinate={mobilPosition} title="Driver">
                            <Image
                                source={require("../assets/founder.png")}
                                borderRadius="full"
                                borderColor={"green.500"}
                                borderWidth={4}
                                alt="Driver"
                                h={60}
                                w={60}
                            />
                        </Marker>
                    )}
                </MapView>
            ) : (
                <Center flex={1}>
                    <Spinner size="lg" />
                    <Text mt={3}>Memuat lokasi...</Text>
                </Center>
            )}
        </Box>

        {/* Modal Pencarian Driver */}
        <Modal isOpen={isSearchingDriver} onClose={() => setIsSearchingDriver(false)}>
            <Modal.Content>
                <Modal.Body>
                    <Center>
                        <Spinner size="lg" />
                        <Text mt={4}>Mencari driver untukmu...</Text>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>

        {/* Lottie Animation Confirmation */}
<Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
    <Modal.Content>
        <Modal.Body>
            <Center>
                <LottieView
                    source={successAnimation}
                    autoPlay
                    loop={false}
                    style={{ width: 150, height: 150 }}
                    onAnimationFinish={() => {
                        // Set timer to close modal after animation
                        setTimeout(() => setIsModalVisible(false), 3000);
                    }}
                />
                <Text mt={2} fontSize="lg" bold>
                    Pesanan Berhasil!
                </Text>
            </Center>
        </Modal.Body>
    </Modal.Content>
</Modal>

    </Box>
);
};

export default Mobil;
