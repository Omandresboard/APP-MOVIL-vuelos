import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,

} from "react-native";
import { Pressable } from "native-base";
// import ImagePicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
// import { useNavigation } from '@react-navigation/native';
import clienteAxios from "../config/clienteAxios";
import useVuelo from "../hooks/useVuelo";
import { useNavigation } from '@react-navigation/native';


export default function CreatePasajero() {
  const [newPassenger, setNewPassenger] = useState({
    codvuelo: "",
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    foto: null,
  });

  const navigation = useNavigation();
  const { vuelos } = useVuelo();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const selectFlight = (codvuelo) => {
    setNewPassenger({ ...newPassenger, codvuelo });
    setIsDialogVisible(false);
  };

  const registrar = async () => {
    try {
      const { data } = await clienteAxios.post(
        `/pasajeros/${newPassenger.codvuelo}`,
        newPassenger,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Verificar si el registro fue exitoso
      if (data && data.msg === "El pasajero ya existe") {
        // Mostrar mensaje de error al usuario
        alert("Error: El pasajero ya existe");
      } else {
        // Mostrar mensaje de éxito al usuario
        alert("Pasajero registrado exitosamente");
        // Redirigir al usuario al apartado de administración
        navigation.navigate('admin'); // Ajusta 'Admin' con el nombre de tu pantalla de administración
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.msg === "El pasajero ya existe") {
        // Mostrar mensaje de error al usuario
        alert("Error: El pasajero ya existe");
      } else {
        console.error("Error al registrar el pasajero:", error.response);
        alert("Error al registrar el pasajero: " + error.message);
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Crear Pasajero</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Identificacion:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger.identificacion}
            onChangeText={(text) =>
              setNewPassenger({ ...newPassenger, identificacion: text })
              
            }
            placeholder="Numero de identificacion"
          />
          
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger.nombres}
            onChangeText={(text) =>
              setNewPassenger({ ...newPassenger, nombres: text })
            }
            placeholder="Nombres"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellidos:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger.apellidos}
            onChangeText={(text) =>
              setNewPassenger({ ...newPassenger, apellidos: text })
            }
            placeholder="Apellidos"

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger.email}
            onChangeText={(text) =>
              setNewPassenger({ ...newPassenger, email: text })
            }
            placeholder="Correo electronico"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefono:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger.telefono}
            onChangeText={(text) =>
              setNewPassenger({ ...newPassenger, telefono: text })
            }
            placeholder="Numero de telefono"
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vuelos:</Text>
          <Pressable
            onPress={toggleDialog}
            style={[styles.input, { backgroundColor: isDialogVisible ? '#ddd' : '#fff' }]}
          >
            <Text style={styles.inputText}>
              {newPassenger.codvuelo
                ? `Vuelo: ${newPassenger.codvuelo} - ${vuelos.destino_desc}`
                : 'Seleccionar Vuelo'}
            </Text>
          </Pressable>

          {isDialogVisible && (
            <View style={styles.dialogContainer}>
              {vuelos.map((vuelo) => (
                <Pressable
                  key={vuelo.codvuelo}
                  onPress={() => selectFlight(vuelo.codvuelo)}
                  style={styles.dialogOption}
                >
                  <Text>{`Vuelo: ${vuelo.codvuelo} con destino a: ${vuelo.destino_desc}`}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>




        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Foto del Pasajero:</Text>
          <Input type="file" onValueChange={handleFileChange} />
          {newPassenger.foto && (
            <Image
              source={{ uri: newPassenger.foto }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View> */}

        <Pressable p={3} onPress={registrar} style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </Pressable>
        <View>
          <Text></Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 4 ,
    backgroundColor: "#f7f7f7",
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
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputText: {
    fontSize: 16,
  },
  dialogContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
  },
  dialogOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  dialogContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
});
