// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Initialize ROI Calculator
    initializeROICalculator();
});

// ROI Calculator Functionality
function initializeROICalculator() {
    const inputs = [
        'vehicles-annually',
        'admin-ftes',
        'avg-vehicle-value',
        'annual-interest-rate',
        
    ];
    
    // Add event listeners to all inputs
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateROI);
        }
    });
    
    // Initial calculation
    calculateROI();
}

function calculateROI() {
    // Get input values
    const vehiclesAnnually = parseInt(document.getElementById('vehicles-annually')?.value) || 500;
    const adminFTEs = parseFloat(document.getElementById('admin-ftes')?.value) || 3;
    const avgVehicleValue = parseFloat(document.getElementById('avg-vehicle-value')?.value) || 50000;
    const annualInterestRate = parseFloat(document.getElementById('annual-interest-rate')?.value) || 8; // % per year
    
    // Constants based on Pritchard case study and industry benchmarks
    const avgFTESalary = 65000; // Average FTE salary including benefits
    const hoursPerWeek = 40;
    const weeksPerYear = 52;
    const hoursSavedPerWeek = 8; // Fixed time savings per FTE per week
    const additionalUnitsPerSalesperson = 70; // Additional units per salesperson annually
    const avgProfitMargin = 0.15; // 15% profit margin
    const errorReductionValue = 50000; // Annual value from error reduction
    const processingTimeReduction = 3; // Days saved in processing time
    
    // 1. People Savings Calculation: FTEs * Hourly Rate * 8 hours * 52 weeks
    const hourlyRate = avgFTESalary / (hoursPerWeek * weeksPerYear);
    const peopleSavings = adminFTEs * hourlyRate * hoursSavedPerWeek * weeksPerYear;
    
    // 2. Product Savings Calculation (Interest cost savings)
    // Convert annual interest rate to daily rate approximation (simple division by 365)
    const dailyInterestRate = (annualInterestRate / 100) / 365;
    const dailyInterestCost = (avgVehicleValue * dailyInterestRate);
    const productSavings = processingTimeReduction * dailyInterestCost * vehiclesAnnually;
    
    // 3. Productivity Gains Calculation (removed from simplified view)
    const additionalRevenue = (additionalUnitsPerSalesperson * avgVehicleValue * avgProfitMargin) * adminFTEs;
    const productivityGains = 0;
    
    // Total calculations
    const totalSavings = peopleSavings + productSavings + productivityGains;
    
    // Platform cost estimation (based on pricing tiers)
    let platformCost = 30000; // Base cost
    if (vehiclesAnnually > 1000) {
        platformCost = 60000; // Professional tier
    }
    if (vehiclesAnnually > 2000) {
        platformCost = 120000; // Enterprise tier
    }
    
    // Update the display
    updateROIDisplay(undefined, totalSavings, peopleSavings, productSavings, undefined, undefined);
}

function updateROIDisplay(roi, total, people, product, productivity, systems) {
    // Format numbers for display
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US').format(Math.round(num));
    };
    
    const formatPercentage = (num) => {
        return Math.round(Math.max(0, num));
    };
    
    // ROI percentage removed from simplified view
    
    // Update total savings
    const totalElement = document.getElementById('total-savings');
    if (totalElement) totalElement.textContent = formatCurrency(total);
    
    // Update savings breakdown
    const peopleElement = document.getElementById('people-savings');
    if (peopleElement) peopleElement.textContent = formatCurrency(people);
    
    const productElement = document.getElementById('product-savings');
    if (productElement) productElement.textContent = formatCurrency(product);
    
    // Productivity gains removed from simplified view
    
    // Additional benefits section removed

    // Info tooltips removed per request
}

function generateReport() {
    // Get current values for the report
    const totalSavings = document.getElementById('total-savings')?.textContent || '2,340,000';
    const peopleSavings = document.getElementById('people-savings')?.textContent || '353,210';
    const productSavings = document.getElementById('product-savings')?.textContent || '978,000';
    
    
    // Create a simple report (in a real implementation, this would generate a PDF)
    const reportContent = `
SHAED ROI Calculator Report
==========================

Total Annual Value: $${totalSavings}

Savings Breakdown:
- People Savings: $${peopleSavings}
- Product Savings: $${productSavings}
 

Next Steps:
1. Schedule a personalized demo
2. Discuss implementation timeline
3. Review detailed case studies
4. Plan your SHAED deployment

Contact: ryan.pritchard@shaed.ai
    `;
    
    // For now, show in alert (in production, this would generate a PDF download)
    alert('ROI Report Generated!\n\n' + reportContent);
    
    // In a real implementation, you would:
    // 1. Send data to backend
    // 2. Generate PDF report
    // 3. Email report to user
    // 4. Track lead in CRM
}

