import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/homo.styles'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TodoInput = () => {

    // app theme
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    // manage state
    const [newTask, setNewTask] = useState("");
    // endpoint
    const addTodo = useMutation(api.todos.addTodo);

    // handle todo
    const handleAddTodo = async () => { 
        // check if there is no new todo
        if (!newTask.trim()) {
            Alert.alert("Info", "Please kindly enter task")
            return;
        }
        try {
            await addTodo({ text: newTask.trim() });
            setNewTask("");
        } catch (error) {
            console.log('====================================');
            console.log("Error adding a todo: ", error);
            console.log('====================================');
            Alert.alert("Error", "Failed to add todo")
        }
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder="What need to be done?"
                    value={newTask}
                    onChangeText={setNewTask}
                    onSubmitEditing={handleAddTodo}
                    // multiline
                    placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    disabled={!newTask.trim()}

                >
                    <LinearGradient
                        colors={newTask.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTask.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name='add' size={24} color={'#fff'}/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput