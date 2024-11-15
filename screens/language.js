import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Pressable,
  useColorMode,
  Modal,
  Button,
  useTheme,
  Center,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/header";

const languages = [
  { label: "Bahasa Indonesia", desk: "Indonesia", code: "id" },
  { label: "English", desk: "Inggris", code: "uk" },
  { label: "English (United States)", desk: "Inggris (Amerika Serikat)", code: "en" },
  { label: "Español", desk: "Spanyol", code: "es" },
  { label: "Français", desk: "Prancis", code: "fr" },
  { label: "Deutsch", desk: "Belanda", code: "de" },
  { label: "日本語", desk: "Jepang", code: "jp" },
  { label: "한국어", desk: "Korea Selatan", code: "ko" },
  { label: "中文", desk: "China", code: "zh" },
];

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("id");
  const [temporaryLanguage, setTemporaryLanguage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  const handleLanguagePress = (code) => {
    setTemporaryLanguage(code);
    setIsModalVisible(true);
  };

  const confirmLanguageChange = () => {
    setSelectedLanguage(temporaryLanguage);
    setIsModalVisible(false);
    console.log("Language changed to:", temporaryLanguage);
  };

  const cancelLanguageChange = () => {
    setTemporaryLanguage(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <Header title="Pengaturan" withBack={true} />
      <Box flex={1} p={4} bg={colorMode === "dark" ? "gray.800" : "gray.100"}>
        <ScrollView>
          <VStack space={4}>
            {languages.map((language) => (
              <Pressable
                key={language.code}
                onPress={() => handleLanguagePress(language.code)}
                _pressed={{ bg: "coolGray.200" }}
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  bg={selectedLanguage === language.code ? "green.100" : "white"}
                  p={4}
                  borderRadius="lg"
                  shadow={selectedLanguage === language.code ? 2 : 0}
                  borderColor="gray.200"
                  borderWidth={1}
                  _hover={{ bg: "gray.50" }}
                >
                  <VStack>
                    <Text
                      fontSize="lg"
                      color={colorMode === "dark" ? "white" : "black"}
                      fontWeight={selectedLanguage === language.code ? "bold" : "normal"}
                    >
                      {language.label}
                    </Text>
                    <Text fontSize="md" color="#A7E92F">
                      {language.desk}
                    </Text>
                  </VStack>
                  {selectedLanguage === language.code && (
                    <Ionicons name="checkmark-circle" size={24} color="#A7E92F" />
                  )}
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>

        {/* Modal Konfirmasi */}
        <Modal isOpen={isModalVisible} onClose={cancelLanguageChange} avoidKeyboard>
          <Modal.Content
            bg={colorMode === "dark" ? "gray.700" : "white"}
            maxWidth="400px"
            borderRadius="xl"
            p={5}
            shadow={7}
            transitionDuration={300}
            transitionTimingFunction="ease-in-out"
          >
            <Modal.Header pb={3}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "dark" ? "white" : "black"}
                textAlign="center"
              >
                Ganti Bahasa?
              </Text>
            </Modal.Header>
            <Modal.Body pb={5}>
              <Center>
                <Text fontSize="md" color={colorMode === "dark" ? "white" : "black"}>
                  Aplikasi akan ditutup dan bahasa diganti ke{" "}
                  <Text bold color="#A7E92F">
                    {temporaryLanguage &&
                      languages.find((l) => l.code === temporaryLanguage).label}
                  </Text>
                </Text>
              </Center>
            </Modal.Body>
            <Modal.Footer justifyContent="space-evenly" pt={4}>
              <Button
                bgColor="red.500"
                variant="solid"
                colorScheme="coolGray"
                onPress={cancelLanguageChange}
                _text={{ color: "white", fontWeight: "bold" }}
                w="45%"
                _hover={{ bg: "red.600" }}
                _pressed={{ bg: "red.700" }}
              >
                Batalkan
              </Button>
              <Button
                bgColor="green.500"
                variant="solid"
                colorScheme="coolGray"
                onPress={confirmLanguageChange}
                _text={{ color: "white", fontWeight: "bold" }}
                w="45%"
                _hover={{ bg: "green.600" }}
                _pressed={{ bg: "green.700" }}
              >
                Ganti
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </>
  );
};

export default Language;
