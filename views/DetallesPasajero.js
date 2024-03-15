import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import clienteAxios from '../config/clienteAxios';
import { useRoute } from '@react-navigation/native';
import useVuelo from '../hooks/useVuelo';

const DetallesPasajero = () => {
  const route = useRoute();
  const { codvuelo, idPasajero } = route.params;
  const [pasajero, setPasajero] = useState({});
  const { eliminarPasajero } = useVuelo();

  useEffect(() => {
    const obtenerDetallesPasajero = async () => {
      try {
        const { data } = await clienteAxios(`/pasajeros/${codvuelo}/${idPasajero}`);
        setPasajero(data);
      } catch (error) {
        console.error('Error al obtener detalles del pasajero:', error);
      }
    };

    obtenerDetallesPasajero();
  }, [idPasajero]);

  const confirmarEliminarPasajero = () => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este pasajero?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => eliminarPasajeroHandler(),
        },
      ]
    );
  };

  const eliminarPasajeroHandler = () => {
    eliminarPasajero(pasajero.id);
    Alert.alert("Pasajero Eliminado", "El pasajero ha sido eliminado exitosamente.");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Detalles del Pasajero</Text>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombres:</Text>
          <Text style={styles.infoText}>{pasajero.nombres}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Apellidos:</Text>
          <Text style={styles.infoText}>{pasajero.apellidos}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Identificación:</Text>
          <Text style={styles.infoText}>{pasajero.identificacion}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{pasajero.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.infoText}>{pasajero.telefono}</Text>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Foto:</Text>
        <Image
          source={{
            uri: `${process.env.BACKEND_URL}/imagenes/pasajeros/${pasajero.foto}`,
          }}
          style={styles.image}
        />
      </View>
      
      <Pressable
        style={styles.button}
        onPress={confirmarEliminarPasajero}
      >
        <Text style={styles.buttonText}>Eliminar Pasajero</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  infoText: {
    fontSize: 16,
    color: '#495057',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetallesPasajero;
