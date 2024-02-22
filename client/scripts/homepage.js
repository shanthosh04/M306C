document.addEventListener('DOMContentLoaded', async () => {
  const entryList = document.getElementById("entryList");

  const showEntries = async (array) => {
    console.log(array[0]);
    for (let i = 0; i < array.length; i++) {
      const listElement = `
        <div class="py-2 entry" data-entry-id="${array[i].id}">
          <h3 class="text-white text-lg font-semibold">${array[i].firstname} ${array[i].lastname}</h3>
          <p class="text-gray-400">${array[i].classname}</p>
          <p class="text-gray-400">${array[i].field}</p>
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

    // Erfassen Sie alle Elemente mit der Klasse "py-2"
    const entries = document.querySelectorAll(".entry");

    // Fügen Sie einen Klickereignishandler für jedes Element hinzu
    entries.forEach((entry) => {
      console.log("faojndiaef")
      const entryId = entry.dataset.entryId;
      entry.addEventListener("click", () => {
        window.location.href = `/entryDetail/${entryId}`;
      });
      
      entry
        .querySelector("#deleteButton")
        .addEventListener("click", async (event) => {
          
          event.stopPropagation(); // Prevents the click event from bubbling up to the parent entry element
          await fetch(`/api/entry/${entryId}`, {
            method: "DELETE",
          });
          window.location.reload();
        });
    });
  };

  const response = await fetch("/api/entry");
  const entries = await response.json();
  console.log({ entries });
  showEntries(entries);
});
