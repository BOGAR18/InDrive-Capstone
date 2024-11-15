import React, { useState } from 'react';
import { Box, Text, VStack, Image, Divider, HStack, Button, Modal } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../components/header';

const PromoDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();  // Use navigation to navigate between screens
    const { promo } = route.params;

    // State to handle modal visibility and button disabled state
    const [isClaimed, setIsClaimed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Function to handle claim button press
    const handleClaim = () => {
        setIsClaimed(true);  // Disable the button
        setShowModal(true);  // Show the modal
    };

    // Function to handle "OK" button on the modal
    const handleOk = () => {
        setShowModal(false);  // Close the modal
        navigation.navigate('Promo');  // Navigate to the Promo screen
    };

    return (
        <>
            <Header title="Detail Promo" withBack="true" />
            <Box flex={1} bg="white">
                {/* Image Banner */}
                <Image
                    source={promo.imageUrl}
                    alt={promo.text}
                    width="100%"
                    height={250}
                    resizeMode="cover"
                />

                <Box p={4} flex={1}>
                    <VStack space={3}>
                        {/* Description Section */}
                        <Text fontSize="xl" fontWeight="bold">
                            {promo.text}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                            {promo.jenis}
                        </Text>

                        {/* Divider */}
                        <Divider my={1} />

                        {/* Tanggal Section */}
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text fontSize="md" color="gray.800" bold>
                                Berlaku hingga
                            </Text>
                            <Text fontSize="md" color="gray.800" bold>
                                {promo.tanggal}
                            </Text>
                        </HStack>
                        <Divider />

                        {/* Syarat dan Ketentuan */}
                        <Text fontSize="md" color="gray.800" bold>
                            Syarat dan Ketentuan:
                        </Text>
                        <Text fontSize="md" color="gray.800">
                            {promo.syaratDanKetentuan}
                        </Text>
                        <Divider />

                        {/* Cara Pakai */}
                        <Text fontSize="md" color="gray.800" bold>
                            Cara Pakai:
                        </Text>
                        <Text fontSize="md" color="gray.800">
                            {promo.caraPakai}
                        </Text>
                        <Divider />
                    </VStack>
                </Box>

                {/* Claim Button */}
                <Box p={4}>
                    <Button
                        width="100%"
                        backgroundColor="#A7E92F"
                        onPress={handleClaim}
                        isDisabled={isClaimed}
                    >
                        <Text color="black" fontWeight="bold">
                            {isClaimed ? "Voucher Telah Diklaim" : "Klaim Voucher"}
                        </Text>
                    </Button>
                </Box>

                {/* Success Modal */}
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Success</Modal.Header>
                        <Modal.Body>
                            Voucher berhasil di klaim!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onPress={handleOk} backgroundColor="#A7E92F">
                                <Text color="black" fontWeight="bold">
                                    OK
                                </Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Box>
        </>
    );
};

export default PromoDetail;
