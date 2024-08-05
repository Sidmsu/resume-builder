# Online Resume Builder

Welcome to the Online Resume Builder! This project allows users to create a professional resume quickly and easily through a user-friendly interface. Users can input their personal information, educational background, work experience, leadership experience, projects, and skills, and the tool will generate a well-formatted resume that can be downloaded as a PDF.

## Features

- **User-Friendly Interface:** Simple and intuitive design.
- **Dynamic Form Fields:** Add and remove sections for education, work experience, leadership experience, and projects.
- **Live Preview:** Real-time preview of the resume as you fill out the form.
- **Download as PDF:** Save your resume as a PDF file.
- **Chatbot Support:** Integrated chatbot for real-time assistance and tips.

## Technologies Used

- **HTML5:** For structuring the web page.
- **CSS3:** For styling the web page.
- **JavaScript:** For handling dynamic form interactions, generating the live preview, and downloading the PDF.
- **OpenAI API:** For the chatbot functionality.
- **jsPDF and html2canvas:** For converting the resume preview to a PDF.

## Getting Started

### Prerequisites

To run this project, you need a modern web browser and a text editor. No additional software or server setup is required.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/online-resume-builder.git
    ```
2. Navigate to the project directory:
    ```sh
    cd online-resume-builder
    ```

### Usage

1. Open `index.html` in your web browser to start using the resume builder.
2. Fill out the form with your personal information, education, work experience, leadership experience, projects, and skills.
3. Use the buttons to add or remove sections as needed.
4. Preview your resume in real-time.
5. Click the "Download as PDF" button to save your resume.
6. Use the chatbot for assistance by clicking the chat icon at the bottom right corner of the page.

## Project Structure

- `index.html`: The main HTML file that contains the structure of the webpage.
- `style.css`: The CSS file that styles the webpage.
- `script.js`: The JavaScript file that handles form interactions, live preview generation, PDF downloading, and chatbot functionality.
- `README.md`: This file.

## Code Explanation

### HTML (`index.html`)

The HTML file structures the webpage with sections for personal information, education, work experience, leadership experience, and projects. Each section is enclosed in fieldsets for organization. There are buttons to add and remove entries dynamically. The chatbot container is also included in this file.

### CSS (`style.css`)

The CSS file handles the styling of the webpage. It includes styles for the layout, colors, fonts, and spacing to ensure a clean and professional look. It also includes styles for the chatbot interface and hover effects for better user experience.

### JavaScript (`script.js`)

The JavaScript file handles the dynamic aspects of the resume builder. Key functionalities include:
- Adding and removing sections dynamically.
- Generating a live preview of the resume as the form is filled out.
- Converting the resume preview to a PDF using `jsPDF` and `html2canvas`.
- Implementing the chatbot functionality using the OpenAI API.


## Chatbot Configuration

To enable the chatbot functionality, you need an API key from OpenAI. Update the `script.js` file with your API key in the `sendMessage` function:

```javascript
'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
```

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any bugs, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [OpenAI](https://openai.com/) for the API.
- [jsPDF](https://github.com/MrRio/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/) for the PDF generation libraries.
- All contributors and users who help improve this project.

