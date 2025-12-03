import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

type Todo = Doc<"todos">;

const TodoListItem = ({
    setEditingTodoId,
    setEditingText,
    item
}: {
        item: Todo,
        setEditingTodoId: (id: Id<"todos"> | null) => void,
        setEditingText: (text: string) => void
    }) => {

    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    // endpoint
    const deleteTodo = useMutation(api.todos.deleteTodo);

    const handleDeleteTodo = async (id: Id<"todos">) => { 
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTodo({ id });
            } catch (error) {
              console.error('Error deleting todo:', error);
            }
          }
        }
      ])
    };

    const handleEditTodo = async (todo: Todo) => {
        setEditingTodoId(todo._id);
        setEditingText(todo.text);
    };

    return (
        <View>
            <Text style={[
                homeStyles.todoText,
                item.isCompleted && {
                textDecorationLine: 'line-through',
                color: colors.textMuted,
                opacity: 0.6,
                }
            ]}>{item.text}</Text>

            <View style={homeStyles.todoActions}>
                <TouchableOpacity onPress={() => {  !item.isCompleted && handleEditTodo(item) }} activeOpacity={0.8}>
                <LinearGradient
                    colors={!item.isCompleted ? colors.gradients.warning : colors.gradients.muted}
                    style={homeStyles.actionButton}
                >
                    <Ionicons name='pencil' size={14} color={"#fff"} />
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
                >
                <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.actionButton}
                >
                    <Ionicons name='trash' size={14} color={"#fff"} />
                </LinearGradient>
                </TouchableOpacity>
            </View> 
            </View>
    )
}

export default TodoListItem