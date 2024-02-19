const MockEntryArray = [
    {
        name: "Dimitri Steiner",
        class: "Inf22",
        specialization: "Applikation"
    },
    {
        name: "Shanthosh Sivasenthinathan",
        class: "Inf22",
        specialization: "Applikation"
    },
    {
        name: "Ilja Pidonenko",
        class: "Inf22",
        specialization: "Applikation"
    }
]

document.addEventListener('DOMContentLoaded', () => {


    async function getAllEntries() {
        try {
          const response = await fetch('/api/showAllEntries'); // Die URL zum Backend-Endpunkt anpassen
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          //console.log(data[0].firstname); 
          return data
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }

    const entryList = document.getElementById("entryList")
    const showEntrys = async () => {
        const data = await getAllEntries();
        console.log(data[0])
        for (let i = 0; i < data.length; i++) {
            const listElement = 
                `
                <div class="py-2">
                  <h3 class="text-white text-lg font-semibold">${data[i].firstname} ${data[i].lastname}</h3>
                  <p class="text-gray-400">${data[i].classname}</p>
                  <p class="text-gray-400">${data[i].field}</p>
                </div>
                `
            entryList.innerHTML += listElement
        }
    }
    showEntrys()
})