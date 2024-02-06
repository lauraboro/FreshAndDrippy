document.addEventListener("DOMContentLoaded", async function () {
    console.log("Application loaded!");

    // Extract recipe ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId =  document.getElementById('recipeId') as HTMLInputElement;

    // Fetch zutaten (ingredients) for the specified recipe ID
    console.log(recipeId.value);
    // @ts-ignore
    const zutaten = await fetchZutaten(recipeId.value);
    console.log(zutaten);
    displayZutaten(zutaten);

    return;
});

interface ZutatRezept {
    id: number;
    menge: number;
    zutat: {
        id: number;
        name: string;
        einheit: string;
        gesamtpreis: number;
        bestand: number;
        beschraenkungs: any[]; // You can define a proper interface for beschraenkungs if needed
    };
}

async function fetchZutaten(recipeId: string): Promise<ZutatRezept[]> {
    try {
        const response = await fetch(`http://localhost:8080/${recipeId}/zutaten`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return [];
    }
}

function displayZutaten(zutaten: ZutatRezept[]): void {
    const tableBody = document.getElementById('zutatenTableBody');

    if (!tableBody) {
        console.error('Table body not found.');
        return;
    }

    // Clear existing table rows
    tableBody.innerHTML = '';

    zutaten.forEach(zutatRezept => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${zutatRezept.menge}</td>
            <td>${zutatRezept.zutat.einheit}</td>
            <td>${zutatRezept.zutat.name}</td>
        `;
        tableBody.appendChild(row);
    });
}
