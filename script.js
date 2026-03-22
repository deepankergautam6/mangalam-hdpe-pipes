// 1. Zoom Logic (Desktop Only)
const zoomBox = document.getElementById('zoom-box');
const img = document.getElementById('main-img');

if (zoomBox && img) {
    zoomBox.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only zoom on Desktop
            const rect = zoomBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            img.style.transformOrigin = `${x}px ${y}px`;
            img.style.transform = "scale(2.5)";
        }
    });

    zoomBox.addEventListener('mouseleave', () => {
        img.style.transform = "scale(1)";
        img.style.transformOrigin = "center";
    });
}

// 2. Unified FAQ Accordion Logic
document.querySelectorAll('.faq-card').forEach(card => {
    card.addEventListener('click', () => {
        // Toggle current card
        card.classList.toggle('active');
        
        // Update arrow icon
        const icon = card.querySelector('.arrow-icon');
        if (icon) {
            icon.textContent = card.classList.contains('active') ? '▲' : '▼';
        }
    });
});

// 3. Dynamic Horizontal Scroll for Apps
const scrollContainer = document.getElementById('apps-scroll-container');
const nextBtn = document.getElementById('next-app');
const prevBtn = document.getElementById('prev-app');

if (scrollContainer && nextBtn && prevBtn) {
    const scrollAmount = 320; // Card width + gap
    nextBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
}

// 4. Manufacturing Process Content Switcher
const processData = {
    raw: { title: "High-Grade Raw Material", desc: "Premium PE100 grade material for long life.", img: "assets/img.jpg" },
    extrusion: { title: "Advanced Extrusion", desc: "Melted and pushed through precision dies.", img: "assets/img.jpg" },
    cooling: { title: "Uniform Cooling", desc: "Water spray tanks for structural integrity.", img: "assets/img.jpg" },
    sizing: { title: "Vacuum Sizing", desc: "Maintains perfect roundness and diameter.", img: "assets/img.jpg" },
    quality: { title: "Quality Testing", desc: "Strict pressure and thickness gauging.", img: "assets/img.jpg" }
};

document.querySelectorAll('.step-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        if (processData[target]) {
            document.querySelector('.step-btn.active').classList.remove('active');
            button.classList.add('active');
            
            document.getElementById('process-title').innerText = processData[target].title;
            document.getElementById('process-desc').innerText = processData[target].desc;
            document.getElementById('process-img').src = processData[target].img;
        }
    });
});

// You can add this to your existing scroll logic in script.js
const testContainer = document.querySelector('.testimonials-grid');
// If you add buttons with IDs 'next-test' and 'prev-test'
// nextTestBtn.addEventListener('click', () => testContainer.scrollBy({ left: 370, behavior: 'smooth' }));


// 1. Unified Modal Functions
function openModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    }
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// 2. The "Big Event": Click Download -> Open Modal + Open PDF
const downloadBtn = document.querySelector('.btn-download');

if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Open the attractive modal you just styled
        openModal(); 
        
        // Simultaneously open the real Mangalam PDF in a new tab
        window.open('https://www.mangalampipes.co.in/pdf/PE-100_Thickness_Chart.pdf', '_blank');
    });
}

// 3. Form Submission "Success" Logic
const catalogForm = document.getElementById('catalogueForm');
if (catalogForm) {
    catalogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // You can add an API call here later to save the email
        alert("Success! Check your email for the complete Mangalam catalogue.");
        closeModal();
    });
}

// 4. Global Close Listeners (X button and clicking outside)
window.addEventListener('click', (e) => {
    const modal = document.getElementById('downloadModal');
    if (e.target === modal) closeModal();
});