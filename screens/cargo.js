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
    Image,
    FormControl,
    Modal,
    Icon,
    Select,
    Spinner,
    Heading,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/header";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import successAnimation from "../assets/cargo.json";

const cargoOptions = [
    { label: "Truk Tertutup" },
    { label: "Pembayaran dengan QR" },
    { label: "Pengangkut" },
    { label: "Ikut Sebagai Penumpang" },
    { label: "Barang Pecah Belah" },
    { label: "Full Loading" },
];

const vehicleOptions = [
    { jenis: "Pickup", deskripsi: "Dapat menampung berat hingga 1t, Cocok untuk mengirim barang elektorik" },
    { jenis: "Truk Engkel", deskripsi: "Dapat menampung berat hingga 2.5 Ton. Cocok untuk mengirimkan furniture dan kotak besar" },
    { jenis: "Van", deskripsi: "Dapat menampung berat hingga 700kg. Cocok untuk mengirimkan peralatan rumah tangga/dapur" },
];

const paymentMethods = [
    { id: 1, label: "OVO", value: "ovo" },
    { id: 2, label: "Tunai", value: "cash" },
];

const Cargo = () => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [isDestinationSet, setIsDestinationSet] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [isDetailOrderModalOpen, setIsDetailOrderModalOpen] = useState(false);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [offeredPrice, setOfferedPrice] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [isSearchingDriver, setIsSearchingDriver] = useState(false);
    const [orderDetails, setOrderDetails] = useState("");
    const [mobilPosition, setMobilPosition] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [address, setAddress] = useState(""); // Tujuan pengiriman
    const [itemDescription, setItemDescription] = useState(""); // Deskripsi barang
    const [selectedCargo, setSelectedCargo] = useState(cargoOptions[0].code);
    const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0].code);
    const [finalPrice, setFinalPrice] = useState(null);  // State untuk menyimpan harga akhir yang ditawarkan
    const [finalPaymentMethod, setFinalPaymentMethod] = useState("");  // State untuk menyimpan metode pembayaran
    const [typingTimeout, setTypingTimeout] = useState(null);
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

    const handlePriceOffer = () => {
        setIsPriceModalOpen(true); // Menampilkan modal penawaran harga
    };

    const handlePriceSubmit = () => {
        if (!offeredPrice || offeredPrice <= 0) {
            toast.show({
                title: "Harga yang ditawarkan tidak valid",
                status: "error",
            });
            return;
        }

        toast.show({
            title: `Harga yang ditawarkan: Rp ${offeredPrice}`,
            status: "success",
        });

        // Menyimpan harga dan metode pembayaran yang dipilih
        setFinalPrice(offeredPrice);
        setFinalPaymentMethod(selectedPaymentMethod);

        setIsPriceModalOpen(false); // Menutup modal setelah penawaran selesai
    };

    return (
        <Box flex={1} bg="coolGray.100">
            <Header title="Cargo" withBack={true} />
            {/* Form Input */}
            <Box bg="white" px={4} py={3} borderBottomWidth={1} borderColor="coolGray.200">
                {!isBooking ? (
                    <VStack space={3}>
                        {/* Pilihan Lokasi dan Tujuan */}
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
                                placeholder="Masukkan tujuan pengiriman"
                                value={address}
                                onChangeText={handleDestinationChange} // Handle perubahan input langsung
                                InputLeftElement={<Icon as={Ionicons} name="search" size="sm" ml={3} />}
                            />
                        </FormControl>

                        <HStack space={1}>

                            {/* Tombol Detail Order */}
                            <Button w={"50%"} bgColor={"gray.400"} borderRadius={5} onPress={() => setIsDetailOrderModalOpen(true)}>
                                Deskripsi Cargo
                            </Button>
                            {/* Tombol Penawaran Harga */}
                            <Button w={"50%"} bgColor={"gray.400"} onPress={handlePriceOffer} borderRadius={5}>
                                {finalPrice && finalPaymentMethod
                                    ? `Rp ${finalPrice} (${finalPaymentMethod === "cash" ? "Tunai" : finalPaymentMethod})`
                                    : "Tawarkan Harga Anda"
                                }
                            </Button>
                        </HStack>


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
                    <MapView ref={mapRef} style={{ flex: 1 }} region={region} showsUserLocation={true}>
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

            {/* Modal Detail Order */}
            <Modal isOpen={isDetailOrderModalOpen} onClose={() => setIsDetailOrderModalOpen(false)}>
                <Modal.Content maxWidth="90%" borderRadius="lg">
                    <Modal.CloseButton />
                    <Modal.Header>
                        <Text fontSize="lg" fontWeight="bold" textAlign="center">Jelaskan Kargonya</Text>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack space={5}>
                            {/* Deskripsi Barang */}
                            <VStack space={2}>
                                <Input
                                    placeholder="Contoh: lemari berukuran 150/210 cm beserta lima kotak"
                                    value={itemDescription}
                                    onChangeText={setItemDescription}
                                    multiline
                                    height={100}
                                    borderColor="black"
                                    borderWidth={1}
                                    borderRadius="md"
                                    textAlignVertical="top"
                                />
                                {itemDescription === "" && (
                                    <Text fontSize="xs" color="red.500">Tambahkan deskripsi</Text>
                                )}
                            </VStack>

                            {/* Pilihan Cargo */}
                            <VStack space={2} w="full">
                                <Text fontSize="md" fontWeight="bold">Pilihan</Text>
                                <HStack space={3} w="full">
                                    <Select
                                        selectedValue={selectedCargo}
                                        onValueChange={setSelectedCargo}
                                        w="276"  // Pastikan Select mengisi lebar penuh
                                        borderWidth={1}
                                        borderColor="coolGray.500"
                                        borderRadius="md"
                                    >
                                        {cargoOptions.map((cargo) => (
                                            <Select.Item
                                                key={cargo.code}
                                                label={cargo.label}
                                                value={cargo.code}
                                            />
                                        ))}
                                    </Select>
                                </HStack>
                                {selectedCargo === "" && (
                                    <Text fontSize="xs" color="red.500">Pilih Salah Satu</Text>
                                )}
                            </VStack>

                            {/* Pilihan Vehicle */}
                            <VStack space={2} w="full">
                                <Text fontSize="md" fontWeight="bold">Ukuran Kendaraan</Text>
                                <HStack space={3} w="full">
                                <Select
                                        selectedValue={selectedVehicle}
                                        onValueChange={setSelectedVehicle}
                                        w="276"  // Pastikan Select mengisi lebar penuh
                                        borderWidth={1}
                                        borderColor="coolGray.500"
                                        borderRadius="md"
                                    >
                                    {vehicleOptions.map((vehicle) => (
                                        <Select.Item key={vehicle.jenis} label={`${vehicle.jenis}, "${vehicle.deskripsi}"`} value={vehicle.jenis} />
                                    ))}
                                </Select>
                                </HStack>
                                {selectedVehicle === "" && (
                                    <Text fontSize="xs" color="red.500">Pilih Jenis Kendaraan</Text>
                                )}
                            </VStack>


                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            flex={1}
                            bgColor={"#A7E92F"}
                            _text={{ fontWeight: "bold", fontSize: "md", color: "black" }}
                            onPress={() => {
                                // Validate all fields before saving
                                if (itemDescription) {
                                    toast.show({
                                        title: "Detail Order Disimpan",
                                        status: "success",
                                    });

                                    // Save order details if valid
                                    setOrderDetails({
                                        itemDescription,
                                        selectedCargo,
                                        selectedVehicle,
                                    });

                                    // Close the modal
                                    setIsDetailOrderModalOpen(false);
                                } else {
                                    toast.show({
                                        title: "Mohon lengkapi semua informasi",
                                        status: "error",
                                    });
                                }
                            }}
                        >
                            Ajukan
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* Modal Penawaran Harga */}
            <Modal isOpen={isPriceModalOpen} onClose={() => setIsPriceModalOpen(false)} size="lg">
                <Modal.Content borderRadius="lg">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <VStack space={4}>
                            {/* Header */}
                            <Center>
                                <Text fontSize="lg" fontWeight="bold">
                                    Tawarkan harga Anda
                                </Text>
                            </Center>

                            {/* Input Harga */}
                            <HStack
                                alignItems="center"
                                borderBottomWidth={1}
                                borderBottomColor="coolGray.300"
                                py={2}
                            >
                                <Text fontSize="2xl" fontWeight="bold" color="coolGray.600" mx={2}>
                                    Rp
                                </Text>
                                <Input
                                    placeholder="0"
                                    value={offeredPrice}
                                    onChangeText={setOfferedPrice}
                                    keyboardType="numeric"
                                    borderWidth={0}
                                    flex={1}
                                    fontSize="xl"
                                    _focus={{ borderColor: "blue.500" }}
                                />
                            </HStack>

                            {/* Dropdown Metode Pembayaran */}
                            <Box borderWidth={1} borderRadius="md" borderColor="coolGray.300" overflow="hidden">
                                <Select
                                    selectedValue={selectedPaymentMethod}
                                    onValueChange={(value) => setSelectedPaymentMethod(value)}
                                    placeholder="Pilih Metode Pembayaran"
                                >
                                    {paymentMethods.map((method) => (
                                        <Select.Item
                                            key={method.id} // Pastikan key unik
                                            label={method.label}
                                            value={method.value}
                                        />
                                    ))}
                                </Select>
                            </Box>

                            {/* Tombol Selesai */}
                            <Button
                                isDisabled={!offeredPrice} // Disable tombol jika input kosong
                                bgColor={"#A7E92F"}
                                onPress={handlePriceSubmit}
                                mt={2}
                            >
                                Selesai
                            </Button>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

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
                            <Text fontSize="lg" bold>
                                Pesanan Berhasil!
                            </Text>
                            <Text mt={1} fontSize="md" >
                                Pastikan Barang Sudah Siap
                            </Text>
                        </Center>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    );
};

export default Cargo;
