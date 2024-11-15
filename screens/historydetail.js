import React from "react";
import { Box, Text, VStack, Image, HStack, Icon, Divider, Center } from "native-base";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for star icons
import Header from "../components/header";

const HistoryDetail = ({ route }) => {
    const { item } = route.params;

    return (
        <>
            <Header title="Rangkuman Transaksi" withBack="true" />
            <Box flex={1} p={4} bg="gray.100">
                <Box bg="white" p={6} borderRadius="lg" shadow={3} alignItems="center">
                    {/* Rating Section */}
                    <VStack alignItems="center" space={2}>
                        <Text bold fontSize="xl" color="gray.700">Kasih Rating Pelayanan?</Text>
                        <Text fontSize="md" color="gray.500">(1 mengecewakan, 5 top!)</Text>

                        {/* Star Icons */}
                        <HStack space={1} mt={3} mb={4}>
                            {[...Array(5)].map((_, index) => (
                                <Icon key={index} as={FontAwesome} name="star" size="md" color="yellow.400" />
                            ))}
                        </HStack>
                    </VStack>

                    {/* Driver Information Section */}
                    {item.driverImage && (
                        <HStack space={3} alignItems="center">
                            <Image source={item.driverImage} alt="Driver Image" size="lg" borderRadius="full" />
                            <VStack>
                                <Text fontSize="lg" fontWeight="bold" color="gray.700">{item.driver}</Text>
                                <Text fontSize="sm" color="gray.500">{item.driverDetail}</Text>
                            </VStack>
                        </HStack>
                    )}

                    <Divider my={2} />

                    {/* Transaction Information */}
                    <VStack space={3} width="100%">
                        <HStack space={2} mt={2} alignSelf={"center"}>
                            <Image source={item.driverimage} alt={item.store} size="lg" borderRadius="full" mb={4} />
                            <VStack space={2} mt={2} mb={2} ml={3}>
                                <Text fontSize="lg" fontWeight="bold" mb={1}>{item.driver}</Text>
                                <Text fontSize="lg" fontWeight="bold" mb={1}>{item.driverdetail}</Text>
                            </VStack>
                        </HStack>
                        {/* Store and Delivery Address */}
                        <HStack alignItems="center" space={3}>
                            <Icon as={MaterialIcons} name="store" size="sm" color="green.500" />
                            <VStack>
                                <Text color="gray.500" fontWeight="bold">Alamat Asal</Text>
                                <Text fontSize="sm" color="gray.600">{item.store}</Text>
                            </VStack>
                        </HStack>

                        <HStack alignItems="center" space={3}>
                            <Icon as={MaterialIcons} name="place" size="sm" color="green.500" />
                            <VStack>
                                <Text color="gray.500" fontWeight="bold">Alamat Tujuan</Text>
                                <Text fontSize="sm" color="gray.600">{item.pengantaran}</Text>
                            </VStack>
                        </HStack>


                        <Divider my={2} />

                        {/* Date, Order Details, and Price */}
                        <Center>
                            <Text color="gray.400" fontSize="sm">{item.date}</Text>
                        </Center>

                        <Text fontSize="md" color="gray.700" bold>Detail Pembelian</Text>
                        <Text fontSize="md" color="gray.700">
                            {item.orderDetails ? item.orderDetails : "Tidak ada"}
                        </Text>

                        <Divider my={2} />

                        <HStack justifyContent={"space-between"}>
                            <Text fontSize="md" color="gray.700" bold>Total Pembayaran</Text>
                            <Text fontSize="md" fontWeight="bold" >{item.price}</Text>
                        </HStack>
                    </VStack>
                </Box>
            </Box>
        </>
    );
};

export default HistoryDetail;
