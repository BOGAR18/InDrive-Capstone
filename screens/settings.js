import React from "react";
import { Box, VStack, Text, HStack, Switch, Button, Divider } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/header";

const Settings = () => {
  const navigation = useNavigation();

  const settingsItems = [
    {
      label: "Nomor Ponsel",
      route: "NomorPonsel",
    },
    {
      label: "Bahasa",
      route: "Language",
    },
    {
      label: "Format Tanggal & Unit Jarak",
      route: "Tanggal",
    },
    {
      label: "Mode Gelap",
      route: "DarkMode",
      isSwitch: true,
    },
    {
      label: "Navigator",
      route: "Navigator",
    },
    {
      label: "Tentang Aplikasi",
      route: "AboutApp",
    },
  ];

  return (
    <>
      <Header title="Pengaturan" withBack="true" />
      <Box flex={1} p={4} bg="coolGray.100">
        <VStack space={4}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.route)}
            >
              <HStack
                alignItems="center"
                justifyContent="space-between"
                bg="white"
                p={4}
                borderRadius="lg"
                borderBottomWidth={1}
                borderColor="coolGray.200"
                shadow={2} // Add subtle shadow to improve UI depth
                _pressed={{
                  bg: "gray.200", // Subtle background color change on press
                }}
              >
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {item.label}
                </Text>
                {item.isSwitch ? (
                  <Switch
                    size="md"
                    trackColor={{ false: "#E0E0E0", true: "#4CAF50" }} // Custom colors
                    thumbColor="#fff"
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={24} color="#A7E92F" />
                )}
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Settings;
