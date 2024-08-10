const Form = document.getElementById("Form");
const InputText = document.getElementById("inputText");
const SearchButton = document.getElementById("searchButton");
const ResetData = document.getElementById("RefreshData");
const ResultSpace = document.getElementById("ResultSpace");
const InfoSpace = document.getElementById("InfoSpace");
 
//Course data structure
let Qualification = [];

async function readLocalJson(filePath) {
    try {    
        const response = await fetch(filePath);    
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error reading local JSON file:', error);
        return [];
    }
}
 
async function initializeCourses() {
    Qualification = await readLocalJson("../Files/Qualifications.json");
    console.table(Qualification);
    SaveCoursesToLocalStorage();
}

//Module data structure
let modules = [];

async function readLocalModuleJson(filePath) {
    try {    
        const response = await fetch(filePath);    
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error reading local JSON file:', error);
        return [];
    }
}
 
async function initializeModules() {
    modules = await readLocalModuleJson("../Files/modules.json");
    console.table(modules);
    SaveModulesToLocalStorage();
}

initializeModules();

function SaveModulesToLocalStorage() {
    localStorage.setItem('modules', JSON.stringify(modules));
}

function LoadModuleFromLocalStorage(){
    const storedModules = localStorage.getItem('modules');
    if (storedModules) {
        modules = JSON.parse(storedModules);
    }
}

function ClearModuleLocalStorage(){
    localStorage.removeItem('modules');
    console.log("Storage has been cleared");
}
   
/* ------------------------ Main code ------------------------ */
initializeCourses();
 
SearchButton.addEventListener("click", (event)=> {
    event.preventDefault();
    removeChildElements();

    let queryCourse = InputText.value;
    ViewCourse(queryCourse);
});
 
function CreateDetailedOverview(course_code) {
    LoadModuleFromLocalStorage();
    console.log(course_code);

    let table = document.createElement('table');
    
    let theader = document.createElement('thead');
    let headRow = document.createElement('tr');
    const headers = ['Completed', 'Module', 'Lecturer', 'Venue Date', 'Study Guide', 'Video'];
    
    headers.forEach(item => {
        let th = document.createElement('th');
        th.textContent = item;
        headRow.appendChild(th);
    });
    
    theader.appendChild(headRow);
    table.appendChild(theader);

    let tbody = document.createElement('tbody');

    modules.forEach((module) => {
        if (module.Course === course_code) {     
            let row = document.createElement('tr');
            
            let checkboxCell = document.createElement('td');
            checkboxCell.classList.add('checkbox-column');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'module-select';
            checkbox.value = module.Module_Name;
            checkbox.addEventListener('change', updateSelectedModules);
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            let nameData = document.createElement('td');
            nameData.textContent = module.Module_Name;
            row.appendChild(nameData);

            let LecturerData = document.createElement('td');
            LecturerData.textContent = module.Lecturers;
            row.appendChild(LecturerData);

            let venueData = document.createElement('td');
            venueData.textContent = module.Venue;
            row.appendChild(venueData);

            let studyData = document.createElement('td');
            let documentA = document.createElement('a');
            documentA.textContent = 'click here';
            documentA.href = module.Documentation
            
            studyData.appendChild(documentA);
            row.appendChild(studyData);
            
            let videoData = document.createElement('td');
            let VideoA = document.createElement('a');
            VideoA.textContent = 'click here';
            VideoA.href = module.Video;
            videoData.appendChild(VideoA);
            row.appendChild(videoData);

            tbody.appendChild(row);
        }
    });

    table.appendChild(tbody);
    ResultSpace.appendChild(table);
}

