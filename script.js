const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const searchContainer = document.getElementById('search-container');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
 // hero section 
 let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slider-image");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Auto slide functionality (optional)
setInterval(function() {
    plusSlides(1);
}, 5000); // Change image every 5 seconds





// login script 


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "" || password === "") {
      alert("Please fill out both fields.");
    } else {
      alert(`Welcome, ${username}!`);
      // Add authentication logic here
    }
  });



  //  register script  


  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
  
    if (firstName === "" || lastName === "" || email === "" || mobile === "") {
      alert("Please fill out all fields.");
    } else if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
    } else {
      alert(`Thank you for registering, ${firstName} ${lastName}!`);
      // Add backend logic here for registration
    }
  });
  


  // seller Product addition

  const productList = [];

  function addProduct() {
      // Get product details
      const name = document.getElementById('productName').value;
      const description = document.getElementById('productDescription').value;
      const price = document.getElementById('productPrice').value;
      const category = document.getElementById('productCategory').value;
      const image = document.getElementById('productImage').files[0];

      if (!name || !description || !price || !category || !image) {
          alert("Please fill all fields.");
          return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
          // Add product to the list
          productList.push({
              name,
              description,
              price,
              category,
              image: e.target.result // Base64 image string
          });
          renderProducts();
          clearForm();
      };
      reader.readAsDataURL(image);
  }

  function renderProducts() {
      const productListContainer = document.getElementById('productList');
      productListContainer.innerHTML = ''; // Clear existing products

      productList.forEach((product, index) => {
          const productItem = document.createElement('div');
          productItem.classList.add('product-item');
          productItem.innerHTML = `
              <h3>${product.name}</h3>
              <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
              <p><strong>Price:</strong> ₹${product.price}</p>
              <p><strong>Category:</strong> ${product.category}</p>
              <p><strong>Description:</strong> ${product.description}</p>
              <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
          `;
          productListContainer.appendChild(productItem);
      });
  }

  function deleteProduct(index) {
      productList.splice(index, 1); // Remove the product from the list
      renderProducts(); // Re-render the product list
  }

  function clearForm() {
      document.getElementById('productForm').reset();
  }


  //seller DashBoard script


  // Chart.js for the review graph
  const ctx = document.getElementById('reviewChart').getContext('2d');
  const reviewChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [{
              label: 'Customer Reviews',
              data: [3, 5, 7, 8, 12, 15, 18, 20, 22, 25],
              backgroundColor: 'rgba(40, 167, 69, 0.2)',
              borderColor: 'rgba(40, 167, 69, 1)',
              borderWidth: 2
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });