import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import useTheme from '@/hooks/useTheme'

const Home = () => {

  const { toggleDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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