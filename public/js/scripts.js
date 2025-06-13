// // Form Handling
// function toggleText(selectedOpt) {
//   const textBox = document.getElementById("insurance-name");
//   if (textBox && selectedOpt === "insurancePay") {
//     textBox.style.display = "inline";
//   } else if (textBox) {
//     textBox.style.display = "none";
//   }
// }

// function toggleName(opt) {
//   const childName = document.getElementById("child-name");
//   const childAge = document.getElementById("child-age");
//   const childGender = document.getElementById("child-gender");
//   const selfAge = document.getElementById("self-age");
//   const selfGender = document.getElementById("self-gender");

//   if (opt === "opt1") {
//     if (selfAge) selfAge.style.display = "inline";
//     if (selfGender) selfGender.style.display = "inline";
//     if (childName) childName.style.display = "none";
//     if (childAge) childAge.style.display = "none";
//     if (childGender) childGender.style.display = "none";
//   } else if (opt === "opt2") {
//     if (childName) childName.style.display = "inline";
//     if (childAge) childAge.style.display = "inline";
//     if (childGender) childGender.style.display = "inline";
//     if (selfAge) selfAge.style.display = "none";
//     if (selfGender) selfGender.style.display = "none";
//   } else {
//     if (childName) childName.style.display = "none";
//     if (childAge) childAge.style.display = "none";
//     if (childGender) childGender.style.display = "none";
//     if (selfAge) selfAge.style.display = "none";
//     if (selfGender) selfGender.style.display = "none";
//   }
// }

// // Image gallery variables
// let currentImageIndex = 0;
// let imageList = [];

// // Custom lightbox functions
// function openLightbox(imageSrc, index) {
//   const lightbox = document.getElementById("custom-lightbox");
//   const img = document.getElementById("lightbox-img");

//   if (lightbox && img) {
//     img.src = imageSrc;
//     currentImageIndex = index;
//     lightbox.style.display = "block";

//     // Update navigation buttons
//     updateNavButtons();

//     // Prevent body scroll
//     document.body.style.overflow = "hidden";
//   }
// }

// function closeLightbox() {
//   const lightbox = document.getElementById("custom-lightbox");
//   if (lightbox) {
//     lightbox.style.display = "none";
//     // Restore body scroll
//     document.body.style.overflow = "auto";
//   }
// }

// function navigateImage(direction) {
//   currentImageIndex += direction;

//   if (currentImageIndex < 0) {
//     currentImageIndex = imageList.length - 1;
//   } else if (currentImageIndex >= imageList.length) {
//     currentImageIndex = 0;
//   }

//   const img = document.getElementById("lightbox-img");
//   if (img && imageList[currentImageIndex]) {
//     img.src = imageList[currentImageIndex];
//     updateNavButtons();
//   }
// }

// function updateNavButtons() {
//   const prevBtn = document.getElementById("prev-btn");
//   const nextBtn = document.getElementById("next-btn");

//   if (prevBtn && nextBtn) {
//     prevBtn.disabled = false;
//     nextBtn.disabled = false;

//     if (imageList.length <= 1) {
//       prevBtn.style.display = "none";
//       nextBtn.style.display = "none";
//     } else {
//       prevBtn.style.display = "block";
//       nextBtn.style.display = "block";
//     }
//   }
// }

// // Keyboard navigation
// document.addEventListener("keydown", (e) => {
//   const lightbox = document.getElementById("custom-lightbox");
//   if (lightbox && lightbox.style.display === "block") {
//     if (e.key === "Escape") {
//       closeLightbox();
//     } else if (e.key === "ArrowLeft") {
//       navigateImage(-1);
//     } else if (e.key === "ArrowRight") {
//       navigateImage(1);
//     }
//   }
// });

// // Close lightbox when clicking outside the image
// document.addEventListener("click", (e) => {
//   const lightbox = document.getElementById("custom-lightbox");
//   const lightboxContent = document.querySelector(".lightbox-content");
//   const img = document.getElementById("lightbox-img");

//   if (lightbox && lightbox.style.display === "block") {
//     if (
//       e.target === lightbox ||
//       (lightboxContent && !lightboxContent.contains(e.target))
//     ) {
//       // Only close if clicking outside the image, but not on navigation buttons
//       if (
//         e.target !== img &&
//         !e.target.closest(".nav-buttons") &&
//         !e.target.closest(".close-btn")
//       ) {
//         closeLightbox();
//       }
//     }
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM loaded, setting up page...");

//   const form = document.getElementById("waitlistForm");
//   const messageBox = document.getElementById("formMessage");

//   if (form) {
//     form.addEventListener("reset", () => {
//       // ...
//     });

//     // Find the form submission event listener and update the fetch URL:

//     const form = document.querySelector("form");
//     const messageBox = document.getElementById("message");

