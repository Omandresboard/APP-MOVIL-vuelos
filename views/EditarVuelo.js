import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import clienteAxios from "../config/clienteAxios";
import { Input, Pressable, Select } from "native-base";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { VueloProvider } from "../context/VueloProvider";
import useVuelo from "../hooks/useVuelo";

export default function EditVueloScreen() {
  const navigation = useNavigation();

  const { vuelo } = useVuelo();
  const [newFlight, setNewFlight] = useState({});
  const [aerolinea, setAerolinea] = useState("");
  const [destino, setDestino] = useState("");
  const [salaAbordaje, setSalaAbordaje] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horaLlegada, setHoraLlegada] = useState("");
  const [showTimePickerSalida, setShowTimePickerSalida] = useState(false);
  const [showTimePickerLlegada, setShowTimePickerLlegada] = useState(false);
  const [vueloData, setVueloData] = useState(null);

  const handleTimeChangeSalida = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePickerSalida(Platform.OS === "ios");
    setHoraSalida(currentTime);
    console.log(currentTime);
  };

  const handleTimeChangeLlegada = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePickerLlegada(Platform.OS === "ios");
    setHoraLlegada(currentTime);
  };

  useEffect(() => {
    if (Object.keys(vuelo).length > 0) {
      setNewFlight(vuelo);
    }
  }, [newFlight.codvuelo]);

  const actualizar = async () => {
    try {
      // Restar 5 horas a las horas de salida y llegada
      const horaSalidaActualizada = new Date(horaSalida.getTime() - (5 * 60 * 60 * 1000));
      const horaLlegadaActualizada = new Date(horaLlegada.getTime() - (5 * 60 * 60 * 1000));

      const updatedFlightData = {
        ...newFlight,
        horasalida: horaSalidaActualizada.toISOString(),
        horallegada: horaLlegadaActualizada.toISOString()
      };

      // Mostrar una alerta para confirmar la actualización
      Alert.alert(
        "Confirmar actualización",
        "¿Estás seguro de que deseas actualizar el vuelo?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Aceptar",
            onPress: async () => {
              const { data } = await clienteAxios.put(
                `/vuelos/${newFlight.codvuelo}`,
                updatedFlightData,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(data);
              // Mostrar un mensaje de éxito después de actualizar
              Alert.alert(
                "Vuelo actualizado correctamente",
                "",
                [
                  {
                    text: "Aceptar",
                    onPress: () => {
                      // Redirigir al apartado admin después de aceptar
                      navigation.navigate("admin");
                    }
                  }
                ]
              );
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error al actualizar el vuelo:", error.response.data.msg);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        <Text style={styles.title}>Editar Vuelo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Aerolínea:</Text>
          <TextInput
            style={styles.selectText}
            value={newFlight.aerolinea_desc}
            onChangeText={setAerolinea}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destino:</Text>
          <TextInput
            style={styles.selectText}
            value={newFlight.destino_desc}
            onChangeText={setDestino}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sala de Abordaje:</Text>
          <TextInput
            style={styles.selectText}
            value={newFlight.salaabordaje}
            onChangeText={setSalaAbordaje}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora de Salida:</Text>
          <TouchableOpacity
            onPress={() => setShowTimePickerSalida(true)}
            style={styles.selectContainer}
          >
            <Text style={styles.selectText}>
              {horaSalida
                ? horaSalida.toLocaleTimeString()
                : "Seleccionar Hora de Salida"}
            </Text>
          </TouchableOpacity>
          {showTimePickerSalida && (
            <DateTimePicker
              value={horaSalida || new Date()}
              mode="time"
              is24Hour={false}
              display="clock"
              onChange={handleTimeChangeSalida}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora de Llegada:</Text>
          <TouchableOpacity
            onPress={() => setShowTimePickerLlegada(true)}
            style={styles.selectContainer}
          >
            <Text style={styles.selectText}>
              {horaLlegada
                ? horaLlegada.toLocaleTimeString()
                : "Seleccionar Hora de Llegada"}
            </Text>
          </TouchableOpacity>
          {showTimePickerLlegada && (
            <DateTimePicker
              value={horaLlegada || new Date()}
              mode="time"
              is24Hour={false}
              display="clock"
              onChange={handleTimeChangeLlegada}
            />
          )}
        </View>

        <Pressable p={3} onPress={actualizar} style={styles.button}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  list: {
    marginTop: 20,
    maxHeight: "100%",
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});