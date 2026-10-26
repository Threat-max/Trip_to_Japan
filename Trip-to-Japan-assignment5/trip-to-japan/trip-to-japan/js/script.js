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

// Sends the form data to the server with fetch (POST) without page reload.
// onSuccess / onError are callback functions given by the caller.
// jsonplaceholder.typicode.com is a free test API: it only imitates saving.
function sendBookingRequest(data, onSuccess, onError) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }
            return response.json();
        })
        .then(function (result) {
            onSuccess(result);
        })
        .catch(function (error) {
            onError(error);
        });
}

function initFormValidation() {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    var successBox = document.getElementById("formSuccess");
    var errorBox = document.getElementById("formError");
    var submitButton = document.getElementById("submitBtn");

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
            // Data for the server (the password is not sent)
            var bookingData = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                tour: document.getElementById("city").value,
                phone: document.getElementById("phone").value.trim(),
                message: document.getElementById("msg").value.trim(),
                newsletter: document.getElementById("newsletter").checked
            };

            errorBox.classList.add("d-none");
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            // The two functions below are callbacks
            sendBookingRequest(bookingData, onBookingSent, onBookingFailed);
        } else {
            playSound("error");
        }
    });

    // Callback: the server answered, show the success message without reloading
    function onBookingSent(result) {
        var name = document.getElementById("name").value.trim();

        form.reset();   // reset first, because it also hides the messages
        clearFormMarks();

        successBox.textContent = "Thank you, " + name + "! Your booking request #" + result.id +
                                 " has been sent. We will contact you shortly.";
        successBox.classList.remove("d-none");
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        playSound("success");
    }

    // Callback: something went wrong (for example, no internet)
    function onBookingFailed() {
        errorBox.textContent = "Could not send the request. Please check your connection and try again.";
        errorBox.classList.remove("d-none");
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
        playSound("error");
    }

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
            playSound("click");
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
        playSound("click");
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

        playSound("success");
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
        // In the night theme the background is controlled by the theme
        if (document.body.classList.contains("dark-theme")) {
            colorName.textContent = "Switch to the Day theme to change the color.";
            playSound("error");
            return;
        }
        playSound("click");

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
   ADVANCED JS 1: SOUND EFFECTS (all pages)
   Sounds are made with the Web Audio API, so no audio
   files are needed. Only one sound plays at a time:
   a new sound stops the previous one (no overlapping).
   ===================================================== */

// Object with the settings of every sound
var soundSettings = {
    click:   { frequency: 520, duration: 0.10, wave: "sine" },
    star:    { frequency: 880, duration: 0.18, wave: "triangle" },
    toggle:  { frequency: 330, duration: 0.15, wave: "square" },
    success: { frequency: 660, duration: 0.35, wave: "sine" },
    error:   { frequency: 180, duration: 0.25, wave: "sawtooth" }
};

var audioContext = null;
var currentSound = null;

function playSound(name) {
    var AudioClass = window.AudioContext || window.webkitAudioContext;
    var settings = soundSettings[name];
    if (!AudioClass || !settings) return;

    // The audio context is created only after the first user click
    if (!audioContext) {
        audioContext = new AudioClass();
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    // Stop the previous sound, so sounds never overlap
    if (currentSound) {
        try { currentSound.stop(); } catch (error) { }
    }

    var oscillator = audioContext.createOscillator();
    var volume = audioContext.createGain();
    var now = audioContext.currentTime;

    oscillator.type = settings.wave;
    oscillator.frequency.value = settings.frequency;

    // Volume goes down smoothly, so there is no harsh click at the end
    volume.gain.setValueAtTime(0.15, now);
    volume.gain.exponentialRampToValueAtTime(0.001, now + settings.duration);

    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + settings.duration);

    currentSound = oscillator;
    oscillator.onended = function () {
        if (currentSound === oscillator) {
            currentSound = null;
        }
    };
}


/* =====================================================
   ADVANCED JS 2: DAY / NIGHT THEME SWITCH (all pages)
   Button in the navbar adds or removes the class
   "dark-theme" on <body>. The choice is saved, so the
   other pages open with the same theme.
   ===================================================== */
