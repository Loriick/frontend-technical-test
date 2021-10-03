export const formatDate = (timestamp: number) =>{
    const milliseconds = timestamp * 1000;

 return new Date(milliseconds).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })};
