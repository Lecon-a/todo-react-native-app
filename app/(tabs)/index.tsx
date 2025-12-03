import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import useTheme, { ColorScheme } from '@/hooks/useTheme'
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { createHomeStyles } from '@/assets/styles/homo.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors)

  return (
    <SafeAreaView style={homeStyles.container}>
      <TouchableOpacity style={''} onPress={toggleDarkMode}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home