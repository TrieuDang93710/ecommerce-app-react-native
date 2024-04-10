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
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  function handleRegister() {
    const url = "http://localhost:3000/v1/user";
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post(`${url}/register`, user)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Registration", "You have registered successfully");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("error: ", error);
        Alert.alert(
          "Registration Error",
          "An error occurred during registration"
        );
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
            Register to Account
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
            <Ionicons
              name="person"
              size={24}
              color="grey"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter a name"
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
        <View style={{ marginTop: 15 }}>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter a email"
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
              <Pressable>
                <Ionicons
                  name="eye"
                  size={24}
                  color="gray"
                  style={{ marginRight: 5 }}
                />
              </Pressable>
            ) : (
              <Pressable onPress={handleShowPassword}>
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
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>
        </View>
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: "grey" }}>Have you a account?Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
