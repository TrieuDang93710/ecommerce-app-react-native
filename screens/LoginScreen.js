import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  function handleLogin() {
    const user = {
      email: email,
      password: password,
    };
    const url = "http://localhost:3000/v1/user";
    axios
      .post(`${url}/login`, user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        // Alert.alert("Loggin", "You loggin successfully");
        setEmail("");
        setPassword("");
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log("error: ", error);
        Alert.alert("Loggin Error", "An error occurred during Loggin");
      });
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image style={{ width: 150, height: 100 }} source="" />
      </View>
      <KeyboardAvoidingView style={{ marginTop: 30 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#000" }}>
            Login in to Account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: "#D0D0D0",
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="grey"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              placeholder="Enter a email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                fontSize: 16,
                fontWeight: "500",
                width: 300,
                height: 40,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              backgroundColor: "#D0D0D0",
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 5 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={showPass}
              placeholder="Enter a password"
              style={{
                color: "gray",
                fontSize: 16,
                fontWeight: "500",
                width: 300,
                height: 40,
              }}
            />
            {showPass ? (
              <Pressable onPress={() => handleShowPassword()}>
                <Ionicons
                  name="eye"
                  size={24}
                  color="gray"
                  style={{ marginRight: 5 }}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => handleShowPassword()}>
                <Ionicons
                  name="eye-off"
                  size={24}
                  color="gray"
                  style={{ marginRight: 5 }}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <Text>Remember password?</Text>
          <Text style={{ color: "blue", fontWeight: "500" }}>
            Forgot password?
          </Text>
        </View>
        <View style={{ marginTop: 90 }} />
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => {
              // handleLogin();
              navigation.replace("Main");
            }}
            style={{
              backgroundColor: "yellow",
              width: 300,
              height: 50,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "500" }}>
              Login
            </Text>
          </Pressable>
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "grey" }}>
              Already have an account?Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
