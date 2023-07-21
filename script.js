const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const completedList = document.getElementById('completedList');

const addNoteButton = document.getElementById('addNoteButton');
const notesInput = document.getElementById('notesInput');
const notesList = document.getElementById('notesList');

const todoContainer = document.getElementById('todoContainer');
const noteContainer = document.getElementById('noteContainer');

const closeTodoButton = document.getElementById('closeTodoButton');
const closeNoteButton = document.getElementById('closeNoteButton');

const restoreButton = document.getElementById('restoreButton');
const loadSavePopup = document.getElementById('loadSavePopup');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const savePopup = document.getElementById('savePopup');
const dataInput = document.getElementById('dataInput');
const saveDataButton = document.getElementById('saveDataButton');
const loadPopup = document.getElementById('loadPopup');
const dataOutput = document.getElementById('dataOutput');
const loadDataButton = document.getElementById('loadDataButton');

let deletedContainers = [];

restoreButton.addEventListener('click', () => {
  loadSavePopup.classList.remove('hidden');
});

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const trashIcon = document.createElement('span');
    trashIcon.innerHTML = "&#128465;";
    trashIcon.classList.add('trash-icon');
    listItem.appendChild(trashIcon);

    taskList.appendChild(listItem);

    taskInput.value = '';

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');

      if (listItem.classList.contains('completed')) {
        // Move the completed item to the completed container
        completedList.appendChild(listItem);
      } else {
        // Move the incomplete item back to the taskList container
        taskList.appendChild(listItem);
      }
    });

    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      taskList.removeChild(listItem);
      completedList.removeChild(listItem); // Also remove from completedList if deleted
    });
  }
});

addNoteButton.addEventListener('click', () => {
  const noteText = notesInput.value.trim();
  if (noteText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = noteText;

    const trashIcon = document.createElement('span');
    trashIcon.innerHTML = "&#128465;";
    trashIcon.classList.add('trash-icon');
    listItem.appendChild(trashIcon);

    notesList.appendChild(listItem);
    notesInput.value = '';

    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      notesList.removeChild(listItem);
    });
  }
});

window.addEventListener('load', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  setTimeout(() => {
    loadingOverlay.style.display = 'none';
    // Show the containers after loading
    document.querySelector('.flex-container').style.display = 'flex';
  }, 3000); // 3 seconds
});

closeTodoButton.addEventListener('click', () => {
  deletedContainers.push(todoContainer);
  todoContainer.style.display = 'none';
});

closeNoteButton.addEventListener('click', () => {
  deletedContainers.push(noteContainer);
  noteContainer.style.display = 'none';
});

loadButton.addEventListener('click', () => {
  loadSavePopup.classList.add('hidden');
  loadPopup.classList.remove('hidden');
});

saveButton.addEventListener('click', () => {
  loadSavePopup.classList.add('hidden');
  savePopup.classList.remove('hidden');

  const todoItems = Array.from(taskList.children).map(item => {
    const taskText = item.textContent.replace('🗑', '').trim();
    return taskText;
  }).join('\n');

  const noteItems = Array.from(notesList.children).map(item => {
    const noteText = item.textContent.replace('🗑', '').trim();
    return noteText;
  }).join('\n');

  const dataToSave = todoItems + '\n\n' + noteItems;
  dataInput.value = dataToSave;
});

saveDataButton.addEventListener('click', () => {
  savePopup.classList.add('hidden');

  const dataInput = document.getElementById('dataInput');
  // Use the Clipboard API to copy the selected content to the clipboard
  navigator.clipboard.writeText(dataInput.value);
});

loadDataButton.addEventListener('click', () => {
  loadPopup.classList.add('hidden');
  const dataToLoad = dataOutput.value.trim();
  const [todoData, noteData] = dataToLoad.split('\n\n');

  taskList.innerHTML = '';
  const todoItems = todoData.split('\n');
  todoItems.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo;
    const trashIcon = document.createElement('span');
    trashIcon.innerHTML = "&#128465;";
    trashIcon.classList.add('trash-icon');
    listItem.appendChild(trashIcon);
    taskList.appendChild(listItem);

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');

      if (listItem.classList.contains('completed')) {
        // Move the completed item to the completed container
        completedList.appendChild(listItem);
      } else {
        // Move the incomplete item back to its original position
        const allItems = Array.from(completedList.children);
        const currentIndex = allItems.indexOf(listItem);
        if (currentIndex !== allItems.length - 1) {
          completedList.removeChild(listItem);
          completedList.insertBefore(listItem, allItems[currentIndex + 1]);
        } else {
          completedList.removeChild(listItem);
          completedList.appendChild(listItem);
        }
      }
    });

    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      taskList.removeChild(listItem);
      completedList.removeChild(listItem); // Also remove from completedList if deleted
    });
  });

  notesList.innerHTML = '';
  const noteItems = noteData.split('\n');
  noteItems.forEach(note => {
    const listItem = document.createElement('li');
    listItem.textContent = note;
    const trashIcon = document.createElement('span');
    trashIcon.innerHTML = "&#128465;";
    trashIcon.classList.add('trash-icon');
    listItem.appendChild(trashIcon);
    notesList.appendChild(listItem);

    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      notesList.removeChild(listItem);
    });
  });
});

// New Restore Box functionality
restoreBoxButton.addEventListener('click', () => {
  if (deletedContainers.length > 0) {
    loadSavePopup.classList.add('hidden');
    const container = deletedContainers.pop();
    container.style.display = 'block';
  }
});
