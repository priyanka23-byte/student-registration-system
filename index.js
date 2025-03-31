

document.addEventListener("DOMContentLoaded", function () {
    
    const studentForm = document.getElementById("studentForm");
    const nameInput = document.getElementById("name");
    const studentIdInput = document.getElementById("studentId");
    const emailInput = document.getElementById("email");
    const contactNoInput = document.getElementById("contactNo");
    const studentTableBody = document.getElementById("studentTablebody");

    
    console.log("nameInput:", nameInput);
    console.log("studentIdInput:", studentIdInput);
    console.log("emailInput:", emailInput);
    console.log("contactNoInput:", contactNoInput);

    
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to render students table....
    function renderStudentsTable() {
        console.log("Rendering student table..."); 
        studentTableBody.innerHTML = '';  

        if (students.length === 0) {
            studentTableBody.innerHTML = "<tr><td colspan='5'>No students registered yet.</td></tr>";
        }

        students.forEach((student, index) => {
            const newRow = document.createElement("tr");

            const nameCell = document.createElement("td");
            const idCell = document.createElement("td");
            const emailCell = document.createElement("td");
            const contactNoCell = document.createElement("td");
            const actionsCell = document.createElement("td");

            nameCell.textContent = student.name;
            idCell.textContent = student.studentId;
            emailCell.textContent = student.email;
            contactNoCell.textContent = student.contactNo;

            // Edit button.....
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.style.background = "blue";
            editButton.style.color = "white";
            editButton.style.border = "none";
            editButton.style.cursor = "pointer";
            editButton.addEventListener("click", () => editStudent(index));

            //  Delete button.....
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.background = "red";
            deleteButton.style.color = "white";
            deleteButton.style.border = "none";
            deleteButton.style.cursor = "pointer";
            deleteButton.addEventListener("click", () => deleteStudent(index));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);

            newRow.appendChild(nameCell);
            newRow.appendChild(idCell);
            newRow.appendChild(emailCell);
            newRow.appendChild(contactNoCell);
            newRow.appendChild(actionsCell);

            studentTableBody.appendChild(newRow);
        });

       
        localStorage.setItem('students', JSON.stringify(students));

        // vertical scrollbar .......
        function addScrollbar(){
            let tableContainer = document.querySelector(".table-container");
            let tablebody = document.getElementById("studentTablebody");
            

            if(tablebody.children.length > 5){
                tableContainer.style.overflowY ="auto";
                tableContainer.style.maxHeight ="300px";

            }else{
                tableContainer.style.overflowY ="visible";
            }
        }
    }

    // Function for input fields...........
    function validateInputs(name, studentId, email, contactNo) {
        const nameRegex = /^[a-zA-Z ]+$/;
        const idRegex = /^[0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const contactNoRegex = /^[0-9]{10}$/;

        let isValid = true;

        // Clear previous error messages........
        document.querySelectorAll('.error-message').forEach(e => e.remove());

        if (!name || !nameRegex.test(name)) {
            showError(nameInput, "Please enter a valid name (only letters and spaces).");
            isValid = false;
        }

        if (!studentId || !idRegex.test(studentId)) {
            showError(studentIdInput, "Please enter a valid Student ID (only numbers).");
            isValid = false;
        }

        if (!email || !emailRegex.test(email)) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        if (!contactNo || !contactNoRegex.test(contactNo)) {
            showError(contactNoInput, "Please enter a valid contact number (10 digits).");
            isValid = false;
        }

        return isValid;
    }

    // Function to display error message next to the input field...........
    function showError(inputElement, message) {
        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;
        inputElement.parentElement.appendChild(error);
    }

    //  For adding a new student.....
    function addStudent(event) {
        event.preventDefault();  

        const name = nameInput.value.trim();
        const studentId = studentIdInput.value.trim();
        const email = emailInput.value.trim();
        const contactNo = contactNoInput.value.trim();

        console.log("name:", name);
        console.log("studentId:", studentId);
        console.log("email:", email);
        console.log("contactNo:", contactNo);

        if (validateInputs(name, studentId, email, contactNo)) {
            
            students.push({ name, studentId, email, contactNo });

          
            nameInput.value = '';
            studentIdInput.value = '';
            emailInput.value = '';
            contactNoInput.value = '';

            // Re-render the students table....
            renderStudentsTable();
        }
    }

    // To handle editing a student....
    function editStudent(index) {
        const student = students[index];

        // form fields with the existing student data....
        nameInput.value = student.name;
        studentIdInput.value = student.studentId;
        emailInput.value = student.email;
        contactNoInput.value = student.contactNo;

        // Change the "Add" button to "Update" button....
        const addButton = studentForm.querySelector('button');
        addButton.textContent = "Update";

        // Update the student data on form submission....
        studentForm.onsubmit = function (event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const studentId = studentIdInput.value.trim();
            const email = emailInput.value.trim();
            const contactNo = contactNoInput.value.trim();

            if (validateInputs(name, studentId, email, contactNo)) {
                
                students[index] = { name, studentId, email, contactNo };

                // Reset form and button.....
                nameInput.value = '';
                studentIdInput.value = '';
                emailInput.value = '';
                contactNoInput.value = '';
                addButton.textContent = "Add";

                
                renderStudentsTable();
            }
        };
    }

    // To handle deleting a student....
    function deleteStudent(index) {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1); 
            renderStudentsTable();
        }
    }

    //event listener to the form's submit button....
    studentForm.addEventListener("submit", addStudent);

    
    renderStudentsTable();
});
