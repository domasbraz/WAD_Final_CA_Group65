//made by Domas Brazdeikis

$(document).ready(function() 
{
    //Retrieve JSON data from "products.json" file
    $.getJSON("data/products.json", function(data) 
    {
      var location = $("#data-col");

      //loops through each product, displays the data
      $.each(data, function(index, product) 
      {

          //creates tables inside of divs for each product
          location.append($("<div class='data-row' id='item" + index + "'></div>"));
          $("#item" + index).append($("<table id='table" + index + "'></table>"));
          $("#table" + index).append($("<tr id='row" + index + "'></tr>"));
          var row = $("#row" + index);
          row.append($("<td><img class='imgBrowse' src='images/" + product.image + "' width='200px' onclick='viewProduct(" + index + ")'></td>"));
          row.append($("<td class='textBrowse' id='textData" + index + "'></td>"));
          var tableData = ($("#textData" + index));
          tableData.append($("<h2 onclick='viewProduct(" + index + ")'></h2>").text(product.name));
          tableData.append($("<h1></h1>").append($("<br>")));
          tableData.append($("<h1></h1>").text("€" + product.price));

          //checks if this function is called
          success = true;

          setCategory();

      })
  });
});

//sets which product the user wants to view in detail, so that the next page can retrieve it
function viewProduct(index)
{
    localStorage.setItem("itemIndex", index);

    window.location.assign("products.html");
}


var success;

//search function
function searchBar()
{
    //check if json file was retrieved successfully
    if (success)
    {

        //converts the text inside of the text field into a regular expression
        //the "i" stands for case insensitive
        let serchTerm = new RegExp((document.getElementById("searchBar").value), "i");

        //checks which category radio button is checked
        var categoryFilter = document.querySelector('input[name="Category"]:checked').value;

        //checks which price radio button is checked
        var priceRange = document.querySelector('input[name="Price"]:checked').value;

        let anyMatch = false;

        if (categoryFilter == "all")
        {
            //changes filter value so that it will always find a match
            categoryFilter = "";
        }

        //retrieves json file
        $.getJSON("data/products.json", function(data) 
        {

            $.each(data, function(index, product) 
            {

                //testing for matches within the data
                let test1 = serchTerm.test(product.name);
                let test2 = serchTerm.test(product.category);
                let test3 = serchTerm.test(product.details.brand);
                let test4 = serchTerm.test(product.details.series);
                let test5 = serchTerm.test(product.details.cpu);
                let test6 = serchTerm.test(product.details.gpu);
                let test7 = serchTerm.test(product.details.ram);
                let test8 = serchTerm.test(product.details.storage);
                let test9 = serchTerm.test(product.details.os);
                let test10 = serchTerm.test(product.details.colour);
                let test11 = serchTerm.test(product.details.model);
                let test12 = serchTerm.test(product.details.features);
                let test13 = serchTerm.test(product.details.chip);
                let test14 = serchTerm.test(product.details.camera);
                let test15 = serchTerm.test(product.details.screen);
                let test16 = serchTerm.test(product.details.batteryLife);

                let found = 
                (
                    test1 || test2 || test3 || test4 ||
                    test5 || test6 || test7 || test8 ||
                    test9 || test10 || test11 || test12 ||
                    test13 || test14 || test15 || test16
                );

                //converts the filte value into a regular expression, case insensitive
                let categorySearch = new RegExp(categoryFilter, "i");

                //checks if the product matches the category
                let categoryMatch = categorySearch.test(product.category);

                //select the created div
                let item = document.getElementById("item" + index);

                //checks if the current product matches the search
                if (found && categoryMatch && inPriceRange(product.price, priceRange))
                {
                    //sets visibility of the item
                    item.style.display = "block";
                    anyMatch = true;
                }
                else
                {
                    item.style.display = "none";
                }

                //checks if any match is found while performing the loop
                if (anyMatch)
                {
                    document.getElementById("errorMsg").style.display = "none";
                }
                else
                {
                    //if nothing is found, displays error message
                    document.getElementById("errorMsg").style.display = "block";
                }
            })
        });
    }
    else
    {
        //error message if json failed to load
        console.log("error: json not found!");
    }

    
}

//performs search function if "enter" key is pressed in search field
document.getElementById("searchBar").addEventListener("keydown", (event) =>
{
    if (event.key == "Enter")
    {
		searchBar();
	}
}
);

//performs animations
function moreOptions()
{
    move();
    reSize();
}

//movement animation
function move()
{
    //gets the div that will be moved
    let options = document.getElementById("options");

    //gets styling property of "left" from the div
    //https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp
    let pos = window.getComputedStyle(options).getPropertyValue('left');
    
    //converts the value into an integer
    let pos2 = parseInt(pos);

    //checks the current possition of the div
    if (pos2 == -100)
    {
        //makes div visible
        options.style.visibility = "visible";
        //starts animation
        posAni = setInterval(popIn, 5);

        function popIn() 
        {
            if (pos2 == 0) 
            {
                //stops animation
                clearInterval(posAni);
            } 
            else 
            {
                //changes div possition
                pos2 += 5;  
                options.style.left = pos2 + "px";
            }

        }
    }
    else
    {
        //starts animation
        posAni = setInterval(popOut, 5);

        function popOut()
        {
            if (pos2 == -100)
            {
                //stops animation
                clearInterval(posAni);
                //makes div invisible
                options.style.visibility = "hidden";
            }
            else
            {
                //changes div possition
                pos2 -= 5;
                options.style.left = pos2 + "px";
            }
        }
    }
}

//the width of a div set in css, used for animation
//set manually since it is set in percentage
var width = 5;

//resizing animation
function reSize()
{
    //gets div
    let options = document.getElementById("options");

    //checks current width
    if (width == 5)
    {
        //starts animation
        let sizeAni = setInterval(sizeUp, 5);

        function sizeUp()
        {
            if (width == 10)
            {
                //stops animation
                clearInterval(sizeAni);
            }
            else
            {
                //adjusts width
                width++;
                options.style.width = width + "%";
            }
        }
    }
    else
    {
        //starts animation
        let sizeAni = setInterval(sizeDown, 5);

        function sizeDown()
        {
            if (width == 5)
            {
                //stops animation
                clearInterval(sizeAni);
            }
            else
            {
                //adjusts width
                width--;
                options.style.width = width + "%";
            }
        }
    }


}

//testing purposes
/*function alertChecked()
{
    alert(document.querySelector('input[name="Category"]:checked').value);
}*/
//alert(document.querySelector('input[name="Category"]:checked').parentElement.nodeName);

//changes which radio button is checked
function changeChecked(value)
{
    document.querySelector('input[value="' + value + '"]').checked = true;
}

//checks if product is in price range, used in search function
function inPriceRange(value, range)
{
    switch (range)
    {
        case "any":
            return true;

        case "low":
            return (value >= 40 && value <= 500);

        case "mid":
            return (value >= 500 && value <= 1000);

        case "high":
            return (value >= 1000);
    }
}

//sets category if chosen from index page
function setCategory()
{
    let category = localStorage.getItem("itemCategory");

    //checks if value is empty
    if (category.length > 0)
    {
        changeChecked(category);
        searchBar();
    }
}

