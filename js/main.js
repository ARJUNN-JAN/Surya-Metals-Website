// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Load testimonials
    loadTestimonials();
    
    // Load projects
    loadProjects();

    // Tab functionality for projects page
    initializeTabs();
});

// Load testimonials from JSON
async function loadTestimonials() {
    try {
        const response = await fetch('data/testimonials.json');
        const testimonials = await response.json();
        displayTestimonials(testimonials);
    } catch (error) {
        console.log('Testimonials data not found, using default content');
        displayDefaultTestimonials();
    }
}

function displayTestimonials(testimonials) {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-text">"${testimonial.text}"</div>
            <div class="stars">${'★'.repeat(testimonial.rating)}</div>
            <div class="testimonial-author">${testimonial.author}</div>
            <div class="testimonial-project">${testimonial.project}</div>
        </div>
    `).join('');
}

function displayDefaultTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const defaultTestimonials = [
        {
            text: "Surya Metals delivered exceptional quality for our hotel project. Their attention to detail and timely completion exceeded our expectations.",
            author: "Rajesh Kumar",
            project: "Heritage Resort, Kochi",
            rating: 5
        },
        {
            text: "Professional service and top-notch fabrication work. Highly recommend for commercial projects.",
            author: "Priya Menon",
            project: "Tech Park, Infopark",
            rating: 5
        }
    ];
    displayTestimonials(defaultTestimonials);
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        displayProjectsByCategory(projects);
    } catch (error) {
        console.log('Projects data not found, using default content');
        displayDefaultProjects();
    }
}

function displayProjectsByCategory(projects) {
    const categories = ['hotel', 'commercial', 'industrial', 'custom'];
    
    categories.forEach(category => {
        const container = document.getElementById(`${category}-projects`);
        if (!container) return;

        const categoryProjects = projects.filter(project => project.category === category);
        container.innerHTML = categoryProjects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    ${project.image ? `<img src="${project.image}" alt="${project.name}">` : '<i class="fas fa-building fa-3x"></i>'}
                </div>
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p><strong>Location:</strong> ${project.location}</p>
                    <p><strong>Scale:</strong> ${project.scale}</p>
                    <p>${project.description}</p>
                </div>
            </div>
        `).join('');
    });
}

function displayDefaultProjects() {
    const defaultProjects = [
        {
            name: "Luxury Resort Fabrication",
            location: "Munnar, Kerala",
            scale: "5-Star Hotel",
            description: "Complete steel fabrication for premium hospitality project",
            category: "hotel"
        },
        {
            name: "IT Complex Structural Work",
            location: "Infopark, Kochi",
            scale: "200,000 sq ft",
            description: "Modern office complex with innovative steel framework",
            category: "commercial"
        }
    ];
    displayProjectsByCategory(defaultProjects);
}

// Tab functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation for contact form
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}
