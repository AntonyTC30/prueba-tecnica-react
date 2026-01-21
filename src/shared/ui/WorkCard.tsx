import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { Poem } from '../../shared/types/poetry';
import PoemModal from './PoemModal';
import { fetchPoemByTitle } from '../../features/works/application/worksService';

interface WorkCardProps {
  work: Poem;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({
  work,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fullPoem, setFullPoem] = useState<Poem | null>(work.lines.length > 0 ? work : null);

  useEffect(() => {
    const fetchFullPoem = async () => {
      if (work.lines.length === 0 && !fullPoem) {
        try {
          const poems = await fetchPoemByTitle(work.title);
          if (poems.length > 0) {
            setFullPoem(poems[0]);
          }
        } catch (error) {
          console.error('No se pudo recuperar el poema.', error);
        }
      }
    };
    fetchFullPoem();
  }, [work.title, work.lines.length, fullPoem]);

  const handleOpen = () => {
    onOpen();
  };

  const displayPoem = fullPoem || work;

  return (
    <>
      <Card className="max-w-[400px] min-h-[250px]">
        <CardHeader>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{work.title}</h3>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600 italic">
            {displayPoem.lines.length > 0
              ? `"${displayPoem.lines.slice(0, 2).join(' ').substring(0, 100)}..."`
              : `Poema de  ${work.author}`
            }
          </p>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button onPress={handleOpen} size="sm" color="primary">
            Leer poema
          </Button>
          {isAuthenticated && (
            <Button
              size="sm"
              variant={isFavorite ? 'solid' : 'bordered'}
              color={isFavorite ? 'secondary' : 'default'}
              onClick={onToggleFavorite}
            >
              {isFavorite ? 'No favorito' : 'Favorito'}
            </Button>
          )}
        </CardFooter>
      </Card>
      <PoemModal
        poem={fullPoem || work}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isAuthenticated={isAuthenticated}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};

export default WorkCard;