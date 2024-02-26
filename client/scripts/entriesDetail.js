document.addEventListener("DOMContentLoaded", async () => {
    const fullEntry = document.getElementById("fullEntry");
  
    const path = window.location.pathname;
    const idPath = path.split('/').pop();
    const entryId = parseInt(idPath);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };





    const showEntry = (entry) => {
        const entryElement = `
        <div class="w-1/2 p-4">
            <div class="flex flex-col mb-4">
                <label for="companyName" class="text-white text-lg font-bold mb-1">Vorname:</label>
                <span id="companyName">${entry.firstname}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="lastName" class="text-white text-lg font-bold mb-1">Nachname:</label>
                <span id="lastName">${entry.lastname}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="address" class="text-white text-lg font-bold mb-1">Adresse:</label>
                <span id="address">${entry.address}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="cityAndZip" class="text-white text-lg font-bold mb-1">Ort und PLZ:</label>
                <span id="cityAndZip">${entry.cityAndZip}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="country" class="text-white text-lg font-bold mb-1">Land:</label>
                <span id="country">${entry.country}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="field" class="text-white text-lg font-bold mb-1">Fachrichtung:</label>
                <span id="field">${entry.field}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="classname" class="text-white text-lg font-bold mb-1">Klasse:</label>
                <span id="classname">${entry.classname}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="qvYear" class="text-white text-lg font-bold mb-1">Jahr der QV:</label>
                <span id="qvYear">${entry.qvYear}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="legalguardian" class="text-white text-lg font-bold mb-1">Erziehungsberechtigte:</label>
                <span id="legalguardian">${entry.legalGuardian}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="applicationDate" class="text-white text-lg font-bold mb-1">Datum Bewerbung:</label>
                <span id="applicationDate">${formatDate(entry.applicationDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="internshipCompany" class="text-white text-lg font-bold mb-1">Praktikums Firma:</label>
                <span id="internshipCompany">${entry.internshipCompany}</span>
            </div>
        </div>
        <div class="w-1/2 p-4">
            <div class="flex flex-col mb-4">
                <label for="applicationStatus" class="text-white text-lg font-bold mb-1">Status Bewerbung:</label>
                <span id="applicationStatus">${entry.responsiblePerson}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="applicationStatus" class="text-white text-lg font-bold mb-1">Status Bewerbung:</label>
                <span id="applicationStatus">${entry.applicationStatus}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="interviewDate" class="text-white text-lg font-bold mb-1">Datum Bewerbungsgespräch:</label>
                <span id="interviewDate">${formatDate(entry.interviewDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="trialVisitDate" class="text-white text-lg font-bold mb-1">Datum Schnupperbesuch:</label>
                <span id="trialVisitDate">${formatDate(entry.trialVisitDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="contractCreationDate" class="text-white text-lg font-bold mb-1">Datum Vertragserstellung:</label>
                <span id="contractCreationDate">${formatDate(entry.contractCreationDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="internshipSalary1" class="text-white text-lg font-bold mb-1">Praktikumslohn 1. Jahr:</label>
                <span id="internshipSalary1">${entry.internshipSalary1}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="internshipSalary2" class="text-white text-lg font-bold mb-1">Praktikumslohn 2. Jahr:</label>
                <span id="internshipSalary2">${entry.internshipSalary2}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="mbaApprovalDate" class="text-white text-lg font-bold mb-1">Datum Bewilligung MBA:</label>
                <span id="mbaApprovalDate">${formatDate(entry.mbaApprovalDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="birthDate" class="text-white text-lg font-bold mb-1">Geburtsdatum:</label>
                <span id="birthDate">${formatDate(entry.birthDate)}</span>
            </div>
            <div class="flex flex-col mb-4">
                <label for="ahvNumber" class="text-white text-lg font-bold mb-1">AHV Nummer:</label>
                <span id="ahvNumber">${entry.ahvNumber}</span>
            </div>
        </div>
        `;
        fullEntry.innerHTML = entryElement;
    };
    try {
        const response = await fetch(`/api/entry/${entryId}`); 
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        const data = await response.json(); 
        showEntry(data);
        console.log(data.imageApplicant)
    } catch (error) {
        console.error('Fetch-Fehler:', error);
    }
});
