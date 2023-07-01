// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenDetail = document.querySelector('#ramen-detail');
    const newRamenForm = document.querySelector('#new-ramen');
  
    // Fetch all ramen data and display the images
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.dataset.id = ramen.id;
          img.classList.add('clickable');
          ramenMenu.appendChild(img);
        });
      });
  
    // Handle click event on ramen images
    ramenMenu.addEventListener('click', event => {
      if (event.target.classList.contains('clickable')) {
        const ramenId = event.target.dataset.id;
        fetch(`http://localhost:3000/ramens/${ramenId}`)
          .then(response => response.json())
          .then(ramen => {
            // Update the ramen detail div with the retrieved data
            ramenDetail.innerHTML = `
              <img src="${ramen.image}" alt="${ramen.name}">
              <h2>${ramen.name}</h2>
              <h3>${ramen.restaurant}</h3>
              <p>Rating: ${ramen.rating}</p>
              <p>Comment: ${ramen.comment}</p>
            `;
          });
      }
    });
  
    // Handle form submission for creating a new ramen
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();
  
      // Retrieve form field values
      const name = document.querySelector('#new-name').value;
      const restaurant = document.querySelector('#new-restaurant').value;
      const image = document.querySelector('#new-image').value;
      const rating = document.querySelector('#new-rating').value;
      const comment = document.querySelector('#new-comment').value;
  
      // Create a new ramen object
      const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment
      };
  
      // Update the DOM with the new ramen image
      const img = document.createElement('img');
      img.src = image;
      img.classList.add('clickable');
      ramenMenu.appendChild(img);
  
      // Reset form fields
      newRamenForm.reset();
    });
  });
  