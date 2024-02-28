document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const idPath = path.split("/").pop();
  const status = +idPath;
  const title = document.getElementById("title");
  const statusMsgs = {
    401:"Unauthorised",
    403:"Forbidden"
  }
  title.innerHTML = `${status} - ${statusMsgs[status]}`;
});