function scheduleDemo() {
    // Scroll to contact form or open scheduling modal
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Pre-fill contact form with ROI data
    const roi = document.getElementById('roi-percentage')?.textContent || '167';
    const totalSavings = document.getElementById('total-savings')?.textContent || '2,340,000';
    
    const messageField = document.querySelector('textarea[name="message"]');
    if (messageField) {
        messageField.value = `I'm interested in learning more about SHAED. Based on your ROI calculator, I could potentially save $${totalSavings} annually with a ${roi}% ROI. Please schedule a demo to discuss further.`;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple toast helper
function showToast(message, type) {
    const root = document.getElementById('toast-root');
    if (!root) { alert(message); return; }
    const el = document.createElement('div');
    el.className = 'toast ' + (type || 'info');
    el.textContent = message;
    root.appendChild(el);
    setTimeout(() => {
        el.classList.add('toast-hide');
        setTimeout(() => root.removeChild(el), 220);
    }, 3500);
}
// expose globally for inline handlers
window.showToast = showToast;

// Form handling (guard for pages without the demo form)
const demoForm = document.getElementById('demo-form');
if (demoForm) demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Removed blocking alert; rely on toasts
    console.log('[demo-form] submit handler fired');

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.company || !data.phone) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    // Debounce submit to avoid rapid repeats
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Demo';
        }, 4000);
    }

    // Attempt server-side delivery (Web3Forms). If it fails due to network, fall back to mailto.
    const sendViaFormSubmit = async () => {
        try {
            const accessKeyInput = document.querySelector('#demo-form input[name="access_key"]');
            const access_key = accessKeyInput ? accessKeyInput.value : '';
            const payload = {
                access_key,
                subject: 'New SHAED Demo Request',
                name: data.name,
                email: data.email,
                company: data.company,
                phone: data.phone,
                message: data.message || ''
            };

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const text = await response.text();
            let json;
            try { json = JSON.parse(text); } catch (_) { json = null; }

            if (response.ok) {
                showToast('Thanks! Your demo request was sent. We\'ll be in touch shortly.', 'success');
                this.reset();
                return true;
            }

            const msg = (json && (json.message || json.error)) ? (json.message || json.error) : `HTTP ${response.status}: ${text || 'Unknown error'}`;
            if (response.status === 429 || /rate limit/i.test(msg)) {
                return false; // silent fallback to email
            }
            return false; // silent fallback to email
        } catch (err) {
            return false; // silent fallback to email
        }
    };

    const fallbackMailto = () => {
        const subject = encodeURIComponent('New SHAED Demo Request');
        const bodyLines = [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company}`,
            `Phone: ${data.phone}`,
            '',
            'Message:',
            (data.message || '')
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.open(`mailto:info@shaed.ai?subject=${subject}&body=${body}`, '_self');
        showToast('We opened a pre-filled email to info@shaed.ai. Please click send.', 'info');
        this.reset();
    };

    sendViaFormSubmit().then((ok) => {
        if (ok) return;
        // Do NOT native-post to Web3Forms to avoid leaving the page
        fallbackMailto();
    });
});

// Button click handlers for CTAs
document.querySelectorAll('.primary-button, .secondary-button, .cta-button, .pricing-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.toLowerCase();
        
        // Do not intercept the actual submit button inside the demo form
        const isSubmitInDemoForm = this.tagName.toLowerCase() === 'button' && this.type === 'submit' && this.closest('#demo-form');
        if (isSubmitInDemoForm) {
            return; // allow the form's submit handler/default behavior
        }
        
        if (buttonText.includes('demo') || buttonText.includes('get started') || buttonText.includes('request')) {
            e.preventDefault();
            // Scroll to contact form (or redirect on subpages)
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus on the first form field
                setTimeout(() => {
                    const firstInput = document.querySelector('#demo-form input');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 500);
            } else {
                window.location.href = 'index.html#contact';
            }
        } else if (buttonText.includes('case study')) {
            e.preventDefault();
            // Scroll to results section (or redirect on subpages)
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                resultsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                window.location.href = 'index.html#results';
            }
        } else if (buttonText.includes('contact sales')) {
            e.preventDefault();
            // Open email client
            window.location.href = 'mailto:ryan.pritchard@shaed.ai?subject=SHAED Enterprise Inquiry';
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.problem-item, .feature-card, .result-card, .metric, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            // Format the final number correctly
            if (target >= 1000000) {
                element.textContent = '$' + (target / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = (target / 1000).toFixed(0) + 'K+';
            } else {
                element.textContent = target + '%';
            }
            clearInterval(timer);
        } else {
            if (target >= 1000000) {
                element.textContent = '$' + (start / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = Math.floor(start / 1000) + 'K+';
            } else {
                element.textContent = Math.floor(start) + '%';
            }
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Define the correct target values based on element content
            let target = 0;
            if (element.classList.contains('stat-number')) {
                if (element.textContent.includes('167')) target = 167;
                else if (element.textContent.includes('43')) target = 43111;
                else if (element.textContent.includes('88')) target = 88;
            } else if (element.classList.contains('result-amount')) {
                if (element.textContent.includes('434')) target = 434720;
                else if (element.textContent.includes('978')) target = 978000;
                else if (element.textContent.includes('1,008')) target = 1008000;
            } else if (element.classList.contains('metric-improvement')) {
                if (element.textContent.includes('88')) target = 88;
                else if (element.textContent.includes('98')) target = 98;
                else if (element.textContent.includes('84')) target = 84;
                else if (element.textContent.includes('87')) target = 87;
            } else if (element.classList.contains('cta-stat-number')) {
                if (element.textContent.includes('220')) target = 220;
                else if (element.textContent.includes('43,111')) target = 43111;
                else if (element.textContent.includes('6,294')) target = 6294;
            }
            
            if (target > 0) {
                animateCounter(element, target);
                counterObserver.unobserve(element);
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat numbers (disabled counter animation)
// document.querySelectorAll('.stat-number, .result-amount, .metric-improvement, .cta-stat-number').forEach(el => {
//     counterObserver.observe(el);
// });

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Feature card interactions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        
        // If this is the demo form submit button, do NOT disable it (disabling at click can block form submission)
        const inDemoForm = this.closest('#demo-form');
        if (inDemoForm) {
            this.textContent = 'Sending...';
            // Allow the form submission to proceed without disabling the button
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
            return;
        }
        
        this.textContent = 'Sending...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .primary-button, .secondary-button, .cta-button, .pricing-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.querySelectorAll('.primary-button, .secondary-button, .cta-button, .pricing-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: all 0.3s ease;
        }
        
        .feature-icon {
            transition: transform 0.3s ease;
        }
        
        .navbar {
            transition: background 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});



// Product Modal Functionality
function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const productData = {
        'marketplace': {
            title: 'Marketplace',
            description: 'The front door for dealer acquisition and inventory distribution, serving as a specialized commercial vehicle marketplace.',
            keyFeatures: [
                '<strong>VIN-based auto-population</strong> via NHTSA integration for automatic data entry',
                '<strong>DMS integration</strong> for automatic inventory synchronization',
                '<strong>Bulk inventory upload</strong> capabilities for efficient listing management',
                '<strong>Hero Pages for Dealers</strong> - Dedicated landing pages highlighting each dealer\'s brand and inventory',
                '<strong>Vanity Sites</strong> - Custom branded dealer branded websites helping dealers promote their full catalog online',
                '<strong>OEM-Specific Dealer Sites</strong> - Focused pages to showcase offerings by OEM brand',
                '<strong>Equipment & Dealer Workflows</strong> - Dealers can list comprehensive chassis and body information in one place'
            ],
            valuePropositions: [
                '<strong>Reduction in listing time</strong> through automated data entry',
                'Expanded reach to commercial fleet buyers vs. generic marketplaces',
                'One-stop shop for complete commercial vehicle solutions',
                'Seamless inventory management with automatic data pulls'
            ]
        },
        'order-management': {
            title: 'Order Management Dashboard',
            description: 'A centralized command center for managing the entire vehicle lifecycle from OEM to final delivery.',
            keyFeatures: [
                '<strong>Real-time OEM integrations</strong> for chassis availability and ETA',
                '<strong>Chassis ETA tracking</strong> from OEM production',
                '<strong>Upfit progress synchronization</strong> from the Upfit Portal',
                '<strong>Logistics tracking</strong> with transport partners',
                '<strong>Dual-view architecture</strong> - Separate dealer view and customer self-service view',
                '<strong>Bulk order management</strong> with single and bulk upload capabilities',
                '<strong>Stock inventory management</strong> - Reserve, unreserve, and mark as sold',
                '<strong>Payment terms and FIN/FAN code management</strong>',
                '<strong>Complete audit logs</strong> for full activity history',
                '<strong>Automated email notifications</strong> on status changes'
            ],
            valuePropositions: [
                'End-to-end visibility from OEM production to Upfit to final delivery',
                'Reduction in "where\'s my truck?" inquiries',
                '3-14 days faster transaction processing',
                'Eliminates daily manual portal checks',
                'Customer self-service reduces administrative burden'
            ]
        },
        'digital-deal-jackets': {
            title: 'Digital Deal Jackets',
            description: 'Transform paper chaos into organized, compliant digital documentation for every vehicle transaction.',
            keyFeatures: [
                '<strong>Cloud-based secure document storage</strong> for all deal documents (POs, invoices, titles)',
                '<strong>Role-based permissions</strong> - Control who can upload, edit, or view specific document types',
                '<strong>Customer visibility toggle</strong> - Dealers choose which deal jackets customers can access for self-service',
                '<strong>Complete audit trail</strong> with time-stamped uploads and version history',
                '<strong>Advanced search and instant retrieval</strong> using filters and metadata tagging',
                '<strong>Paper X integration</strong> for automated document routing',
                '<strong>Built-in document checklist</strong> and status tracking'
            ],
            valuePropositions: [
                '<strong>Instant document retrieval</strong> vs. hours of searching',
                'Compliance-ready with full audit trails',
                'Fewer emails per deal through customer self-service',
                'Zero document loss with secure cloud storage',
                'Reduces audit preparation from weeks to hours'
            ]
        },
        'upfit-portal': {
            title: 'Upfit Portal',
            description: 'Connect upfitters directly into the dealer ecosystem with real-time visibility and automated workflows.',
            keyFeatures: [
                '<strong>Direct OEM data feeds</strong> to upfitters for better planning and tracking',
                '<strong>Real-time status updates</strong> (Chassis Received, In Progress, Completed) syncing across all platforms',
                '<strong>Upfitter integrations</strong> with automated capabilities',
                '<strong>Flexible update methods</strong> - Single updates, bulk Excel uploads, and automated ETL pipelines',
                '<strong>Overdue ETA alerts</strong> to increase accountability',
                '<strong>Automated completion notifications</strong> keeping dealers instantly informed',
                '<strong>Enterprise-grade security</strong> with Google & Microsoft SSO plus magic link passwordless login'
            ],
            valuePropositions: [
                '<strong>Real-time transparency</strong> across all stakeholders',
                'Hours saved per week for upfitters and dealers',
                'Automated notifications eliminate status check calls',
                'Seamless data flow with zero manual entry for automated partners',
                'Increased accountability through standardized tracking'
            ]
        },
        'cpq': {
            title: 'CPQ (Configure, Price, Quote)',
            description: 'Enable dealers to build, configure, and price fully customized commercial vehicle packages in one place.',
            keyFeatures: [
                '<strong>Vehicle Configurator</strong> for chassis, upfits, chargers, and accessories',
                '<strong>Bill of Materials Generator</strong> - Automatically creates detailed parts and equipment lists',
                '<strong>CMS Integration</strong> - Dynamically updates product content without developer work',
                '<strong>Complete package building</strong> - Enables creation of fully customized commercial EV packages'
            ],
            valuePropositions: [
                'Single platform for building complete vehicle packages',
                'Automated documentation for quotes and records',
                'Dynamic content management without technical resources',
                'Streamlined quote-to-order process'
            ]
        }
    };
    
    const product = productData[productId];
    if (!product) return;
    
    // Define screenshot mapping
    const screenshots = {
        'marketplace': 'Marketplace.png',
        'order-management': 'OrderManagement.png',
        'digital-deal-jackets': 'DigitalDealJacket.png',
        'upfit-portal': 'UpfitPortal.png',
        'cpq': 'CPQ.png'
    };

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
        </div>
        <div class="modal-body">
            <div class="modal-section">
                <h3>Key Features:</h3>
                <ul>
                    ${product.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h3>Value Propositions:</h3>
                <ul>
                    ${product.valuePropositions.map(value => `<li>${value}</li>`).join('')}
                </ul>
            </div>
            ${screenshots[productId] ? `
            <div class="modal-section">
                <div class="modal-screenshot">
                    <img src="${screenshots[productId]}" alt="${product.title} Screenshot" style="width: 100%; max-width: 800px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-top: 10px;">
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
    }
});


// Toggle problem description function
function toggleProblemDescription(problemId) {
    const description = document.getElementById(problemId);
    const isExpanded = description.classList.contains('expanded');
    
    if (isExpanded) {
        description.classList.remove('expanded');
    } else {
        description.classList.add('expanded');
    }
}

// Make entire problem cards toggle their descriptions on click/keyboard
document.addEventListener('DOMContentLoaded', function() {
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach((item) => {
        const description = item.querySelector('.problem-description');
        if (!description) return;
        
        // Accessibility and affordance
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-expanded', 'false');
        
        const toggle = () => {
            description.classList.toggle('expanded');
            const expanded = description.classList.contains('expanded');
            item.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        };
        
        item.addEventListener('click', (e) => {
            const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
            if (targetTag === 'a' || targetTag === 'button') return;
            toggle();
        });
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
});

