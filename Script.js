// Portfolio Data
let portfolioData = {
    personal: {
        name: "Shaik Rasool",
        title: "B.Tech Student & Aspiring Full Stack Developer",
        email: "rasoolshaik1520@gmail.com",
        phone: "+91 9121901520",
        linkedin: "https://www.linkedin.com/in/shaik-rasool-935112372",
        github: "https://github.com/Rasoolshaik1520",
        college: "Vel Tech Rangarajan Dr Shagunthala R&D Institute of Science and Technology",
        year: "Second Year B.Tech",
        bio: "Passionate second-year B.Tech student with a strong interest in full stack web development and software engineering. Currently building expertise in modern web technologies and looking forward to contributing to innovative projects.",
        skills: [
            "JavaScript", "React", "Node.js", "Python", "HTML/CSS", 
            "MongoDB", "Express.js", "Git", "Linux", "Problem Solving"
        ]
    },
    projects: [
        {
            id: 1,
            title: "E-Commerce Website",
            description: "Full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            githubUrl: "https://github.com/Rasoolshaik1520",
            liveUrl: "",
            image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "React-based task management application with drag-and-drop functionality and local storage.",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            githubUrl: "https://github.com/Rasoolshaik1520",
            liveUrl: "",
            image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Real-time weather application with location-based forecasts and interactive charts.",
            technologies: ["JavaScript", "API Integration", "Chart.js"],
            githubUrl: "https://github.com/Rasoolshaik1520",
            liveUrl: "",
            image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ]
};

// Authentication
let isLoggedIn = false;
const ADMIN_EMAIL = "rasoolshaik1520@gmail.com";
const ADMIN_PASSWORD = "Rasool1520";

// DOM Elements
const adminBtn = document.getElementById('admin-btn');
const editBtn = document.getElementById('edit-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const editModal = document.getElementById('edit-modal');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    renderPortfolio();
    setupEventListeners();
});

// Load data from localStorage
function loadPortfolioData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
}

// Save data to localStorage
function savePortfolioData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Render portfolio content
function renderPortfolio() {
    renderPersonalInfo();
    renderProjects();
    renderSkills();
}

// Render personal information
function renderPersonalInfo() {
    const { personal } = portfolioData;
    
    // Update hero section
    document.getElementById('hero-initials').textContent = 
        personal.name.split(' ').map(n => n[0]).join('');
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-title').textContent = personal.title;
    document.getElementById('hero-subtitle').textContent = 
        `${personal.year} • ${personal.college}`;
    
    // Update about section
    document.getElementById('about-bio').textContent = personal.bio;
    
    // Update footer
    document.getElementById('footer-name').textContent = personal.name;
}

// Render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    portfolioData.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const technologiesHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const liveUrlHTML = project.liveUrl ? 
        `<a href="${project.liveUrl}" target="_blank" class="project-link live">
            <i class="fas fa-external-link-alt"></i>
            <span>Live Demo</span>
        </a>` : '';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${technologiesHTML}
            </div>
            <div class="project-links">
                <a href="${project.githubUrl}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i>
                    <span>Code</span>
                </a>
                ${liveUrlHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Render skills
function renderSkills() {
    const { skills } = portfolioData.personal;
    
    const frontendSkills = skills.filter(skill => 
        ['JavaScript', 'React', 'HTML/CSS', 'TypeScript'].includes(skill)
    );
    const backendSkills = skills.filter(skill => 
        ['Node.js', 'Python', 'MongoDB', 'Express.js'].includes(skill)
    );
    const toolsSkills = skills.filter(skill => 
        ['Git', 'Linux', 'Problem Solving'].includes(skill)
    );
    
    document.getElementById('frontend-skills').innerHTML = 
        frontendSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    document.getElementById('backend-skills').innerHTML = 
        backendSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    document.getElementById('tools-skills').innerHTML = 
        toolsSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Admin buttons
    adminBtn.addEventListener('click', () => showLoginModal());
    editBtn.addEventListener('click', () => showEditModal());
    logoutBtn.addEventListener('click', () => logout());
    
    // Modal close buttons
    document.getElementById('login-close').addEventListener('click', () => hideLoginModal());
    document.getElementById('edit-close').addEventListener('click', () => hideEditModal());
    
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Edit modal tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Edit modal buttons
    document.getElementById('edit-cancel').addEventListener('click', () => hideEditModal());
    document.getElementById('save-changes').addEventListener('click', () => saveChanges());
    
    // Dynamic form buttons
    document.getElementById('add-skill').addEventListener('click', () => addSkillInput());
    document.getElementById('add-project').addEventListener('click', () => addProjectForm());
    
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) hideLoginModal();
        if (e.target === editModal) hideEditModal();
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Authentication functions
function showLoginModal() {
    loginModal.classList.add('active');
    document.getElementById('login-email').focus();
}

function hideLoginModal() {
    loginModal.classList.remove('active');
    loginForm.reset();
    hideLoginError();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        updateAuthUI();
        hideLoginModal();
        showSuccessMessage('Login successful!');
    } else {
        showLoginError('Invalid credentials. Please try again.');
    }
}

function logout() {
    isLoggedIn = false;
    updateAuthUI();
    showSuccessMessage('Logged out successfully!');
}

function updateAuthUI() {
    if (isLoggedIn) {
        adminBtn.classList.add('hidden');
        editBtn.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        adminBtn.classList.remove('hidden');
        editBtn.classList.add('hidden');
        logoutBtn.classList.add('hidden');
    }
}

function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}

function hideLoginError() {
    loginError.classList.remove('show');
}

// Edit modal functions
function showEditModal() {
    if (!isLoggedIn) return;
    
    editModal.classList.add('active');
    populateEditForm();
}