//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const formData = new FormData(form);
//       const formDataObj = {};

//       // Convert FormData to a regular object
//       formData.forEach((value, key) => {
//         formDataObj[key] = value;
//       });

//       try {
//         // Update this line to point to your Netlify function
//         const response = await fetch("/.netlify/functions/send-email", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           // Send as JSON instead of form-urlencoded
//           body: JSON.stringify(formDataObj),
//         });

//         const text = await response.text();

//         if (response.ok) {
//           messageBox.style.color = "green";
//           messageBox.textContent = "Your message was sent successfully!";
//           form.reset();
//         } else {
//           messageBox.style.color = "red";
//           messageBox.textContent = "There was an error: " + text;
//         }
//       } catch (err) {
//         messageBox.style.color = "red";
//         messageBox.textContent = "Unexpected error occurred: " + err.message;
//       }
//     });
//   }

//   // ... your image gallery setup here
//   // });

//   // Image gallery setup
//   const imgFileNames = [
//     "IMG_3114.jpg",
//     "IMG_3115.jpg",
//     "IMG_3116.jpg",
//     "IMG_3117.jpg",
//     "IMG_3120.jpg",
//     "IMG_3127.jpg",
//     "IMG_3138.jpg",
//     "IMG_3143.jpg",
//     "IMG_3146.jpg",
//     "IMG_3149.jpg",
//     "IMG_3154.jpg",
//     "IMG_3156.jpg",
//     "IMG_3158.jpg",
//     "IMG_3160.jpg",
//   ];

//   // Get the gallery container
//   const galleryContainer = document.getElementById("lightbox-gallery");

//   // Only proceed if the gallery container exists on the current page
//   if (galleryContainer) {
//     console.log("Setting up gallery...");

//     // Create image list for navigation
//     imageList = imgFileNames.map((filename) => `images/tour_imgs/${filename}`);

//     // Use custom lightbox (more reliable)
//     console.log("Using custom lightbox implementation...");

//     // Create gallery items dynamically with lazy loading
//     imgFileNames.forEach((filename, index) => {
//       const imgPath = `images/tour_imgs/${filename}`;

//       // Create anchor element
//       const link = document.createElement("a");
//       link.href = "#";

//       // Use custom lightbox
//       link.addEventListener("click", (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         openLightbox(imgPath, index);
//       });

//       // Create thumbnail image with lazy loading
//       const img = document.createElement("img");
//       img.alt = `Office Photo ${index + 1}`;
//       img.className = "thumb";

//       // Use a small placeholder initially
//       img.src =
//         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ELoading...%3C/text%3E%3C/svg%3E";

//       // Store the actual image path for lazy loading
//       img.dataset.src = imgPath;
//       img.dataset.loaded = "false";

//       // Handle image load errors
//       img.onerror = () => {
//         console.error(`Failed to load image: ${imgPath}`);
//         img.src =
//           "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23ffebee'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23c62828'%3EError%3C/text%3E%3C/svg%3E";
//       };

//       // Append image to link and link to gallery
//       link.appendChild(img);
//       galleryContainer.appendChild(link);
//     });

//     // Set up Intersection Observer for lazy loading
//     const imageObserver = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const img = entry.target;
//             if (img.dataset.loaded === "false") {
//               // Add loading class for smooth transition
//               img.classList.add("loading");

//               // Create a new image to preload
//               const newImg = new Image();
//               newImg.onload = () => {
//                 // Once loaded, update the src and remove loading state
//                 img.src = img.dataset.src;
//                 img.dataset.loaded = "true";
//                 img.classList.remove("loading");
//                 img.classList.add("loaded");
//               };
//               newImg.onerror = () => {
//                 img.classList.remove("loading");
//                 img.onerror();
//               };
//               newImg.src = img.dataset.src;

//               // Stop observing this image
//               observer.unobserve(img);
//             }
//           }
//         });
//       },
//       {
//         // Start loading when image is 100px away from viewport
//         rootMargin: "100px",
//         threshold: 0.1,
//       }
//     );

//     // Observe all thumbnail images
//     const thumbnails = galleryContainer.querySelectorAll(".thumb");
//     thumbnails.forEach((img) => {
//       imageObserver.observe(img);
//     });

//     console.log("Gallery setup complete with lazy loading!");
//   }
// });

// Find the form submission event listener and update the fetch URL:

const form = document.querySelector("form");
const messageBox = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const formDataObj = {};

  // Convert FormData to a regular object
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  try {
    // Update this line to point to your Netlify function
    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send as JSON instead of form-urlencoded
      body: JSON.stringify(formDataObj),
    });

    const text = await response.text();

    if (response.ok) {
      messageBox.style.color = "green";
      messageBox.textContent = "Your message was sent successfully!";
      form.reset();
    } else {
      messageBox.style.color = "red";
      messageBox.textContent = "There was an error: " + text;
    }
  } catch (err) {
    messageBox.style.color = "red";
    messageBox.textContent = "Unexpected error occurred: " + err.message;
  }
});

