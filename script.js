document.addEventListener("DOMContentLoaded", function() {
    const everydayCheckboxes = document.querySelectorAll(".everyday .checkbox");
    const leaveCheckboxes = document.querySelectorAll(".leave .checkbox");

    // Check if all tasks in a section are completed and display "All done!" message
    function checkAllDone(checkboxes, messageId) {
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        document.getElementById(messageId).style.display = allChecked ? "block" : "none";
    }

    // Initialize each checkbox and set up change listeners
    function initializeCheckbox(checkbox, messageId) {
        checkbox.addEventListener("change", function(event) {
            event.preventDefault(); // Prevent any default form behavior if present
            checkbox.parentElement.style.display = checkbox.checked ? "none" : "block";

            // Check if all tasks in the section are done
            const sectionCheckboxes = checkbox.closest(".everyday") ? everydayCheckboxes : leaveCheckboxes;
            checkAllDone(sectionCheckboxes, messageId);
        });
    }

    // Initialize checkboxes without saving state, so they reset on page reload
    everydayCheckboxes.forEach(checkbox => initializeCheckbox(checkbox, "everyday-done"));
    leaveCheckboxes.forEach(checkbox => initializeCheckbox(checkbox, "leave-done"));
    
});