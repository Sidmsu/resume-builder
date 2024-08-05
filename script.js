document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('resume-form').addEventListener('submit', function (event) {
        event.preventDefault();
        generateResume();
        showSavedResume();
    });

    document.getElementById('create-resume-button').addEventListener('click', function () {
        document.getElementById('home-page').style.display = 'none';
        document.getElementById('resume-form-page').style.display = 'block';
    });

    document.getElementById('create-another-resume-button').addEventListener('click', function () {
        document.getElementById('home-page').style.display = 'none';
        document.getElementById('resume-form-page').style.display = 'block';
    });

    document.getElementById('home-nav').addEventListener('click', function () {
        document.getElementById('resume-form-page').style.display = 'none';
        document.getElementById('home-page').style.display = 'block';
        document.getElementById('saved-resume').style.display = 'none';
    });

    document.getElementById('download-pdf').addEventListener('click', function () {
        downloadPDF();
    });

    document.getElementById('add-education').addEventListener('click', function () {
        addEntry('education');
    });

    document.getElementById('remove-education').addEventListener('click', function () {
        removeLastEntry('education');
    });

    document.getElementById('add-work-experience').addEventListener('click', function () {
        addEntry('work');
    });

    document.getElementById('remove-work-experience').addEventListener('click', function () {
        removeLastEntry('work');
    });

    document.getElementById('add-leadership-experience').addEventListener('click', function () {
        addEntry('leadership');
    });

    document.getElementById('remove-leadership-experience').addEventListener('click', function () {
        removeLastEntry('leadership');
    });

    document.getElementById('add-project').addEventListener('click', function () {
        addEntry('project');
    });

    document.getElementById('remove-project').addEventListener('click', function () {
        removeLastEntry('project');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggleButton = document.getElementById('chatbot-toggle-button');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotCloseButton = document.getElementById('chatbot-close-button');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggleButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotToggleButton.style.display = 'none';
    });

    chatbotCloseButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotToggleButton.style.display = 'block';
    });

    chatbotSendButton.addEventListener('click', () => {
        sendMessage();
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        addMessage('user', message);
        chatbotInput.value = '';

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer key'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: message }],
                max_tokens: 150
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.choices && data.choices.length > 0) {
                addMessage('bot', data.choices[0].message.content.trim());
            } else {
                throw new Error('Unexpected response structure');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('bot', 'Sorry, something went wrong. Please try again later.');
        });
    }

    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});

function addEntry(type) {
    const container = type === 'work' ? document.getElementById('work-experience-section') :
        type === 'leadership' ? document.getElementById('leadership-experience-section') :
        type === 'education' ? document.getElementById('education-section') :
        document.getElementById('projects-section');
    
    const entry = document.createElement('div');
    entry.classList.add(`${type}-entry`);
    
    if (type === 'project') {
        entry.innerHTML = `
            <label for="project-title">Title:</label>
            <input type="text" class="project-title" required>
            <label for="project-description">Description:</label>
            <textarea class="project-description" required></textarea>
        `;
    } else if (type === 'education') {
        entry.innerHTML = `
            <label for="university">University:</label>
            <input type="text" class="university" required>
            <label for="degree">Major/Degree:</label>
            <input type="text" class="degree" required>
            <label for="edu-location">Location:</label>
            <input type="text" class="edu-location" required>
            <label for="graduation">Graduation Date:</label>
            <input type="text" class="graduation" required>
            <label for="edu-gpa">GPA:</label>
            <input type="text" class="edu-gpa" required>
            <label for="gpa">Organizations, Coursework, etc.:</label>
            <textarea class="gpa" required></textarea>
        `;
    } else {
        entry.innerHTML = `
            <label for="${type}-company">Company:</label>
            <input type="text" class="${type}-company company" required>
            <label for="${type}-position">Position:</label>
            <input type="text" class="${type}-position position" required>
            <label for="${type}-location">Location:</label>
            <input type="text" class="${type}-location location" required>
            <label for="${type}-dates">Dates:</label>
            <input type="text" class="${type}-dates dates" required>
            <label for="${type}-responsibilities">Responsibilities:</label>
            <textarea class="${type}-responsibilities responsibilities" required></textarea>
        `;
    }
    
    const removeButton = document.getElementById(`remove-${type}`);
    container.insertBefore(entry, removeButton);
}

