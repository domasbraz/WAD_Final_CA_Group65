//Created by Adam Plesca
function btnClick() {
    const btn = document.getElementById("btn");
    $(document).ready(function () {
        $.getJSON("data/sale.json", function (data) {
            const location = $("#items"); 
            location.empty(); 
            const shuffledData = shuffleArray(data);

            for (let i = 0; i < 3; i++) {
                const product = shuffledData[i]; 
                if (product) {
                    //appends HTML elements to the "items" element to display product details
                    location.append($("<div class='name' id='name" + i + "'></div>"));
                    $("#name" + i).append($("<p></p>").text(product.details.brand))
                    $("#name" + i).append($("<p></p>").text(product.name))
                    $("#name" + i).append($("<p></p>").html("<s>€" + product.oldPrice + "</s>"));
                    $("#name" + i).append($("<p></p>").text("€" + product.price))
                    $("#name" + i).append($("<img class='indexImg' src='../" + product.image + "'>"))
                }
            }
        });
    });
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const ranNum = Math.floor(Math.random() * (i + 1));
            [array[i], array[ranNum]] = [array[ranNum], array[i]];
        }
        return array;
    }
}