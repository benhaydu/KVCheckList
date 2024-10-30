// Array for everyday tasks
const everydayTasks = [
    "Check QuiKChek for red alerts",
    "Check for messages on MB",
    "Tidy up cable accessories",
    "Tidy up studio room",
    "Check paper towel dispenser, replace rolls if needed",
    "Tidy up shoes",
    "Flush men's urinal for 10 seconds",
    "Wipe down machines and cardio equipment",
    "Organize desk",
    "Refill toilet paper",
    "Refill soap",
    "Vacuum lobby and floor mats",
    "Empty out water tray (dump into garbage)"
];

// Array for leave tasks
const leaveTasks = [
    "Turn off TVs",
    "Place any Membership forms in the drawer",
    "Consolidate small garbage into big bins (Empty if 3/4 and above)",
    "Fill out daily log",
    "Turn off monitors *DO NOT TURN OFF COMPUTER*",
    "Clock out on Clover",
    "Lock drawer and return key"
];

// Function to create a checklist item
function createChecklistItem(taskDescription, taskList) {
    const listItem = document.createElement('li');
    listItem.className = 'bg-gray-100 border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-200 transition-colors cursor-pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'mr-3 transform scale-125 cursor-pointer';

    const taskText = document.createElement('span');
    taskText.textContent = taskDescription;

    // Store the original index for repositioning
    const originalIndex = taskList.children.length;

    // Toggle checkbox when list item is clicked
    listItem.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        updateTaskTextStyle(checkbox, taskText, taskList, listItem, originalIndex);
    });

    // Prevent double toggle when checkbox itself is clicked
    checkbox.addEventListener('click', (event) => {
        event.stopPropagation();
        updateTaskTextStyle(checkbox, taskText, taskList, listItem, originalIndex);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);

    return { listItem, originalIndex }; // Return both the listItem and original index
}

// Function to update the task text style based on checkbox state
function updateTaskTextStyle(checkbox, taskText, taskList, listItem, originalIndex) {
    if (checkbox.checked) {
        taskText.classList.add('line-through', 'opacity-50'); // Add strikethrough and opacity classes
        taskList.appendChild(listItem); // Move to the end of the list
    } else {
        taskText.classList.remove('line-through', 'opacity-50'); // Remove classes if unchecked
        taskList.insertBefore(listItem, taskList.children[originalIndex]); // Move back to original position
    }
    updateTaskCount(taskList, taskList === everydayTasksList ? 'counterEveryday' : 'counterLeave'); // Update count
}

// Function to update the task count display
function updateTaskCount(taskList, counterId) {
    const totalTasks = taskList.children.length; // Get the current number of tasks
    const completedTasks = Array.from(taskList.children).filter(item => item.querySelector('input').checked).length; // Count completed tasks

    // Get the counter element
    const counterElement = document.getElementById(counterId);

    // Update the counter display
    counterElement.textContent = `${completedTasks}/${totalTasks}`;

    // Check if all tasks are done
    if (completedTasks === totalTasks && totalTasks > 0) {
        counterElement.textContent = 'Done'; // Change text to 'Done'
        counterElement.classList.add('bg-green-500'); // Add green background
        counterElement.classList.remove('bg-blue-500'); // Remove blue background
    } else {
        counterElement.classList.remove('bg-green-500'); // Remove green background if not all tasks are done
        counterElement.classList.add('bg-blue-500'); // Ensure blue background is present
    }
}


// DOM references for the task lists
const everydayTasksList = document.querySelector('#everydayTasksList');
const leaveTasksList = document.querySelector('#leaveTasksList');

// Load tasks from arrays
everydayTasks.forEach(task => {
    const { listItem, originalIndex } = createChecklistItem(task, everydayTasksList);
    everydayTasksList.appendChild(listItem);
});
updateTaskCount(everydayTasksList, 'counterEveryday'); // Update the count initially

leaveTasks.forEach(task => {
    const { listItem, originalIndex } = createChecklistItem(task, leaveTasksList);
    leaveTasksList.appendChild(listItem);
});
updateTaskCount(leaveTasksList, 'counterLeave'); // Update the count initially

// Add button functionality
document.querySelector('#btn-addEveryday').addEventListener('click', () => addNewTask(everydayTasksList));
document.querySelector('#btn-addBeforeLeave').addEventListener('click', () => addNewTask(leaveTasksList));

// Function to add a new task to a specified list
function addNewTask(taskList) {
    const newTask = prompt('Enter a new task (will not be saved for next time unless modified in KVTList.js):');
    if (newTask) {
        const { listItem, originalIndex } = createChecklistItem(newTask, taskList);
        taskList.appendChild(listItem);
        updateTaskCount(taskList, taskList === everydayTasksList ? 'counterEveryday' : 'counterLeave'); // Update count after adding
    }
}
