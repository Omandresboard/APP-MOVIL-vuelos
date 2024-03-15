import React, { useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Icon, HStack, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons, FontAwesome, AntDesign   } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route)

  const navigateToScreen = (route)=>{
    navigation.navigate(route)
  }

  return (
    <NativeBaseProvider>
      <Box mt={'auto'} bg="white" safeAreaTop>
        <HStack bg="blue.700" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={route.name === 'admin' ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => navigateToScreen('admin')}
          >
            <Center>
              <Icon
                mb="1"
                as={
                    <FontAwesome name="plane" size={24} color="black" />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Inicio
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={route.name === 'crearVuelo' ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateToScreen('crearVuelo')}
          >
            <Center>
              <Icon
                mb="1"
                as={<MaterialCommunityIcons name="airplane-plus" size={24} color="black" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Crear Vuelo
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={route.name === 'crearPasajero' ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => navigateToScreen('crearPasajero')}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <AntDesign name="adduser" size={24} color="black" />
                }
                color="white"
                size="sm"
              />
              <Text color="white" font="12">
                Crear Pasajero
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
