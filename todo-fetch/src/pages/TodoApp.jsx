import React, { useState } from 'react';

const TodoApp = () => {
  // Estado para la nueva tarea
  const [newTask, setNewTask] = useState('');

  // Función para manejar el cambio en el input
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto todo para enviar
    const todo = {
      label: newTask, // La tarea que el usuario ha escrito
      done: false,    // Estado de la tarea (no completada por defecto)
    };

    // Hacer la solicitud POST con fetch
    fetch('https://playground.4geeks.com/todo/todos/alesanchezr', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        console.log(resp.ok); // true si la respuesta es exitosa
        console.log(resp.status); // Código de estado (201, 400, etc.)
        return resp.json(); // Convertir la respuesta a JSON
      })
      .then((data) => {
        console.log(data); // Imprimir la respuesta recibida
      })
      .catch((error) => {
        console.log(error); // Manejo de errores
      });

    // Limpiar el campo de entrada después de enviar
    setNewTask('');
  };

  return (
    <div>
      <h1>Mi Lista de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Escribe una tarea"
        />
        <button type="submit">Agregar tarea</button>
      </form>
    </div>
  );
};

export default TodoApp;
