// counter
function updateVisitCount(response) {
          document.getElementById('count').innerText = response.value;
}

// change the title
let docTitle = document.title;
window.addEventListener("blur", () => {
          document.title = "💔Please don't go! Come back💔";
})
window.addEventListener("focus", () => {
          document.title = docTitle;
})
