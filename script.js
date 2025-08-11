// Opciones de votación
const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

// Inicializar un objeto para almacenar los votos
let votes = {};

// Obtener los votos guardados del almacenamiento local (localStorage)
function loadVotes() {
    const storedVotes = localStorage.getItem('pollVotes');
    if (storedVotes) {
        votes = JSON.parse(storedVotes);
    } else {
        // Si no hay votos guardados, inicializar todos en 0
        options.forEach(option => {
            votes[option] = 0;
        });
    }
}

// Guardar los votos en el almacenamiento local
function saveVotes() {
    localStorage.setItem('pollVotes', JSON.stringify(votes));
}

// Función para registrar un voto
function vote(option) {
    if (votes.hasOwnProperty(option)) {
        votes[option]++;
        saveVotes(); // Guarda los votos después de cada cambio
        renderResults(); // Actualiza los resultados en la pantalla
    }
}

// Función para mostrar los resultados en la página
function renderResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<h2>Resultados:</h2>';

    for (const option of options) {
        const voteCount = votes[option] || 0; // Si la opción no existe, el conteo es 0
        const resultItem = document.createElement('p');
        resultItem.className = 'result-item';
        resultItem.textContent = `${option}: ${voteCount} voto(s)`;
        resultsContainer.appendChild(resultItem);
    }
}

// Cargar los votos y mostrar los resultados al cargar la página
window.onload = () => {
    loadVotes();
    renderResults();
};