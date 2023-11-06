import dragons from './dragons';
import relationships from './relationships';
import forces from './forces';

function getAverageForce(dragonId) {
  const forceData = forces.find((force) => force.id === dragonId);

  if (forceData) {
    const totalForce = forceData.notes.reduce((acc, curr) => acc + curr, 0);
    const averageForce = totalForce / forceData.notes.length;
    return averageForce.toFixed(2); // Arrondi à 2 décimales
  }

  return 'N/A'; // Si les données de force ne sont pas disponibles
}

function addDragons() {
  const dragonList = document.getElementById('dragon-list');
  const dragonsData = dragons.names;

  const ulElement = document.createElement('ul');

  let ascendingSort = true; // Par défaut, tri croissant

  for (const dragon of dragonsData) {
    const liElement = document.createElement('li');
    liElement.textContent = `${dragon.name}, element: ${dragon.element}`;

    // Afficher les relations
    const relations = relationships.find((rel) => rel.id === dragon.id);
    if (relations) {
      const relationsText = relations.relations.map((relId) => {
        const relatedDragon = dragonsData.find((d) => d.id === relId);
        return relatedDragon ? relatedDragon.name : `Dragon inconnu (ID: ${relId})`;
      });
      const relationsList = document.createElement('ul');
      relationsText.forEach((relText) => {
        const relLi = document.createElement('li');
        relLi.textContent = relText;
        relationsList.appendChild(relLi);
      });
      liElement.appendChild(relationsList);
    }

    // Calcul de la moyenne de force
    const forceText = `Force: ${getAverageForce(dragon.id)}`;
    const forceParagraph = document.createElement('p');
    forceParagraph.textContent = forceText;
    liElement.appendChild(forceParagraph);

    ulElement.appendChild(liElement);
  }

  dragonList.appendChild(ulElement);

  const sortButton = document.getElementById('sort-button');
  sortButton.addEventListener('click', () => {
    ascendingSort = !ascendingSort;

    dragonsData.sort((dragonA, dragonB) => {
      const forceA = parseFloat(getAverageForce(dragonA.id));
      const forceB = parseFloat(getAverageForce(dragonB.id));

      if (ascendingSort) {
        return forceA - forceB; // Tri croissant
      } else {
        return forceB - forceA; // Tri décroissant
      }
    });

    ulElement.innerHTML = ''; // Effacez la liste actuelle
    for (const dragon of dragonsData) {
      const liElement = document.createElement('li');
      liElement.textContent = `${dragon.name}, element: ${dragon.element}`;

      // Afficher les relations
      const relations = relationships.find((rel) => rel.id === dragon.id);
      if (relations) {
        const relationsText = relations.relations.map((relId) => {
          const relatedDragon = dragonsData.find((d) => d.id === relId);
          return relatedDragon ? relatedDragon.name : `Dragon inconnu (ID: ${relId})`;
        });
        const relationsList = document.createElement('ul');
        relationsText.forEach((relText) => {
          const relLi = document.createElement('li');
          relLi.textContent = relText;
          relationsList.appendChild(relLi);
        });
        liElement.appendChild(relationsList);
      }

      // Calcul de la moyenne de force
      const forceText = `Force: ${getAverageForce(dragon.id)}`;
      const forceParagraph = document.createElement('p');
      forceParagraph.textContent = forceText;
      liElement.appendChild(forceParagraph);

      ulElement.appendChild(liElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  addDragons();
});