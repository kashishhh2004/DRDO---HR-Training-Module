# HR Training Module

A web-based **Internship Management and HR Training Module** developed during my internship at **DRDO** to streamline the management and monitoring of interns throughout their internship lifecycle.

The system provides separate workflows for administrators and mentors, allowing interns to be added, assigned to mentors, accepted/rejected, monitored during their internship, and marked as completed.

---

## 📌 Overview

The **HR Training Module** is designed to simplify internship administration by providing a centralized interface for managing intern information and tracking their progress.

The application supports the complete internship workflow:

**New Intern → Mentor Assignment → Mentor Acceptance/Rejection → Ongoing Internship → Completion → Certificate Issuance**

The dashboard also provides an overview of interns based on their current status and allows internship data to be exported as a CSV file.

---

## ✨ Features

### 👨‍💼 Admin Features

* Admin login interface
* Dashboard with internship statistics
* Add new interns
* Assign mentors to interns
* Reassign rejected interns to another mentor
* View ongoing interns
* View completed interns
* Issue internship certificates
* Record project report submission status
* Record intern attendance
* Export intern data to CSV
* Reset stored data for testing
* Logout functionality

The dashboard displays counts for total, new, ongoing, completed, rejected, and assigned interns.

### 👨‍🏫 Mentor Features

Mentors can view interns assigned to them through a dedicated dashboard.

The mentor workflow includes:

* View newly assigned interns
* Accept an intern
* Enter the assigned project title
* Reject an intern with remarks
* View ongoing interns
* Mark interns as completed
* View completed interns
* Check certificate status

The mentor dashboard separates interns into **New Assigned, Ongoing, and Completed** sections.

### 👨‍🎓 Intern Management

The system stores important intern information such as:

* Name
* College
* Branch
* Email
* Phone
* Internship duration
* Internship status
* Assigned mentor
* Project title
* Rejection remarks
* Attendance
* Project report submission status
* Certificate status

## The Add Intern form collects the intern's basic academic and contact information and initializes the internship workflow.

## 🔄 Internship Workflow

```text
                 ┌───────────────┐
                 │   Add Intern  │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │      New      │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Assign Mentor │
                 └───────┬───────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Mentor Decision   │
              └──────┬───────┬──────┘
                     │       │
                  Accept    Reject
                     │       │
                     ▼       ▼
                 Ongoing   Rejected
                     │       │
                     │       └──► Reassign Mentor
                     │
                     ▼
                 Completed
                     │
                     ▼
             Certificate Issued
```

The mentor assignment process updates the intern's status and associates the intern with the selected mentor.

---

## 🖥️ Application Modules

### 1. Admin Login

Provides an admin login interface before accessing the dashboard.

> **Note:** The current implementation uses hardcoded credentials for demonstration/testing purposes and stores the login state using browser `localStorage`. It is **not intended for production authentication**.

### 2. Dashboard

Provides a centralized overview of internship activity.

**Dashboard metrics:**

* Total Interns
* New Interns
* Assigned Interns
* Ongoing Interns
* Completed Interns
* Rejected Interns

It also provides quick navigation to the major internship management modules and CSV export functionality.

### 3. Add New Intern

Allows administrators to register interns by entering their:

* Name
* College
* Branch
* Email
* Phone
* Internship duration

### 4. Mentor Assignment

Displays new interns and allows administrators to select and assign an available mentor.

### 5. Mentor Dashboard

Provides mentors with a dedicated interface to manage their assigned interns.

Mentors can:

* Accept interns and assign project titles
* Reject interns with remarks
* Track ongoing interns
* Mark internships as completed

### 6. Rejected Interns

Administrators can view rejected interns along with rejection remarks and reassign them to another mentor.

### 7. Ongoing Interns

Displays interns currently undergoing their internship along with their assigned mentor and project title.

Administrators can mark an ongoing internship as completed.

### 8. Completed Interns

Provides a final overview of completed internships, including:

* Mentor
* Project title
* Project report submission
* Attendance percentage
* Certificate status

## Administrators can issue certificates after entering the required information.

## 🛠️ Technologies Used

* **HTML5** — Structure and page layouts
* **CSS3** — Styling, responsive design and UI components
* **JavaScript** — Application logic, DOM manipulation and workflow management
* **Local Storage** — Browser-side data persistence
* **CSV** — Exporting internship data

## The UI is styled using a centralized CSS file with responsive layouts for desktop, tablet and mobile screen sizes.

## 📁 Project Structure

```text
HR-Training-Module/
│
├── index.html
├── admin_login.html
├── add_intern.html
├── assign_mentor.html
├── mentor_dashboard.html
├── ongoing.html
├── rejected_by_mentor.html
├── completed.html
│
├── styles.css
│
├── scripts/
│   └── utils.js
│
├── images/
│   └── drdo_logo.png
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

No backend server or database setup is required for the current implementation.

You only need:

* A modern web browser
* The project files

### Run Locally

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Open the project directory.

3. Open `admin_login.html` in a browser.

4. Log in using the demo credentials configured in the application.

5. Access the dashboard and explore the internship management workflow.

---

## 🔐 Data & Authentication

This version is implemented as a **client-side web application**.

Data and login state are handled within the browser rather than through a backend server/database.

The current admin authentication uses hardcoded credentials for demonstration purposes.

For a production deployment, authentication and data management should be moved to a secure backend with proper password hashing, authorization, database storage, validation, and session management.

---

## 📊 Data Export

The dashboard includes an **Export Interns to CSV** feature for exporting internship records.

---

## 📱 Responsive Design

The interface includes responsive CSS rules for different screen sizes.

The dashboard changes from a multi-column layout to fewer columns and eventually a single-column layout on smaller devices.

---

## 🎯 Project Objective

The primary objective of this project was to create a structured digital interface for managing the internship lifecycle and reducing manual effort involved in tracking interns, mentors, projects, progress, completion and certification.

---

## 💡 Key Learning Outcomes

Through this project, I gained practical experience in:

* Frontend web development
* HTML, CSS and JavaScript
* DOM manipulation
* Form handling and validation
* Client-side data management
* Building dashboard interfaces
* Designing multi-step workflows
* Responsive web design
* CSV data export
* Implementing role-based application flows
* Translating an organizational workflow into a functional web application

---

## 👩‍💻 Developed During DRDO Internship

**Project:** HR Training Module
**Role:** Web Developer
**Organization:** Defence Research and Development Organisation (DRDO)

---

## 📄 License

This project was developed as part of an internship project. The code and associated materials are intended for educational and demonstration purposes.
