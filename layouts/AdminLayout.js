import { SafeAreaView } from "react-native";
import { Text, Box } from "native-base";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Box py={12} px={5} pb={4} bg={"blue.700"}>
          <Text color={"#FFF"} fontWeight={900} fontSize={24}>
            Panel Administrativo
          </Text>
        </Box>
        <Box style={{ flex: 12 }} safeAreaTop={1} safeAreaX={2}>
          {children}
        </Box>
        <Footer style={{ width: "100%" }} />
      </SafeAreaView>
    </>
  );
};

export default AdminLayout;