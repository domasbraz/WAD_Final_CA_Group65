//Created by Adam Plesca
function btnClick() {
    const btn = document.getElementById("btn");
    //jQuery waits for document to be ready
    $(document).ready(function () {
       //makes AJAX call to load the json data from the file
        $.getJSON("data/sale.json", function (data) {
            //gets location of where products will be placed
            const location = $("#items"); 
            //clears location in case products are already there, to maintain only 3 elements at a time on the webpage
            location.empty(); 
            //call function from lower to shuffle json data
            const shuffledData = shuffleArray(data);
            //prints out the first 3 json elements which have already been shuffled
            for (let i = 0; i < 3; i++) {
                const product = shuffledData[i]; 
                if (product) {
                    //json index mismatch fix
                    getCorrectIndex(product, function(index) 
                    {
                        //appends HTML elements to the "items" element to display product details
                        location.append($("<div class='name' id='name" + i + "' onclick='viewProduct(" + index + ")'></div>"));
                        $("#name" + i).append($("<p></p>").text(product.details.brand))
                        $("#name" + i).append($("<p></p>").text(product.name))
                        $("#name" + i).append($("<p></p>").html("<s>€" + product.oldPrice + "</s>"));
                        $("#name" + i).append($("<p></p>").text("€" + product.price))
                        $("#name" + i).append($("<img class='indexImg' src='../images/" + product.image + "'>"))
                    });
                }
            }
        });
    });
    //function to shuffle json file, traverses the json file backwards, and generates a random index "ranNum" then swaps the two points and returns the shuffled array/json file
    //eg i=15 ranNum = 12. the 15 element in the json file gets placed in the 12 postion, and will do this for each element it iterates until the for loop reaches 0
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const ranNum = Math.floor(Math.random() * (i + 1));
            [array[i], array[ranNum]] = [array[ranNum], array[i]];
        }
        return array;
    }
}

//line 52-97 by Domas Brazdeikis
//redirect user to item info page using item index
function viewProduct(index)
{
    localStorage.setItem("itemIndex", index);

    window.location.assign("products.html");
}

/*full explanatin:
Adam has used a seperate json file for his code, this file does not match the index of "products" file
therefore the "products" index must be identified in order to view the products
this function indentifies the right index to set the correct parameter for the onclick event
*/
function getCorrectIndex(product, callback)
{
    var indexVal;
    //gets the main products file that has every product
    $.getJSON("data/products.json", function (items)
    {
        
        $.each(items, function(index, original)
        {
            //checks for matching unique data
            if (product.image == original.image)
            {
                indexVal = index;
                //stops the loop
                return false;
            }
        }
        );
        //$.getJSON function is asynchronous, therefore a callback function is neccessary to return the variable
        callback(indexVal);
    }
    );
    
}

//sets category and redirects user to browse page
function chooseCategory(category)
{
    localStorage.setItem("itemCategory", category);

    window.location.assign("browse.html");
}
