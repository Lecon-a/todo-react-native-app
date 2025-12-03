import { createHomeStyles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import { api } from "@/convex/_generated/api";
import useTheme from '@/hooks/useTheme';
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoList from '@/components/TodoList';
import { Doc } from '@/convex/_generated/dataModel';
import EmptyState from '@/components/EmptyState';

const Home = () => {

  type Todo = Doc<"todos">;

  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />

  const renderTodoList = ({ item }: { item: Todo }) => <TodoList item={item} />;
  
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        
        <Header />
        
        <TodoInput />
        
        <FlatList
          data={todos}
          renderItem={renderTodoList}
          keyExtractor={item => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />

      </SafeAreaView>
    </LinearGradient>
  )
}


export default Home