document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("loginForm");
    const errorText = document.getElementById("error");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data)

        try {
            const response = await fetch("/api/entry/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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