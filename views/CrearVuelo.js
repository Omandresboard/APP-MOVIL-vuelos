import React, { useState } from "react";
import { Platform, View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import clienteAxios from "../config/clienteAxios";
import { Select, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateVueloScreen() {
  const navigation = useNavigation();

  const [newFlight, setNewFlight] = useState({});
  const [aerolinea, setAerolinea] = useState('');
  const [destino, setDestino] = useState('');
  const [salaAbordaje, setSalaAbordaje] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaLlegada, setHoraLlegada] = useState('');

  const [showTimePickerSalida, setShowTimePickerSalida] = useState(false);
  const [showTimePickerLlegada, setShowTimePickerLlegada] = useState(false);

  const handleTimeChangeSalida = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePickerSalida(Platform.OS === 'ios');
    setHoraSalida(currentTime);
  };

  const handleTimeChangeLlegada = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePickerLlegada(Platform.OS === 'ios');
    setHoraLlegada(currentTime);
  };

  const destinations = [
    { id: "1", name: "Armenia" },
    { id: "2", name: "Barranquilla" },
    { id: "3", name: "Cali" },
    { id: "4", name: "Cartagena" },
    { id: "5", name: "Medellin" },
    { id: "6", name: "Santa Martha" },
    { id: "7", name: "San Andres Isla" },
  ];

  const airlines = [
    { id: "1", name: "Avianca" },
    { id: "2", name: "SATENA" },
    { id: "3", name: "Wingo" },
    { id: "4", name: "LATAM" },
    { id: "5", name: "Ultra Air" },
    { id: "6", name: "EASYFLY" },
  ];

 const generateFlightCode = () => {
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
};

const registrar = async () => {
  try {
    if (!aerolinea || !destino || !salaAbordaje || !horaSalida || !horaLlegada) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const flightCode = generateFlightCode(); 
    const newFlightData = {
      codvuelo: flightCode,
      codaerolinea: aerolinea,
      coddestino: destino,
      salaabordaje: salaAbordaje,
      horasalida: horaSalida,
      horallegada: horaLlegada,
    };
    const { data } = await clienteAxios.post(
      "/vuelos",
      newFlightData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Vuelo registrado exitosamente.");
    
    navigation.navigate('admin'); 

  } catch (error) {
    console.error("Error al registrar el vuelo:", error.message);
    alert("Error al registrar el vuelo: " + error.message);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        <Text style={styles.title}>Crear Vuelo</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Aerolínea:</Text>
          <Select
            selectedValue={aerolinea}
            onValueChange={(value) => setAerolinea(value)}
          >
            {airlines.map((airline) => (
              <Select.Item
                key={airline.id}
                label={airline.name}
                value={airline.id}
              />
            ))}
          </Select>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destino:</Text>
          <Select
            selectedValue={destino}
            onValueChange={(value) => setDestino(value)}
          >
            {destinations.map((destination) => (
              <Select.Item
                key={destination.id}
                label={destination.name}
                value={destination.id}
              />
            ))}
          </Select>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sala de Abordaje:</Text>
          <Select
            selectedValue={salaAbordaje}
            onValueChange={(value) => setSalaAbordaje(value)}
          >
            <Select.Item label="A1" value="A1" />
            <Select.Item label="A2" value="A2" />
            <Select.Item label="A3" value="A3" />
            <Select.Item label="A4" value="A4" />
          </Select>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora de Salida:</Text>
          <TouchableOpacity onPress={() => setShowTimePickerSalida(true)} style={styles.selectContainer}>
            <Text style={styles.selectText}>{horaSalida ? horaSalida.toLocaleTimeString() : 'Seleccionar Hora de Salida'}</Text>
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
          <TouchableOpacity onPress={() => setShowTimePickerLlegada(true)} style={styles.selectContainer}>
            <Text style={styles.selectText}>{horaLlegada ? horaLlegada.toLocaleTimeString() : 'Seleccionar Hora de Llegada'}</Text>
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

        <Pressable
          p={3}
          onPress={registrar}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registrar</Text>
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
    maxHeight: '100%',
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
    borderColor: '#000',
    borderRadius: 55,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectText: {
    fontSize: 16,
    color: 'black',
  },
});