

var addArr = [{ 
				"user_id" : "A1",
				"add_id" : "A1AD1",
				"add_line_1" : "A1 Aaron Tower",
				"add_line_2" : "Aundh Road",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				},
				{ 
				"user_id" : "A1",
				"add_id" : "A1AD2",
				"add_line_1" : "B1 Blooming Dale",
				"add_line_2" : "Balewadi",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				},
				{ 
				"user_id" : "A1",
				"add_id" : "A1AD3",
				"add_line_1" : "C1 Citadel",
				"add_line_2" : "Chinchwad",
				"area_code" : "45267",
				"state" : "Maharashtra",
				"country" : "India",
				}]



async function showAddressSlider(addArr){

	var addSliderHTML = ""


	for(i=0; i<addArr.length;i++){

		addSliderHTML += '<div class="optionsecoptions" style="border-style: solid ; width: initial;font-family: trade gothic;font-size: 14px;width: 100%;">'
		addSliderHTML += ''+ addArr[i]["add_line_1"] + ', '+ addArr[i]["add_line_2"]+ ', ' + addArr[i]["area_code"]+ ', '+ addArr[i]["state"] + ', '+ addArr[i]["country"]+''
		addSliderHTML += '<br>'
		addSliderHTML += '<input type="checkbox" name="drone"><label style="font-size:13px">Billing Address</label>'
		addSliderHTML += '<br>'
		addSliderHTML += '<input type="checkbox" name="drone"><label style="font-size:13px">Shipping Address</label>'
		addSliderHTML += '</div>'
	}

	



	$("#addressSlider").append(addSliderHTML)
}

showAddressSlider(addArr)




// On button click change color
$(".select_add").click(function() {

	alert(this.id);
    $("button").each(function() {
           $(this).css("background-color", "#414141"); 
    });
   $(this).css("background-color", "#ae0000"); 
});


// JS for slider
// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   	showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
// }


// var selectedDiv = "";
// var x = document.getElementsByClassName('optionsecoptions')
// for (var i = 0; i < x.length; i++) {
//     x[i].addEventListener("click", function(){
        
//     var selectedEl = document.querySelector(".selected");
//     if(selectedEl){
//         selectedEl.classList.remove("selected");
//     }
//     this.classList.add("selected");
        
//     }, false);;
// }

// document.getElementById('confirmBtn').addEventListener('click',function(){
    
//     var selectedEl = document.querySelector(".selected");
//     if(selectedEl)
//         alert(selectedEl.innerText);    
//     else
//         alert('please choose an option')
// })