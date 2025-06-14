// Form Handling Functions
function toggleText(selectedOpt) {
  const textBox = document.getElementById("insurance-name");
  if (textBox && selectedOpt === "insurancePay") {
    textBox.style.display = "inline";
  } else if (textBox) {
    textBox.style.display = "none";
  }
}

function toggleName(opt) {
  const childName = document.getElementById("child-name");
  const childAge = document.getElementById("child-age");
  const childGender = document.getElementById("child-gender");
  const selfAge = document.getElementById("self-age");
  const selfGender = document.getElementById("self-gender");

  if (opt === "opt1") {
    if (selfAge) selfAge.style.display = "inline";
    if (selfGender) selfGender.style.display = "inline";
    if (childName) childName.style.display = "none";
    if (childAge) childAge.style.display = "none";
    if (childGender) childGender.style.display = "none";
  } else if (opt === "opt2") {
    if (childName) childName.style.display = "inline";
    if (childAge) childAge.style.display = "inline";
    if (childGender) childGender.style.display = "inline";
    if (selfAge) selfAge.style.display = "none";
    if (selfGender) selfGender.style.display = "none";
  } else {
    if (childName) childName.style.display = "none";
    if (childAge) childAge.style.display = "none";
    if (childGender) childGender.style.display = "none";
    if (selfAge) selfAge.style.display = "none";
    if (selfGender) selfGender.style.display = "none";
  }
}

// Image Gallery Variables
let currentImageIndex = 0;
let imageList = [];

// Custom Lightbox Functions
function openLightbox(imageSrc, index) {
  console.log("Opening lightbox with image:", imageSrc);
  const lightbox = document.getElementById("custom-lightbox");
  const img = document.getElementById("lightbox-img");

  if (lightbox && img) {
    img.src = imageSrc;
    currentImageIndex = index;
    lightbox.style.display = "block";
    updateNavButtons();
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("custom-lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function navigateImage(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) {
    currentImageIndex = imageList.length - 1;
  } else if (currentImageIndex >= imageList.length) {
    currentImageIndex = 0;
  }

  const img = document.getElementById("lightbox-img");
  if (img && imageList[currentImageIndex]) {
    img.src = imageList[currentImageIndex];
    updateNavButtons();
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (prevBtn && nextBtn) {
    prevBtn.disabled = false;
    nextBtn.disabled = false;

    if (imageList.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  }
}

// Global Event Listeners
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("custom-lightbox");
  if (lightbox && lightbox.style.display === "block") {
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      navigateImage(-1);
    } else if (e.key === "ArrowRight") {
      navigateImage(1);
    }
  }
});

