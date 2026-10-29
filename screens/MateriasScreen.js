
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

const materiasPorDia = {
  Lunes: ['Matemática', 'Física', 'Ciencias Sociales'],
  Martes: [
    'Educación Artística',
    'Filosofía',
    'Antropología',
  ],
  Miércoles: [
    'Educación Física',
    'Castellano',
    'Historia',
  ],
  Jueves: ['Matemática', 'Ajedrez', 'Aritmética'],
  Viernes: ['Física 2', 'Química', 'Laboratorio'],
};

export default function MateriasScreen({
  navigation,
  route,
  tareas,
  setTareas,
}) {
  const modoAgregar = route.params?.modo === 'agregar';

  const [diaSeleccionado, setDiaSeleccionado] =
    useState(route.params?.dia || '');

  const [materiaSeleccionada, setMateriaSeleccionada] =
    useState('');

  const [descripcion, setDescripcion] = useState('');

  const dias = Object.keys(materiasPorDia);

  const materias = diaSeleccionado
    ? materiasPorDia[diaSeleccionado]
    : [];

  function guardarTarea() {
    if (descripcion.trim() === '') {
      return;
    }

    const nuevaTarea = {
      id: tareas.length + 1,
      dia: diaSeleccionado,
      materia: materiaSeleccionada,
      descripcion: descripcion.trim(),
      entregada: false,
    };

    setTareas([...tareas, nuevaTarea]);

    setDescripcion('');
    setMateriaSeleccionada('');
    setDiaSeleccionado('');

    navigation.navigate('Tareas');
  }

  function cambiarEstado(id) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, entregada: !tarea.entregada }
          : tarea
      )
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {modoAgregar ? 'Agregar tarea' : diaSeleccionado}
        </Text>

        {modoAgregar && diaSeleccionado === '' && (
          <>
            <Text style={styles.subtitle}>
              Selecciona el día
            </Text>

            {dias.map((dia) => (
              <Pressable
                key={dia}
                style={styles.day}
                onPress={() => {
                  setDiaSeleccionado(dia);
                  setMateriaSeleccionada('');
                  setDescripcion('');
                }}
              >
                <Text style={styles.dayText}>{dia}</Text>
              </Pressable>
            ))}
          </>
        )}

        {diaSeleccionado !== '' &&
          materiaSeleccionada === '' && (
            <>
              <Text style={styles.subtitle}>
                {modoAgregar
                  ? 'Selecciona la materia'
                  : 'Tus materias'}
              </Text>

              {materias.map((materia) => (
                <Pressable
                  key={materia}
                  style={styles.day}
                  onPress={() => {
                    setMateriaSeleccionada(materia);
                    setDescripcion('');
                  }}
                >
                  <Text style={styles.dayText}>
                    {materia}
                  </Text>
                </Pressable>
              ))}
            </>
          )}

        {materiaSeleccionada !== '' && (
          <View style={styles.form}>
            <Text style={styles.selected}>
              {materiaSeleccionada}
            </Text>

            <Text style={styles.subtitle}>
              {diaSeleccionado}
            </Text>

            {modoAgregar ? (
              <>
                <Text style={styles.label}>
                  Describe tu tarea
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Ej.: Método de sustitución..."
                  placeholderTextColor="#A77766"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  autoFocus
                />

                <Pressable
                  style={styles.button}
                  onPress={guardarTarea}
                >
                  <Text style={styles.buttonText}>
                    Guardar tarea
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.backButton}
                  onPress={() => {
                    setMateriaSeleccionada('');
                    setDescripcion('');
                  }}
                >
                  <Text style={styles.backText}>
                    Volver a las materias
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                {tareas
                  .filter(
                    (tarea) =>
                      tarea.dia === diaSeleccionado &&
                      tarea.materia === materiaSeleccionada
                  )
                  .map((tarea) => (
                    <View
                      key={tarea.id}
                      style={styles.task}
                    >
                      <Text style={styles.taskText}>
                        {tarea.entregada
                          ? 'Tarea entregada'
                          : 'Tarea pendiente'}
                      </Text>

                      <Text style={styles.dayText}>
                        {tarea.descripcion}
                      </Text>

                      <Pressable
                        style={styles.button}
                        onPress={() =>
                          cambiarEstado(tarea.id)
                        }
                      >
                        <Text style={styles.buttonText}>
                          {tarea.entregada
                            ? 'Marcar como pendiente'
                            : 'Marcar como entregada'}
                        </Text>
                      </Pressable>
                    </View>
                  ))}

                <Pressable
                  style={styles.backButton}
                  onPress={() =>
                    setMateriaSeleccionada('')
                  }
                >
                  <Text style={styles.backText}>
                    Volver a las materias
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E6DC',
  },

  contenido: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#754F43',
    textAlign: 'center',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    color: '#754F43',
    marginVertical: 12,
  },

  day: {
    backgroundColor: '#FFF7F0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D9AA98',
  },

  dayText: {
    color: '#754F43',
    fontSize: 17,
  },

  form: {
    backgroundColor: '#F3DCCF',
    padding: 15,
    borderRadius: 18,
    marginTop: 12,
  },

  selected: {
    color: '#754F43',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },

  label: {
    color: '#754F43',
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#FFF7F0',
    color: '#754F43',
    borderWidth: 1,
    borderColor: '#D9AA98',
    borderRadius: 15,
    padding: 15,
    minHeight: 110,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#D9AA98',
    padding: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#754F43',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButton: {
    padding: 14,
    alignItems: 'center',
  },

  backText: {
    color: '#754F43',
    fontSize: 16,
  },

  task: {
    backgroundColor: '#FFF7F0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  taskText: {
    color: '#754F43',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
