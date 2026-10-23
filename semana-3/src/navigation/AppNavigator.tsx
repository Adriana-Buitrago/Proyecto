
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EventsScreen from '../screens/EventsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EquipmentDetailScreen from '../screens/EquipmentDetailScreen';

import type { RootStackParamList } from '../types/navigation';

type TabParamList = {
  Events: undefined;
  Equipment: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Events' ? 'calendar-outline' : 'volume-high-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ title: 'Eventos', tabBarLabel: 'Eventos' }}
      />
      <Tab.Screen
        name="Equipment"
        component={EquipmentScreen}
        options={{ title: 'Equipos', tabBarLabel: 'Equipos' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: 'Detalle del evento' }}
        />
        <Stack.Screen
          name="EquipmentDetail"
          component={EquipmentDetailScreen}
          options={{ title: 'Detalle del equipo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
