import React, { useState } from "react";
import { Box, Text, VStack, HStack, Input, FlatList, Image, Icon, Button, Modal } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { beritaData } from "../databerita";



const featureData = [
    { id: '1', name: 'Motor', image: require('../assets/motor.png'), screen: 'Motor' },
    { id: '2', name: 'Mobil', image: require('../assets/car.png'), screen: 'Mobil' },
    { id: '3', name: '6 Kursi', image: require('../assets/minibus.png'), screen: 'Minibus' },
    { id: '4', name: 'Pengiriman', image: require('../assets/courier.png'), screen: 'Courier' },
    { id: '5', name: 'InFood', image: require('../assets/food.png'), screen: 'FoodScreen' },
    { id: '6', name: 'InMart', image: require('../assets/mart.png'), screen: 'MartScreen' },
];

const ratingData = [
    { id: '1', image: require('../assets/makanan1.png'), heading: 'Rumah Makan Cak Imien Jemursari, Surabaya', description: 'Restoran', rating: 4.5 },
    { id: '2', image: require('../assets/makanan2.png'), heading: 'Nasi Goreng Gemoy, Surabaya', description: 'Aneka Nasi', rating: 4.2 },
    { id: '3', image: require('../assets/makanan3.png'), heading: 'Ayam Bakar Sambal Ireng Puolz, Surabaya', description: 'Ayam dan Bebek', rating: 3.8 },
    { id: '4', image: require('../assets/makanan4.png'), heading: 'MIXUE CitraLand Driyorejo CBD, Surabaya', description: 'Eskrim dan Minuman', rating: 4.8 },
    { id: '5', image: require('../assets/makanan5.png'), heading: 'Martabak Terang Bulan BOGASARI Bandung Cabang Menganti', description: 'Jajanan, Sweets', rating: 3.5 },
];


