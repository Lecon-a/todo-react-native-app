import { View, Text } from 'react-native'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settings.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'


const ProgressStats = () => {

      const { colors } = useTheme();
      const settingsStyles = createSettingsStyles(colors);

      // endpoint
    const todos = useQuery(api.todos.getTodos);
    const totalCount = todos ? todos.length : 0;
    const completedCount = todos ? todos.filter(todo => todo.isCompleted).length : 0;
    const ongoingCount = totalCount - completedCount;

      return (
          <LinearGradient
              colors={colors.gradients.surface}
              style={settingsStyles.section}
          >
                    <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
                <View style={settingsStyles.statsContainer}>
                    {/* TOTAL TODOS */}
                    <LinearGradient
                        colors={colors.gradients.background}
                        style={[settingsStyles.statCard, {borderLeftColor: colors.primary}]}
                    >
                        <View style={settingsStyles.statIconContainer}>
                            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.statIcon}>
                                <Ionicons name='list' size={20} color={'#fff'} />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{ totalCount }</Text>
                            <Text style={settingsStyles.statLabel}>Total todos</Text>
                        </View>
                    </LinearGradient>
                  {/* COMPLETED TODOS COUNT */}
                  <LinearGradient
                        colors={colors.gradients.background}
                        style={[settingsStyles.statCard, {borderLeftColor: colors.success}]}
                    >
                        <View style={settingsStyles.statIconContainer}>
                            <LinearGradient colors={colors.gradients.success} style={settingsStyles.statIcon}>
                                <Ionicons name='checkmark-circle' size={20} color={'#fff'} />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{ completedCount }</Text>
                            <Text style={settingsStyles.statLabel}>Completed {completedCount > 1 ? "Todos" : "Todo"}</Text>
                        </View>
                    </LinearGradient>
                  {/* ONGOING TODOS COUNT */}
                  <LinearGradient
                        colors={colors.gradients.background}
                        style={[settingsStyles.statCard, {borderLeftColor: colors.warning}]}
                    >
                        <View style={settingsStyles.statIconContainer}>
                            <LinearGradient colors={colors.gradients.warning} style={settingsStyles.statIcon}>
                                <Ionicons name='time' size={20} color={'#fff'} />
                            </LinearGradient>
                        </View>
                        <View>
                            <Text style={settingsStyles.statNumber}>{ ongoingCount }</Text>
                          <Text style={settingsStyles.statLabel}>Ongoing {ongoingCount > 1 ? "Todos" : "Todo"}</Text>
                        </View>
                    </LinearGradient>
                </View>
            </LinearGradient>
        )
    }

    export default ProgressStats