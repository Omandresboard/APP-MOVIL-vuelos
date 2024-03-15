import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, View, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VueloContext from '../context/VueloProvider';
import calcularDiferenciaTiempo from '../helpers/calcularDiferenciaTiempo';

export default function AdminVuelos() {
  const { vuelos, obtenerDetallesVuelo, eliminarPasajero, eliminarVuelo, onRefresh } = useContext(VueloContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.admin}>
        <Text style={styles.heading}>Administrar Vuelos</Text>
      </View>
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {vuelos.length > 0 ? (
          vuelos.map((vuelo, index) => (
            <TouchableOpacity
              style={[styles.card, { marginTop: index === 0 ? 0 : 20 }]}
              key={vuelo.codvuelo}
              onPress={() =>
                navigation.navigate('DetallesVuelo', { id: vuelo.codvuelo })
              }>
              <Text style={styles.title}>Vuelo: {vuelo.codvuelo}</Text>
              <View style={styles.info}>
                <InfoRow label="Destino:" text={vuelo.destino_desc} />
                <InfoRow label="Aerolínea:" text={vuelo.aerolinea_desc} />
                <InfoRow label="Sala de Abordaje:" text={vuelo.salaabordaje} />
                <InfoRow label="Hora de Llegada:" text={vuelo.horallegada} />
                <InfoRow label="Hora de Salida:" text={vuelo.horasalida} />
                <InfoRow label="Tiempo estimado del vuelo:" text={calcularDiferenciaTiempo(vuelo)} />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.infoTextAlert}>No hay Vuelos registrados</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const InfoRow = ({ label, text }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  admin: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  infoText: {
    flex: 1,
  },
  infoTextAlert: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#6c757d', 
    marginBottom: 20, 
  },
}); 
