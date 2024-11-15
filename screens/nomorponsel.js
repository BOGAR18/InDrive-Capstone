import React, { useState } from "react";
import { Box, VStack, Text, HStack, Input, Button, Select, Modal, Center } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const countryOptions = [
  { label: "Indonesia", code: "+62", flag: "🇮🇩" },
  { label: "Afrika Selatan", code: "+27", flag: "🇿🇦" },
  { label: "Amerika Serikat", code: "+1", flag: "🇺🇸" },
  { label: "Inggris", code: "+44", flag: "🇬🇧" },
  { label: "India", code: "+91", flag: "🇮🇳" },
];

const NomorPonsel = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("+62"); // Default to Indonesia
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk modal
  const navigation = useNavigation();

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setPhoneNumber(value); // Awali nomor telepon dengan kode negara
  };

  const handlePhoneNumberChange = (text) => {
    // Tetap awali dengan kode negara meskipun user mengubah input
    const prefix = selectedCountry;
    const newNumber = text.startsWith(prefix)
      ? text
      : prefix + text.replace(/^\+?\d*/, ""); // Hapus prefiks lama, tambahkan prefiks baru
    setPhoneNumber(newNumber);
  };

  const handleSave = () => {
    console.log("Kode Negara:", selectedCountry);
    console.log("Nomor telepon baru:", phoneNumber);
    setIsModalVisible(true); // Tampilkan modal setelah menekan "Simpan"
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.goBack(); // Arahkan ke halaman sebelumnya
  };

  return (
    <>
      <Header title="Pengaturan" withBack="true" />
      <Box flex={1} p={4} bg="gray.100">
        <VStack space={4}>
          <VStack
            alignItems={"flex-start"}
            justifyContent="space-between"
            bg="white"
            p={4}
            borderRadius="md"
            borderBottomWidth={1}
            borderColor="gray.200"
          >
            <Text fontSize="2xl" bold color="black">
              Ganti Nomor?
            </Text>
            <Text fontSize="md" color="black">
              Akun dan data anda akan ditautkan ke nomor baru
            </Text>
          </VStack>

          <Box bg="white" p={4} borderRadius="md" shadow={2}>
            <Text fontSize="md" mb={2} color="gray.700">
              Nomor Ponsel Baru
            </Text>
            <HStack alignItems="center" space={2}>
              <Select
                selectedValue={selectedCountry}
                onValueChange={handleCountryChange}
                minWidth="23%"
                accessibilityLabel="Pilih Negara"
                placeholder="Pilih Negara"
              >
                {countryOptions.map((country) => (
                  <Select.Item
                    key={country.code}
                    label={`${country.flag} ${country.label} (${country.code})`}
                    value={country.code}
                  />
                ))}
              </Select>
              <Input
                flex={1}
                placeholder=" 81234567890"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </HStack>
            <Button mt={4} onPress={handleSave} bgColor="#A7E92F">
              Simpan
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Modal Konfirmasi */}
      <Center>
        <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Nomor Berhasil Diganti</Modal.Header>
            <Modal.Body>
              <Text>Nomor telepon Anda telah berhasil diperbarui ke:</Text>
              <Text bold mt={2}>
                {phoneNumber}
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={handleCloseModal} colorScheme="green">
                OK
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

export default NomorPonsel;
