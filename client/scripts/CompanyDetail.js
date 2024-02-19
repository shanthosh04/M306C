const MockEntryArray = [
    {
        companyName: "Firma 1",
        companyCity: "Bern",
        companyStreet: "Teststrasse 99",
        companyDescription: "Krasse Beschreibung",
        contactPerson: "Max Muster",
        companyEmail: "fi@rm.a1",
        companyPhone: "079 341 15 24",
        companyField: "Applikation",
    },
  ];
  
  document.addEventListener("DOMContentLoaded", async () => {
    const fullEntry = document.getElementById("fullEntry");
    const showEntry = (array) => {
        
        const entryElement = `
        <div id="company-details" class="ml-3 my-3">
        <div class="flex flex-col mb-4">
        <label for="companyName" class="text-white">Firmenname:</label>
        <span id="companyName">${array[0].companyName}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyCity" class="text-white">Stadt:</label>
        <span id="companyCity">${array[0].companyCity}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyStreet" class="text-white">Strasse:</label>
        <span id="companyStreet">${array[0].companyStreet}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyDescription" class="text-white">Firmenbeschreibung:</label>
        <span id="companyDescription">${array[0].companyDescription}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="contactPerson" class="text-white">Ansprechperson:</label>
        <span id="contactPerson">${array[0].contactPerson}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyEmail" class="text-white">E-Mail:</label>
        <span id="companyEmail">${array[0].companyEmail}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyPhone" class="text-white">Telefonnummer:</label>
        <span id="companyPhone">${array[0].companyPhone}</span>
        </div>
        <div class="flex flex-col mb-4">
        <label for="companyField" class="text-white">Fachrichtung:</label>
        <span id="companyField">${array[0].companyField}</span>
        </div>
        </div>
                  `;
        fullEntry.innerHTML = entryElement;

    };
    showEntry(MockEntryArray);
  });
  