function removeLastEntry(type) {
    const container = type === 'work' ? document.getElementById('work-experience-section') :
        type === 'leadership' ? document.getElementById('leadership-experience-section') :
        type === 'education' ? document.getElementById('education-section') :
        document.getElementById('projects-section');
    
    const entries = container.getElementsByClassName(`${type}-entry`);
    if (entries.length > 0) {
        entries[entries.length - 1].remove();
    }
}

function generateResume() {
    const preview = document.getElementById('resume-preview');
    console.log('Generating resume');

    const name = document.getElementById('name')?.value || 'Resume Example [Student]';
    const location = document.getElementById('location')?.value || '';
    const linkedin = document.getElementById('linkedin')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const skills = document.getElementById('skills')?.value || '';
    const interests = document.getElementById('interests')?.value || '';

    let resumeHTML = `
        <h1 style="font-size: 22px;">${name}</h1>
        <p class="contact-info">${location} | ${linkedin} | ${phone} | ${email}</p>
        <div class="resume-section">
            <h2 style="font-size: 16px;">EDUCATION</h2>
            <hr>
    `;

    const eduEntries = document.querySelectorAll('.education-entry');
    console.log('Number of education entries:', eduEntries.length);

    eduEntries.forEach((entry, index) => {
        const university = entry.querySelector('.university')?.value;
        const degree = entry.querySelector('.degree')?.value;
        const eduLocation = entry.querySelector('.edu-location')?.value;
        const graduation = entry.querySelector('.graduation')?.value;
        const eduGpa = entry.querySelector('.edu-gpa')?.value;
        const gpa = entry.querySelector('.gpa')?.value || '';

        if (!university || !degree || !eduLocation || !graduation || !eduGpa) {
            console.warn(`Skipping Education Entry ${index + 1} due to missing fields.`);
            return;
        }

        console.log(`Education Entry ${index + 1}:`, { university, degree, eduLocation, graduation, eduGpa, gpa });

        const gpaList = gpa ? gpa.split('.').filter(item => item.trim() !== '').map(item => `<li>${item.trim()}.</li>`).join('') : '';

        resumeHTML += `
            <div class="resume-entry">
                <div class="left-column">
                    <h3 style="font-size: 16px;">${university}</h3>
                    <p style="font-size: 16px;"><em>${degree} (GPA: ${eduGpa})</em></p>
                    <ul>${gpaList}</ul>
                </div>
                <div class="right-column">
                    <p style="font-size: 16px;">${eduLocation}</p>
                    <p style="font-size: 16px;"><em>${graduation}</em></p>
                </div>
            </div>
        `;
    });

    resumeHTML += `
        </div>
        <div class="resume-section">
            <h2 style="font-size: 16px;">WORK EXPERIENCE</h2>
            <hr>
    `;

    const workEntries = document.querySelectorAll('.work-entry');
    console.log('Number of work entries:', workEntries.length);

    workEntries.forEach((entry, index) => {
        const company = entry.querySelector('.company')?.value;
        const position = entry.querySelector('.position')?.value;
        const workLocation = entry.querySelector('.location')?.value;
        const dates = entry.querySelector('.dates')?.value;
        const responsibilities = entry.querySelector('.responsibilities')?.value || '';

        if (!company || !position || !workLocation || !dates) {
            console.warn(`Skipping Work Entry ${index + 1} due to missing fields.`);
            return;
        }

        console.log(`Work Entry ${index + 1}:`, { company, position, workLocation, dates, responsibilities });

        const responsibilitiesList = responsibilities ? responsibilities.split('.').filter(item => item.trim() !== '').map(item => `<li style="font-size: 16px;">${item.trim()}.</li>`).join('') : '';

        resumeHTML += `
            <div class="resume-entry">
                <div class="left-column">
                    <h3 style="font-size: 16px;">${company}</h3>
                    <p style="font-size: 16px;"><em>${position}</em></p>
                    <ul>${responsibilitiesList}</ul>
                </div>
                <div class="right-column">
                    <p style="font-size: 16px;">${workLocation}</p>
                    <p style="font-size: 16px;"><em>${dates}</em></p>
                </div>
            </div>
        `;
    });

    resumeHTML += `
        </div>
        <div class="resume-section">
            <h2 style="font-size: 16px;">LEADERSHIP EXPERIENCE</h2>
            <hr>
    `;

    const leadershipEntries = document.querySelectorAll('.leadership-entry');
    console.log('Number of leadership entries:', leadershipEntries.length);

    leadershipEntries.forEach((entry, index) => {
        const company = entry.querySelector('.leadership-company')?.value;
        const position = entry.querySelector('.leadership-position')?.value;
        const leadershipLocation = entry.querySelector('.leadership-location')?.value;
        const dates = entry.querySelector('.leadership-dates')?.value;
        const responsibilities = entry.querySelector('.leadership-responsibilities')?.value || '';

        if (!company || !position || !leadershipLocation || !dates) {
            console.warn(`Skipping Leadership Entry ${index + 1} due to missing fields.`);
            return;
        }

        console.log(`Leadership Entry ${index + 1}:`, { company, position, leadershipLocation, dates, responsibilities });

        const responsibilitiesList = responsibilities ? responsibilities.split('.').filter(item => item.trim() !== '').map(item => `<li style="font-size: 16px;">${item.trim()}.</li>`).join('') : '';

        resumeHTML += `
            <div class="resume-entry">
                <div class="left-column">
                    <h3 style="font-size: 16px;">${company}</h3>
                    <p style="font-size: 16px;"><em>${position}</em></p>
                    <ul>${responsibilitiesList}</ul>
                </div>
                <div class="right-column">
                    <p style="font-size: 16px;">${leadershipLocation}</p>
                    <p style="font-size: 16px;"><em>${dates}</em></p>
                </div>
            </div>
        `;
    });

    resumeHTML += `
        </div>
        <div class="resume-section">
            <h2 style="font-size: 16px;">PROJECTS</h2>
            <hr>
    `;

    const projectEntries = document.querySelectorAll('.project-entry');
    console.log('Number of project entries:', projectEntries.length);

    projectEntries.forEach((entry, index) => {
        const title = entry.querySelector('.project-title')?.value;
        const description = entry.querySelector('.project-description')?.value || '';
        const descriptionList = description ? description.split('.').filter(item => item.trim() !== '').map(item => `<li style="font-size: 16px;">${item.trim()}.</li>`).join('') : '';

        if (!title) {
            console.warn(`Skipping Project Entry ${index + 1} due to missing fields.`);
            return;
        }

        console.log(`Project Entry ${index + 1}:`, { title, description });

        resumeHTML += `
            <div class="project-entry">
                <h3 style="font-size: 16px;">${title}</h3>
                <ul>${descriptionList}</ul>
            </div>
        `;
    });

    resumeHTML += `
        </div>
        <div class="resume-section">
            <h2 style="font-size: 16px;">SKILLS & INTERESTS</h2>
            <hr>
            <p style="font-size: 16px;"><strong>Skills:</strong> ${skills}</p>
            <p style="font-size: 16px;"><strong>Interests:</strong> ${interests}</p>
        </div>
    `;

    console.log('Generated Resume HTML:', resumeHTML);

    preview.innerHTML = resumeHTML;
    document.getElementById('resume-form-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('saved-resume').style.display = 'block';
    document.getElementById('download-pdf').style.display = 'block'; // Ensure the PDF button is visible
}

function showSavedResume() {
    document.getElementById('resume-form-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('saved-resume').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const preview = document.getElementById('resume-preview');
    console.log('Generating PDF');
    html2canvas(preview).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('resume.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}
