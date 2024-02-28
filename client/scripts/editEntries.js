document.addEventListener("DOMContentLoaded", async () => {
    const companyForm = document.getElementById("loginForm");
    const path = window.location.pathname;
    const idPath = path.split("/").pop();
    const entryId = parseInt(idPath);

    try {
        const response = await fetch(`/api/entry/${entryId}`);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Firma');
        }
        const data = await response.json();

        function formatDateToInput(dateString) {
            return dateString.split('T')[0];
        }

        document.getElementById("firstname").value = data.firstname;
        document.getElementById("lastname").value = data.lastname;
        document.getElementById("address").value = data.address;
        document.getElementById("cityAndZip").value = data.cityAndZip;
        document.getElementById("country").value = data.country;
        document.getElementById("field").value = data.field;
        document.getElementById("classname").value = data.classname;
        document.getElementById("qvYear").value = data.qvYear;
        document.getElementById("legalGuardian").value = data.legalGuardian;
        document.getElementById("applicationDate").value = formatDateToInput(data.applicationDate);
        document.getElementById("intershipCompany").value = data.internshipCompany;
        document.getElementById("responsiblePerson").value = data.responsiblePerson;
        document.getElementById("applicationStatus").value = data.applicationStatus;
        document.getElementById("interviewDate").value = formatDateToInput(data.interviewDate);
        document.getElementById("trialVisitDate").value = formatDateToInput(data.trialVisitDate);
        document.getElementById("contractCreationDate").value = formatDateToInput(data.contractCreationDate);
        document.getElementById("internshipSalary1").value = data.internshipSalary1;
        document.getElementById("internshipSalary2").value = data.internshipSalary2;
        document.getElementById("mbaApprovalDate").value =  formatDateToInput(data.mbaApprovalDate);
        document.getElementById("birthDate").value = formatDateToInput(data.birthDate);
        document.getElementById("ahvNumber").value = data.ahvNumber;

        const setFileLink = (elementId, fileName, fileUrl) => {
            if (fileName) {
                const container = document.getElementById(elementId);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.textContent = fileName;
                link.setAttribute('target', '_blank'); 
                container.appendChild(link);
            }
        };

        setFileLink("existingImageApplicant", data.imageApplicantName, data.imageApplicantUrl);
        setFileLink("existingCertificate", data.certificateUrl);
        setFileLink("existingNoteQV", data.noteQVUrl);
        setFileLink("existingInternshipContract", data.internshipContractUrl);
        setFileLink("existingEfzCopy", data.efzCopyUrl);

    } catch (error) {
        console.error('Fetch-Fehler:', error);
    }

    companyForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(companyForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/entry/${entryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObject),
            });
            if (!response.ok) {
                throw new Error('Fehler beim Senden der Daten');
            }
            alert("Daten erfolgreich aktualisiert");
        } catch (err) {
            console.error('Fehler beim Senden der Formulardaten:', err);
        }
    });
});
