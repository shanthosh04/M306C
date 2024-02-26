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
          console.log(data)
          document.getElementById("firstname").value = data.firstname;
          document.getElementById("lastname").value = data.lastname;
          document.getElementById("imageApplicant").value = "";
          document.getElementById("address").value = data.address;
          document.getElementById("cityAndZip").value = data.cityAndZip;
          document.getElementById("country").value = data.country;
          document.getElementById("field").value = data.field;
          document.getElementById("classname").value = data.classname;
          document.getElementById("qvYear").value = data.qvYear;
          document.getElementById("certificate").value = "";
          document.getElementById("noteQV").value = "";
          document.getElementById("internshipContract").value = "";
          document.getElementById("efzCopy").value = "";
          document.getElementById("legalGuardian").value = data.legalGuardian;
          document.getElementById("applicationDate").value = datumAlsString.applicationDate;
          document.getElementById("internshipCompany").value = data.internshipCompany;
          document.getElementById("responsiblePerson").value = data.responsiblePerson;
          document.getElementById("applicationStatus").value = data.applicationStatus;
          document.getElementById("interviewDate").value = "";
          document.getElementById("trialVisitDate").value = "";
          document.getElementById("contractCreationDate").value = "";
          document.getElementById("internshipSalary1").value = data.internshipSalary1;
          document.getElementById("internshipSalary2").value = data.internshipSalary2;
          document.getElementById("mbaApprovalDate").value = "";
          document.getElementById("birthDate").value = data.birthDate;
          document.getElementById("ahvNumber").value = data.ahvNumber;

      } catch (error) {
          console.error('Fetch-Fehler:', error);
      }
  
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
          const formData = new FormData(companyForm);
          const data = Object.fromEntries(formData.entries());
          console.log(data)
          try {
            await fetch(`/api/entry/${entryId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          } catch (err) {
            console.error(err);
          }
      });
    });
    