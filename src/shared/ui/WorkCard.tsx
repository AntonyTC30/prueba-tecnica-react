import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Poem } from "../../shared/types/poetry";
import PoemModal from "./PoemModal";

interface WorkCardProps {
  work: Poem;
  fullPoem?: Poem | null;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onLoadPoem: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({
  work,
  fullPoem,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
  onLoadPoem,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = () => {
    onLoadPoem();
    onOpen();
  };

  const poemToShow = fullPoem ?? work;

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
            {poemToShow.lines.length > 0
              ? `"${poemToShow.lines.slice(0, 2).join(" ").substring(0, 100)}..."`
              : `Poema de ${work.author}`}
          </p>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button onPress={handleOpen} size="sm" color="primary">
            Leer poema
          </Button>
          {isAuthenticated && (
            <Button
              size="sm"
              variant={isFavorite ? "solid" : "bordered"}
              color={isFavorite ? "secondary" : "default"}
              onClick={onToggleFavorite}
            >
              {isFavorite ? "No favorito" : "Favorito"}
            </Button>
          )}
        </CardFooter>
      </Card>
      <PoemModal
        poem={poemToShow}
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
