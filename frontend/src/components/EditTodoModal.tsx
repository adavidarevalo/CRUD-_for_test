import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  
  interface EditTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: number, newTitle: string) => void;
    todo: { id: number; title: string };
  }
  
  const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, onClose, onSave, todo }) => {
    const [newTitle, setNewTitle] = useState(todo.title);
  
    const handleSave = () => {
      onSave(todo.id, newTitle);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Edit todo title"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditTodoModal;
  