function applyTheme(theme) {
    var button = document.getElementById("themeToggle");

    if (theme === "night") {
        document.body.classList.add("dark-theme");
        document.body.style.backgroundColor = "";
        if (button) button.textContent = "☀️ Day";
    } else {
        document.body.classList.remove("dark-theme");
        // On the gallery page the chosen background color comes back
        if (document.getElementById("changeBgBtn")) {
            document.body.style.backgroundColor = backgroundColors[currentColorIndex].value;
        }
        if (button) button.textContent = "🌙 Night";
    }
}

function initThemeSwitch() {
    var button = document.getElementById("themeToggle");
    if (!button) return;

    // Open the page with the theme chosen before
    applyTheme(localStorage.getItem("japanTheme") || "day");

    button.addEventListener("click", function () {
        var isNight = document.body.classList.contains("dark-theme");
        var newTheme = isNight ? "day" : "night";

        applyTheme(newTheme);
        localStorage.setItem("japanTheme", newTheme);
        playSound("toggle");
    });
}


/* =====================================================
   ADVANCED JS 3: KEYBOARD NAVIGATION FOR THE MENU
   Arrow keys move focus between the navbar links.
   Home / End jump to the first / last link.
   ===================================================== */
function initKeyboardNavigation() {
    var links = document.querySelectorAll(".site-navbar .nav-link");
    if (links.length === 0) return;

    links.forEach(function (link, index) {
        link.addEventListener("keydown", function (event) {
            var nextIndex = index;

            // Switch statement: different action for every key
            switch (event.key) {
                case "ArrowRight":
                case "ArrowDown":
                    nextIndex = (index + 1) % links.length;
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    nextIndex = (index - 1 + links.length) % links.length;
                    break;
                case "Home":
                    nextIndex = 0;
                    break;
                case "End":
                    nextIndex = links.length - 1;
                    break;
                default:
                    return; // other keys work as usual
            }

            event.preventDefault();
            links[nextIndex].focus();
        });
    });
}


/* =====================================================
   ADVANCED JS 4: TIME IN TOKYO BUTTON (index.html)
   Click shows the current time in Japan using
   new Date().toLocaleTimeString()
   ===================================================== */
function initTokyoTime() {
    var button = document.getElementById("tokyoTimeBtn");
    var output = document.getElementById("tokyoTime");
    if (!button || !output) return;

    button.addEventListener("click", function () {
        var tokyoTime = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo" });
        output.textContent = "It is " + tokyoTime + " in Tokyo now.";

        // Restart the highlight animation on every click
        output.classList.remove("time-flash");
        void output.offsetWidth;
        output.classList.add("time-flash");

        playSound("click");
    });
}


/* =====================================================
   ADVANCED JS 5: TOURS DATA, FILTER AND RATING (tours.html)
   - tours: array of objects with methods
   - map / filter / find / forEach: higher-order functions
   - switch: chooses which tours to show
   - stars: click to set the rating
   ===================================================== */

// Array of objects: every tour has data and two methods
var tours = [
    {
        id: 1, city: "tokyo", name: "Tokyo Explorer",
        description: "Modern culture &amp; technology",
        days: 5, nights: 4, price: 1200, rating: 0,
        getDuration: function () { return this.days + " days / " + this.nights + " nights"; },
        getPriceText: function () { return "$" + this.price.toLocaleString("en-US"); }
    },
    {
        id: 2, city: "kyoto", name: "Kyoto Heritage",
        description: "Temples &amp; traditional gardens",
        days: 4, nights: 3, price: 1000, rating: 0,
        getDuration: function () { return this.days + " days / " + this.nights + " nights"; },
        getPriceText: function () { return "$" + this.price.toLocaleString("en-US"); }
    },
    {
        id: 3, city: "osaka", name: "Osaka Food &amp; Lights",
        description: "Street food &amp; entertainment",
        days: 4, nights: 3, price: 900, rating: 0,
        getDuration: function () { return this.days + " days / " + this.nights + " nights"; },
        getPriceText: function () { return "$" + this.price.toLocaleString("en-US"); }
    },
    {
        id: 4, city: "fuji", name: "Mount Fuji Nature",
        description: "Lakes, views &amp; adventure",
        days: 3, nights: 2, price: 750, rating: 0,
        getDuration: function () { return this.days + " days / " + this.nights + " nights"; },
        getPriceText: function () { return "$" + this.price.toLocaleString("en-US"); }
    }
];