function hideEditModal() {
    editModal.classList.remove('active');
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function populateEditForm() {
    const { personal } = portfolioData;
    
    // Populate personal info
    document.getElementById('edit-name').value = personal.name;
    document.getElementById('edit-title').value = personal.title;
    document.getElementById('edit-email').value = personal.email;
    document.getElementById('edit-phone').value = personal.phone;
    document.getElementById('edit-bio').value = personal.bio;
    
    // Populate skills
    renderSkillsForm();
    
    // Populate projects
    renderProjectsForm();
}

function renderSkillsForm() {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    
    portfolioData.personal.skills.forEach((skill, index) => {
        const skillGroup = createSkillInput(skill, index);
        skillsContainer.appendChild(skillGroup);
    });
}

function createSkillInput(skill, index) {
    const div = document.createElement('div');
    div.className = 'skill-input-group';
    div.innerHTML = `
        <input type="text" value="${skill}" data-skill-index="${index}">
        <button type="button" class="remove-btn" onclick="removeSkillInput(${index})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    return div;
}

function addSkillInput() {
    const skillsContainer = document.getElementById('skills-container');
    const index = portfolioData.personal.skills.length;
    portfolioData.personal.skills.push('');
    
    const skillGroup = createSkillInput('', index);
    skillsContainer.appendChild(skillGroup);
}

function removeSkillInput(index) {
    portfolioData.personal.skills.splice(index, 1);
    renderSkillsForm();
}

function renderProjectsForm() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const projectForm = createProjectForm(project, index);
        projectsContainer.appendChild(projectForm);
    });
}

function createProjectForm(project, index) {
    const div = document.createElement('div');
    div.className = 'project-edit-card';
    
    const technologiesHTML = project.technologies.map((tech, techIndex) => `
        <div class="tech-input-group">
            <input type="text" value="${tech}" data-project-index="${index}" data-tech-index="${techIndex}">
            <button type="button" class="remove-btn" onclick="removeTechnology(${index}, ${techIndex})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    div.innerHTML = `
        <div class="project-edit-header">
            <h4>Project ${project.id}</h4>
            <button type="button" class="remove-btn" onclick="removeProject(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Title</label>
                <input type="text" value="${project.title}" data-project-index="${index}" data-field="title">
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" value="${project.image}" data-project-index="${index}" data-field="image">
            </div>
        </div>
        
        <div class="form-group">
            <label>Description</label>
            <textarea rows="2" data-project-index="${index}" data-field="description">${project.description}</textarea>
        </div>
        
        <div class="form-group">
            <div class="form-group-header">
                <label>Technologies</label>
                <button type="button" class="btn-small" onclick="addTechnology(${index})">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
            <div id="technologies-${index}">
                ${technologiesHTML}
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>GitHub URL</label>
                <input type="text" value="${project.githubUrl}" data-project-index="${index}" data-field="githubUrl">
            </div>
            <div class="form-group">
                <label>Live URL</label>
                <input type="text" value="${project.liveUrl}" data-project-index="${index}" data-field="liveUrl">
            </div>
        </div>
    `;
    
    return div;
}

function addProjectForm() {
    const maxId = Math.max(...portfolioData.projects.map(p => p.id), 0);
    const newProject = {
        id: maxId + 1,
        title: 'New Project',
        description: 'Project description',
        technologies: ['Technology'],
        githubUrl: 'https://github.com/Rasoolshaik1520',
        liveUrl: '',
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    
    portfolioData.projects.push(newProject);
    renderProjectsForm();
}

function removeProject(index) {
    portfolioData.projects.splice(index, 1);
    renderProjectsForm();
}

function addTechnology(projectIndex) {
    portfolioData.projects[projectIndex].technologies.push('');
    renderProjectsForm();
}

function removeTechnology(projectIndex, techIndex) {
    portfolioData.projects[projectIndex].technologies.splice(techIndex, 1);
    renderProjectsForm();
}

function saveChanges() {
    // Save personal info
    portfolioData.personal.name = document.getElementById('edit-name').value;
    portfolioData.personal.title = document.getElementById('edit-title').value;
    portfolioData.personal.email = document.getElementById('edit-email').value;
    portfolioData.personal.phone = document.getElementById('edit-phone').value;
    portfolioData.personal.bio = document.getElementById('edit-bio').value;
    
    // Save skills
    const skillInputs = document.querySelectorAll('[data-skill-index]');
    portfolioData.personal.skills = Array.from(skillInputs).map(input => input.value).filter(skill => skill.trim());
    
    // Save projects
    const projectInputs = document.querySelectorAll('[data-project-index]');
    projectInputs.forEach(input => {
        const projectIndex = parseInt(input.getAttribute('data-project-index'));
        const field = input.getAttribute('data-field');
        const techIndex = input.getAttribute('data-tech-index');
        
        if (field) {
            portfolioData.projects[projectIndex][field] = input.value;
        } else if (techIndex !== null) {
            const techIdx = parseInt(techIndex);
            portfolioData.projects[projectIndex].technologies[techIdx] = input.value;
        }
    });
    
    // Filter out empty technologies
    portfolioData.projects.forEach(project => {
        project.technologies = project.technologies.filter(tech => tech.trim());
    });
    
    // Save to localStorage and update UI
    savePortfolioData();
    renderPortfolio();
    hideEditModal();
    showSuccessMessage('Changes saved successfully!');
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to a server
    console.log('Contact form data:', data);
    
    showSuccessMessage('Message sent successfully! I\'ll get back to you soon.');
    e.target.reset();
}

// Utility functions
function showSuccessMessage(message) {
    // Create and show a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #059669;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Add CSS for success message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            trans
