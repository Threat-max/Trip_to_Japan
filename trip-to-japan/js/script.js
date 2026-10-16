/* =====================================================
   Trip to Japan | script.js
   One file linked in every HTML page.
   Each feature first checks that its elements exist on
   the current page, so nothing breaks on other pages.
   ===================================================== */


/* =====================================================
   TASK 1: FORM VALIDATION (contact.html)
   Checks required fields, email format, phone format,
   password length and password confirmation.
   ===================================================== */

// Shows a red error message under the field
function showError(input, message) {
    var errorBox = document.getElementById(input.id + "Error");
    input.classList.add("input-error");
    input.classList.remove("input-ok");
    errorBox.textContent = message;
}

// Removes the error and marks the field as correct
function showSuccess(input) {
    var errorBox = document.getElementById(input.id + "Error");
    input.classList.remove("input-error");
    input.classList.add("input-ok");
    errorBox.textContent = "";
}

// Full name: required, at least 2 letters, no digits
function validateName() {
    var input = document.getElementById("name");
    var value = input.value.trim();

    if (value === "") {
        showError(input, "Full name is required.");
        return false;
    }
    if (value.length < 2) {
        showError(input, "Name must be at least 2 characters long.");
        return false;
    }
    if (!/^[A-Za-zА-Яа-яЁё\s'-]+$/.test(value)) {
        showError(input, "Name can contain only letters.");
        return false;
    }
    showSuccess(input);
    return true;
}

// Email: required, must look like name@site.com
function validateEmail() {
    var input = document.getElementById("email");
    var value = input.value.trim();

    if (value === "") {
        showError(input, "Email address is required.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(input, "Please enter a valid email, e.g. name@example.com.");
        return false;
    }
    showSuccess(input);
    return true;
}

// Tour: the user must choose one of the tours
function validateTour() {
    var input = document.getElementById("city");

    if (input.value === "") {
        showError(input, "Please select a tour.");
        return false;
    }
    showSuccess(input);
    return true;
}

// Phone: optional, but if it is filled it must have 10 digits
function validatePhone() {
    var input = document.getElementById("phone");
    var value = input.value.trim();
    var digitsOnly = value.replace(/\D/g, "");

    if (value !== "" && digitsOnly.length !== 10) {
        showError(input, "Phone must have 10 digits, e.g. 700 123 45 67.");
        return false;
    }
    showSuccess(input);
    return true;
}

// Password: required, at least 8 characters
function validatePassword() {
    var input = document.getElementById("password");
    var value = input.value;

    if (value === "") {
        showError(input, "Password is required.");
        return false;
    }
    if (value.length < 8) {
        showError(input, "Password must be at least 8 characters long.");
        return false;
    }
    showSuccess(input);
    return true;
}

// Confirm password: required and must match the password
function validateConfirmPassword() {
    var input = document.getElementById("confirmPassword");
    var password = document.getElementById("password").value;

    if (input.value === "") {
        showError(input, "Please confirm your password.");
        return false;
    }
    if (input.value !== password) {
        showError(input, "Passwords do not match.");
        return false;
    }
    showSuccess(input);
    return true;
}

function initFormValidation() {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    var successBox = document.getElementById("formSuccess");

    // Each field with its own validation function
    var fields = [
        { id: "name", check: validateName },
        { id: "email", check: validateEmail },
        { id: "city", check: validateTour },
        { id: "phone", check: validatePhone },
        { id: "password", check: validatePassword },
        { id: "confirmPassword", check: validateConfirmPassword }
    ];

    fields.forEach(function (field) {
        var input = document.getElementById(field.id);

        // Check the field when the user leaves it
        input.addEventListener("blur", field.check);

        // If the field already has an error, re-check while typing
        input.addEventListener("input", function () {
            if (input.classList.contains("input-error")) {
                field.check();
            }
        });
    });

    // Check everything when the form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        successBox.classList.add("d-none");

        var allValid = true;
        fields.forEach(function (field) {
            if (!field.check()) {
                allValid = false;
            }
        });

        if (allValid) {
            successBox.classList.remove("d-none");
            form.reset();
            clearFormMarks();
        }
    });

    // "Clear" button also removes all error messages
    form.addEventListener("reset", function () {
        successBox.classList.add("d-none");
        clearFormMarks();
    });

    function clearFormMarks() {
        fields.forEach(function (field) {
            var input = document.getElementById(field.id);
            input.classList.remove("input-error", "input-ok");
            document.getElementById(field.id + "Error").textContent = "";
        });
    }
}


