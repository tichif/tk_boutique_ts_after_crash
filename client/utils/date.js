export const convertDate = (date, options) => {
  return new Date(date).toLocaleDateString('fr-FR', options);
};
