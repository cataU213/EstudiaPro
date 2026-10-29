import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiasScreen from './screens/DiasScreen';
import MateriasScreen from './screens/MateriasScreen';
import TareasScreen from './screens/TareasScreen';

const Stack = createNativeStackNavigator();

function InicioScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const esPC = width > 700;

  return (
    <ImageBackground
      source={require('./assets/Im_Estudia_pro.png')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={esPC ? styles.backgroundPC : styles.backgroundMovil}
    >
      <View style={[styles.content, esPC && styles.contentPC]}>
        <View style={styles.card}>
          <Text style={styles.title}>EstudiaPro</Text>

          <Text style={styles.subtitle}>
            Organizador de tareas
          </Text>
        </View>

        <Pressable
          style={styles.buttonDays}
          onPress={() => navigation.navigate('Dias')}
        >
          <Text style={styles.buttonText}>
            Mi semana académica
          </Text>
        </Pressable>

        <Pressable
          style={styles.buttonDays}
          onPress={() => navigation.navigate('Tareas')}
        >
          <Text style={styles.buttonText}>
            + Agregar tarea
          </Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default function App() {
  const [tareas, setTareas] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8E6DC',
          },
          headerTintColor: '#754F43',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#F8E6DC',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Dias"
          component={DiasScreen}
          options={{ title: 'Mi semana académica' }}
        />

        <Stack.Screen
          name="Materias"
          options={{ title: 'Mis materias' }}
        >
          {(props) => (
            <MateriasScreen
              {...props}
              tareas={tareas}
              setTareas={setTareas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Tareas"
          options={{ title: 'Mis tareas' }}
        >
          {(props) => (
            <TareasScreen
              {...props}
              tareas={tareas}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E6DC',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 155,
  },

  contentPC: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingTop: 100,
  },

  backgroundPC: {
    width: '100%',
    height: '100%',
  },

  backgroundMovil: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#754F43',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#D9AA98',
    width: '100%',
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 2,
    borderColor: '#F8E1D5',
  },

  buttonDays: {
    marginTop: 25,
    backgroundColor: '#D9AA98',
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8E1D5',
    elevation: 3,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#754F43',
    textAlign: 'center',
  },
});