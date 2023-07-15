import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import ExercisesScreen from "./screens/ExercisesScreen";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from "./screens/SearchScreen";
import Guia1 from "./screens/Unidades/Unidad 1/Guia1"
import Guia2 from "./screens/Unidades/Unidad 1/Guia2";
import Guia3 from "./screens/Unidades/Unidad 1/Guia3";
import Guia4 from "./screens/Unidades/Unidad 2/Guia4";
import Guia5 from "./screens/Unidades/Unidad 2/Guia5";
import Guia6 from "./screens/Unidades/Unidad 2/Guia6";
import Guia7 from "./screens/Unidades/Unidad 3/Guia7";
import Guia8 from "./screens/Unidades/Unidad 3/Guia8";
import Materia1 from "./screens/Materia/Materia1";


const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#272525", // Color de fondo de la barra de abajo
          },
          tabBarActiveTintColor: "#f7f3f2", // Color del texto seleccionado
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-home-sharp" size={30} color="#f7f3f2" />
              ) : (
                <Ionicons name="ios-home-outline" size={25} color="#6f6f5d" />
              ),
          }}
        />

        {/* <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarLabel: "Saved",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="favorite" size={30} color="#D4209D" />
              ) : (
                <MaterialIcons name="favorite-border" size={25} color="#009BCC" />
              ),
          }}
        /> */}

        <Tab.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{
            tabBarLabel: "Exercises",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-pencil" size={30} color="#f7f3f2" />
              ) : (
                <Ionicons name="ios-pencil-outline" size={25} color="#6f6f5d" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={30} color="#f7f3f2" />
              ) : (
                <Ionicons name="person-outline" size={25} color="#6f6f5d" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Guia1" component={Guia1} />
        <Stack.Screen name="Guia2" component={Guia2} />
        <Stack.Screen name="Guia3" component={Guia3} />
        <Stack.Screen name="Guia4" component={Guia4} />
        <Stack.Screen name="Guia5" component={Guia5} />
        <Stack.Screen name="Guia6" component={Guia6} />
        <Stack.Screen name="Guia7" component={Guia7} />
        <Stack.Screen name="Guia8" component={Guia8} />
        <Stack.Screen name="Materia1" component={Materia1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
