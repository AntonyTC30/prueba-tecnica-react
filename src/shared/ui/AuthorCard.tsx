import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';

interface AuthorCardProps {
  author: string;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{author}</h3>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600">Poeta y autor</p>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button as={Link} to={`/works/${encodeURIComponent(author)}`} size="sm" color="primary">
        Ver obras
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
  );
};

export default AuthorCard;