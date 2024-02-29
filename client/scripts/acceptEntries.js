const MockEntryArray = [
  {
    name: "Dimitri Steiner",
    class: "Inf22",
    specialization: "Applikation",
  },
  {
    name: "Shanthosh Sivasenthinathan",
    class: "Inf22",
    specialization: "Applikation",
  },
  {
    name: "Ilja Pidonenko",
    class: "Inf22",
    specialization: "Applikation",
  },
];

document.addEventListener("DOMContentLoaded", async () => {

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

  const entryList = document.getElementById("entryList");
  const showEntrys = (array) => {
    for (let i = 0; i < array.length; i++) {
      const listElement = `
                <div class="py-2">
                  <h3 class="text-white text-lg font-semibold">${array[i].name}</h3>
                  <p class="text-gray-400">${array[i].class}</p>
                  <p class="text-gray-400">${array[i].specialization}</p>
                </div>
                `;
      entryList.innerHTML += listElement;
    }
  };
  showEntrys(MockEntryArray);
});
