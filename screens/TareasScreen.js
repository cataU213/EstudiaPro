
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function TareasScreen({ navigation, tareas }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas</Text>

      <Text style={styles.subtitle}>
        Organiza tus pendientes académicos
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Materias', {
            modo: 'agregar',
          })
        }
      >
        <Text style={styles.buttonText}>
          + Agregar tarea
        </Text>
      </Pressable>

      {tareas.length === 0 ? (
        <Text style={styles.empty}>
          Todavía no tienes tareas guardadas.
        </Text>
      ) : (
        tareas.map((tarea) => (
          <View key={tarea.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {tarea.dia} · {tarea.materia}
            </Text>

            <Text style={styles.taskText}>
              {tarea.descripcion}
            </Text>

            <Text style={styles.status}>
              {tarea.entregada
                ? 'Tarea entregada'
                : 'Tarea pendiente'}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E6DC',
    padding: 24,
  },
  title: {
    color: '#754F43',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
  },
  subtitle: {
    color: '#A77D6D',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#D9AA98',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#754F43',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF7F0',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D9AA98',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#754F43',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskText: {
    color: '#754F43',
    fontSize: 16,
  },
  status: {
    color: '#A77D6D',
    marginTop: 8,
  },
  empty: {
    color: '#754F43',
    textAlign: 'center',
    marginTop: 25,
  },
});
