const listAllImages = document.querySelectorAll(".gallery-item");
const galleryItems = Array.from(listAllImages);
listAllImages.forEach((image, index) => {
  image.id = index;
});

// Show images in the gallery

function showImagesInGallery(galleryItems) {
  const gallery = document.querySelector(".gallery");
  gallery.style.display = "flex";

  for (let i = 0; i < galleryItems.length; i++) {
    const galleryItemImageContainer = document.createElement("div");
    galleryItemImageContainer.append(galleryItems[i]);
    galleryItemImageContainer.setAttribute("class", "gallery-item-container");

    gallery.append(galleryItemImageContainer);
  }
}

showImagesInGallery(galleryItems);

// Create buttons to filter images by category

function createFilterButtons(galleryItems) {
  const categories = [];

  for (let i = 0; i < galleryItems.length; i++) {
    const imageCategory = galleryItems[i].getAttribute("data-gallery-tag");
    if (!categories.includes(imageCategory)) {
      categories.push(imageCategory);
    }
  }

  const filterButtonsContainer = document.createElement("div");
  filterButtonsContainer.setAttribute("class", "filter-buttons-container");

  const categoryAll = document.createElement("button");
  categoryAll.innerText = "Tous";
  categoryAll.setAttribute("class", "filter-button active-tag");

  filterButtonsContainer.appendChild(categoryAll);

  for (let i = 0; i < categories.length; i++) {
    const categoryButton = document.createElement("button");
    categoryButton.innerText = categories[i];
    categoryButton.setAttribute("class", "filter-button");
    filterButtonsContainer.append(categoryButton);
  }

  const galleryContainer = document.querySelector(".py-3");
  const gallery = document.querySelector(".gallery");
  galleryContainer.insertBefore(filterButtonsContainer, gallery);
}

createFilterButtons(galleryItems);

// Filter images by category

function filterImages() {
  const filterButtons = document.querySelectorAll(".filter-button");

  let activeButton = document.querySelector(".active-tag");

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", () => {
      activeButton.classList.remove("active-tag");
      activeButton = filterButtons[i];
      activeButton.classList.add("active-tag");

      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      if (filterButtons[i].innerHTML === "Tous") {
        showImagesInGallery(galleryItems);
      }

      const filteredImagesList = galleryItems.filter(
        (image) =>
          image.getAttribute("data-gallery-tag") === filterButtons[i].innerHTML,
      );
      showImagesInGallery(filteredImagesList);
    });
  }
}

filterImages();

// Handle modal

function handleModal() {
  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener("click", openModal);
  }
}

handleModal();

// Open modal

function openModal(e) {
  const modal = document.querySelector(".modal");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.style.display = "flex";
  modal.addEventListener("click", stopPropagation);

  const body = document.querySelector("body");
  body.classList.add("class", "modal-open");

  currentIndex = galleryItems.findIndex((item) => item === e.target);
  
  selectImage(e.target);

  const modalPreviousImage = document.querySelector(".modal-prev-image");
  modalPreviousImage.addEventListener("click", () => {
    showPreviousImage();
  });

  const modalNextImage = document.querySelector(".modal-next-image");
  modalNextImage.addEventListener("click", () => {
    showNextImage();
  });
}

// Show the previous image

function showPreviousImage() {
  const imageModalContainer = document.querySelector(".modal-image-container");

  currentIndex =
    currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;

  imageModalContainer.innerHTML = "";
  const previousImage = galleryItems[currentIndex];
  selectImage(previousImage);
}

// Show the next image

function showNextImage() {
  const imageModalContainer = document.querySelector(".modal-image-container");

  currentIndex =
    currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;

  imageModalContainer.innerHTML = "";
  const nextImage = galleryItems[currentIndex];
  selectImage(nextImage);
}

// Close modal

function closeModal(modal) {
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.style.display = "none";
  modal.removeEventListener("click", stopPropagation);

  const body = document.querySelector("body");
  body.classList.remove("class", "modal-open");
}

// Stop propagation

function stopPropagation(e) {
  e.stopPropagation();
}

// Define when click is outside or inside the modal

function clickOutsideModal() {
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalImageContainer = document.querySelector(".modal-image-container");

  document.addEventListener("click", (e) => {
    if (modal.getAttribute("aria-hidden") === null) {
      modal.addEventListener("click", (e) => {
        if (modalContent.contains(e.target)) {
          return;
        }
        closeModal(modal);
        modalImageContainer.innerHTML = "";
      });
    }
  });
}

clickOutsideModal();

// Define the image to display

function selectImage(image) {
  image.classList.add("selected-image");

  const imageInModalGallery = image.cloneNode(true);
  imageInModalGallery.src = image.src;

  const imageModalContainer = document.querySelector(".modal-image-container");
  imageModalContainer.appendChild(imageInModalGallery);
}
