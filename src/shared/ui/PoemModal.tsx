import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Poem } from '../../shared/types/poetry';

interface PoemModalProps {
  poem: Poem | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PoemModal: React.FC<PoemModalProps> = ({
  poem,
  isOpen,
  onOpenChange,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!poem) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {poem.title} - {poem.author}
            </ModalHeader>
            <ModalBody>
              <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                {poem.lines.join('\n')}
              </pre>
            </ModalBody>
            <ModalFooter className="">
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              {isAuthenticated && (
                <Button
                  color={isFavorite ? 'secondary' : 'primary'}
                  variant={isFavorite ? 'solid' : 'bordered'}
                  onPress={onToggleFavorite}
                >
                  {isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PoemModal;