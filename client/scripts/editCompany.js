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
  const { roles } = auth.user;
  if (!roles.includes("admin")) return window.location.replace("/error/403");

  const companyForm = document.getElementById("companyForm");
  const path = window.location.pathname;
  const idPath = path.split("/").pop();
  const companyId = parseInt(idPath);

  try {
    const response = await fetch(`/api/company/${companyId}`, {
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
    document.getElementById("companyName").value = data.companyName;
    document.getElementById("companyCity").value = data.companyCity;
    document.getElementById("companyStreet").value = data.companyStreet;
    document.getElementById("companyDescription").value =
      data.companyDescription;
    document.getElementById("contactPerson").value = data.contactPerson;
    document.getElementById("companyEmail").value = data.companyEmail;
    document.getElementById("companyPhone").value = data.companyPhone;
    document.getElementById("companyField").value = data.companyField;
    document.getElementById("status").value = data.status;
  } catch (error) {
    console.error("Fetch-Fehler:", error);
  }

  companyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(companyForm);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      await fetch(`/api/company/${companyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    }
  });
});