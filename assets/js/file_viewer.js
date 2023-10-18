let jsonData = [];

const itemsPerPage = 100;
let currentPage = 1;


function fetchData(){
  const fileName = document.getElementById("file-name").innerText;
  fetch(`/data/${fileName}`)
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    // console.log(jsonData);
    renderTable(currentPage, jsonData);
    generatePaginationButtons(jsonData);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function renderTable(page, jsonData) {
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

function generatePaginationButtons(jsonData) {
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
    if(currentPage == i){
      button.classList = "active-page";
    }
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      renderTable(currentPage, jsonData);
      generatePaginationButtons(jsonData);
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
      renderTable(currentPage, jsonData);
      generatePaginationButtons(jsonData);
  }else{
    alert("enter valid number");
  }
}

goToPageButton.addEventListener('click', jumpTo);




document.getElementById("search").addEventListener("click", searchTable);

function searchTable() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const key = document.getElementById("search-by").value;
  if(input.length>0){
    const filteredData = jsonData.filter(item => item[key].toLowerCase().includes(input));
    currentPage = 1;
    renderTable(currentPage, filteredData);
    generatePaginationButtons(filteredData);
  }else{
    currentPage = 1;
    renderTable(currentPage, jsonData);
    generatePaginationButtons(jsonData);
  }
}

document.getElementById("full-table").addEventListener("click", function(){
    currentPage = 1;
    renderTable(currentPage, jsonData);
    generatePaginationButtons(jsonData);
});



fetchData();