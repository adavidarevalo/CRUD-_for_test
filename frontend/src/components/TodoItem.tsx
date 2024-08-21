import { Checkbox, IconButton, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import EditTodoModal from './EditTodoModal';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggle, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HStack spacing={4} p={3} shadow="md" borderWidth="1px" borderRadius="md" w="full">
        <Checkbox isChecked={completed} onChange={() => onToggle(id)} />
        <Text flex="1" textDecoration={completed ? 'line-through' : 'none'}>
          {title}
        </Text>
        <IconButton
          aria-label="Edit todo"
          icon={<FaEdit />}
          onClick={() => setIsModalOpen(true)}
        />
        <IconButton
          aria-label="Delete todo"
          icon={<MdDeleteOutline />}
          onClick={() => onDelete(id)}
        />
      </HStack>

      <EditTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onEdit}
        todo={{ id, title }}
      />
    </>
  );
};

export default TodoItem;
