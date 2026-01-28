// Function to handle Signup
function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    // Save user data for later login
    localStorage.setItem("storedName", name);
    localStorage.setItem("storedEmail", email);
    localStorage.setItem("storedPass", password);

    alert("Account created successfully! Now please login.");
    window.location.href = "login.html";
}

// Function to handle Login
function login() {
    // --- FIX START: Get value from the HTML Dropdown, not LocalStorage ---
    const roleSelect = document.getElementById("roleSelector");
    const role = roleSelect.value; 
    // --- FIX END ---

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const savedEmail = localStorage.getItem("storedEmail");
    const savedPass = localStorage.getItem("storedPass");
    const savedName = localStorage.getItem("storedName") || "User";

    if (!role) {
        alert("Please select a role first!");
        return;
    }

    // Check if credentials match
    if (email === savedEmail && password === savedPass) {
        
        // --- IMPORTANT: Now we save the role to memory for the session ---
        localStorage.setItem("selectedRole", role);

        // Prepare names for specific dashboards
        localStorage.setItem("adminName", savedName); 
        localStorage.setItem("doctorName", savedName);
        localStorage.setItem("userName", savedName);

        // Redirect based on role
        if (role === "user") window.location.href = "/userdashboard/user_dashboard.html";
        else if (role === "doctor") window.location.href = "/doctorpanael/doctor.html";
        else if (role === "admin") window.location.href = "/adminpanael/admin-dashboard.html";
        
    } else {
        alert("Invalid Email or Password!");
    }
}

// Global Logout Function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("selectedRole");
        window.location.href = "/frontpage/index.html";
    }
}