const Home = () => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get("window").width;
    const [showModal, setShowModal] = useState(false);

    const renderRatingItem = ({ item }) => (
        <Box
            bg="white"
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="md"
            shadow={2}
            overflow="hidden"
            mb={4}
            p={4}
            width={screenWidth * 0.6}
            mr={4}
        >
            <Image
                source={item.image}
                alt={item.heading}
                width="100%"
                height={150}
                resizeMode="cover"
                borderRadius="md"
            />
            <VStack space={2} mt={3}>
                <Text fontSize="lg" fontWeight="bold" numberOfLines={2} ellipsizeMode="tail">
                    {item.heading}
                </Text>
                <Text fontSize="sm" color="gray.600">
                    {item.description}
                </Text>
                <HStack alignItems="center" space={1}>
                    <Icon as={MaterialIcons} name="star" color="yellow.500" size="sm" />
                    <Text fontSize="sm" color="gray.600">
                        {item.rating}
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );

    const renderFeatureButton = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.name === 'Pengiriman') {
                    setShowModal(true); // Tampilkan modal untuk Pengiriman
                } else {
                    navigation.navigate(item.screen); // Navigasi langsung untuk fitur lain
                }
            }}
            style={{ width: '30%', alignItems: 'center', marginVertical: 10 }}
        >
            <VStack alignItems="center">
                <Image source={item.image} style={{ width: 75, height: 70 }} rounded={100} alt={item.name} />
                <Text mt={2} fontWeight="bold">{item.name}</Text>
            </VStack>
        </TouchableOpacity>
    );

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header bgColor={"green.500"}>Pilih Jenis Pengiriman</Modal.Header>
                    <Modal.Body >
                        <HStack space={5} alignContent={"space-between"}>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('Courier');
                            }}
                            style={{ alignItems: 'center', marginLeft: 20}}
                        >
                            <Image
                                source={require('../assets/normal-cargo.png')} 
                                alt="Pengiriman 20+ Kg"
                                style={{ width: 100, height: 100 }}
                                rounded={"full"}
                                borderWidth={4}
                                borderColor={"green.500"}
                            />
                            <VStack alignItems={"center"}>
                            <Text style={{ marginTop: 10, fontSize: 16 }} bold>Pengiriman</Text>
                            <Text style={{ marginTop: 10, fontSize: 16 }} bold>Normal</Text>
                            </VStack>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('Cargo');
                            }}
                            style={{ alignItems: 'center', marginLeft: 20 }}
                        >
                            <Image
                                source={require('../assets/cargo.png')} 
                                alt="Pengiriman 20+ Kg"
                                style={{ width: 100, height: 100 }}
                                rounded={"full"}
                                borderWidth={4}
                                borderColor={"green.500"}
                            />
                            <VStack alignItems={"center"}>
                            <Text style={{ marginTop: 10, fontSize: 16 }} bold>Pengiriman</Text>
                            <Text style={{ marginTop: 10, fontSize: 16 }} bold>20+ Kg</Text>
                            </VStack>
                        </TouchableOpacity>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <FlatList
                data={[1]} // Single item for FlatList to handle the entire layout
                renderItem={() => (
                    <Box w="100%" bg="white">
                        <Box h={Dimensions.get("window").height / 4} w="100%" position="relative">
                            <Image
                                source={require("../assets/banner.png")}
                                alt="Banner"
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                            <HStack position="absolute" top={5} left={4} right={4} space={3} alignItems="center">
                                <Input placeholder="Search..." flex={1} bg="white" borderRadius="full" />
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                                    <Image
                                        source={require("../assets/founder.png")}
                                        borderRadius={50}
                                        h={50}
                                        w={50}
                                        alt="Profile"
                                        borderColor={"white.500"}
                                        borderWidth={4}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </Box>

                        <VStack space={4} px={4} mt={4}>
                            <FlatList
                                data={featureData}
                                renderItem={renderFeatureButton}
                                keyExtractor={item => item.id}
                                numColumns={3}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                            />
                        </VStack>

                        <Box p={4} bg="white" width="100%">
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                                borderWidth={1}
                                borderColor="gray.300"
                                borderRadius="md"
                                p={4}
                            >
                                <Image
                                    source={require("../assets/logo-small.png")}
                                    alt="promo"
                                    style={{ width: 30, height: 30 }} rounded={100}
                                />
                                <VStack alignItems="between" ml={-3}>
                                    <Text fontSize="md" fontWeight="bold">
                                        Voucher InDrive❗
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold">
                                        Dapatkan Sekarang Juga
                                    </Text>
                                </VStack>
                                <Button
                                    onPress={() => navigation.navigate('Promo')}
                                    backgroundColor={"#A7E92F"}
                                    rounded={"full"}
                                >
                                    Lihat Semua
                                </Button>
                            </HStack>
                        </Box>

                        <Box mt={4}>
                            <FlatList
                                data={ratingData}
                                renderItem={renderRatingItem}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 16 }}
                            />
                        </Box>

                        <Box px={4} mt={4}>
                            <FlatList
                                data={beritaData}
                                renderItem={({ item }) => (
                                    <Box
                                        bg="white"
                                        borderWidth={1}
                                        borderColor="gray.300"
                                        borderRadius="md"
                                        shadow={2}
                                        overflow="hidden"
                                        width={screenWidth - 32}
                                        alignSelf="center"
                                        mb={4}
                                    >
                                        <Image
                                            source={{ uri: item.imageUrl }}
                                            alt={item.text}
                                            width="100%"
                                            height={200}
                                            resizeMode="cover"
                                        />
                                        <Box p={4}>
                                            <Text fontSize="lg" fontWeight="bold" mb={1}>
                                                {item.text}
                                            </Text>
                                            <Text fontSize="sm" color="gray.600" numberOfLines={2}>
                                                {item.description}
                                            </Text>
                                        </Box>
                                    </Box>
                                )}
                                keyExtractor={item => item.key}
                            />
                        </Box>
                    </Box>
                )}
                keyExtractor={() => '1'}

            />
        </>
    );

};

export default Home;
