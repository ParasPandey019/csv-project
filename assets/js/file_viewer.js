document.getElementById("search").addEventListener("click", searchTable);

function searchTable() {
  const input = document.getElementById("search-input").value.toLowerCase();
  console.log(input);
  
  const rows = document.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const rowText = rows[i].textContent.toLowerCase();
    
    if (rowText.includes(input)) {
      rows[i].classList.add("highlight");
    } else {
      rows[i].classList.remove("highlight");
    }
  }
}
