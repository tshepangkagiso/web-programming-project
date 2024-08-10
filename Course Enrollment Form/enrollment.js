
function client(cName, uName, dob) {
    this.CourseName = cName;
    this.UserName = uName;
    this.DateOfBirth = dob;
}

function calculateAge(dob) {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function windowReset() {
    document.getElementById('enrollmentForm').reset();

    setTimeout(() => {
        console.log("Simulating window closure...");
    }, 300);
}

function pageLoader() {
    const developers = ['Belgium Campus iTversity', 'It\'s the way we are wired.'];
    let currentDeveloper = 0;

    function updateDeveloperName() {
        document.getElementById('developerNames').textContent = developers[currentDeveloper];
        currentDeveloper = (currentDeveloper + 1) % developers.length;
    }

    function hideLoader() {
        document.getElementById('pageLoader').style.display = 'none';
    }

    const nameInterval = setInterval(updateDeveloperName, 2000);

    setTimeout(() => {
        clearInterval(nameInterval);
        hideLoader();
    }, 6000);

    updateDeveloperName();
}

pageLoader();

function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';
}

function closeCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
}

function enrollmentFormProcess(event) {
    event.preventDefault(); 

    const coursename = document.getElementById('courseName').value;
    const username = document.getElementById('userName').value;
    const dateofbirth = document.getElementById('date').value;

    // Validate form input
    if (!coursename) {
        showCustomAlert('Course name is empty');
        return;
    }
    if (!username) {
        showCustomAlert('Username is empty');
        return;
    }
    if (!dateofbirth) {
        showCustomAlert('Date of birth is empty');
        return;
    }

    const age = calculateAge(new Date(dateofbirth));
    if (age < 16) {
        showCustomAlert('You must be at least 16 years old to enroll.');
        return;
    }

    const student = new client(coursename, username, dateofbirth);
    const countdownForCourse = countDownTimer(student.CourseName);
    console.log(countdownForCourse);

    // Show success message using custom alert
    showCustomAlert(`Welcome, ${student.UserName}!\n\nWe are excited to have you join us for the ${student.CourseName} course. Please feel free to reach out if you have any questions or need assistance.\n\nBest regards,\n\nThe Enrollment Team`);

    setTimeout(() => {
        showCustomAlert(`Time left to start of course: Days: ${countdownForCourse.Days}, Hours: ${countdownForCourse.Hours}, Minutes: ${countdownForCourse.Minutes}, Seconds: ${countdownForCourse.Seconds}`);
        windowReset();
    }, 6000);

}


function countDownTimer(course) {
    const currentDate = new Date();
    let courseDate, countDown;

    switch(course) {
        case "Bachelor of Computing":
            courseDate = new Date("1 December 2024 00:00:00");
            break;

        case "Bachelor of IT":
            courseDate = new Date("1 November 2024 00:00:00");
            break;

        case "Diploma in Information Technology":
            courseDate = new Date("1 October 2024 00:00:00");
            break;

        case "Certificate: IT(Database Development)":
            courseDate = new Date("1 September 2024 00:00:00");
            break;

        default:
            console.log("Unknown course. Please provide a valid course name.");
            return null;
    }

    const timeDifference = courseDate - currentDate;
    countDown = functionTimeCalculator(timeDifference, courseDate);

    return countDown;
}

function functionTimeCalculator(timeDifference, courseDate) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (timeDifference < 0) {
        console.log("Countdown has ended!");
        return {
            Days: 0,
            Hours: 0,
            Minutes: 0,
            Seconds: 0
        };
    }
    let timeLeft = courseDate.toDateString()
    console.log(`Time left until ${timeLeft}: ${days}d ${hours}h ${minutes}m ${seconds}s`);

    let timeObject = {
        TimeLeft: timeLeft,
        Days: days,
        Hours: hours,
        Minutes: minutes,
        Seconds: seconds
    };

    console.log(`t: ${timeObject.TimeLeft}, d: ${timeObject.Days}, h: ${timeObject.Hours}, m: ${timeObject.Minutes}, s: ${timeObject.Seconds}`);
    return timeObject;
}




