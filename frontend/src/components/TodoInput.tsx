import { Button, HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (title: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim() !== '') {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <HStack spacing={4} w="full">
      <Input
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={handleAdd} colorScheme="teal">
        Add
      </Button>
    </HStack>
  );
};

export default TodoInput;
