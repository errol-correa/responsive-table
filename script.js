function filterTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#userTable tbody tr");

  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    row.style.display = name.includes(input) ? "" : "none";
  });
}

let ascending = true;
let currentSortedColumn = null;

function sortTable(columnIndex) {
  const table = document.getElementById("userTable");
  const rows = Array.from(table.rows).slice(1);
  const thead = table.querySelector("thead");
  const ths = thead.querySelectorAll("th");

  // Toggle direction if same column, else reset to ascending
  if (currentSortedColumn === columnIndex) {
    ascending = !ascending;
  } else {
    ascending = true;
    currentSortedColumn = columnIndex;
  }

  // Sort rows
  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent.trim();
    const cellB = b.cells[columnIndex].textContent.trim();
    return ascending
      ? cellA.localeCompare(cellB, undefined, { numeric: true })
      : cellB.localeCompare(cellA, undefined, { numeric: true });
  });

  // Append sorted rows
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));

  // Clear previous arrow styles
  ths.forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));

  // Add arrow to current column
  const sortClass = ascending ? "sorted-asc" : "sorted-desc";
  ths[columnIndex].classList.add(sortClass);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById("toggleModeBtn");
  btn.innerText = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
}
