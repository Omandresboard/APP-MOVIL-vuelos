import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetallesPasajero from "./DetallesPasajero";
import clienteAxios from "../config/clienteAxios";
import useVuelo from "../hooks/useVuelo";
import { Pressable } from "native-base";

const DetallesVuelo = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { obtenerDetallesVuelo, vuelo, eliminarVuelo } = useVuelo();
  const { id: codvuelo } = routes.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    obtenerDetallesVuelo(codvuelo);
  }, [codvuelo]);

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerDetallesVuelo(codvuelo);
    setRefreshing(false);
  };

  const verDetallesPasajero = (idPasajero) => {
    navigation.navigate("DetallesPasajero", { codvuelo, idPasajero });
  };

  const editarVuelo = () => {
    if (codvuelo) {
      navigation.navigate("EditarVuelo", { codvuelo });
    } else {
      console.error("El parámetro codvuelo está indefinido");
    }
  };
  

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Detalles del vuelo{" "}
          <Text style={styles.codvueloText}>{codvuelo}</Text> con destino a:{" "}
          <Text style={styles.destinoText}>{vuelo?.destino_desc}</Text>
        </Text>

        {vuelo ? (
          <View style={styles.card}>
            <Text style={styles.cardHeaderText}>Información del vuelo</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Vuelo:</Text>
              <Text style={styles.infoText}>{vuelo.codvuelo}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Destino:</Text>
              <Text style={styles.infoText}>{vuelo.destino_desc}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Aerolínea:</Text>
              <Text style={styles.infoText}>{vuelo.aerolinea_desc}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sala de Abordaje:</Text>
              <Text style={styles.infoText}>{vuelo.salaabordaje}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora de Llegada:</Text>
              <Text style={styles.infoText}>{vuelo.horallegada}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora de Salida:</Text>
              <Text style={styles.infoText}>{vuelo.horasalida}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.errorText}>
            La información del vuelo no está disponible.
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.listaPasajerosText}>Pasajeros Asignados</Text>
        <View style={styles.pasajerosContainer}>
          {vuelo?.pasajeros?.length > 0 ? (
            vuelo.pasajeros.map((pasajero) => (
              <TouchableOpacity
                key={pasajero.id}
                onPress={() => verDetallesPasajero(pasajero.id)}
                style={styles.pasajeroItem}
              >
                <Image
                  style={styles.pasajeroImagen}
                  source={{
                    uri: `${process.env.BACKEND_URL}/imagenes/pasajeros/${pasajero.foto}`,
                  }}
                />
                <Text style={styles.pasajeroNombre}>
                  {pasajero.nombres} {pasajero.apellidos}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noPasajerosText}>
              No hay pasajeros registrados en este vuelo.
            </Text>
          )}
        </View>
      </View>

      <Pressable
        p={3}
        bg={"yellow.500"}
        alignItems={"center"}
        onPress={editarVuelo}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Editar Vuelo</Text>
      </Pressable>
      <Pressable
        onPress={() => eliminarVuelo(vuelo.codvuelo)}
        style={[styles.button, { backgroundColor: "red" }]}
      >
        <Text style={styles.buttonText}>Eliminar Vuelo</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  codvueloText: {
    color: "red",
    fontWeight: "bold",
  },
  destinoText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 8,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#666",
    width: "45%",
  },
  infoText: {
    color: "#444",
    width: "55%",
    textAlign: "right",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  listaPasajerosText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  pasajerosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pasajeroItem: {
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },
  pasajeroNombre: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  pasajeroImagen: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  noPasajerosText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#6c757d",
    marginBottom: 10,
  },
  button: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#007bff",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetallesVuelo;
