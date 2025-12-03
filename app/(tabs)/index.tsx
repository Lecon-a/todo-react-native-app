import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Home = () => {

  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  toggleButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  }
})

export default Home