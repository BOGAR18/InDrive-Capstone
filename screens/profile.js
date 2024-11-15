import { StatusBar, Image, Box, Heading, Text, ScrollView, Button, Icon, HStack } from "native-base";
import Header from '../components/header';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const navigation = useNavigation();  // Get navigation prop

    const handleSettingsPress = () => {
        navigation.navigate("Settings"); // Navigate to the Settings screen
    };

    const handleLogoutPress = () => {
        navigation.navigate("Login"); // Navigate to the Login screen
    };

    const handleSupportPress = () => {
        navigation.navigate("Support"); // Navigate to the Support screen
    };

    return (
        <ScrollView bg="#f5f5f5">
            <Header title="Profile" withBack="true" />
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            
            {/* Profile Card */}
            <Box flex={1} justifyContent="center" alignItems="center" p={4}>
                <Box
                    alignSelf="center"
                    width="90%"
                    bg="white"
                    mt={8}
                    shadow={6}
                    borderRadius={20}
                    p={6}
                    borderWidth={1}
                    borderColor="gray.200"
                >
                    {/* Profile Picture */}
                    <Box alignItems="center" mb={4}>
                        <Image
                            source={require("../assets/founder.png")}
                            borderRadius={75}
                            h={160}
                            w={160}
                            alt="Profile Logo"
                            borderColor="white"
                            borderWidth={5}
                        />
                    </Box>

                    {/* Profile Name and Email */}
                    <Heading alignSelf="center" fontSize={26} fontWeight="bold" color="gray.800">
                        Capstone Project
                    </Heading>
                    <Text alignSelf="center" color="gray.600" fontSize={18} mt={2}>
                        Telkomuniversity@gmail.com
                    </Text>
                    <Text alignSelf="center" color="gray.600" fontSize={16} mt={1}>
                        2024
                    </Text>
                </Box>

                {/* Action Buttons */}
                <Box width="100%" px={5} pb={5} mt={6}>
                    {/* Settings Button */}
                    <Button
                        mt={4}
                        size="lg"
                        backgroundColor="gray.200"
                        onPress={handleSettingsPress}
                        _text={{ color: "black", fontWeight: "bold" }}
                        borderRadius={15}
                        _pressed={{ bg: "gray.400" }} // Button press effect
                    >
                        Pengaturan
                    </Button>

                    {/* Support Button */}
                    <Button
                        mt={4}
                        size="lg"
                        backgroundColor="gray.200"
                        onPress={handleSupportPress}
                        _text={{ color: "black", fontWeight: "bold" }}
                        borderRadius={15}
                        _pressed={{ bg: "gray.400" }} // Button press effect
                    >
                        Bantuan dan Dukungan
                    </Button>

                    {/* Logout Button */}
                    <Button
                        mt={4}
                        size="lg"
                        backgroundColor="gray.200"
                        onPress={handleLogoutPress}
                        _text={{ color: "red.600", fontWeight: "bold" }} // Red text for logout button
                        borderRadius={15}
                        _pressed={{ bg: "gray.400" }} // Button press effect
                    >
                        Keluar
                    </Button>
                </Box>
            </Box>
        </ScrollView>
    );
};

export default Profile;
