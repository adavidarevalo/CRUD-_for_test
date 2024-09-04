import { Container, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';
import TodoInput from '../components/TodoInput';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("🚀 ~ apiUrl:", apiUrl)

    useEffect(() => {
      const fetchTodos = async () => {
        const response = await axios.get(`${apiUrl}/api/todos`);
        setTodos(response.data);
      };
      fetchTodos();
    }, [apiUrl]);
  
    const handleAddTodo = async (title: string) => {
      const response = await axios.post(`${apiUrl}/api/todos`, { title, completed: false });
      setTodos((prev) => [...prev, response.data]);
    };
  
    const handleToggleTodo = async (id: number) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        await axios.put(`${apiUrl}/api/todos/${id}`, updatedTodo);
        setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      }
    };
  
    const handleDeleteTodo = async (id: number) => {
      await axios.delete(`${apiUrl}/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    };
  
    const handleEditTodo = async (id: number, newTitle: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const updatedTodo = { ...todo, title: newTitle };
        await axios.put(`${apiUrl}/api/todos/${id}`, updatedTodo);
        setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      }
    };
  
    return (
      <Container maxW="container.md" mt={5}>
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" color="teal.500">
            TODO App
          </Heading>
          <TodoInput onAdd={handleAddTodo} />
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </VStack>
      </Container>
    );
  };

export default TodoPage;
