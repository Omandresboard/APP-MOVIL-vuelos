// VueloProvider.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const VueloContext = createContext();

const VueloProvider = ({ children }) => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  const [vuelos, setVuelos] = useState([]);
  const [vuelo, setVuelo] = useState({});

  useEffect(() => {
    obtenerVuelos();
  }, [auth]);

  const obtenerVuelos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/vuelos", config);
      setVuelos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/vuelos", config);
      setVuelos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDetallesVuelo = async (codVuelo) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/vuelos/${codVuelo}`, config);
      setVuelo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPasajero = async (id) => {
    try {
      const { data } = await clienteAxios.delete(
        `/pasajeros/${vuelo.codvuelo}/${id}`
      );

      const pasajerosActualizados = vuelo.pasajeros.filter(
        (pasajeroState) => pasajeroState.id !== id
      );
      setVuelo({ ...vuelo, pasajeros: pasajerosActualizados });
      navigation.navigate("DetallesVuelo", { id: vuelo.codvuelo });
    } catch (error) {
      console.error("No se puede eliminar", error);
    }
  };

  const eliminarVuelo = async (codvuelo) => {
    try {
      console.log(`Eliminando vuelo con URL: /vuelos/${codvuelo}`);
      const { data } = await clienteAxios.delete(`/vuelos/${codvuelo}`);

      const vuelosActualizados = vuelos.filter(
        (vueloState) => vueloState.codvuelo !== codvuelo
      );
      setVuelos(vuelosActualizados);

      navigation.navigate("admin");
    } catch (error) {
      console.error("No se puede eliminar", error);
    }
  };

  const actualizarVuelo = async (codVuelo, horaSalida, horaLlegada) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/vuelos/${codVuelo}`,
        { horasalida: horaSalida, horallegada: horaLlegada },
        config
      );

      setVuelo(data);
      alert("Vuelo actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el vuelo:", error.message);
      alert("Error al actualizar el vuelo: " + error.message);
    }
  };

  return (
    <VueloContext.Provider
      value={{
        vuelos,
        vuelo,
        obtenerDetallesVuelo,
        eliminarPasajero,
        eliminarVuelo,
        onRefresh,
        actualizarVuelo,
      }}
    >
      {children}
    </VueloContext.Provider>
  );
};

export { VueloProvider };
export default VueloContext;