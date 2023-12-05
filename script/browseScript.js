$(document).ready(function() {
    // Retrieve JSON data from "jsonexdata.json" file
    $.getJSON("laptops.json", function(data) {
      var location = $("#data-col");

      // Iterate over each person object in the JSON data
      $.each(data, function(index, product) {
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


        $.getJSON("laptops.json", function(data) 
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

                let found = 
                (
                    test1 || test2 || test3 || test4 ||
                    test5 || test6 || test7 || test8 ||
                    test9 || test10 || test11
                );

                let item = document.getElementById("item" + index);

                if (found)
                {
                    item.style.display = "block";
                }
                else
                {
                    item.style.display = "none";
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


