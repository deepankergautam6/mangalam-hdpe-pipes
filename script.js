const header = document.querySelector(".main-header");
const navToggle = document.querySelector(".nav-toggle");
const navTargets = document.querySelectorAll(".nav-right a");
const navPanel = document.getElementById("site-nav");

function setNavOpen(isOpen) {
    if (!header || !navToggle || !navPanel) {
        return;
    }

    header.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
}

if (header && navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
        const isOpen = header.classList.contains("nav-open");
        setNavOpen(!isOpen);
    });

    navTargets.forEach((link) => {
        link.addEventListener("click", () => setNavOpen(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 896) {
            setNavOpen(false);
        }
    });
}

const zoomBox = document.getElementById("zoom-box");
const mainImage = document.getElementById("main-img");
const canZoom = window.matchMedia("(hover: hover) and (pointer: fine)");

if (zoomBox && mainImage && canZoom.matches) {
    zoomBox.addEventListener("mousemove", (event) => {
        if (window.innerWidth < 896) {
            return;
        }

        const rect = zoomBox.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        mainImage.style.transformOrigin = `${x}px ${y}px`;
        mainImage.style.transform = "scale(1.65)";
    });

    zoomBox.addEventListener("mouseleave", () => {
        mainImage.style.transform = "scale(1)";
        mainImage.style.transformOrigin = "center";
    });
}

const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach((card) => {
    const button = card.querySelector(".faq-header");
    const body = card.querySelector(".faq-body");
    const arrow = card.querySelector(".arrow-icon");

    if (!button || !body || !arrow) {
        return;
    }

    button.addEventListener("click", () => {
        const isActive = card.classList.contains("active");

        faqCards.forEach((item) => {
            const itemButton = item.querySelector(".faq-header");
            const itemBody = item.querySelector(".faq-body");
            const itemArrow = item.querySelector(".arrow-icon");

            item.classList.remove("active");

            if (itemButton) {
                itemButton.setAttribute("aria-expanded", "false");
            }

            if (itemBody) {
                itemBody.hidden = true;
            }

            if (itemArrow) {
                itemArrow.innerHTML = "&#9660;";
            }
        });

        if (!isActive) {
            card.classList.add("active");
            button.setAttribute("aria-expanded", "true");
            body.hidden = false;
            arrow.innerHTML = "&#9650;";
        }
    });
});

const appsContainer = document.getElementById("apps-scroll-container");
const nextButton = document.getElementById("next-app");
const prevButton = document.getElementById("prev-app");

function updateAppButtons() {
    if (!appsContainer || !nextButton || !prevButton) {
        return;
    }

    const maxScrollLeft = appsContainer.scrollWidth - appsContainer.clientWidth - 4;
    prevButton.disabled = appsContainer.scrollLeft <= 4;
    nextButton.disabled = appsContainer.scrollLeft >= maxScrollLeft;
}

if (appsContainer && nextButton && prevButton) {
    const getScrollAmount = () => {
        const card = appsContainer.querySelector(".app-card");

        if (!card) {
            return 320;
        }

        const gap = Number.parseFloat(getComputedStyle(appsContainer).columnGap || getComputedStyle(appsContainer).gap) || 16;
        return card.getBoundingClientRect().width + gap;
    };

    nextButton.addEventListener("click", () => {
        appsContainer.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    prevButton.addEventListener("click", () => {
        appsContainer.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    appsContainer.addEventListener("scroll", updateAppButtons, { passive: true });
    window.addEventListener("resize", updateAppButtons);
    updateAppButtons();
}

const processTitle = document.getElementById("process-title");
const processDescription = document.getElementById("process-desc");
const processImage = document.getElementById("process-img");
const processBullets = document.getElementById("process-bullets");
const processButtons = document.querySelectorAll(".step-btn");

const processData = {
    raw: {
        title: "High-grade raw material selection",
        description: "PE100 resin with controlled melt flow and strength characteristics is selected to deliver pressure-ready, long-life piping.",
        image: "assets/img.jpg",
        alt: "HDPE pipe raw material preparation",
        bullets: [
            "PE100 grade raw material",
            "Consistent molecular weight distribution",
            "High crack resistance for long service life"
        ]
    },
    extrusion: {
        title: "Precision extrusion",
        description: "The compounded material is melted and pushed through calibrated dies to form a stable pipe profile with uniform wall thickness.",
        image: "assets/HDPE.webp",
        alt: "HDPE pipe extrusion process",
        bullets: [
            "Controlled temperature zoning",
            "Accurate die sizing for dimensional stability",
            "Continuous output monitoring"
        ]
    },
    cooling: {
        title: "Controlled cooling and support",
        description: "Cooling tanks gradually stabilize the pipe shape while protecting roundness, straightness, and surface quality.",
        image: "assets/Food.webp",
        alt: "HDPE pipe cooling process",
        bullets: [
            "Gradual cooling to reduce stress",
            "Surface finish protection",
            "Enhanced structural consistency"
        ]
    },
    sizing: {
        title: "Vacuum sizing and calibration",
        description: "Vacuum calibration maintains diameter accuracy and helps achieve repeatable tolerances across the production line.",
        image: "assets/instal.webp",
        alt: "HDPE pipe sizing and calibration",
        bullets: [
            "Precise OD control",
            "Improved roundness retention",
            "Stable sizing across long runs"
        ]
    },
    quality: {
        title: "Multi-point quality control",
        description: "Every batch is checked for pressure capability, wall thickness, appearance, and dimensional compliance before dispatch.",
        image: "assets/heat.jpg",
        alt: "HDPE pipe quality control",
        bullets: [
            "Pressure and dimensional inspection",
            "Wall thickness verification",
            "Dispatch approval after final review"
        ]
    }
};

if (processTitle && processDescription && processImage && processBullets && processButtons.length) {
    processButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const key = button.dataset.target;
            const data = processData[key];

            if (!data) {
                return;
            }

            processButtons.forEach((item) => {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            processTitle.textContent = data.title;
            processDescription.textContent = data.description;
            processImage.src = data.image;
            processImage.alt = data.alt;

            processBullets.innerHTML = data.bullets.map((bullet) => `<li>${bullet}</li>`).join("");
        });
    });
}

const modal = document.getElementById("downloadModal");
const openModalButton = document.querySelector(".btn-download");
const closeModalButton = document.querySelector(".close-modal");
const modalForm = document.getElementById("catalogueForm");
const quickCatalogueForm = document.getElementById("catalogueRequestForm");
const contactForm = document.getElementById("contactForm");

function openModal() {
    if (!modal) {
        return;
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

if (openModalButton) {
    openModalButton.addEventListener("click", () => {
        openModal();
        window.open("https://www.mangalampipes.co.in/pdf/PE-100_Thickness_Chart.pdf", "_blank", "noopener");
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

if (modalForm) {
    modalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("Thanks. Our team will share the brochure with you shortly.");
        modalForm.reset();
        closeModal();
    });
}

if (quickCatalogueForm) {
    quickCatalogueForm.addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("Catalogue request received. We will email the details shortly.");
        quickCatalogueForm.reset();
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("Thanks. Your custom quote request has been captured.");
        contactForm.reset();
    });
}
