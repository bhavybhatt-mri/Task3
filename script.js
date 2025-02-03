const slidesContainer = document.querySelector('.slides');
const galleryContainer = document.querySelector('.gallery');
const imageUrlInput = document.getElementById('image-url');
const addButton = document.getElementById('add-btn');

let images = JSON.parse(localStorage.getItem('images')) || []; // Load images from localStorage or default to an empty array
let currentIndex = 0;

// Save images to localStorage
function saveToLocalStorage() {
    localStorage.setItem('images', JSON.stringify(images));
}

// Update slider
function updateSlider() {
    slidesContainer.innerHTML = '';
    if (images.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder-slide');
        const img = document.createElement('img');
        img.src = "https://placehold.co/600x400";
        placeholder.appendChild(img);
        slidesContainer.appendChild(placeholder);
    } else {
        for (let i = 0; i < images.length; i++) {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            const img = document.createElement('img');
            img.src = images[i];
            img.alt = `Slide ${i + 1}`;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        }
    }
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Update gallery
function updateGallery() {
    galleryContainer.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        const img = document.createElement('img');
        img.src = images[i];
        img.alt = `Thumbnail ${i + 1}`;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-icon');
        deleteButton.textContent = 'x';
        deleteButton.onclick = function () { deleteImage(i); };
        thumbnail.appendChild(img);
        thumbnail.appendChild(deleteButton);
        galleryContainer.appendChild(thumbnail);
    }
}

// Delete image
function deleteImage(index) {
    images.splice(index, 1);
    if (currentIndex >= images.length) {
        currentIndex = images.length - 1;
    }
    updateSlider();
    updateGallery();
    saveToLocalStorage(); // Save updated images to localStorage after deletion
}

// Add new image
addButton.addEventListener('click', function () {
    const imageUrl = imageUrlInput.value.trim();
    if (imageUrl !== "" && images.length < 12) {
        images.push(imageUrl);
        updateSlider();
        updateGallery();
        imageUrlInput.value = '';
        saveToLocalStorage(); // Save updated images to localStorage after addition
    } else if (images.length >= 12) {
        alert('Maximum of 12 images allowed.');
    }
});

// Navigation buttons
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

prevButton.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

nextButton.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

// Initial setup: Ensure images load from localStorage if present
updateSlider();
updateGallery();
