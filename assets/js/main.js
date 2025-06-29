// Main JavaScript for E-Learning Platform

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Course Filter Functionality
function filterCourses(category) {
    const courseCards = document.querySelectorAll('.course-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter courses
    courseCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Search Functionality
function searchCourses() {
    const searchInput = document.getElementById('courseSearch');
    const courseCards = document.querySelectorAll('.course-card');
    const searchTerm = searchInput.value.toLowerCase();
    
    courseCards.forEach(card => {
        const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
        const courseDescription = card.querySelector('.course-description').textContent.toLowerCase();
        
        if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Progress Bar Animation
function animateProgress(elementId, targetPercentage) {
    const progressBar = document.getElementById(elementId);
    if (!progressBar) return;
    
    let currentPercentage = 0;
    const increment = targetPercentage / 100;
    
    const timer = setInterval(() => {
        currentPercentage += increment;
        progressBar.style.width = currentPercentage + '%';
        
        if (currentPercentage >= targetPercentage) {
            clearInterval(timer);
            progressBar.style.width = targetPercentage + '%';
        }
    }, 20);
}

// Video Player Controls
function initVideoPlayer() {
    const videoPlayers = document.querySelectorAll('.video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.video-progress');
        
        if (playBtn && video) {
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (video && progressBar) {
            video.addEventListener('timeupdate', () => {
                const progress = (video.currentTime / video.duration) * 100;
                progressBar.style.width = progress + '%';
            });
        }
    });
}

// Dashboard Chart Initialization
function initDashboardCharts() {
    // Progress Chart
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: ['#4cc9f0', '#4361ee', '#e9ecef'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Learning Hours Chart
    const hoursCtx = document.getElementById('hoursChart');
    if (hoursCtx) {
        new Chart(hoursCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Learning Hours',
                    data: [2, 3, 1, 4, 2, 5, 3],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Initialize Swiper Carousels
function initSwipers() {
    // Testimonials Swiper
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
    
    // Featured Courses Swiper
    const coursesSwiper = new Swiper('.courses-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayer();
    initDashboardCharts();
    initSwipers();
    
    // Animate progress bars on dashboard
    if (document.querySelector('.dashboard')) {
        setTimeout(() => {
            animateProgress('htmlProgress', 85);
            animateProgress('cssProgress', 70);
            animateProgress('jsProgress', 60);
        }, 500);
    }
    
    // Initialize password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
});

// FAQ Toggle Function
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content) {
            item.classList.remove('show');
            item.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
            item.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
        }
    });
    
    // Toggle current FAQ item
    content.classList.toggle('show');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(inputId + 'Toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Check Password Strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('passwordStrength');
    
    if (!strengthBar) return;
    
    let strength = 0;
    
    // Check password criteria
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    // Update strength bar
    strengthBar.style.width = (strength * 20) + '%';
    
    if (strength < 3) {
        strengthBar.className = 'password-strength strength-weak';
    } else if (strength < 5) {
        strengthBar.className = 'password-strength strength-medium';
    } else {
        strengthBar.className = 'password-strength strength-strong';
    }
}

// Pagination functionality
function initPagination() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.parentElement.classList.contains('disabled')) {
                return;
            }
            
            // Remove active class from all items
            document.querySelectorAll('.pagination .page-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Simulate page loading
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach(card => {
                card.style.opacity = '0.5';
            });
            
            setTimeout(() => {
                courseCards.forEach(card => {
                    card.style.opacity = '1';
                });
            }, 500);
        });
    });
}

// Initialize pagination when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPagination();
});

// GSAP Animations for Hero Section
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animation timeline
    const heroTl = gsap.timeline();
    heroTl.from('.hero h1', { duration: 1, y: 50, opacity: 0 })
          .from('.hero p', { duration: 1, y: 30, opacity: 0 }, '-=0.5')
          .from('.hero .btn', { duration: 1, y: 20, opacity: 0 }, '-=0.3');
    
    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        gsap.to(stat, {
            textContent: stat.dataset.count,
            duration: 2,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: "top 80%"
            }
        });
    });
}
