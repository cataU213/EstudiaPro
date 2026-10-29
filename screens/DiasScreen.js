
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function DiasScreen({ navigation }) {
  const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mi semana académica
      </Text>

      {dias.map((dia) => (
        <Pressable
          key={dia}
          style={styles.day}
          onPress={() =>
            navigation.navigate('Materias', { dia })
          }
        >
          <Text style={styles.dayText}>{dia}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E6DC',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#754F43',
    textAlign: 'center',
    marginBottom: 25,
  },
  day: {
    backgroundColor: '#FFF7F0',
    padding: 20,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9AA98',
  },
  dayText: {
    color: '#754F43',
    fontSize: 18,
  },
});
