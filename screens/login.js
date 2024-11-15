import React, { useState } from "react";
import { Box, Center, Button, Text, Image, StatusBar, FlatList } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: '1',
    text: 'App where you set the price',
    image: require("../assets/slides1.png"), 
  },
  {
    key: '2',
    text: 'Your safety is our priority',
    image: require("../assets/slides2.png"), 
  },
];

const Login = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLogin = () => {
    // Navigate to the tab navigator instead of the Home screen
    navigation.replace("Tabs"); // Ensure this matches your Tab Navigator screen name
  };

  const renderItem = ({ item }) => (
    <Box width={width} alignItems="center" justifyContent="center" padding={4}>
      <Image 
        source={item.image} 
        alt="Slide Image" 
        width={width * 0.9} // Increased width for larger images
        height={width * 0.8} // Increased height for larger images
        resizeMode="contain" 
      />
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" marginTop={4}>
        {item.text}
      </Text>
      {/* Dots specific to each slide */}
      <Box flexDirection="row" justifyContent="center" marginTop={2}>
        {slides.map((_, index) => (
          <Box
            key={index}
            width={3}
            height={3}
            borderRadius="full"
            backgroundColor={currentIndex === index ? "#A7E92F" : "gray.300"}
            margin={1}
          />
        ))}
      </Box>
    </Box>
  );

  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={require("../assets/indrive-logo.png")} // Ensure this path is correct for your logo
        alt="Logo"
        size="sm"
        width={150}
        mt={5}
        ml={5}
        alignSelf={"center"}
      />

      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
      />

      <Center padding={5} mb={10}>
        <Button
          backgroundColor={"#A7E92F"}
          onPress={handleLogin}
          width={"100%"}
        >
          <Text fontSize={"xl"} bold>Continue</Text> 
        </Button>
        <Text textAlign={"center"} mt={2} fontSize={"sm"}>
          Joining our app means you agree with our Terms of Use and Privacy Policy
        </Text>
      </Center>
    </SafeAreaView>
  );
};

export default Login;
