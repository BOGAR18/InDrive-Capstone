import React, { useState } from "react";
import { Box, Text, VStack, HStack, Button, FlatList, Image, Icon, Center, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InFoodItems = [
    {
        id: '1', date: '17 Okt, 16:47', store: 'Tea Break, Bangkalan Syaichona', status: 'Makanan udah sampai', orderDetails: '1 Lychee Tea, 1 Brown Sugar', price: 'Rp26.200', image: require("../assets/tea-break.png"),
        driver: 'Budi Siregar', driverimage: require("../assets/motor.png"), driverdetail: 'M1799BK', pengantaran: 'Griya Abadi XN 27'
    },
    {
        id: '2', date: '31 Agu, 18:44', store: 'Starbucks, Tunjungan Plaza 6', status: 'Makanan udah sampai', orderDetails: '1 Spesial 2L Hanya 129K!!', price: 'Rp98.500', image: require("../assets/sbux.png"),
        driver: 'Mulyono Zain', driverimage: require("../assets/motor.png"), driverdetail: 'L3219CAK', pengantaran: 'Unesa Ketintang Gedung A'
    },
    {
        id: '3', date: '28 Feb, 10:29', store: 'Kopi Kenangan, Graha Pena', status: 'Makanan udah sampai', orderDetails: '4 Americano, 1 Kopi Mantan', price: 'Rp155.000', image: require("../assets/kopken.png"),
        driver: 'Royadi Mulet', driverimage: require("../assets/motor.png"), driverdetail: 'W2099LOS', pengantaran: 'Wico Ketintang Asik TUS'
    },
];

const DriveItems = [
    {
        id: '4', date: '18 Agu, 10:24', store: 'Hotel Istana Nelayan', status: 'Perjalanan Selesai', price: 'Rp18.000', image: require("../assets/motor.png"),
        driver: 'Sugeng Gafly', driverimage: require("../assets/motor.png"), driverdetail: 'B3749ZBK', pengantaran: 'Wisma Harapan Permai A3 No.40'
    },
    {
        id: '5', date: '11 Agu, 08:41', store: 'Telkom University Surabaya', status: 'Perjalanan Selesai', price: 'Rp9.000', image: require("../assets/motor.png"),
        driver: 'Nugraha Prima', driverimage: require("../assets/motor.png"), driverdetail: 'S1191GAK', pengantaran: 'Royal Plaza,Surabaya'
    },
];

const CourierItems = [
    {
        id: '6', date: '18 Jan, 18:44', store: 'Telkom University Surabaya', status: 'Pengiriman Barang Berhasil', price: 'Rp39.500', image: require("../assets/courier.png"),
        driver: 'Deva Jiano', driverimage: require("../assets/courier.png"), driverdetail: 'B1515TOK', pengantaran: 'Masjid Al-Akbar Gate Selatan,Surabaya'
    },
];

const PlaceholderScreen = ({ title, message }) => (
    <Center flex={1} p={4}>
        <Image
            source={require("../assets/banner.png")}
            alt="Banner"
            style={{ width: '100%', height: '30%' }}
            rounded={"full"}
        />
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mt={5}>
            {title}
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
            {message}
        </Text>
    </Center>
);

const RiwayatList = ({ items, navigation }) => (
    <FlatList
        data={items}
        renderItem={({ item }) => (
            <Box bg="white" p={4} mb={3} borderRadius="md" shadow={1} onTouchEnd={() => navigation.navigate('HistoryDetail', { item })}>
                <Text fontSize="xs" color="gray.500">{item.date}</Text>
                <HStack space={4}>
                    <Image source={item.image} alt={item.store} size="md" borderRadius="full" />
                    <VStack flex={1}>
                        <Text fontWeight="bold" fontSize="lg" mt={1} numberOfLines={1}>{item.store}</Text>
                        <HStack alignItems="center" mt={1}>
                            <Icon as={MaterialIcons} name="check-circle" size="sm" color="#A7E92F" mr={1} />
                            <Text color="gray.500" numberOfLines={1}>{item.status}</Text>
                        </HStack>
                        <Text mt={1} fontSize="sm" color="gray.700" numberOfLines={1}>{item.orderDetails}</Text>
                    </VStack>
                    <VStack>
                        <Text fontSize="md" fontWeight="bold" color="#A7E92F" mb={2}>{item.price}</Text>
                        <Button size="sm" bg="#A7E92F" _text={{ color: "white" }} borderRadius="full" mt={2}>
                            Mau lagi
                        </Button>
                    </VStack>
                </HStack>
            </Box>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<PlaceholderScreen title="Tidak ada riwayat" message="Kamu belum memiliki riwayat pesanan di sini." />}
    />
);

const RiwayatScreen = () => {
    const [subTab, setSubTab] = useState("InFood");
    const navigation = useNavigation();
    const itemsToDisplay = subTab === "InFood" ? InFoodItems : subTab === "Drive" ? DriveItems : CourierItems;

    return (
        <Box flex={1}>
            <HStack space={3} px={3} py={2} bg="white" justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                <Button
                    variant={subTab === "InFood" ? "solid" : "ghost"}
                    bg={subTab === "InFood" ? "#A7E92F" : "transparent"}
                    onPress={() => setSubTab("InFood")}
                    borderRadius="full"
                    _text={{ fontWeight: subTab === "InFood" ? "bold" : "normal", color: subTab === "InFood" ? "white" : "#B0B0B0" }}
                >
                    InFood
                </Button>
                <Button
                    variant={subTab === "Drive" ? "solid" : "ghost"}
                    bg={subTab === "Drive" ? "#A7E92F" : "transparent"}
                    onPress={() => setSubTab("Drive")}
                    borderRadius="full"
                    _text={{ fontWeight: subTab === "Drive" ? "bold" : "normal", color: subTab === "Drive" ? "white" : "#B0B0B0" }}
                >
                    Drive
                </Button>
                <Button
                    variant={subTab === "Courier" ? "solid" : "ghost"}
                    bg={subTab === "Courier" ? "#A7E92F" : "transparent"}
                    onPress={() => setSubTab("Courier")}
                    borderRadius="full"
                    _text={{ fontWeight: subTab === "Courier" ? "bold" : "normal", color: subTab === "Courier" ? "white" : "#B0B0B0" }}
                >
                    Courier
                </Button>
            </HStack>

            <Box flex={1} p={4} bg="gray.100">
                <RiwayatList items={itemsToDisplay} navigation={navigation} />
            </Box>
        </Box>
    );
};


const History = () => {
    const [activeTab, setActiveTab] = useState("Riwayat");

    return (
        <Box flex={1} bg="gray.100">
            <Box p={4} bg="white" shadow={2}>
                <Text fontSize="2xl" fontWeight="bold">Aktivitas</Text>
            </Box>

            {/* Navbar untuk Riwayat, Dalam Proses, Dibatalkan */}
            <HStack space={4} p={3} bg="white" justifyContent="space-evenly" shadow={1}>
                <Button
                    variant="ghost"
                    onPress={() => setActiveTab("Riwayat")}
                    borderBottomWidth={activeTab === "Riwayat" ? 2 : 0}
                    borderColor={activeTab === "Riwayat" ? "#A7E92F" : "transparent"}
                    _text={{
                        color: activeTab === "Riwayat" ? "#A7E92F" : "gray.500",
                        fontWeight: activeTab === "Riwayat" ? "bold" : "normal",
                    }}
                    borderRadius="none"
                >
                    Riwayat
                </Button>
                <Button
                    variant="ghost"
                    onPress={() => setActiveTab("Dalam Proses")}
                    borderBottomWidth={activeTab === "Dalam Proses" ? 2 : 0}
                    borderColor={activeTab === "Dalam Proses" ? "#A7E92F" : "transparent"}
                    _text={{
                        color: activeTab === "Dalam Proses" ? "#A7E92F" : "gray.500",
                        fontWeight: activeTab === "Dalam Proses" ? "bold" : "normal",
                    }}
                    borderRadius="none"
                >
                    Dalam Proses
                </Button>
                <Button
                    variant="ghost"
                    onPress={() => setActiveTab("Dibatalkan")}
                    borderBottomWidth={activeTab === "Dibatalkan" ? 2 : 0}
                    borderColor={activeTab === "Dibatalkan" ? "#A7E92F" : "transparent"}
                    _text={{
                        color: activeTab === "Dibatalkan" ? "#A7E92F" : "gray.500",
                        fontWeight: activeTab === "Dibatalkan" ? "bold" : "normal",
                    }}
                    borderRadius="none"
                >
                    Dibatalkan
                </Button>
            </HStack>

            {/* Menghapus margin-top dari Divider */}
            <Divider />

            <Box flex={1}>
                {activeTab === "Riwayat" && <RiwayatScreen />}
                {activeTab === "Dalam Proses" && <PlaceholderScreen title="Pakai InDrive, yuk!" message="Driver kami akan dengan senang hati membantumu" />}
                {activeTab === "Dibatalkan" && <PlaceholderScreen title="Belum pernah pakai InDrive?" message="Kamu bisa bepergian, makan, dan kirim barang. Cobain, yuk!" />}
            </Box>
        </Box>
    );
};



export default History;
