import { View, Text, Alert, TouchableOpacity } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

const DangerZone = () => {

    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    // endpoint
    const deleteAllTodos = useMutation(api.todos.clearTodos);

    const handleResetApp = async () => {
        try {
            // delete all todos
            Alert.alert("Reset App", "This will delete ALL your todos permanently. This action cannot be undone.", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await deleteAllTodos();
                            Alert.alert("App Reset", `Successfully deleted ${result.deletedCount} ${result.deletedCount > 1 ? "todos" : "todo"}. Your app has been reset.`);
                        } catch (error) {
                            
                        }
                    }
                }
            ])
        } catch (error) {
            console.log('====================================');
            console.log("Error deleting all todos: ", error);
            console.log('====================================');
            Alert.alert("Error", "Failed to reset app");
        }
    }

    return (
        <LinearGradient
            colors={colors.gradients.surface}
            style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitleDanger}>DangerZone</Text>
            <TouchableOpacity
                style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
                        <Ionicons name='trash' size={18} color={'#fff'} />
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Reset App</Text>
                </View>
                <Ionicons name='chevron-forward' size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone