import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

const Index = () => {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      <Text>Hi</Text>
      <Link href="/settings">
        Go to About Us
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
  },
  content: {
      fontSize: 18,
      marginBottom: 12,
  }
})

export default Index;
