document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const result = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const auth = await result.json();
  if (auth.status !== 200)
    return window.location.replace("/error/" + auth.status);

  const companyForm = document.getElementById("loginForm");
  const path = window.location.pathname;
  const idPath = path.split("/").pop();
  const entryId = parseInt(idPath);

  try {
    const response = await fetch(`/api/entry/${entryId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Firma");
    }
    const data = await response.json();
    console.log(data);

    function formatDateToInput(dateString) {
      return dateString.split("T")[0];
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
    document.getElementById("applicationDate").value = formatDateToInput(
      data.applicationDate
    );
    document.getElementById("intershipCompany").value = data.internshipCompany;
    document.getElementById("responsiblePerson").value = data.responsiblePerson;
    document.getElementById("applicationStatus").value = data.applicationStatus;
    document.getElementById("interviewDate").value = formatDateToInput(
      data.interviewDate
    );
    document.getElementById("trialVisitDate").value = formatDateToInput(
      data.trialVisitDate
    );
    document.getElementById("contractCreationDate").value = formatDateToInput(
      data.contractCreationDate
    );
    document.getElementById("internshipSalary1").value = data.internshipSalary1;
    document.getElementById("internshipSalary2").value = data.internshipSalary2;
    document.getElementById("mbaApprovalDate").value = formatDateToInput(
      data.mbaApprovalDate
    );
    document.getElementById("birthDate").value = formatDateToInput(
      data.birthDate
    );
    document.getElementById("ahvNumber").value = data.ahvNumber;
  } catch (error) {
    console.error("Fetch-Fehler:", error);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  companyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(companyForm);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await fetch(`/api/entry/${entryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Fehler beim Senden der Daten");
      }
    } catch (err) {
      console.error(err);
    }
  });
});
