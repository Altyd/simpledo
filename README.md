# SimpleDo To-Do List App README

Welcome to the SimpleDo To-Do List App! This README provides an overview of the app's features, code structure, and contributors.

# Table of contents

1. [Features](#Features)
2. [Main Features](#Main Features)
3. [Code Explanation](#Code Explanation)
4. [Adding Task And Notes](#Adding Tasks andNotes)
5. [Task Completion and Removal](#Task Completion and Removal)
6. [Data Loading and Saving](#Data Loading and Saving)
7. [Contributors](#Contributors)

## Features

SimpleDo is a super simplistic to-do list app that focuses on basic animations and ease of use. It aims to provide a straightforward interface for managing tasks and notes without overcomplicating the process.

### Main Features

- To-Do List: Manage your tasks with ease by adding, marking as completed, and removing tasks from the list.
- Notes: Keep track of important notes by adding, viewing, and removing them from the notes list.
- Close Boxes: The app provides the ability to close the to-do list and notes sections for a clutter-free workspace.

## Code Explanation

The code provided implements the functionality of the SimpleDo app. Let's take a look at some key parts of the code and how they contribute to the app's functionality:

### Adding Tasks and Notes

  ```shell
addButton.addEventListener('click', () => {
  // ... (other code)

  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // ... (other code)

    taskList.appendChild(listItem);

    // ... (other code)
  }
});

addNoteButton.addEventListener('click', () => {
  // ... (other code)

  const noteText = notesInput.value.trim();
  if (noteText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = noteText;

    // ... (other code)

    notesList.appendChild(listItem);

    // ... (other code)
  }
});

   ```  

The code snippets above handle the addition of tasks and notes when the respective "Add" buttons are clicked. They create new list item elements containing the entered task/note text and a trash icon for removal. The list items are then appended to their corresponding lists (taskList or notesList).

### Task Completion and Removal

  ```shell
listItem.addEventListener('click', () => {
  listItem.classList.toggle('completed');

  if (listItem.classList.contains('completed')) {
    completedList.appendChild(listItem);
  } else {
    taskList.appendChild(listItem);
  }
});

trashIcon.addEventListener('click', (event) => {
  event.stopPropagation();
  taskList.removeChild(listItem);
  completedList.removeChild(listItem); // Also remove from completedList if deleted
});

   ```  

The event listener for a list item's click toggles its completion status and moves it between the main to-do list (taskList) and the completed tasks list (completedList). The trash icon event listener allows users to remove tasks from both lists.

### Data Loading and Saving

  ```shell
saveDataButton.addEventListener('click', () => {
  savePopup.classList.add('hidden');

  const dataInput = document.getElementById('dataInput');
  // Use the Clipboard API to copy the selected content to the clipboard
  navigator.clipboard.writeText(dataInput.value);
});

loadDataButton.addEventListener('click', () => {
  // ... (other code)

  taskList.innerHTML = '';
  const todoItems = todoData.split('\n');
  todoItems.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.textContent = todo;

    // ... (other code)

    taskList.appendChild(listItem);

    // ... (other code)
  });

  notesList.innerHTML = '';
  const noteItems = noteData.split('\n');
  noteItems.forEach(note => {
    const listItem = document.createElement('li');
    listItem.textContent = note;

    // ... (other code)

    notesList.appendChild(listItem);

    // ... (other code)
  });
});

   ```  

The saveDataButton event listener hides the save popup and uses the Clipboard API to copy the concatenated task and note data to the clipboard. The loadDataButton event listener loads saved data, splits it into task and note sections, and populates the corresponding lists.

## Contributors

The SimpleDo To-Do List App was created with contributions from the following individuals:

- [Franco](https://github.com/Altyd)
