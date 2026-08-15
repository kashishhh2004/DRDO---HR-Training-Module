// Utility functions for localStorage and common operations

const STORAGE_KEY_INTERNS = 'drdoInterns';
const STORAGE_KEY_MENTORS = 'drdoMentors';

// --- Local Storage Management ---

function getStoredData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error(`Error reading from localStorage for key "${key}":`, e);
        return [];
    }
}

function setStoredData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error writing to localStorage for key "${key}":`, e);
    }
}

// --- Intern Functions ---

function getAllInterns() {
    return getStoredData(STORAGE_KEY_INTERNS);
}

function getInternsByStatus(status) {
    return getAllInterns().filter(intern => intern.status === status);
}

function getInternById(id) {
    return getAllInterns().find(intern => intern.id === id);
}

function addIntern(internData) {
    const interns = getAllInterns();
    const newId = generateUniqueId("INT", interns);
    const newIntern = {
        ...internData,
        id: newId,
        status: "New",
        assignedMentorId: null,
        projectTitle: null,
        rejectionRemarks: null,
        certificateIssued: false,
        projectReportSubmitted: false,
        attendance: null,
    };
    interns.push(newIntern);
    setStoredData(STORAGE_KEY_INTERNS, interns);
    return true;
}

function updateIntern(id, updates) {
    const interns = getAllInterns();
    const index = interns.findIndex(intern => intern.id === id);
    if (index !== -1) {
        interns[index] = { ...interns[index], ...updates };
        setStoredData(STORAGE_KEY_INTERNS, interns);
        return true;
    }
    return false;
}

// --- Mentor Functions ---

function getAllMentors() {
    return getStoredData(STORAGE_KEY_MENTORS);
}

function getMentorById(id) {
    return getAllMentors().find(mentor => mentor.id === id);
}

function assignInternToMentor(mentorId, internId) {
    const mentors = getAllMentors();
    const index = mentors.findIndex(m => m.id === mentorId);
    if (index !== -1) {
        if (!mentors[index].assignedInterns.includes(internId)) {
            mentors[index].assignedInterns.push(internId);
        }
        setStoredData(STORAGE_KEY_MENTORS, mentors);
        return true;
    }
    return false;
}

function removeInternFromMentor(mentorId, internId) {
    const mentors = getAllMentors();
    const index = mentors.findIndex(m => m.id === mentorId);
    if (index !== -1) {
        mentors[index].assignedInterns = mentors[index].assignedInterns.filter(id => id !== internId);
        setStoredData(STORAGE_KEY_MENTORS, mentors);
        return true;
    }
    return false;
}

// --- Data Initialization & Reset ---

function initializeDummyData() {
    let interns = getStoredData(STORAGE_KEY_INTERNS);
    let mentors = getStoredData(STORAGE_KEY_MENTORS);

    if (interns.length === 0 && mentors.length === 0) {
        interns = [
            { id: "INT001", name: "Ravi Kumar", college: "IIT Delhi", branch: "ECE", duration: 8, email: "ravi@example.com", phone: "9876543210", status: "New", assignedMentorId: null, projectTitle: null, rejectionRemarks: null, certificateIssued: false, projectReportSubmitted: false, attendance: null },
            { id: "INT002", name: "Priya Sharma", college: "BITS Pilani", branch: "CS", duration: 12, email: "priya@example.com", phone: "9123456789", status: "New", assignedMentorId: null, projectTitle: null, rejectionRemarks: null, certificateIssued: false, projectReportSubmitted: false, attendance: null },
            { id: "INT003", name: "Amit Singh", college: "VIT Vellore", branch: "Mechanical", duration: 10, email: "amit@example.com", phone: "9988776655", status: "Assigned", assignedMentorId: "MTR001", projectTitle: null, rejectionRemarks: null, certificateIssued: false, projectReportSubmitted: false, attendance: null },
            { id: "INT004", name: "Sneha Gupta", college: "NIT Warangal", branch: "Civil", duration: 6, email: "sneha@example.com", phone: "9000111222", status: "Ongoing", assignedMentorId: "MTR002", projectTitle: "Smart City Infrastructure", rejectionRemarks: null, certificateIssued: false, projectReportSubmitted: false, attendance: 90 },
            { id: "INT005", name: "Rahul Verma", college: "IIT Bombay", branch: "Electrical", duration: 8, email: "rahul@example.com", phone: "9765432109", status: "Rejected", assignedMentorId: "MTR001", projectTitle: null, rejectionRemarks: "Not suitable for current projects.", certificateIssued: false, projectReportSubmitted: false, attendance: null },
            { id: "INT006", name: "Deepa Reddy", college: "Anna University", branch: "IT", duration: 12, email: "deepa@example.com", phone: "9555444333", status: "Completed", assignedMentorId: "MTR002", projectTitle: "AI-powered Security System", rejectionRemarks: null, certificateIssued: true, projectReportSubmitted: true, attendance: 95 }
        ];

        mentors = [
            { id: "MTR001", name: "Dr. Ramesh Nair", department: "Mechanical", email: "ramesh.nair@drdo.in", assignedInterns: ["INT003", "INT005"] },
            { id: "MTR002", name: "Dr. Anjali Singh", department: "Computer Science", email: "anjali.singh@drdo.in", assignedInterns: ["INT004", "INT006"] },
            { id: "MTR003", name: "Dr. Sanjay Kumar", department: "Electronics", email: "sanjay.kumar@drdo.in", assignedInterns: [] }
        ];

        setStoredData(STORAGE_KEY_INTERNS, interns);
        setStoredData(STORAGE_KEY_MENTORS, mentors);
    }
}

function resetAllData() {
    localStorage.removeItem(STORAGE_KEY_INTERNS);
    localStorage.removeItem(STORAGE_KEY_MENTORS);
    initializeDummyData();
    alert("All data has been reset!");
    window.location.reload();
}

// --- ID Generation Utility ---

function generateUniqueId(prefix, records) {
    let maxNum = 0;
    records.forEach(item => {
        const num = parseInt(item.id.replace(prefix, ''), 10);
        if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    return `${prefix}${(maxNum + 1).toString().padStart(3, '0')}`;
}

// --- CSV Export Utility ---

function exportToCsv(data, filename) {
    if (!data || data.length === 0) {
        alert("No data to export!");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
        const values = headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`);
        csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Your browser does not support downloading. Copy the data manually.");
    }
}

// --- Message Display Utility ---

function displayMessage(elementId, message, type = 'success') {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = `message ${type}`;
    el.style.display = 'block';
    setTimeout(() => {
        el.style.display = 'none';
        el.textContent = '';
    }, 5000);
}

// Initialize dummy data on page load
document.addEventListener('DOMContentLoaded', initializeDummyData);


// Check for admin status on page load
document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = localStorage.getItem('isAdmin');
    const currentPage = window.location.pathname.split('/').pop();  // Get the current page name

    // Skip the check if it's the login page
    if (currentPage !== 'admin_login.html') {
        if (!isAdmin || isAdmin !== 'true') {
            alert('You must log in as admin to access this page.');
            window.location.replace('admin_login.html');  // Redirect to login page
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isAdmin'); // Remove admin status
    window.location.href = 'admin_login.html'; // Redirect to login page
}

