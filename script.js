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
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const headers = table.querySelectorAll("thead th");

  // Toggle sorting direction
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

  // Re-append rows
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));

  // Update all header arrows
  headers.forEach((th, idx) => {
    const arrow = th.querySelector(".sort-arrow");
    if (arrow) {
      if (idx === columnIndex) {
        arrow.textContent = ascending ? "▲" : "▼";
      } else {
        arrow.textContent = "⇅";
      }
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById("toggleModeBtn");
  btn.innerText = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
}
