import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigasi langsung ke halaman login
      navigation.replace('Login');
    }, 2000); // Tampilkan splash screen selama 2 detik

    // Membersihkan timer saat komponen di-unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.pages}>
      <Image 
        source={require('../assets/splash-indrive.png')} 
        style={styles.image} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Warna latar belakang untuk splash screen
  },
  image: {
    width: "100%", // Sesuaikan ukuran gambar sesuai kebutuhan
    height: "100%",
  },
});

export default Splash;
