document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const idPath = path.split("/").pop();
  const status = +idPath;
  const title = document.getElementById("title");
  const statusMsgs = {
    401: { title: "Unauthorised", url: "/" },
    403: { title: "Forbidden", url: "/homepage" },
  };
  title.innerHTML = `${status} - ${statusMsgs[status].title}`;

  document
    .getElementById("back")
    .addEventListener("click", () =>
      window.location.replace(statusMsgs[status].url)
    );
});
