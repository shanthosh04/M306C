const MockEntryArray = [
  {
    firmenName: "Firma 1",
    firmenEmail: "f@i.r",
    beschreibung: "Blblblb",
  },
  {
    firmenName: "Firma 2",
    firmenEmail: "f@i.r",
    beschreibung: "Blblblb",
  },
  {
    firmenName: "Firma 3",
    firmenEmail: "f@i.r",
    beschreibung: "Blblblb",
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  const entryList = document.getElementById("entryList");
  const showEntries = (array) => {
    for (let i = 0; i < array.length; i++) {
      
      const listElement = `

                <div class="py-2 entry" data-entry-id="${array[i].id}">
                    <h3 class="text-white text-lg font-semibold">${array[i].companyName}</h3>
                    <p class="text-gray-400">${array[i].companyEmail}</p>
                    <p class="text-gray-400">${array[i].companyDescription}</p>
                    <div class="flex mt-2">
                        <button class="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
                `;
      entryList.innerHTML += listElement;
    }
    // Erfassen Sie alle Elemente mit der Klasse "entry"
    const entries = document.querySelectorAll('.entry');

    // Fügen Sie einen Klickereignishandler für jedes Element hinzu
    entries.forEach(entry => {
      entry.addEventListener('click', () => {
        // Abrufen der ID des Eintrags aus dem "data-entry-id" Attribut
        const entryId = entry.dataset.entryId;
        // Weiterleitung zur Detailseite mit der ID des Eintrags
        window.location.href = `/companyDetail/${entryId}`; // Passe die URL entsprechend deiner Anwendung an
      });
    });
  };
  const response = await fetch("http://localhost:3000/api/company");
  const entries = await response.json();
  console.log({ entries });
  showEntries(entries);
});
