import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./views/Login";
import AdminVuelos from "./views/AdminVuelos";
import { AuthProvider } from "./context/AuthProvider";
import { VueloProvider } from "./context/VueloProvider";
import AdminLayout from "./layouts/AdminLayout";
import CrearVuelo from "./views/CrearVuelo";
import CrearPasajero from "./views/CrearPasajero";
import DetallesVuelo from "./views/DetallesVuelo";
import DetallesPasajero from "./views/DetallesPasajero";
import EditVueloScreen from "./views/EditarVuelo";


const Stack = createStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <VueloProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Group>
                <Stack.Screen
                  name="admin"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <AdminVuelos/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="crearVuelo"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <CrearVuelo/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="crearPasajero"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <CrearPasajero/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="DetallesVuelo"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <DetallesVuelo/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="DetallesPasajero"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <DetallesPasajero/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="EditarVuelo"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <AdminLayout>
                      <EditVueloScreen/>
                    </AdminLayout>
                  )}
                </Stack.Screen>
            
              </Stack.Group>
            </Stack.Navigator>
          </VueloProvider>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
