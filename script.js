    <script>
        // Dark Mode Toggle
        const darkModeToggle = document.getElementById("darkModeToggle")
        const body = document.body

        // Check for saved dark mode preference, default to dark mode
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "light") {
            body.classList.remove("dark-mode")
        } else {
            // Default to dark mode
            body.classList.add("dark-mode")
            localStorage.setItem("theme", "dark")
        }

        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode")

            // Save preference
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark")
            } else {
                localStorage.setItem("theme", "light")
            }
        })

        // Hamburger Menu Toggle
        const hamburger = document.getElementById("hamburger")
        const mobileMenu = document.getElementById("mobileMenu")
        const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
        const mobileMenuClose = document.getElementById("mobileMenuClose")
        const mobileCartBadge = document.getElementById("mobileCartBadge")

        function openMobileMenu() {
            hamburger.classList.add("active")
            mobileMenu.classList.add("active")
            mobileMenuOverlay.classList.add("active")
            document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
        }

        function closeMobileMenu() {
            hamburger.classList.remove("active")
            mobileMenu.classList.remove("active")
            mobileMenuOverlay.classList.remove("active")
            document.body.style.overflow = "" // Restore scrolling
        }

        hamburger.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) {
                closeMobileMenu()
            } else {
                openMobileMenu()
            }
        })

        mobileMenuClose.addEventListener("click", closeMobileMenu)
        mobileMenuOverlay.addEventListener("click", closeMobileMenu)

        // Close mobile menu when clicking on a link
        document.querySelectorAll(".mobile-menu nav a").forEach(link => {
            link.addEventListener("click", () => {
                closeMobileMenu()
            })
        })

        // Add to Cart Functionality (Placeholder - now primarily for badges)
        const addToCartBtns = document.querySelectorAll(".add-to-cart") // Still targeting for badge update logic
        const cartBadge = document.getElementById("cartBadge")
        let cartCount = 0 // Initialize cart count

        // Initial badge update from localStorage if available (optional)
        const savedCartCount = localStorage.getItem("cartCount");
        if (savedCartCount) {
            cartCount = parseInt(savedCartCount, 10);
            updateCartBadges(cartCount);
        }

        function updateCartBadges(count) {
            cartBadge.textContent = count
            mobileCartBadge.textContent = count
            localStorage.setItem("cartCount", count.toString()); // Save count
        }

        // The main "add to cart" logic is replaced by enrollment form behavior now.
        // This section keeps the badge update logic and potentially could be used for
        // a separate "add to cart" if needed in the future.
        // For now, it's largely a placeholder for badge updates.

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll("nav a, .mobile-nav a").forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault()
                const targetId = this.getAttribute("href")
                if (targetId.startsWith("#")) {
                    const targetSection = document.querySelector(targetId)
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }
                }
            })
        })

        // Scroll Animation for Feature Cards
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "fadeInUp 0.6s ease-out forwards"
                }
            })
        }, observerOptions)

        document.querySelectorAll(".feature-card, .testimonial-card").forEach((card) => {
            observer.observe(card)
        })

        // Newsletter Form Submission
        const newsletterForm = document.getElementById("newsletterForm")
        if (newsletterForm) { // Check if the element exists
            newsletterForm.addEventListener("submit", (e) => {
                e.preventDefault()
                const emailInput = newsletterForm.querySelector(".newsletter-input")
                const submitBtn = newsletterForm.querySelector(".newsletter-btn")
                
                // Show success message
                const originalBtnText = submitBtn.textContent
                submitBtn.textContent = "✓ Subscribed!"
                submitBtn.style.backgroundColor = "#4caf50"
                
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText
                    submitBtn.style.backgroundColor = ""
                    emailInput.value = ""
                }, 2000)
            })
        }

        // Dashboard Navigation
        const dashboardSection = document.getElementById('dashboardSection');
        const allSections = document.querySelectorAll('section'); // Select all sections
        const ebookSection = document.getElementById('ebookSection'); // Get the E-Book section
        
        // Handle navigation clicks for the dashboard link
        document.querySelectorAll('a[href="#dashboard"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Hide all other sections
                allSections.forEach(section => {
                    if (section.id !== 'dashboardSection' && section.id !== 'ebookSection') {
                         section.style.display = 'none';
                    } else if (section.id === 'ebookSection') {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    }
                });
                // Show dashboard
                dashboardSection.classList.add('active');
                dashboardSection.style.display = 'block';
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Handle navigation clicks for the home link
        document.querySelectorAll('a[href="#home"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Show all other sections
                allSections.forEach(section => {
                    if (section.id !== 'dashboardSection' && section.id !== 'ebookSection') {
                         section.style.display = 'block';
                    } else if (section.id === 'dashboardSection') {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    } else if (section.id === 'ebookSection') {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    }
                });
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // E-Book Section Navigation
        // Handle navigation clicks for the E-Book link
        document.querySelectorAll('a[href="#ebook"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('[v0] E-Book/Quiz link clicked');
                
                // Hide all other sections
                allSections.forEach(section => {
                     // Check if section is not dashboard or ebook section before hiding
                    if (section.id !== 'dashboardSection') {
                         section.style.display = 'none';
                    }
                });
                // Hide dashboard
                dashboardSection.classList.remove('active');
                dashboardSection.style.display = 'none';
                
                // Show E-Book/Quiz section with smooth transition
                ebookSection.classList.add('active');
                ebookSection.style.display = 'block';
                console.log('[v0] Quiz section should now be visible');
                console.log('[v0] Quiz section classes:', ebookSection.className);
                console.log('[v0] Quiz section display:', window.getComputedStyle(ebookSection).display);
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Update other navigation links to hide E-Book section
        document.querySelectorAll('a:not([href="#ebook"]):not([href="#dashboard"]):not([href="#home"])').forEach(link => {
            link.addEventListener('click', (e) => {
                // Hide E-book section if it was active
                if (ebookSection.classList.contains('active')) {
                    ebookSection.classList.remove('active');
                    ebookSection.style.display = 'none';
                }
                // Show all other sections
                allSections.forEach(section => {
                    if (section.id !== 'ebookSection' && section.id !== 'dashboardSection') {
                        section.style.display = 'block';
                    } else if (section.id === 'dashboardSection') {
                        section.classList.remove('active');
                        section.style.display = 'none';
                    }
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to the target section
                const targetId = this.getAttribute("href");
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        });


        // Venn Diagram Tooltip Functionality
        const vennCircles = document.querySelectorAll('.venn-circle');
        const vennTooltip = document.getElementById('vennTooltip');

        const skillData = {
            technical: {
                name: 'Technical Skills',
                percentage: '45%',
                courses: ['Web Dev', 'Python', 'Data Science', 'Cybersecurity'],
                description: 'Strong foundation in programming and technical concepts'
            },
            creative: {
                name: 'Creative Skills',
                percentage: '30%',
                courses: ['Digital Marketing', 'Music Promotion', 'AI Prompting'],
                description: 'Creative thinking and content creation abilities'
            },
            business: {
                name: 'Business Skills',
                percentage: '25%',
                courses: ['Social Media Management', 'Influencer Marketing'],
                description: 'Business strategy and marketing expertise'
            }
        };

        vennCircles.forEach(circle => {
            circle.addEventListener('mouseenter', function(e) {
                const skill = this.getAttribute('data-skill');
                const data = skillData[skill];
                
                vennTooltip.innerHTML = `
                    <strong>${data.name}</strong><br>
                    ${data.percentage} of total skills<br>
                    <small>${data.description}</small>
                `;
                vennTooltip.classList.add('active');
            });

            circle.addEventListener('mousemove', function(e) {
                const rect = e.target.getBoundingClientRect();
                vennTooltip.style.left = e.clientX + 15 + 'px';
                vennTooltip.style.top = e.clientY + 15 + 'px';
            });

            circle.addEventListener('mouseleave', function() {
                vennTooltip.classList.remove('active');
            });
        });

        const enrollBtns = document.querySelectorAll(".enroll-btn")
        const cancelBtns = document.querySelectorAll(".cancel-btn")
        const enrollmentForms = document.querySelectorAll(".enrollment-form")

        // Handle Enroll Now button clicks
        enrollBtns.forEach((btn, index) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                const wrapper = btn.closest(".course-card-wrapper")
                const formContainer = wrapper.querySelector(".enrollment-form-container")
                
                // Close all other forms that are active
                document.querySelectorAll(".enrollment-form-container.active").forEach(activeFormContainer => {
                    if (activeFormContainer !== formContainer) {
                        activeFormContainer.classList.remove("active")
                    }
                })
                
                // Toggle current form
                formContainer.classList.toggle("active")
                
                // Scroll to form if opening
                if (formContainer.classList.contains("active")) {
                    setTimeout(() => {
                        // Scroll to the top of the opened form container
                        formContainer.scrollIntoView({ behavior: "smooth", block: "start" })
                    }, 100) // Small delay to ensure form is visible before scrolling
                }
            })
        })

        // Handle Cancel button clicks
        cancelBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const formContainer = btn.closest(".enrollment-form-container")
                formContainer.classList.remove("active")
            })
        })

        // Handle form submissions
        enrollmentForms.forEach(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                
                // Get form inputs
                const fullnameInput = form.querySelector('input[name="fullname"]')
                const emailInput = form.querySelector('input[name="email"]')
                const phoneInput = form.querySelector('input[name="phone"]')
                
                // Reset error messages for all inputs within this form
                form.querySelectorAll(".error-message").forEach(msg => {
                    msg.style.display = "none"
                })
                
                let isValid = true
                
                // Validate Full Name
                if (!fullnameInput.value.trim()) {
                    fullnameInput.nextElementSibling.style.display = "block"
                    isValid = false
                }
                
                // Validate Email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                    emailInput.nextElementSibling.style.display = "block"
                    isValid = false
                }
                
                // Validate Phone
                if (!phoneInput.value.trim()) {
                    phoneInput.nextElementSibling.style.display = "block"
                    isValid = false
                }
                
                // If validation passes, open WhatsApp
                if (isValid) {
                    // Find the closest course card wrapper to get the course name
                    const courseCardWrapper = form.closest(".course-card-wrapper")
                    const courseName = courseCardWrapper ? courseCardWrapper.querySelector("h3").textContent : "a course";
                    
                    const message = `Hello, I'm interested in enrolling in ${courseName}. My name is ${fullnameInput.value} and my email is ${emailInput.value}.`
                    const whatsappBaseURL = `https://wa.me/+233532097722` // Corrected phone number based on form input
                    const whatsappURL = `${whatsappBaseURL}?text=${encodeURIComponent(message)}`
                    
                    // Open WhatsApp in a new tab
                    window.open(whatsappURL, "_blank")
                    
                    // Reset form and close the container
                    form.reset()
                    // Reset phone number to default if it was modified and needs to be reset
                    phoneInput.value = "+233532097722" 
                    form.closest(".enrollment-form-container").classList.remove("active")
                }
            })
        })

        // Smooth scroll for all anchor links (including footer links)
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Skip if it's just "#" or points to the current page without a fragment
                    if (targetId === '#' || targetId === window.location.pathname + window.location.search) return;
                    
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        const mobileMenu = document.getElementById('mobileMenu');
                        if (mobileMenu && mobileMenu.classList.contains('active')) {
                            mobileMenu.classList.remove('active');
                            document.body.style.overflow = ""; // Restore scrolling
                        }
                        
                        // Smooth scroll to target
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Contact form submission handler
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('contact-name').value;
                    const email = document.getElementById('contact-email').value;
                    const subject = document.getElementById('contact-subject').value;
                    const message = document.getElementById('contact-message').value;
                    
                    // Create WhatsApp message
                    const whatsappMessage = `Hello! I'm ${name}.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}`;
                    const whatsappUrl = `https://wa.me/233532097722?text=${encodeURIComponent(whatsappMessage)}`;
                    
                    // Open WhatsApp
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset form
                    contactForm.reset();
                    alert('Thank you! We will redirect you to WhatsApp to continue the conversation.');
                });
            }

            // Add highlight effect when navigating to a course from footer
            document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement && targetElement.classList.contains('course-card-wrapper')) {
                        // Remove highlight from all courses
                        document.querySelectorAll('.course-card-wrapper').forEach(card => {
                            card.classList.remove('highlight');
                        });
                        
                        // Add highlight to target course after scroll
                        setTimeout(() => {
                            targetElement.classList.add('highlight');
                            
                            // Remove highlight after animation
                            setTimeout(() => {
                                targetElement.classList.remove('highlight');
                            }, 1000);
                        }, 500);
                    }
                });
            });

            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close other open items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
        });

        // Quiz Functionality
        const quizAnswers = {
            q1: 'a',  // HTML = Hyper Text Markup Language
            q2: 'false',  // JavaScript and Java are NOT the same
            q3: 'b',  // CSS is used to style web pages
            q4: 'true',  // CSS = Cascading Style Sheets
            q5: 'a',  // // is used for single-line comments in JavaScript
            q6: 'false',  // Python is interpreted, not compiled
            q7: 'a',  // SQL = Structured Query Language
            q8: 'true',  // Variables can store different types of data
            q9: 'b',  // HTML is a markup language, not a programming language
            q10: 'true',  // Arrays can store multiple values
            q11: 'true',  // Functions allow code reuse and organization
            q12: 'true',  // Loops execute code repeatedly
            q13: 'true',  // DOM represents HTML as a tree structure
            q14: 'true',  // Git is a version control system
            q15: 'true',  // APIs allow software communication
            q16: 'true',  // OOP uses classes and objects
            q17: 'true',  // Database is organized data collection
            q18: 'true',  // Debugging is identifying and fixing errors
            q19: 'true',  // Responsive design works on all devices
            q20: 'true'   // Recursion is a function calling itself
        };

        const quizQuestions = {
            q1: 'What does HTML stand for?',
            q2: 'JavaScript and Java are the same programming language.',
            q3: 'Which of the following is used to style web pages?',
            q4: 'CSS stands for Cascading Style Sheets.',
            q5: 'Which symbol is used for single-line comments in JavaScript?',
            q6: 'Python is a compiled programming language.',
            q7: 'What does SQL stand for?',
            q8: 'A variable in programming can store different types of data.',
            q9: 'Which of these is NOT a programming language?',
            q10: 'An array can store multiple values in a single variable.',
            q11: 'Functions in programming allow you to reuse code and make it more organized.',
            q12: 'A loop in programming is used to execute a block of code repeatedly.',
            q13: 'The DOM (Document Object Model) represents the structure of an HTML document as a tree.',
            q14: 'Git is a version control system used to track changes in code over time.',
            q15: 'An API (Application Programming Interface) allows different software applications to communicate with each other.',
            q16: 'Object-Oriented Programming (OOP) uses classes and objects to organize code.',
            q17: 'A database is a collection of organized data that can be efficiently stored, retrieved, and managed.',
            q18: 'Debugging is the process of identifying and fixing errors in code.',
            q19: 'Responsive web design ensures that websites look good on all device sizes including mobile, tablet, and desktop.',
            q20: 'Recursion is a programming technique where a function calls itself to solve a problem by breaking it into smaller subproblems.'
        };

        const correctAnswerText = {
            q1: 'Hyper Text Markup Language',
            q2: 'False',
            q3: 'CSS',
            q4: 'True',
            q5: '//',
            q6: 'False',
            q7: 'Structured Query Language',
            q8: 'True',
            q9: 'HTML',
            q10: 'True',
            q11: 'True',
            q12: 'True',
            q13: 'True',
            q14: 'True',
            q15: 'True',
            q16: 'True',
            q17: 'True',
            q18: 'True',
            q19: 'True',
            q20: 'True'
        };

        document.getElementById('submitQuiz').addEventListener('click', function() {
            let score = 0;
            let totalQuestions = Object.keys(quizAnswers).length;
            let results = [];

            // Check each answer
            for (let question in quizAnswers) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                const userAnswer = selectedAnswer ? selectedAnswer.value : null;
                const userAnswerText = selectedAnswer ? selectedAnswer.nextElementSibling.textContent : 'Not answered';
                const isCorrect = selectedAnswer && selectedAnswer.value === quizAnswers[question];
                
                if (isCorrect) {
                    score++;
                }

                results.push({
                    question: quizQuestions[question],
                    correct: isCorrect,
                    userAnswer: userAnswerText,
                    correctAnswer: correctAnswerText[question],
                    answered: selectedAnswer !== null
                });
            }

            // Calculate percentage
            const percentage = Math.round((score / totalQuestions) * 100);

            // Hide quiz, show results
            document.getElementById('quizContainer').style.display = 'none';
            document.getElementById('quizResults').style.display = 'block';

            // Display score
            document.getElementById('scoreNumber').textContent = score;
            document.getElementById('scorePercentage').textContent = percentage + '%';

            // Display message based on score
            let message = '';
            if (percentage >= 90) {
                message = 'Outstanding! You have excellent coding knowledge!';
            } else if (percentage >= 70) {
                message = 'Great job! You have a solid understanding of coding basics!';
            } else if (percentage >= 50) {
                message = 'Good effort! Keep learning and practicing!';
            } else {
                message = 'Keep studying! Review the basics and try again!';
            }
            document.getElementById('resultsMessage').textContent = message;

            // Display breakdown with question text, user answer, and correct answer
            const breakdownHTML = results.map((result, index) => `
                <div class="result-item ${result.correct ? 'correct' : 'incorrect'}">
                    <div class="result-icon">${result.correct ? '✓' : '✗'}</div>
                    <div class="result-text">
                        <div class="result-question"><strong>Question ${index + 1}:</strong> ${result.question}</div>
                        <div class="result-answer">
                            <div><strong>Your answer:</strong> ${result.userAnswer}</div>
                            <div><strong>Correct answer:</strong> ${result.correctAnswer}</div>
                        </div>
                    </div>
                </div>
            `).join('');

            document.getElementById('resultsBreakdown').innerHTML = breakdownHTML;

            // Scroll to top of results
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Retake quiz functionality
        document.getElementById('retakeQuiz').addEventListener('click', function() {
            // Reset all radio buttons
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });

            // Hide results, show quiz
            document.getElementById('quizResults').style.display = 'none';
            document.getElementById('quizContainer').style.display = 'block';

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });


        // Blog Expansion Functionality
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const postId = this.getAttribute('data-post-id');
                const blogCard = document.getElementById(postId);
                const fullText = blogCard.querySelector('.blog-full-text');
                const isExpanded = fullText.style.display !== 'none';
                
                if (isExpanded) {
                    // Collapse
                    fullText.style.maxHeight = '0';
                    fullText.style.display = 'none';
                    this.textContent = 'Read More →';
                    this.classList.remove('expanded');
                } else {
                    // Expand
                    fullText.style.display = 'block';
                    fullText.style.maxHeight = fullText.scrollHeight + 'px';
                    this.textContent = 'Read Less ←';
                    this.classList.add('expanded');
                    
                    // Smooth scroll to the expanded content
                    setTimeout(() => {
                        fullText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            });
        });

    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

            learnMoreButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);

                    if (targetContent) {
                        const isExpanded = targetContent.classList.contains('active');

                        if (isExpanded) {
                            // Collapse
                            targetContent.style.maxHeight = targetContent.scrollHeight + 'px'; // Set current height before transition
                            setTimeout(() => {
                                targetContent.style.maxHeight = '0';
                                targetContent.classList.remove('active');
                            }, 10); // Small delay to ensure height is set
                            
                            this.classList.remove('expanded');
                            this.innerHTML = 'LEARN MORE →';
                        } else {
                            // Expand
                            targetContent.classList.add('active');
                            targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
                            this.classList.add('expanded');
                            this.innerHTML = 'SHOW LESS ↑';
                            
                            // After transition, set max-height to a safe large value
                            targetContent.addEventListener('transitionend', function handler() {
                                if (targetContent.classList.contains('active')) {
                                    targetContent.style.maxHeight = '500px'; // Set to a safe large value
                                }
                                targetContent.removeEventListener('transitionend', handler);
                            });
                        }
                    }
                });
            });
        });
    </script>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            const getStartedBtn = document.getElementById('getStartedBtn');
            const getStartedContent = document.getElementById('getStartedContent');

            if (getStartedBtn && getStartedContent) {
                getStartedBtn.addEventListener('click', () => {
                    getStartedContent.classList.toggle('active');
                    // Optional: Change button text/icon when expanded
                    if (getStartedContent.classList.contains('active')) {
                        getStartedBtn.textContent = 'HIDE OPTIONS';
                    } else {
                        getStartedBtn.textContent = 'GET STARTED';
                    }
                });
            }
        });
    </script>

    <!-- Learning Progress Chart Initialization -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('learningProgressChart');
            if (ctx) {
                const isDarkMode = document.body.classList.contains('dark-mode');
                const textColor = isDarkMode ? '#e0e0e0' : '#333333';
                const gridColor = isDarkMode ? '#3a3a3a' : '#e0e0e0';
                const backgroundColor = isDarkMode ? '#2a2a2a' : '#ffffff';

                const learningProgressChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
                        datasets: [
                            {
                                label: 'Course Progress (%)',
                                data: [15, 25, 35, 42, 55, 62, 68, 72, 75, 78, 82, 85],
                                borderColor: '#6b7ff5',
                                backgroundColor: 'rgba(107, 127, 245, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                pointBackgroundColor: '#6b7ff5',
                                pointBorderColor: '#ffffff',
                                pointBorderWidth: 2,
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: '#5a6ee5'
                            },
                            {
                                label: 'Lessons Completed',
                                data: [2, 4, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32],
                                borderColor: '#d4a574',
                                backgroundColor: 'rgba(212, 165, 116, 0.1)',
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 5,
                                pointBackgroundColor: '#d4a574',
                                pointBorderColor: '#ffffff',
                                pointBorderWidth: 2,
                                pointHoverRadius: 7,
                                pointHoverBackgroundColor: '#b8935f',
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    color: textColor,
                                    font: {
                                        size: 13,
                                        weight: '500'
                                    },
                                    padding: 20,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            tooltip: {
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
                                titleColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                                bodyColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                                borderColor: '#6b7ff5',
                                borderWidth: 2,
                                padding: 12,
                                displayColors: true,
                                callbacks: {
                                    title: function(context) {
                                        return context[0].label;
                                    },
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += context.dataset.label.includes('Progress') ? context.parsed.y + '%' : context.parsed.y;
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Progress (%)',
                                    color: textColor,
                                    font: {
                                        size: 12,
                                        weight: '500'
                                    }
                                },
                                ticks: {
                                    color: textColor,
                                    font: {
                                        size: 11
                                    },
                                    callback: function(value) {
                                        return value + '%';
                                    }
                                },
                                grid: {
                                    color: gridColor,
                                    drawBorder: false
                                }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Lessons Completed',
                                    color: textColor,
                                    font: {
                                        size: 12,
                                        weight: '500'
                                    }
                                },
                                ticks: {
                                    color: textColor,
                                    font: {
                                        size: 11
                                    }
                                },
                                grid: {
                                    drawOnChartArea: false
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Timeline',
                                    color: textColor,
                                    font: {
                                        size: 12,
                                        weight: '500'
                                    }
                                },
                                ticks: {
                                    color: textColor,
                                    font: {
                                        size: 11
                                    }
                                },
                                grid: {
                                    color: gridColor,
                                    drawBorder: false
                                }
                            }
                        }
                    }
                });

                // Update chart colors when dark mode is toggled
                const darkModeToggle = document.getElementById('darkModeToggle');
                if (darkModeToggle) {
                    darkModeToggle.addEventListener('click', function() {
                        setTimeout(() => {
                            const isDark = document.body.classList.contains('dark-mode');
                            const newTextColor = isDark ? '#e0e0e0' : '#333333';
                            const newGridColor = isDark ? '#3a3a3a' : '#e0e0e0';
                            const newBgColor = isDark ? '#2a2a2a' : '#ffffff';

                            learningProgressChart.options.plugins.legend.labels.color = newTextColor;
                            learningProgressChart.options.plugins.tooltip.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)';
                            learningProgressChart.options.plugins.tooltip.titleColor = isDark ? '#1a1a1a' : '#ffffff';
                            learningProgressChart.options.plugins.tooltip.bodyColor = isDark ? '#1a1a1a' : '#ffffff';
                            learningProgressChart.options.scales.y.title.color = newTextColor;
                            learningProgressChart.options.scales.y.ticks.color = newTextColor;
                            learningProgressChart.options.scales.y1.title.color = newTextColor;
                            learningProgressChart.options.scales.y1.ticks.color = newTextColor;
                            learningProgressChart.options.scales.x.title.color = newTextColor;
                            learningProgressChart.options.scales.x.ticks.color = newTextColor;
                            learningProgressChart.options.scales.y.grid.color = newGridColor;
                            learningProgressChart.options.scales.x.grid.color = newGridColor;

                            learningProgressChart.update();
                        }, 100);
                    });
                }
            }
        });
    </script>
