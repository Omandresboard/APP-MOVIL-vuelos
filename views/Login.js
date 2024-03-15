import { View, Text, Input, Box, Pressable } from "native-base";
import React, { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from "react-native";

export default function Login() {
  const navigation = useNavigation()
  const { setAuth } = useAuth()
  const [username, setUsernamne] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState("");

  async function iniciarSesion() {
    if ([username, password].includes("")) {
      setAlerta({ msg: "Todos los campos estan vacios", error: true });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post("/usuarios/autenticar", {
        username,
        password,
      });
      setAuth(data.usuario)
      setAlerta({ msg: data.msg, error: false });
      await AsyncStorage.setItem('token', data.usuario.token)
      setTimeout(() => {
        setAlerta({})
        navigation.navigate('admin')
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  const {msg} = alerta
  return (
    <View flex={1} justifyContent={'center'} p={5}>
      <Text textAlign={"center"} fontSize={32} fontWeight={900} mt={5}>
        Inicia Sesión
      </Text>
      {msg && <Alerta alerta={alerta} />}
      <Box mt={5}>
        <Text style={styles.label}>usuario:</Text>
        <Input
          onChangeText={setUsernamne}
          type="text"
          placeholder="Nombre del Usuario"
        />
      </Box>
      <Box mt={5}>
        <Text style={styles.label}>contraseña:</Text>
        <Input
          onChangeText={setPassword}
          type="password"
          placeholder="Nombre del Usuario"
        />
      </Box>
      <Pressable onPress={iniciarSesion} bg={"blue.500"} p={3} mt={8}>
        <Text textAlign={"center"} color={"#fff"}>
          Iniciar Sesion
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    display: "flex",
    fontWeight: "bold",
  }
})