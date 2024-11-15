import React, { useState } from "react";
import { Box, VStack, Text, HStack, Switch, Button, Radio, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";

const Tanggal = () => {
  const navigation = useNavigation();

  // State for date format and distance unit
  const [selectedDistanceUnit, setSelectedDistanceUnit] = useState("Dalam Kilometer");
  const [is24Hour, setIs24Hour] = useState(true); // For 24-hour toggle
  const distanceUnits = ["Dalam Kilometer", "Dalam Mil"];

  return (
    <>
      <Header title="Pengaturan" withBack="true" />
      <Box flex={1} p={4} bg="coolGray.100">
        <VStack space={4}>
          {/* 24-Hour Clock Toggle */}
          <HStack
            alignItems="center"
            justifyContent="space-between"
            bg="white"
            p={4}
            borderRadius="lg"
            borderBottomWidth={1}
            borderColor="coolGray.200"
            shadow={2}
            _pressed={{
              bg: "gray.200",
            }}
          >
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              Format Jam 24 Jam
            </Text>
            <Switch
              size="md"
              isChecked={is24Hour}
              onToggle={() => setIs24Hour(!is24Hour)}
              trackColor={{ false: "#E0E0E0", true: "green" }}
              thumbColor="#fff"
            />
          </HStack>

          {/* Distance Unit */}
          <HStack
            alignItems="center"
            justifyContent="space-between"
            bg="white"
            p={4}
            borderRadius="lg"
            borderBottomWidth={1}
            borderColor="coolGray.200"
            shadow={2}
            _pressed={{
              bg: "gray.200",
            }}
          >
            <Text fontSize="md" fontWeight="medium" color="gray.800">
              Unit Jarak
            </Text>
            <Radio.Group
              name="distanceUnit"
              value={selectedDistanceUnit}
              onChange={setSelectedDistanceUnit}
              accessibilityLabel="Choose distance unit"
              width="50%"
            >
              {distanceUnits.map((unit, index) => (
                <Radio
                  key={index}
                  value={unit}
                  my={1}
                  colorScheme="green" 
                  _text={{ color: "gray.800" }} 
                >
                  {unit}
                </Radio>
              ))}
            </Radio.Group>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default Tanggal;
