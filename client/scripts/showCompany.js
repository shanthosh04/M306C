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

  const entryList = document.getElementById("entryList");
  const style = document.createElement("style");
  const showEntries = (array) => {
    for (let i = 0; i < array.length; i++) {
      let statusClass = ""; // Default class is empty
      let statusSymbol = "";

      if (array[i].status === "Offen") {
        statusClass =
          "h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white mb-1";
        statusSymbol = "M19 14l-7 7m0 0l-7-7m7 7V3";
      } else if (array[i].status === "Geschlossen") {
        statusClass =
          "h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white mb-1";
        statusSymbol = "M6 18L18 6M6 6l12 12";
      } else if (array[i].status === "Anstehend") {
        statusClass =
          "h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white mb-1";
        statusSymbol = "M12 6v6m0 0v6m0-6h6m-6 0H6";
      }

      const listElement = `

                <div class="py-2 entry flex flex-col items-start " data-entry-id="${array[i].id}">
                    <h3 class="text-white text-3xl font-semibold">${array[i].companyName}</h3>
                    
                    <div class="flex flex-col items-center my-3">
                        <span class="${statusClass}">
                            <!-- Kreuz-Symbol -->
                            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="${statusSymbol}"></path>
                            </svg>
                        </span>
                        <span>${array[i].status}</span>
                    </div>
                    <p class="text-gray-400 mb-2">${array[i].companyEmail}</p>
                    <p class="text-gray-400 mb-2">${array[i].companyDescription}</p>
                    <div class="flex mt-2">
                        <button class="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600" id="deleteButton">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <button class="text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 ml-4" id="editButton">
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                    </div>
                </div>
                
                `;
      entryList.innerHTML += listElement;
    }
    style.innerHTML = `
    .status-green {
        color: #4CAF50; /* Green */
    }
    .status-red {
        color: #F44336; /* Red */
    }
    .status-orange {
      color: orange;
    }
`;
    document.head.appendChild(style);
    // Erfassen Sie alle Elemente mit der Klasse "entry"
    const entries = document.querySelectorAll(".entry");

    // Fügen Sie einen Klickereignishandler für jedes Element hinzu
    entries.forEach((entry) => {
      const entryId = entry.dataset.entryId;
      entry.addEventListener("click", () => {
        window.location.href = `/companyDetail/${entryId}`;
      });
      entry.querySelector("#editButton").addEventListener("click", (event) => {
        event.stopPropagation(); // Prevents the click event from bubbling up to the parent entry element
        window.location.href = `/companyEdit/${entryId}`;
      });
      entry
        .querySelector("#deleteButton")
        .addEventListener("click", async (event) => {
          event.stopPropagation(); // Prevents the click event from bubbling up to the parent entry element
          await fetch(`/api/company/${entryId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          });
          window.location.reload();
        });
    });
  };

  const response = await fetch("/api/company", {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const entries = await response.json();
  console.log({ entries });
  showEntries(entries);
});