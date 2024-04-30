document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
      });
    }
  
    function prevSlide() {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      showSlide(currentIndex);
    }
  
    function nextSlide() {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      showSlide(currentIndex);
    }
  
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  });


  let parent = document.querySelector(".fake-product-card");
  parent.style.display = "flex";
  parent.style.flexWrap = "wrap";
  
  // img.setAttribute("class","fake-product-card-img");
  
  
  

  
 

let fun = async () =>
{
  await fetch("https://fakestoreapi.com/products")
  .then ((res,req) =>
  {
    console.log("fetch response : - " , res);
    return res.json();
  })
  .then ((res,req) =>
  {
    console.log("fetch response 2 : - " , res);
    for (const singleProduct of res) {
      // console.log(singleProduct.image);
      let card = document.createElement("div");
      card.style.display = "flex";
      card.style.height = "200px";
      card.style.width = "200px";
      let color = `rgb(61, 117, 217)`
      card.style.backgroundColor = color;
      card.style.justifyContent = "center";
      card.style.alignContent = "center";
      card.style.alignItems = "center";
      card.style.flexDirection = "column";
      card.style.border = "1px solid black";
      card.style.margin = "10px";
      card.style.padding = "10px";
      let h4 = document.createElement("h4");
      h4.innerText = singleProduct.title;
      card.appendChild(h4);
      let img = document.createElement("img");
      img.setAttribute("height", "100px");
      img.setAttribute("width", "100px");
      img.setAttribute("src", singleProduct.image);
      img.setAttribute("alt", "no image");
      // console.log("singleProduct.image : - " ,singleProduct.image);
      // console.log(singleProduct.image);
      card.appendChild(img);
      let h5 = document.createElement("h5");
      card.appendChild(h5);
      h5.innerText = singleProduct.price;
      parent.appendChild(card);
      console.log("single product id  : - " , singleProduct.id);
      console.log("single product title  : - " , singleProduct.title);
      console.log("single product price  : - " , singleProduct.price);
      console.log("single product category  : - " , singleProduct.category);
      console.log("single product description  : - " , singleProduct.description);
      console.log("single product image  : - " , singleProduct.image);
      console.log("single product rating  : - " , singleProduct.rating);
      
      
    }
    return res;
  })
  .catch((err) =>
  {
    console.log("Get an Error : - " , err);
  }) 
}

fun()


const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container-5 .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);