// Form Handling
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

// Image gallery variables
let currentImageIndex = 0;
let imageList = [];

// Custom lightbox functions
function openLightbox(imageSrc, index) {
  const lightbox = document.getElementById("custom-lightbox");
  const img = document.getElementById("lightbox-img");

  if (lightbox && img) {
    img.src = imageSrc;
    currentImageIndex = index;
    lightbox.style.display = "block";

    // Update navigation buttons
    updateNavButtons();

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("custom-lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    // Restore body scroll
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

// Keyboard navigation
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

// Close lightbox when clicking outside the image
document.addEventListener("click", (e) => {
  const lightbox = document.getElementById("custom-lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  const img = document.getElementById("lightbox-img");

  if (lightbox && lightbox.style.display === "block") {
    if (
      e.target === lightbox ||
      (lightboxContent && !lightboxContent.contains(e.target))
    ) {
      // Only close if clicking outside the image, but not on navigation buttons
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, setting up page...");

  // FIXED: Use the correct IDs that match your HTML
  const form = document.getElementById("waitlistForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("reset", () => {
      // Reset form logic if needed
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const formDataObj = {};

      // Convert FormData to a regular object
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      try {
        // Send to Netlify function
        const response = await fetch("/.netlify/functions/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObj),
        });

        const text = await response.text();

        if (response.ok) {
          messageBox.style.color = "green";
          messageBox.textContent = "Your message was sent successfully!";
          form.reset();
        } else {
          messageBox.style.color = "red";
          messageBox.textContent = "There was an error: " + text;
        }
      } catch (err) {
        messageBox.style.color = "red";
        messageBox.textContent = "Unexpected error occurred: " + err.message;
      }
    });
  }

  // Image gallery setup
  const imgFileNames = [
    "IMG_3114.jpg",
    "IMG_3115.jpg",
    "IMG_3116.jpg",
    "IMG_3117.jpg",
    "IMG_3120.jpg",
    "IMG_3127.jpg",
    "IMG_3138.jpg",
    "IMG_3143.jpg",
    "IMG_3146.jpg",
    "IMG_3149.jpg",
    "IMG_3154.jpg",
    "IMG_3156.jpg",
    "IMG_3158.jpg",
    "IMG_3160.jpg",
  ];

  // Get the gallery container
  const galleryContainer = document.getElementById("lightbox-gallery");

  // Only proceed if the gallery container exists on the current page
  if (galleryContainer) {
    console.log("Setting up gallery...");

    // Create image list for navigation
    imageList = imgFileNames.map((filename) => `images/tour_imgs/${filename}`);

    // Use custom lightbox (more reliable)
    console.log("Using custom lightbox implementation...");

    // Create gallery items dynamically with lazy loading
    imgFileNames.forEach((filename, index) => {
      const imgPath = `images/tour_imgs/${filename}`;

      // Create anchor element
      const link = document.createElement("a");
      link.href = "#";

      // Use custom lightbox
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(imgPath, index);
      });

      // Create thumbnail image with lazy loading
      const img = document.createElement("img");
      img.alt = `Office Photo ${index + 1}`;
      img.className = "thumb";

      // Use a small placeholder initially
      img.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ELoading...%3C/text%3E%3C/svg%3E";

      // Store the actual image path for lazy loading
      img.dataset.src = imgPath;
      img.dataset.loaded = "false";

      // Handle image load errors
      img.onerror = () => {
        console.error(`Failed to load image: ${imgPath}`);
        img.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23ffebee'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23c62828'%3EError%3C/text%3E%3C/svg%3E";
      };

      // Append image to link and link to gallery
      link.appendChild(img);
      galleryContainer.appendChild(link);
    });

    // Set up Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.loaded === "false") {
              // Add loading class for smooth transition
              img.classList.add("loading");

              // Create a new image to preload
              const newImg = new Image();
              newImg.onload = () => {
                // Once loaded, update the src and remove loading state
                img.src = img.dataset.src;
                img.dataset.loaded = "true";
                img.classList.remove("loading");
                img.classList.add("loaded");
              };
              newImg.onerror = () => {
                img.classList.remove("loading");
                img.onerror();
              };
              newImg.src = img.dataset.src;

              // Stop observing this image
              observer.unobserve(img);
            }
          }
        });
      },
      {
        // Start loading when image is 100px away from viewport
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    // Observe all thumbnail images
    const thumbnails = galleryContainer.querySelectorAll(".thumb");
    thumbnails.forEach((img) => {
      imageObserver.observe(img);
    });

    console.log("Gallery setup complete with lazy loading!");
  }
});
