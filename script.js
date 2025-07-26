document.addEventListener('DOMContentLoaded', () => {
            // Select all necessary DOM elements
            const slides = document.querySelectorAll('.carousel-slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dotsContainer = document.querySelector('.carousel-dots');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const closeBtn = document.querySelector('.close-btn');

            let currentSlide = 0; // Tracks the currently active slide index

            /**
             * Displays the slide at the given index and updates the dot indicators.
             * @param {number} index - The index of the slide to show.
             */
            function showSlide(index) {
                // Hide all slides
                slides.forEach((slide) => {
                    slide.classList.remove('active');
                });

                // Show the slide corresponding to the given index
                if (slides[index]) { // Ensure the slide exists
                    slides[index].classList.add('active');
                }

                // Update the active dot indicator
                updateDots(index);
            }

            /**
             * Moves the carousel to the next slide.
             * It wraps around to the beginning if it's the last slide.
             */
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            /**
             * Moves the carousel to the previous slide.
             * It wraps around to the end if it's the first slide.
             */
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }

            /**
             * Dynamically creates dot indicators based on the number of slides.
             * Each dot is clickable to navigate directly to a slide.
             */
            function createDots() {
                slides.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.setAttribute('data-index', i); // Store the slide index
                    dot.addEventListener('click', () => showSlide(i)); // Add click listener
                    dotsContainer.appendChild(dot); // Add dot to the container
                });
            }

            /**
             * Updates the visual state of the dot indicators to reflect the active slide.
             * @param {number} index - The index of the currently active slide.
             */
            function updateDots(index) {
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    dot.classList.remove('active'); // Remove active class from all dots
                    if (i === index) {
                        dot.classList.add('active'); // Add active class to the current slide's dot
                    }
                });
            }

            // Lightbox functionality: handles opening and closing the zoomed image view
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                // Get the main title from the caption for the lightbox caption
                const captionTitle = slide.querySelector('.image-caption h2').textContent;
                // Get the full description from the caption for the lightbox caption
                const captionDescription = slide.querySelector('.image-caption p').textContent;

                // When an image in the carousel is clicked
                img.addEventListener('click', () => {
                    lightbox.style.display = 'flex'; // Show lightbox, using flex for centering
                    lightboxImg.src = img.src; // Set the image source
                    lightboxImg.alt = img.alt; // Set the alt text for accessibility
                    lightboxCaption.innerHTML = `<h2>${captionTitle}</h2><p>${captionDescription}</p>`; // Set caption
                });
            });

            // Close button for the lightbox
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none'; // Hide lightbox
            });

            // Close lightbox if clicked anywhere outside the image content itself
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) { // Check if the click was directly on the lightbox background
                    lightbox.style.display = 'none'; // Hide lightbox
                }
            });

            // Event Listeners for navigation buttons
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Keyboard navigation for accessibility and convenience
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') { // Right arrow key for next slide
                    nextSlide();
                } else if (e.key === 'ArrowLeft') { // Left arrow key for previous slide
                    prevSlide();
                } else if (e.key === 'Escape' && lightbox.style.display === 'flex') { // Escape key to close lightbox
                    lightbox.style.display = 'none';
                }
            });

            // Initial setup:
            createDots(); // Create dot indicators
            showSlide(currentSlide); // Show the first slide when the page loads
        });