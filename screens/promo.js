import React from 'react';
import { Box, Text, VStack, FlatList, Image, Button, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { promoData } from '../datapromo';
import Header from '../components/header';

const Promo = () => {
    const navigation = useNavigation();

    const renderPromo = ({ item }) => (
        <Box
            bg="white"
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="md"
            shadow={2}
            overflow="hidden"
            mb={4}
            width="90%"
            alignSelf="center"
        >
            <Image
                source={item.imageUrl}
                alt={item.text}
                width="100%"
                height={200}
                resizeMode="cover"
            />

            <VStack p={4} space={2}>
                <Text fontSize="lg" fontWeight="bold">{item.text}</Text>
                <Text fontSize="sm" color="gray.600" numberOfLines={1}>{item.description || "Deskripsi Promo"}</Text>
                <Button
                    onPress={() => navigation.navigate('PromoDetail', { promo: item })}
                    mt={2}
                    backgroundColor={"#A7E92F"}
                >
                    <Text color={'black'} bold>
                    Lihat Detail
                    </Text>
                </Button>
            </VStack>
        </Box>
    );

    return (
        <>
        <Header title={"PROMO"} withBack={"true"} />
        <Box flex={1}  bg="white">
            <ScrollView>
            <FlatList
                data={promoData} // Using beritaData as voucher data
                renderItem={renderPromo}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
            />
            </ScrollView>
        </Box>
        </>
    );
};

export default Promo;
