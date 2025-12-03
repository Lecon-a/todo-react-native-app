import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';


const EditTodo = ({
    editingTodoId,
    editingText,
    setEditingTodoId,
    setEditingText
}: {
    editingTodoId: Id<"todos">,
    editingText: string,
    setEditingTodoId: (id: Id<"todos"> | null) => void,
    setEditingText: (text: string) => void
}) => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    // endpoint
    const updateTodo = useMutation(api.todos.editTodo);


    const handleSaveEdit = async () => { 
        if (!editingTodoId) {
        Alert.alert("Error", "No todo is being edited.");
        return;
        }
        if (editingText.trim() === "") {
        Alert.alert("Validation Error", "Todo text cannot be empty.");
        return;
        }
        try {
        await updateTodo({ id: editingTodoId, text: editingText });
        setEditingTodoId(null);
        setEditingText("");
        } catch (error) {
        console.error('Error updating todo:', error);
        Alert.alert("Error", "Failed to update the todo. Please try again.");
        }
    };
    const handleCancelEdit = () => { 
        setEditingTodoId(null);
        setEditingText("");
    };
        
    return (
        <View style={homeStyles.editContainer}>
            <TextInput
                style={homeStyles.editInput}
                placeholder="Edit your todo..."
                value={editingText}
                onChangeText={setEditingText}
                onSubmitEditing={handleSaveEdit}
                // multiline
                placeholderTextColor={colors.textMuted}
            />

            <View style={homeStyles.editButton}>
                <TouchableOpacity
                    onPress={handleSaveEdit}
                    activeOpacity={0.8}
                >
                <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                >
                    <Ionicons name='checkmark' size={16} color={"#fff"} />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleCancelEdit}
                    activeOpacity={0.8}
                >
                <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyles.editButton}
                >
                    <Ionicons name='close' size={16} color={"#fff"} />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View> 
            </View>
    )
}

export default EditTodo