function ViewCourse(queryCourse){
    LoadCoursesFromLocalStorage();
    
    let courseFound = false;
    
    Qualification.forEach((qualification) => {
        if (queryCourse) {
            if (qualification.Course_Title.toLowerCase().includes(queryCourse.toLowerCase())) {
                courseFound = true;
                const section = document.createElement('section');
                section.classList.add('courseContainer');
                
                const h2 = document.createElement('h2');
                h2.innerText = qualification.Course_Title;

                const h3 = document.createElement('h3');
                h3.innerText = qualification.Course_Code;
                
                const h4 = document.createElement('h4');
                h4.innerText = `Level: ${qualification.Course_Level}`;
                
                const h5 = document.createElement('h5');
                h5.innerText = `Duration: ${qualification.Course_Duration}`;
                
                const p = document.createElement('p');
                p.innerText = `Description: ${qualification.Course_Brief}`;
                
                const enrollButton = document.createElement('a');
                enrollButton.innerText = 'Enroll Now';
                enrollButton.href = '../Course Enrollment Form/enrollmentForm.html';
                enrollButton.target = '_blank';
                enrollButton.classList.add('enroll-button');
                
                const printButton = document.createElement('button');
                printButton.innerText = 'Print Course';
                printButton.classList.add('print-button');
                printButton.onclick = function() {
                    printCourseDetails(qualification);
                };
                
                section.appendChild(h2);
                section.appendChild(h3);
                section.appendChild(h4);
                section.appendChild(h5);
                section.appendChild(p);
                section.appendChild(enrollButton);
                section.appendChild(printButton);
                InfoSpace.appendChild(section);
                
                section.id = qualification.Course_Code;
                
                h2.addEventListener('click', function() {
                    ResultSpace.innerHTML = '';
                    
                    InfoSpace.style.flex = 1;
                    ResultSpace.style.flex = 2;
                    
                    const detailedSection = document.createElement('section');
                    detailedSection.classList.add('courseContainer');
                    
                    const detailedH2 = document.createElement('h2');
                    detailedH2.innerText = qualification.Course_Title;
                    
                    const detailedH4 = document.createElement('h4');
                    detailedH4.innerText = `Level: ${qualification.Course_Level}`;
                    
                    const detailedH5 = document.createElement('h5');
                    detailedH5.innerText = `Duration: ${qualification.Course_Duration}`;
                    
                    const detailedP = document.createElement('p');
                    detailedP.innerText = `Description: ${qualification.Course_Description}`;
                    
                    const detailedEnrollButton = document.createElement('a');
                    detailedEnrollButton.innerText = 'Enroll Now';
                    detailedEnrollButton.href = '../Course Enrollment Form/enrollmentForm.html'; 
                    detailedEnrollButton.target = '_blank'; 
                    detailedEnrollButton.classList.add('enroll-button');
                    
                    detailedSection.appendChild(detailedH2);
                    detailedSection.appendChild(detailedH4);
                    detailedSection.appendChild(detailedH5);
                    detailedSection.appendChild(detailedP);
                    detailedSection.appendChild(detailedEnrollButton);
                    
                    //ResultSpace.appendChild(detailedSection);

                    CreateDetailedOverview(qualification.Course_Code);
                });
            }
        }
    });
    
    if (!courseFound) {
        console.log("Course not found: Empty search");
    }
}

function printCourseDetails(qualification) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Course Details - ${qualification.Course_Title}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    h1 { color: #003366; }
                    h2 { color: #0055a4; }
                    .section { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>${qualification.Course_Title}</h1>
                <div class="section">
                    <h2>Course Details</h2>
                    <p><strong>Level:</strong> ${qualification.Course_Level}</p>
                    <p><strong>Duration:</strong> ${qualification.Course_Duration}</p>
                </div>
                <div class="section">
                    <h2>Course Description</h2>
                    <p>${qualification.Course_Description}</p>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function updateSelectedModules() {
    const selectedModulesList = document.getElementById('SelectedModulesList');
    selectedModulesList.innerHTML = '';
    
    const checkboxes = document.querySelectorAll('input[name="module-select"]:checked');
    checkboxes.forEach((checkbox) => {
        const li = document.createElement('li');
        li.textContent = checkbox.value;
        selectedModulesList.appendChild(li);
    });
}

 
function SaveCoursesToLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(Qualification));
}
 
function LoadCoursesFromLocalStorage(){
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
        Qualification = JSON.parse(storedCourses);
    }
}
 
function ClearLocalStorage(){
    localStorage.removeItem('courses');
    console.log("Storage has been cleared");
}

function removeChildElements(){
    InfoSpace.innerHTML = '';
    ResultSpace.innerHTML = '';
}

function pageLoader(){
    const developers = ['Gerald Enright: 577830', 'Bernardt Dawid van Greunen: 577843', 'Tshepang Kagiso Mashigo: 578012'];
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
    }, 8000);
    
    updateDeveloperName();
}

pageLoader();