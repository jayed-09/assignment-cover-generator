// ========================================
// ASSIGNMENT COVER GENERATOR
// ========================================


// Required fields
const requiredFields = [
    "studentName",
    "studentId",
    "courseName",
    "courseCode",
    "assignmentTitle",
    "teacherName",
    "submissionDate"
];


// Preview mapping
const previewMap = {
    university: "showUniversity",
    department: "showDepartment",
    assignmentTitle: "showAssignment",

    studentName: "showStudentName",
    studentId: "showStudentId",
    semester: "showSemester",
    section: "showSection",
    program: "showProgram",
    batch: "showBatch",

    courseName: "showCourseName",
    courseCode: "showCourseCode",

    teacherName: "showTeacherName",
    submissionDate: "showDate"
};


// Get input value
function getValue(id) {
    const element = document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}


// Format date
function formatDate(dateValue) {

    if (!dateValue) {
        return "---";
    }

    const date = new Date(dateValue + "T00:00:00");

    if (isNaN(date)) {
        return dateValue;
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}


// ========================================
// UPDATE LIVE PREVIEW
// ========================================

function updatePreview() {

    Object.keys(previewMap).forEach(function (inputId) {

        const previewId = previewMap[inputId];

        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        if (!input || !preview) {
            return;
        }

        let value = input.value.trim();

        // Format submission date
        if (inputId === "submissionDate") {
            value = formatDate(value);
        }

        if (inputId === "university") {
            preview.textContent = value || "Premier University";
        }

        else if (inputId === "department") {
            preview.textContent =
                value ||
                "Department of Computer Science & Engineering";
        }

        else {
            preview.textContent = value || "---";
        }

    });
}


// ========================================
// UPDATE FORM PROGRESS
// ========================================

function updateProgress() {

    let completed = 0;

    requiredFields.forEach(function (fieldId) {

        const field = document.getElementById(fieldId);

        if (field && field.value.trim() !== "") {
            completed++;
        }

    });

    const total = requiredFields.length;

    const percentage = Math.round(
        (completed / total) * 100
    );

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");

    if (progressText) {
        progressText.textContent = percentage + "%";
    }

    if (progressFill) {
        progressFill.style.width = percentage + "%";
    }
}


// ========================================
// SAVE DATA
// ========================================

function saveData() {

    const data = {

        university: getValue("university"),

        department: getValue("department"),

        studentName: getValue("studentName"),
        studentId: getValue("studentId"),
        semester: getValue("semester"),
        section: getValue("section"),
        program: getValue("program"),
        batch: getValue("batch"),

        courseName: getValue("courseName"),
        courseCode: getValue("courseCode"),

        assignmentTitle: getValue("assignmentTitle"),

        teacherName: getValue("teacherName"),

        submissionDate: getValue("submissionDate")
    };


    localStorage.setItem(
        "assignmentCoverData",
        JSON.stringify(data)
    );

    return data;
}


// ========================================
// GENERATE COVER
// ========================================

function generateCover() {

    let valid = true;

    // Remove previous errors
    document.querySelectorAll("input").forEach(function (input) {
        input.classList.remove("input-error");
    });


    // Validate required fields
    for (const fieldId of requiredFields) {

        const field =
            document.getElementById(fieldId);

        if (!field || field.value.trim() === "") {

            valid = false;

            if (field) {
                field.classList.add("input-error");
                field.focus();
            }

            break;
        }
    }


    if (!valid) {

    alert(
        "Please fill in all required fields marked as required."
    );

    return;
}


    // Save data
    saveData();


    // Update preview
    updatePreview();


    // Update progress
    updateProgress();


    // Success message
   showToast(
    "Assignment cover generated and saved successfully!"
);
}


// ========================================
// LOAD SAVED DATA
// ========================================

function loadSavedData() {

    const savedData =
        localStorage.getItem("assignmentCoverData");


    if (!savedData) {

        // Default values
        const university =
            document.getElementById("university");

        const department =
            document.getElementById("department");

        if (university) {
            university.value =
                "Premier University";
        }

        if (department) {
            department.value =
                "Department of Computer Science & Engineering";
        }

        updatePreview();
        updateProgress();

        return;
    }


    try {

        const data =
            JSON.parse(savedData);


        Object.keys(data).forEach(function (key) {

            const input =
                document.getElementById(key);

            if (input) {
                input.value = data[key] || "";
            }

        });


        // Make sure fixed fields remain correct
        document.getElementById("university").value =
            data.university ||
            "Premier University";

        document.getElementById("department").value =
            data.department ||
            "Department of Computer Science & Engineering";


        updatePreview();

        updateProgress();

    }

    catch (error) {

        console.log(
            "Saved data could not be loaded."
        );

    }
}


// ========================================
// CLEAR DATA
// ========================================

function clearData() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear all information?"
        );


    if (!confirmClear) {
        return;
    }


    // Remove LocalStorage
    localStorage.removeItem(
        "assignmentCoverData"
    );


    // Clear inputs
    document.querySelectorAll("input").forEach(
        function (input) {

            input.value = "";

            input.classList.remove(
                "input-error"
            );

        }
    );


    // Restore fixed information
    document.getElementById("university").value =
        "Premier University";

    document.getElementById("department").value =
        "Department of Computer Science & Engineering";


    // Reset preview
    updatePreview();


    // Reset progress
    updateProgress();


    showToast(
    "All information has been cleared."
);
}


// ========================================
// AUTO SAVE + LIVE PREVIEW
// ========================================

function setupAutoSave() {

    document.querySelectorAll("input").forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    // Remove error when user types
                    input.classList.remove(
                        "input-error"
                    );


                    // Save current data
                    saveData();


                    // Update preview
                    updatePreview();


                    // Update progress
                    updateProgress();

                }
            );

        }
    );
}


// ========================================
// PAGE LOAD
// ========================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSavedData();

        setupAutoSave();

        updatePreview();

        updateProgress();

    }
);
// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}