/* =====================================================
   TASK 2: ACCORDION FOR FAQ (about.html)
   Answers are hidden by default. Click on a question
   opens the answer, click again hides it.
   ===================================================== */
function initAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (items.length === 0) return;

    items.forEach(function (item) {
        var question = item.querySelector(".faq-question");
        var answer = item.querySelector(".faq-answer");

        // Hidden by default
        answer.style.maxHeight = "0px";

        question.addEventListener("click", function () {
            var isOpen = item.classList.contains("active");

            if (isOpen) {
                // Hide the answer
                item.classList.remove("active");
                answer.style.maxHeight = "0px";
                question.setAttribute("aria-expanded", "false");
            } else {
                // Show the answer (height = real height of the content)
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
                question.setAttribute("aria-expanded", "true");
            }
        });
    });

    // If the window is resized, text can wrap differently,
    // so we recalculate the height of the opened answers
    window.addEventListener("resize", function () {
        items.forEach(function (item) {
            if (item.classList.contains("active")) {
                var answer = item.querySelector(".faq-answer");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}


/* =====================================================
   TASK 3: POPUP SUBSCRIPTION FORM (index.html)
   Hidden by default. Opens with the Subscribe button,
   closes with the X button, click outside, or Esc key.
   ===================================================== */
function initPopup() {
    var popup = document.getElementById("subscribePopup");
    var openButton = document.getElementById("openPopupBtn");
    var closeButton = document.getElementById("closePopupBtn");
    var form = document.getElementById("subscribeForm");
    var message = document.getElementById("subscribeMessage");

    if (!popup || !openButton) return;

    function openPopup() {
        popup.classList.add("show");
    }

    function closePopup() {
        popup.classList.remove("show");
    }

    openButton.addEventListener("click", openPopup);
    closeButton.addEventListener("click", closePopup);

    // Click on the dark area outside the white box closes the popup
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });

    // Esc key closes the popup too
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePopup();
        }
    });

    // Simple check of the subscription form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("subName").value.trim();
        var email = document.getElementById("subEmail").value.trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "" || email === "") {
            message.textContent = "Please fill in your name and email.";
            message.className = "popup-message popup-error";
            return;
        }
        if (!emailPattern.test(email)) {
            message.textContent = "Please enter a valid email address.";
            message.className = "popup-message popup-error";
            return;
        }

        message.textContent = "Thank you, " + name + "! You are subscribed.";
        message.className = "popup-message popup-success";
        form.reset();

        // Close the popup automatically after a short pause
        setTimeout(function () {
            closePopup();
            message.textContent = "";
            message.className = "popup-message";
        }, 1800);
    });
}


/* =====================================================
   TASK 4: CHANGE BACKGROUND COLOR (gallery.html)
   Each click on the button switches to the next color
   from the list (colors match the website theme).
   ===================================================== */
var backgroundColors = [
    { name: "Cloud White", value: "#f4f6f9" },
    { name: "Sakura Pink", value: "#fde8ea" },
    { name: "Sky Blue", value: "#e6f0fa" },
    { name: "Matcha Green", value: "#e8f3ea" },
    { name: "Washi Cream", value: "#f6f0e4" }
];
var currentColorIndex = 0;

function initBackgroundChanger() {
    var button = document.getElementById("changeBgBtn");
    var colorName = document.getElementById("bgColorName");
    if (!button) return;

    button.addEventListener("click", function () {
        // Go to the next color, and start again after the last one
        currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;

        var color = backgroundColors[currentColorIndex];
        document.body.style.backgroundColor = color.value;
        colorName.textContent = "Current: " + color.name;
    });
}


/* =====================================================
   TASK 5: CURRENT DATE AND TIME (index.html)
   Uses the Date object, updates every second.
   Example result: October 9, 2026, 10:45:30 AM
   ===================================================== */
function updateDateTime() {
    var box = document.getElementById("datetime");
    if (!box) return;

    var now = new Date();

    var datePart = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    var timePart = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });

    box.textContent = datePart + ", " + timePart;
}

function initDateTime() {
    if (!document.getElementById("datetime")) return;

    updateDateTime();
    setInterval(updateDateTime, 1000);
}


/* =====================================================
   START: run every feature when the page is loaded
   ===================================================== */
initFormValidation();
initAccordion();
initPopup();
initBackgroundChanger();
initDateTime();