document.addEventListener("click", (e) => {
  const lightbox = document.getElementById("custom-lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  const img = document.getElementById("lightbox-img");

  if (lightbox && lightbox.style.display === "block") {
    if (
      e.target === lightbox ||
      (lightboxContent && !lightboxContent.contains(e.target))
    ) {
      if (
        e.target !== img &&
        !e.target.closest(".nav-buttons") &&
        !e.target.closest(".close-btn")
      ) {
        closeLightbox();
      }
    }
  }
});

// Main DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, setting up page...");

  // Form Setup
  const form = document.getElementById("waitlistForm");
  const messageBox = document.getElementById("formMessage");

  if (form && messageBox) {
    let isSubmitting = false;

    // Create spinner for submit button
    const submitButton = form.querySelector('input[type="submit"]');
    if (submitButton) {
      const container = document.createElement("div");
      container.className = "submit-container";
      submitButton.parentNode.insertBefore(container, submitButton);
      container.appendChild(submitButton);
      submitButton.className = "submit-button";

      const spinner = document.createElement("div");
      spinner.className = "spinner hidden";
      spinner.id = "form-spinner";
      container.insertBefore(spinner, submitButton);
    }

    // Form Reset Event
    form.addEventListener("reset", () => {
      isSubmitting = false;

      // Hide conditional fields
      const fieldsToHide = [
        "child-name",
        "child-age",
        "child-gender",
        "self-age",
        "self-gender",
        "insurance-name",
      ];

      fieldsToHide.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field) field.style.display = "none";
      });

      // Reset spinner and button
      const spinner = document.getElementById("form-spinner");
      const submitBtn = form.querySelector('input[type="submit"]');
      if (spinner) spinner.classList.add("hidden");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.value = "Submit";
      }
      if (messageBox) messageBox.textContent = "";
    });

    // Form Submit Event
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("Form submission started");

      if (isSubmitting) {
        console.log("Already submitting, ignoring duplicate");
        return;
      }
      isSubmitting = true;

      // Show loading state
      const spinner = document.getElementById("form-spinner");
      const submitBtn = form.querySelector('input[type="submit"]');

      if (spinner) spinner.classList.remove("hidden");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.value = "Sending...";
      }

      // Prepare form data
      const formData = new FormData(form);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      console.log("Sending form data:", formDataObj);

      try {
        const response = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObj),
        });

        const text = await response.text();
        console.log("Server response:", text);

        if (response.ok) {
          messageBox.style.color = "green";
          messageBox.textContent = "Your message was sent successfully!";
          form.reset();
        } else {
          messageBox.style.color = "red";
          messageBox.textContent = "There was an error: " + text;
        }
      } catch (err) {
        console.error("Form submission error:", err);
        messageBox.style.color = "red";
        messageBox.textContent = "Unexpected error occurred: " + err.message;
      } finally {
        // Reset loading state
        isSubmitting = false;
        if (spinner) spinner.classList.add("hidden");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.value = "Submit";
        }
        console.log("Form submission completed");
      }
    });
  } else {
    console.log("Form or message box not found on this page");
  }

  // Image Gallery Setup
  const imgFileNames = [
    "IMG_3114.jpg",
    "IMG_3115.jpg",
    "IMG_3116.jpg",
    "IMG_3117.jpg",
    "IMG_3119.jpg",
    "IMG_3120.jpg",
    "IMG_3127.jpg",
    "IMG_3136.jpg",
    "IMG_3138.jpg",
    "IMG_3143.jpg",
    "IMG_3146.jpg",
    "IMG_3149.jpg",
    "IMG_3154.jpg",
    "IMG_3156.jpg",
    "IMG_3158.jpg",
    "IMG_3160.jpg",
  ];

  const galleryContainer = document.getElementById("lightbox-gallery");
  console.log("Gallery container found:", galleryContainer);

  if (galleryContainer) {
    console.log("Setting up gallery with", imgFileNames.length, "images...");

    // Create image list for navigation
    imageList = imgFileNames.map((filename) => `images/tour_imgs/${filename}`);
    console.log("Image paths:", imageList);

    // Create gallery thumbnails
    imgFileNames.forEach((filename, index) => {
      const imgPath = `images/tour_imgs/${filename}`;
      console.log("Creating thumbnail for:", imgPath);

      // Create link element
      const link = document.createElement("a");
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Thumbnail clicked:", imgPath);
        openLightbox(imgPath, index);
      });

      // Create image element
      const img = document.createElement("img");
      img.alt = `Office Photo ${index + 1}`;
      img.className = "thumb";
      img.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ELoading...%3C/text%3E%3C/svg%3E";
      img.dataset.src = imgPath;
      img.dataset.loaded = "false";

      // Error handling
      img.onerror = () => {
        console.error(`Failed to load image: ${imgPath}`);
        img.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23ffebee'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23c62828'%3EError%3C/text%3E%3C/svg%3E";
      };

      img.onload = () => {
        console.log(`Successfully loaded: ${imgPath}`);
      };

      link.appendChild(img);
      galleryContainer.appendChild(link);
    });

    // Lazy loading with Intersection Observer
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.loaded === "false") {
              console.log("Loading image:", img.dataset.src);
              img.classList.add("loading");

              const newImg = new Image();
              newImg.onload = () => {
                console.log("Image loaded successfully:", img.dataset.src);
                img.src = img.dataset.src;
                img.dataset.loaded = "true";
                img.classList.remove("loading");
                img.classList.add("loaded");
              };
              newImg.onerror = () => {
                console.error("Failed to load image:", img.dataset.src);
                img.classList.remove("loading");
                img.onerror();
              };
              newImg.src = img.dataset.src;
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    // Start observing thumbnails
    const thumbnails = galleryContainer.querySelectorAll(".thumb");
    console.log("Setting up observers for", thumbnails.length, "thumbnails");
    thumbnails.forEach((img) => imageObserver.observe(img));

    console.log("Gallery setup complete!");
  } else {
    console.log("Gallery container not found on this page");
  }
});
