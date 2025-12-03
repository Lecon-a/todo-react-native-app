import { View, Text, TouchableOpacity } from 'react-native'
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';


type Todo = Doc<"todos">;

const TodoList = ({ item }: { item: Todo }) => {

  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  // endpoint
  const toggleTodo = useMutation(api.todos.toggleTodo);

  const handleToggleTodo = async(id:Id<"todos">) => {
    try {
      // Placeholder for actual update logic
      await toggleTodo({ id });
    } catch (error) {
      console.error('Error toggling isCompleted status:', error); 
    }
  };

  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item._id)}
        >
          <LinearGradient
            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              {
                borderColor: item.isCompleted ? 'transparent' : colors.border,
              }
            ]}
          >
              {item.isCompleted && <Ionicons name='checkmark' size={18} color={'#fff'} />}
          </LinearGradient>
        </TouchableOpacity>

        <View style={[

        ]}>
          <Text style={[
            homeStyles.todoText,
            item.isCompleted && {
              textDecorationLine: 'line-through',
              color: colors.textMuted,
              opacity: 0.6,
            }
          ]}>{item.text}</Text>

          <View style={homeStyles.todoActions}>
            <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={homeStyles.actionButton}
              >
                <Ionicons name='pencil' size={14} color={"#fff"} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.danger}
                style={homeStyles.actionButton}
              >
                <Ionicons name='trash' size={14} color={"#fff"} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default TodoList