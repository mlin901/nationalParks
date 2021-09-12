export const getSavedParkIds = () => {
  const savedParkIds = localStorage.getItem('saved_parks')
    ? JSON.parse(localStorage.getItem('saved_parks'))
    : [];

  return savedParkIds;
};

export const saveParkIds = (parkIdArr) => {
  if (parkIdArr.length) {
    localStorage.setItem('saved_parks', JSON.stringify(parkIdArr));
  } else {
    localStorage.removeItem('saved_parks');
  }
};

export const removeParkId = (parkId) => {
  const savedParkIds = localStorage.getItem('saved_parks')
    ? JSON.parse(localStorage.getItem('saved_parks'))
    : null;

  if (!savedParkIds) {
    return false;
  }

  const updatedSavedParkIds = savedParkIds?.filter((savedParkId) => savedParkId !== parkId);
  localStorage.setItem('saved_parks', JSON.stringify(updatedSavedParkIds));

  return true;
};
