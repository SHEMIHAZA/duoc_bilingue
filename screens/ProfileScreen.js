import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect } from 'react';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const saveProfileData = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        password,
        profileImage,
      };
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      console.log('Datos del perfil guardados correctamente.');
  
      // Guardar solo el nombre de usuario en AsyncStorage
      const fullName = `${firstName} ${lastName}`;
      await AsyncStorage.setItem('username', fullName);
    } catch (error) {
      console.log('Error al guardar los datos del perfil:', error);
    }
  };

  const loadProfileData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData !== null) {
        const data = JSON.parse(profileData);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPassword(data.password);
        setProfileImage(data.profileImage);
      }
    } catch (error) {
      console.log('Error al obtener los datos del perfil:', error);
    }
  };

  const handleSaveProfile = () => {
    saveProfileData();
  };

  const handleSelectProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permiso denegado para acceder a la galería de imágenes.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "DUOC BILINGUE",
      justifyContent: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#C2185B",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  return (
    
    <>
    <ImageBackground source={require("../screens/assets/images/english.jpg")}
                                    style={{ flex: 1, resizeMode:"cover"}}>
      {/* <Header /> */}
      
      <ScrollView contentContainerStyle={styles.container}>
        
        <TouchableOpacity style={styles.profileImageContainer} onPress={handleSelectProfileImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-outline" size={90} color="gray" />
          )}
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor:'white',
    borderRadius:3,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#C2185B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
