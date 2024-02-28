document.addEventListener("DOMContentLoaded", async() => {

    const token = localStorage.getItem("token");
    const result = await fetch("/api/auth", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const auth = await result.json()
    if (auth.status !== 200) return window.location.replace("/error/"+auth.status)

    const registerForm = document.getElementById("loginForm");
    const errorText = document.getElementById("error");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch("/api/entry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Fehler beim Senden der Anfrage');

            const result = await response.json();
            if (result.success) {
                window.location.href = "/homepage";
            } else {
                errorText.innerText = "Einträge einfügen fehlgeschlagen!";
            }
        } catch (error) {
            errorText.innerText = error.message;
        }
    });
});