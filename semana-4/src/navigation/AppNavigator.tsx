
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import EventsScreen from '../screens/EventsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EquipmentDetailScreen from '../screens/EquipmentDetailScreen';
import SavedScreen from '../screens/SavedScreen';

import { useSavedStore } from '../store/savedStore';
import type { RootStackParamList } from '../types/navigation';

type TabParamList = {
  Events: undefined;
  Equipment: undefined;
  Saved: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  const savedItems = useSavedStore((state) => state.savedItems);

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
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Events') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Equipment') {
            iconName = 'volume-high-outline';
          } else {
            iconName = 'bookmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Eventos',
          tabBarLabel: 'Eventos',
        }}
      />

      <Tab.Screen
        name="Equipment"
        component={EquipmentScreen}
        options={{
          title: 'Equipos',
          tabBarLabel: 'Equipos',
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          title: 'Equipos guardados',
          tabBarLabel: 'Guardados',
          tabBarBadge: savedItems.length > 0 ? savedItems.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#7C3AED',
          },
        }}
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
