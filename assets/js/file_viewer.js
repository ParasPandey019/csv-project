let jsonData = [];

const itemsPerPage = 100;
let currentPage = 1;


function fetchData(){
  const fileName = document.getElementById("file-name").innerText;
  fetch(`/data/${fileName}`)
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    console.log(jsonData);
    renderTable(currentPage);
    generatePaginationButtons();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function renderTable(page) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear existing data

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const dataChunk = jsonData.slice(start, end);

  for(let index in dataChunk){
    const row = document.createElement('tr');
    for(let key in dataChunk[index]) { 
      const rowData = document.createElement('td');
      rowData.innerText = dataChunk[index][key];
      row.appendChild(rowData);
     }
    tableBody.appendChild(row);
  };
}

function generatePaginationButtons() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(jsonData.length / itemsPerPage);
  const maxVisibleButtons = 5;
  const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

  let startPage = currentPage - halfVisibleButtons;
  let endPage = currentPage + halfVisibleButtons;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, maxVisibleButtons);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      renderTable(currentPage);
      generatePaginationButtons();
    });
    pagination.appendChild(button);
  }
}

const pageInput = document.getElementById("page-input");
const goToPageButton = document.getElementById("go-to-page");
function jumpTo(){
  const targetPage = parseInt(pageInput.value);
  if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= Math.ceil(jsonData.length / itemsPerPage)) {
      currentPage = targetPage;
      renderTable(currentPage);
      generatePaginationButtons();
  }
}

goToPageButton.addEventListener('click', jumpTo);




document.getElementById("search").addEventListener("click", searchTable);

function searchTable() {
  const input = document.getElementById("search-input").value.toLowerCase();
  
  const rows = jsonData.length;

  // for (let i = 0; i < rows.length; i++) {
  //   const rowText = rows[i].textContent.toLowerCase();
    
  //   if (rowText.includes(input)) {
  //     rows[i].classList.add("highlight");
  //   } else {
  //     rows[i].classList.remove("highlight");
  //   }
  // }
}


fetchData();