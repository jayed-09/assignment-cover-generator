// Get value from input
function getValue(id) {
    return document.getElementById(id).value;
}


// Generate Cover
function generateCover() {
    // Check required fields
const requiredFields = [
    "studentName",
    "studentId",
    "courseName",
    "courseCode",
    "assignmentTitle",
    "teacherName",
    "submissionDate"
];

for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);

    if (field.value.trim() === "") {
        alert("Please fill in all required fields.");
        field.focus();
        return;
    }
}

    const data = {
        university: getValue("university"),
        department: getValue("department"),
        studentName: getValue("studentName"),
        studentId: getValue("studentId"),
        courseName: getValue("courseName"),
        courseCode: getValue("courseCode"),
        assignmentTitle: getValue("assignmentTitle"),
        teacherName: getValue("teacherName"),
        submissionDate: getValue("submissionDate")
    };

    // Show data on cover
    document.getElementById("showUniversity").textContent =
        data.university || "University Name";

    document.getElementById("showDepartment").textContent =
        data.department || "Department Name";

    document.getElementById("showAssignment").textContent =
        data.assignmentTitle || "Assignment Title";

    document.getElementById("showStudentName").textContent =
        data.studentName || "---";

    document.getElementById("showStudentId").textContent =
        data.studentId || "---";

    document.getElementById("showCourseName").textContent =
        data.courseName || "---";

    document.getElementById("showCourseCode").textContent =
        data.courseCode || "---";

    document.getElementById("showTeacherName").textContent =
        data.teacherName || "---";

    document.getElementById("showDate").textContent =
        data.submissionDate || "---";


    // Save data in LocalStorage
    localStorage.setItem("assignmentCoverData", JSON.stringify(data));

    alert("Assignment cover generated and saved!");
}


// Load saved data
function loadSavedData() {

    const savedData = localStorage.getItem("assignmentCoverData");

    if (!savedData) {
        return;
    }

    const data = JSON.parse(savedData);

    document.getElementById("university").value =
        data.university || "";

    document.getElementById("department").value =
        data.department || "";

    document.getElementById("studentName").value =
        data.studentName || "";

    document.getElementById("studentId").value =
        data.studentId || "";

    document.getElementById("courseName").value =
        data.courseName || "";

    document.getElementById("courseCode").value =
        data.courseCode || "";

    document.getElementById("assignmentTitle").value =
        data.assignmentTitle || "";

    document.getElementById("teacherName").value =
        data.teacherName || "";

    document.getElementById("submissionDate").value =
        data.submissionDate || "";

    // Show saved data on cover
    document.getElementById("showUniversity").textContent =
        data.university || "University Name";

    document.getElementById("showDepartment").textContent =
        data.department || "Department Name";

    document.getElementById("showAssignment").textContent =
        data.assignmentTitle || "Assignment Title";

    document.getElementById("showStudentName").textContent =
        data.studentName || "---";

    document.getElementById("showStudentId").textContent =
        data.studentId || "---";

    document.getElementById("showCourseName").textContent =
        data.courseName || "---";

    document.getElementById("showCourseCode").textContent =
        data.courseCode || "---";

    document.getElementById("showTeacherName").textContent =
        data.teacherName || "---";

    document.getElementById("showDate").textContent =
        data.submissionDate || "---";
}


// Clear saved data
function clearData() {

    localStorage.removeItem("assignmentCoverData");

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
    document.getElementById("university").value = "Premier University";

document.getElementById("department").value =
    "Department of Computer Science & Engineering";

   document.getElementById("showUniversity").textContent =
    "Premier University";

document.getElementById("showDepartment").textContent =
    "Department of Computer Science & Engineering";
    document.getElementById("showAssignment").textContent =
        "Assignment Title";

    document.getElementById("showStudentName").textContent =
        "---";

    document.getElementById("showStudentId").textContent =
        "---";

    document.getElementById("showCourseName").textContent =
        "---";

    document.getElementById("showCourseCode").textContent =
        "---";

    document.getElementById("showTeacherName").textContent =
        "---";

    document.getElementById("showDate").textContent =
        "---";
}


// Load saved information when page opens
window.addEventListener("DOMContentLoaded", loadSavedData);