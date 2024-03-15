import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState({});


  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
 
      try {
        const { data } = await clienteAxios.get("/usuarios/perfil", config);
        setAuth(data);
        navigation.navigate("admin");
      } catch (error) {
        console.log(error);
        console.log(error.response.data)
      }
    };

    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
