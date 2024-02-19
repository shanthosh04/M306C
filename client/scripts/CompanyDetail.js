document.addEventListener("DOMContentLoaded", async () => {
    const fullEntry = document.getElementById("fullEntry");
  
    const path = window.location.pathname;
    const idPath = path.split('/').pop();
    const companyId = parseInt(idPath);

    const showEntry = (company) => {
      const entryElement = `
        <div id="company-details" class="ml-3 my-3">
          <div class="flex flex-col mb-4">
            <label for="companyName" class="text-white">Firmenname:</label>
            <span id="companyName">${company.companyName}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyCity" class="text-white">Stadt:</label>
            <span id="companyCity">${company.companyCity}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyStreet" class="text-white">Strasse:</label>
            <span id="companyStreet">${company.companyStreet}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyDescription" class="text-white">Firmenbeschreibung:</label>
            <span id="companyDescription">${company.companyDescription}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="contactPerson" class="text-white">Ansprechperson:</label>
            <span id="contactPerson">${company.contactPerson}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyEmail" class="text-white">E-Mail:</label>
            <span id="companyEmail">${company.companyEmail}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyPhone" class="text-white">Telefonnummer:</label>
            <span id="companyPhone">${company.companyPhone}</span>
          </div>
          <div class="flex flex-col mb-4">
            <label for="companyField" class="text-white">Fachrichtung:</label>
            <span id="companyField">${company.companyField}</span>
          </div>
        </div>
      `;
      fullEntry.innerHTML = entryElement;
    };
    try {
        const response = await fetch(`/api/company/${companyId}`); // Anfrage an die API senden, um die Firma abzurufen
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Firma');
        }
        const data = await response.json(); // Die erhaltenen Daten als JSON parsen
        showEntry(data); // Die Funktion showEntry aufrufen, um die Firma darzustellen
      } catch (error) {
        console.error('Fetch-Fehler:', error);
      }
  });
  