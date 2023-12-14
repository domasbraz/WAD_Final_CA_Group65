function showProductDetails(product) {
  const productDetailsContainer = document.getElementById('productDetails');
  productDetailsContainer.innerHTML =
      `
    <div class="product-details-container">
      <img src="images/${product.image}" width="200px">
      <ul>
          <h2>${product.name}</h2>
          <h2><strong>Price:</strong> €${product.price}</h2>
          <h2><strong>Category:</strong> ${product.category}</h2>
          <br>
          <br>
          <h2><strong>Details:</strong></h2> 
          <li><strong>Brand:</strong> ${product.details.brand}</li>
          ${product.details.series ? `<li><strong>Series:</strong> ${product.details.series}</li>` : ''}
          ${product.details.cpu ? `<li><strong>CPU:</strong> ${product.details.cpu}</li>` : ''}
          ${product.details.gpu ? `<li><strong>GPU:</strong> ${product.details.gpu}</li>` : ''}
          ${product.details.ram ? `<li><strong>Ram:</strong> ${product.details.ram}</li>` : ''}
          ${product.details.storage ? `<li><strong>Storage:</strong> ${product.details.storage}</li>` : ''}
          ${product.details.screen ? `<li><strong>Screen:</strong> ${product.details.screen}</li>` : ''}
          ${product.details.camera ? `<li><strong>Camera:</strong> ${product.details.camera}</li>` : ''}
          ${product.details.batteryLife ? `<li><strong>battery life:</strong> ${product.details.batteryLife}</li>` : ''}
          ${product.details.chip ? `<li><strong>Chip:</strong> ${product.details.chip}</li>` : ''}
          ${product.details.os ? `<li><strong>Operating System:</strong> ${product.details.os}</li>` : ''}
          ${product.details.colour ? `<li><strong>Colour:</strong> ${product.details.colour}</li>` : ''}
          ${product.details.model ? `<li><strong>Model:</strong> ${product.details.model}</li>` : ''}
          ${product.details.yearReleased ? `<li><strong>Year released:</strong> ${product.details.yearReleased}</li>` : ''}
          ${product.details.description ? `<li><strong>Description:</strong> ${product.details.description}</li>` : ''}
      </ul>
    </div>
      
  `;

  // Display the product details container
  productDetailsContainer.style.display = 'block';
}

// Function to populate the product list
function populateProductList(products) {
  const productListContainer = document.getElementById('productList');

  $.each(products, function(index, product) {

    //lines 44-51 made by Domas Brazdeikis
    //gets product index set by "browse" page
    var itemIndex = localStorage.getItem("itemIndex");
    //if index matches the current product index in the loop, display the product info
    if (itemIndex == index)
    {
      showProductDetails(product);
    }

    /*
      const listItem = document.createElement('li');
      listItem.className = 'product-item';
      listItem.textContent = product.name;

      // Add click event listener to show product details
      
      listItem.addEventListener('click', () => showProductDetails(product));
      

      productListContainer.appendChild(listItem);
      */

  });
}


$(document).ready(function () {
  // Retrieve JSON data using $.getJSON
  $.getJSON("data/products.json", function (data) {
    // Process the data
    populateProductList(data);
  });
});
