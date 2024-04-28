let next = document.querySelector(".next");
let previous = document.querySelector(".previous");
let sliderImages = document.querySelectorAll(".slider-images");
let count = 1;
sliderImages[0].style.display = "block";

next.addEventListener("click", () =>
{
    if(count == 4)
    {
        count = 1;
    }
    sliderImages[count].style.display = "none";
    sliderImages[0].style.display = "none";
    if( count == 1 )
    {
        sliderImages[0].style.display = "none";
        sliderImages[1].style.display = "block";
    }
    console.log("count value before any opration : - " , count);
    sliderImages[count].style.display = "block";
    
    count++;
    console.log("count value after any opration : - " , count);

        
        
    console.log("Next button was clicked!");
})

previous.addEventListener("click", () =>
{
    console.log("Previous button was clicked!");
})

console.log("All slider images : - " , sliderImages);