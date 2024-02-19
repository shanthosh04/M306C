const MockEntryArray = [
    {
        firmenName: "Firma 1",
        firmenEmail: "f@i.r",
        beschreibung: "Blblblb"
    },
    {
        firmenName: "Firma 2",
        firmenEmail: "f@i.r",
        beschreibung: "Blblblb"
    },
    {
        firmenName: "Firma 3",
        firmenEmail: "f@i.r",
        beschreibung: "Blblblb"
    }
]

document.addEventListener('DOMContentLoaded', () => {



    


    const entryList = document.getElementById("entryList")
    const showEntrys = (array) => {
        for (let i = 0; i < array.length; i++) {
            const listElement = 
                `
                <div class="py-2">
                    <h3 class="text-white text-lg font-semibold">${array[i].firmenName}</h3>
                    <p class="text-gray-400">${array[i].firmenEmail}</p>
                    <p class="text-gray-400">${array[i].beschreibung}</p>
                    <div class="flex mt-2">
                        <button class="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
                `
            entryList.innerHTML += listElement
        }
    }
    showEntrys(MockEntryArray)
})