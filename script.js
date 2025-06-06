// Selecting DOM elements
const addBtn = document.getElementById("addBtn");
const main = document.getElementById("main");

// Add note button
addBtn.addEventListener("click", () => addNote());

// Save notes to localStorage
const saveNotes = () => {
  const notes = document.querySelectorAll(".note");
  const data = [];

  notes.forEach(note => {
    const title = note.querySelector(".note-title").value;
    const content = note.querySelector(".note-content").value;

    if (title.trim() || content.trim()) {
      data.push({ title, content });
    }
  });

  localStorage.setItem("notes", JSON.stringify(data));
};

// Add a new note to the page
const addNote = (content = "", title = "") => {
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    <div class="note-header">
      <span><b><i>Note</i></b></span>
      <div class="note-actions">
        <button class="save-btn" title="Save">
          <img src="Resources/save.png" alt="Save" class="icon-img" />
        </button>
        <button class="trash-btn" title="Delete">
          <img src="Resources/trash.png" alt="Delete" class="icon-img" />
        </button>
      </div>
    </div>
    <textarea class="note-title" placeholder="Title...">${title}</textarea>
    <textarea class="note-content" placeholder="Write your note...">${content}</textarea>
  `;

  // Save and delete button functionality
  const saveBtn = note.querySelector(".save-btn");
  const trashBtn = note.querySelector(".trash-btn");
  const titleField = note.querySelector(".note-title");
  const contentField = note.querySelector(".note-content");

  saveBtn.addEventListener("click", saveNotes);
  trashBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Auto-save when user types
  titleField.addEventListener("input", saveNotes);
  contentField.addEventListener("input", saveNotes);

  main.appendChild(note);
  saveNotes();
};

// Load all saved notes when page loads
const loadNotes = () => {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  storedNotes.forEach(note => addNote(note.content, note.title));
};

// Call load function on DOM ready
window.addEventListener("DOMContentLoaded", loadNotes);
