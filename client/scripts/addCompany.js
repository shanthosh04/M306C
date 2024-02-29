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
  const errorText = document.getElementById("error");

  companyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(companyForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Fehler beim Senden der Anfrage");

      const result = await response.json();
      if (result.success) {
        alert("Erfolgreich hinzugefügt");
      } else {
        errorText.innerText = "Ablauf fehlgeschlagen!";
      }
    } catch (error) {
      errorText.innerText = error.message;
    }
  });
});