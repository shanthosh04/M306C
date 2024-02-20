document.addEventListener('DOMContentLoaded', async () => {
  const entryList = document.getElementById("entryList");

  const showEntries = async (array) => {
    console.log(array[0]);
    for (let i = 0; i < array.length; i++) {
      const listElement = `
        <div class="py-2" data-entry-id="${array[i].id}">
          <h3 class="text-white text-lg font-semibold">${array[i].firstname} ${array[i].lastname}</h3>
          <p class="text-gray-400">${array[i].classname}</p>
          <p class="text-gray-400">${array[i].field}</p>
        </div>
      `;
      entryList.innerHTML += listElement;
    }

    // Erfassen Sie alle Elemente mit der Klasse "py-2"
    const entries = document.querySelectorAll('.py-2');

    // Fügen Sie einen Klickereignishandler für jedes Element hinzu
    entries.forEach(entry => {
      entry.addEventListener('click', () => {
        // Abrufen der ID des Eintrags aus dem "data-entry-id" Attribut
        const entryId = entry.dataset.entryId;
        // Weiterleitung zur Detailseite mit der ID des Eintrags
        window.location.href = `/entryDetail/${entryId}`; // Passe die URL entsprechend deiner Anwendung an
      });
    });
  };

  const response = await fetch("/api/showAllEntries");
  const entries = await response.json();
  console.log({ entries });
  showEntries(entries);
});
