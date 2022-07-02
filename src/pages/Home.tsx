import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle);

    if (taskExists) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(state => [...state, data]);
    }

  }

  function handleToggleTaskDone(id: number) {
    const taskEdit = tasks.find(task => task.id === id);

    if (taskEdit) {
      const tasksUpdated = tasks.map((task) => {
        if (task.id === id) task.done = !task.done;
        return task;
      });

      setTasks(tasksUpdated);
    }

  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskEdit = tasks.find(task => task.id === taskId);

    if (taskEdit) {
      const tasksUpdated = tasks.map((task) => {
        if (task.id === taskId) task.title = taskNewTitle;
        return task;
      });

      setTasks(tasksUpdated);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Sim", onPress: () => setTasks(state => state.filter(task => task.id !== id)) }
    ])

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})