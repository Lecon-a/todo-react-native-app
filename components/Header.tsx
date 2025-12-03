import { View, Text } from 'react-native'
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createHomeStyles } from '@/assets/styles/homo.styles';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {

    // app theme
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    // db
    const todos = useQuery(api.todos.getTodos);
    const completedCount = todos ? todos?.filter(todo => todo.isCompleted).length : 0;
    let totalCount = todos ? todos.length : 0;
    let percentageCompleted = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    return (
        <View style={homeStyles.header}> 
            <View style={homeStyles.titleContainer}>
                <LinearGradient
                    colors={colors.gradient.primary}
                    style={homeStyles.iconContainer}
                >
                    <Ionicons name='flash-outline' size={28} color={'#fff'} />
                </LinearGradient>

                <View style={homeStyles.titleTextContainer}>
                    <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
                    <Text style={homeStyles.subtitle}>{`${completedCount} of ${totalCount} tasks completed`}</Text>
                </View>
            </View>

            {/* progress bar */}
            {
                totalCount > 0 && (
                    <View style={homeStyles.progressContainer}>
                        <View style={homeStyles.progressBarContainer}>
                            <View style={homeStyles.progressBar}>
                                <LinearGradient
                                    colors={colors.gradient.success}
                                    style={[homeStyles.progressBar, {width: `${percentageCompleted}%`}]}
                                >
                                    <Text style={homeStyles.progressText}>{`${Math.round(percentageCompleted)}%`}</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default Header