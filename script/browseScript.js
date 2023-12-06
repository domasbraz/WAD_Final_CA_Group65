$(document).ready(function() {
    // Retrieve JSON data from "jsonexdata.json" file
    $.getJSON("data/products.json", function(data) 
    {
      var location = $("#data-col");

      // Iterate over each person object in the JSON data
      $.each(data, function(index, product) 
      {
          location.append($("<div class='data-row' id='item" + index + "'></div>"));
          $("#item" + index).append($("<table id='table" + index + "'></table>"));
          $("#table" + index).append($("<tr id='row" + index + "'></tr>"));
          var row = $("#row" + index);
          row.append($("<td><img src='images/" + product.image + "' width='200px'></td>"));
          row.append($("<td class='text' id='textData" + index + "'></td>"));
          var tableData = ($("#textData" + index));
          tableData.append($("<h2></h2>").text(product.name));
          tableData.append($("<h1></h1>").append($("<br>")));
          tableData.append($("<h1></h1>").text("€" + product.price));

          success = true;

      })
  });
})

var success;

function searchBar()
{
    if (success)
    {
        let serchTerm = new RegExp((document.getElementById("searchBar").value), "i");

        var categoryFilter = document.querySelector('input[name="Category"]:checked').value;

        var priceRange = document.querySelector('input[name="Price"]:checked').value;

        let anyMatch = false;

        if (categoryFilter == "all")
        {
            categoryFilter = "";
        }

        $.getJSON("data/products.json", function(data) 
        {

            $.each(data, function(index, product) 
            {
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

                let categorySearch = new RegExp(categoryFilter, "i");

                let categoryMatch = categorySearch.test(product.category);

                let item = document.getElementById("item" + index);

                if (found && categoryMatch && inPriceRange(product.price, priceRange))
                {
                    item.style.display = "block";
                    anyMatch = true;
                }
                else
                {
                    item.style.display = "none";
                }

                if (anyMatch)
                {
                    document.getElementById("errorMsg").style.display = "none";
                }
                else
                {
                    document.getElementById("errorMsg").style.display = "block";
                }
            })
        });
    }
    else
    {
        console.log("error: json not found!");
    }

    
}

document.getElementById("searchBar").addEventListener("keydown", (event) =>
{
    if (event.key == "Enter")
    {
		searchBar();
	}
}
);
function moreOptions()
{
    move();
    reSize();
}

function move()
{
    let options = document.getElementById("options");
    //https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp
    let pos = window.getComputedStyle(options).getPropertyValue('left');
    
    let pos2 = parseInt(pos);
    if (pos2 == -100)
    {
        options.style.visibility = "visible";
        posAni = setInterval(popIn, 5);

        function popIn() 
        {
            if (pos2 == 0) 
            {
            clearInterval(posAni);
            } 
            else 
            {
            pos2 += 5;  
            options.style.left = pos2 + "px";
            }

        }
    }
    else
    {
        posAni = setInterval(popOut, 5);

        function popOut()
    {
        if (pos2 == -100)
        {
            clearInterval(posAni);
            options.style.visibility = "hidden";
        }
        else
        {
            pos2 -= 5;
            options.style.left = pos2 + "px";
        }
    }
    }
}
var width = 5;
function reSize()
{
    let options = document.getElementById("options");

    if (width == 5)
    {
        let sizeAni = setInterval(sizeUp, 5);

        function sizeUp()
        {
            if (width == 10)
            {
                clearInterval(sizeAni);
            }
            else
            {
                width++;
                options.style.width = width + "%";
            }
        }
    }
    else
    {
        let sizeAni = setInterval(sizeDown, 5);

        function sizeDown()
        {
            if (width == 5)
            {
                clearInterval(sizeAni);
            }
            else
            {
                width--;
                options.style.width = width + "%";
            }
        }
    }


}

function alertChecked()
{
    alert(document.querySelector('input[name="Category"]:checked').value);
}

function changeChecked(value)
{
    document.querySelector('input[value="' + value + '"]').checked = true;
}

//alert(document.querySelector('input[name="Category"]:checked').parentElement.nodeName);

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

