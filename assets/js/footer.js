async function showFooter(){

	var footerHTML = ""
	footerHTML += '<div class="container">'
	footerHTML += '<div class="footer_top">'
	footerHTML += '<div class="row">'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<h3>melbourne showroom </h3>'
	footerHTML += '<p>104 Nicholson Street</p>'
	footerHTML += '<p>Abbotsford</p>'
	footerHTML += '<p>VIC 3067</p>'
	footerHTML += '<p>T +61 3 8413 4777</p>'
	footerHTML += '<p>info.australia@lamarzocco.com.</p>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<h3>sydney showroom</h3>'
	footerHTML += '<p>1b/32 Ralph St</p>'
	footerHTML += '<p>Alexandria</p>'
	footerHTML += '<p>NSW 2015</p>'
	footerHTML += '<p>T + 61 2 8396 6111</p>'
	footerHTML += '<p>info.australia@lamarzocco.com</p>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<h3>Terms & Conditions </h3>'
	footerHTML += '<p><a href="https://au.lamarzocco.com/privacy/">Privacy Policy</a></p>   '
	footerHTML += '<p><a href="https://au.lamarzocco.com/terms-conditions/">Terms & Conditions</a></p>   '
	footerHTML += '<p><a href="https://au.lamarzocco.com/code-of-ethics/">Ethics</a></p>   '
	footerHTML += '<p><a href="https://au.lamarzocco.com/wp-content/uploads/2018/04/Code-of-conduct.pdf">Code of conduct</a></p>  '
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<br><br>'
	footerHTML += '<div class="row">'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<h3>Parts Orders </h3>'
	footerHTML += '<p><a href="mailto:parts.australia@lamarzocco.com">parts.australia@lamarzocco.com</a></p>'
	footerHTML += '<p>T +61 2 8396 6111</p>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<p>© 1998-2019 La Marzocco S.r.l. a division of La </p>'
	footerHTML += '<p>Marzocco International LLC.Codice fiscale, Partita IVA e </p>'
	footerHTML += '<p>Iscrizione Registro Imprese di Firenze nr 04040140487</p>'
	footerHTML += '<p>- Capitale Sociale 52.000,00 Euro i.v.</p>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="col-lg-4 col-md-6">'
	footerHTML += '<div class="widgets_container">'
	footerHTML += '<h3>join us on</h3>'
	footerHTML += '<div class="link_follow">'
	footerHTML += '<ul>'
	footerHTML += '<li><a href="https://www.facebook.com/LaMarzoccoAustralia"><i class="ion-social-facebook"></i></a></li>'
	footerHTML += '<li><a href="https://twitter.com/lamarzocco"><i class="ion-social-twitter"></i></a></li>'
	footerHTML += '<li><a href="https://www.youtube.com/user/lamarzocco"><i class="ion-social-youtube"></i></a></li>'
	footerHTML += '<li><a href="https://www.instagram.com/lamarzoccoau/"><i class="ion-social-instagram"></i></a></li>'
	footerHTML += '</ul>'
	footerHTML += '</div> '
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="footer_bottom">'
	footerHTML += '<div class="row">'
	footerHTML += '<div class="col-lg-6 col-md-6">'
	footerHTML += '<div class="copyright_area">'
	// footerHTML += '<p>Copyright &copy; 2020 <a href="#">Autima</a> All Right Reserved.</p>'
	footerHTML += '<p>  &copy; 2020 <a href="#">La Marzocco enabled by PCPL</a></p>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '<div class="col-lg-6 col-md-6">'
	// footerHTML += '<div class="footer_payment text-right">'
	// footerHTML += '<a href="#"><img src="assets/img/icon/payment.png" alt=""></a>'
	// footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'
	footerHTML += '</div>'

	$("#footer").append(footerHTML)
}

showFooter()