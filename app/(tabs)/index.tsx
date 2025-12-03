import { Text, TouchableOpacity, StatusBar } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { createHomeStyles } from '@/assets/styles/homo.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';


const Home = () => {

  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors)

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TouchableOpacity style={''} onPress={toggleDarkMode}>
          <Text>Toggle</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
)}

export default Home