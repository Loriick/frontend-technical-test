export const formatDate = (timestamp: number): string => {
  const milliseconds = timestamp * 1000;

  return new Date(milliseconds).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