var ratingWords = ["Poor", "Fair", "Good", "Very good", "Excellent"];

// Builds 5 star buttons for one tour (loop)
function createStarsHtml(tour) {
    var html = "";
    for (var i = 1; i <= 5; i++) {
        var className = i <= tour.rating ? "star selected" : "star";
        html += '<button type="button" class="' + className + '" data-tour="' + tour.id +
                '" data-value="' + i + '" aria-label="Rate ' + i + ' out of 5">★</button>';
    }
    return html;
}

// Shows the given tours in the table
function renderTours(list) {
    var body = document.querySelector("#toursBody");

    // map() turns every tour object into a table row
    var rows = list.map(function (tour) {
        return '<tr class="tour-row">' +
               '<td><strong>' + tour.name + '</strong><br><small>' + tour.description + '</small></td>' +
               '<td>' + tour.getDuration() + '</td>' +
               '<td class="price-text">' + tour.getPriceText() + '</td>' +
               '<td class="stars-cell">' + createStarsHtml(tour) + '</td>' +
               '</tr>';
    });

    body.innerHTML = rows.join("");
    initStars();
}

// Switch statement: chooses the tours and the text for each filter button
function showTours(category) {
    var list;
    var info;

    switch (category) {
        case "tokyo":
            list = tours.filter(function (tour) { return tour.city === "tokyo"; });
            info = "Showing: Tokyo tours";
            break;
        case "kyoto":
            list = tours.filter(function (tour) { return tour.city === "kyoto"; });
            info = "Showing: Kyoto tours";
            break;
        case "osaka":
            list = tours.filter(function (tour) { return tour.city === "osaka"; });
            info = "Showing: Osaka tours";
            break;
        case "fuji":
            list = tours.filter(function (tour) { return tour.city === "fuji"; });
            info = "Showing: Mount Fuji tours";
            break;
        default:
            list = tours;
            info = "Showing: all tours";
    }

    document.getElementById("filterInfo").textContent = info + " (" + list.length + ")";
    renderTours(list);
}

// Click on a star sets the rating of the tour
function initStars() {
    var stars = document.querySelectorAll(".star");
    var message = document.getElementById("ratingMessage");

    stars.forEach(function (star) {
        star.addEventListener("click", function () {
            var tourId = Number(star.dataset.tour);
            var value = Number(star.dataset.value);

            // find() returns the tour object with this id
            var tour = tours.find(function (item) { return item.id === tourId; });
            tour.rating = value;

            // Color the stars of this tour up to the clicked one
            var tourStars = document.querySelectorAll('.star[data-tour="' + tourId + '"]');
            tourStars.forEach(function (item) {
                item.classList.toggle("selected", Number(item.dataset.value) <= value);
            });

            // Small "pop" animation on the clicked star
            star.classList.add("star-pop");
            star.addEventListener("animationend", function () {
                star.classList.remove("star-pop");
            }, { once: true });

            message.innerHTML = "You rated <strong>" + tour.name + "</strong>: " +
                                value + " / 5 (" + ratingWords[value - 1] + ")";
            playSound("star");
        });
    });
}

function initTours() {
    if (!document.getElementById("toursBody")) return;

    var buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (item) { item.classList.remove("active"); });
            button.classList.add("active");

            showTours(button.dataset.filter);
            playSound("click");
        });
    });

    showTours("all");
}


/* =====================================================
   START: run every feature when the page is loaded
   ===================================================== */
initFormValidation();
initAccordion();
initPopup();
initBackgroundChanger();
initDateTime();
initThemeSwitch();
initKeyboardNavigation();
initTokyoTime();
initTours();
