
function appendOrderDetails(confirmedOrders){
		var html = "";


 		  html+= '<tr>';
		  html+= '<td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/color/96/000000/approval--v1.png" width="125" height="120" style="display: block; border: 0px;" /><br>';
		  html+= '<h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Order Confirmed! </h2>';
		  html+= '<h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>';
 		  html+= '</td>';
          html+= ' </tr>';
          html+= ' <tr>';
          html+= '  <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">';
          html+= '  <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Order Details will be sent to the registered E-mail Id and Phone Number. </p>';
          html+= '    </td>';
          html+= ' </tr>';


        for(order of confirmedOrders){
				html+= '<tr>';
				html+= '<td align="left" style="padding-top: 20px;">';
				html+= '<table cellspacing="0" cellpadding="0" border="0" width="100%">';
				html+= '<tr>';
				html+= '<td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation # </td>';
				html+= '<td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> '+order.sapid+' </td>';
				html+= '</tr>';
				html+= '<tr>';
				html+= '<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Purchased Items ('+order.itemCount+') </td>';
				html+= '<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> $'+order.subTotal+' </td>';
				html+= '</tr>';
				html+= '<tr>';
				html+= '<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Shipping  </td>';
				html+= '<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> $'+order.shipping+' </td>';
				html+= '</tr>';
				html+= '<tr>';
				html+= '<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Total Tax </td>';
				html+= '<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> $'+order.tax+' </td>';
				html+= '</tr>';
				html+= '</table>';
				html+= '</td>';
				html+= '</tr>';
				html+= '<tr>';
				html+= '<td align="left" style="padding-top: 20px;">';
				html+= '<table cellspacing="0" cellpadding="0" border="0" width="100%">';
				html+= '<tr>';
				html+= '<td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> Order Total </td>';
				html+= '<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> $'+order.total+' </td>';
				html+= '</tr>';
	}


		
		// html+= '</table>';
		// html+= '</td>';
		// html+= '</tr>';
		// html+= '</table>';
		// html+= '</td>';
		// html+= '</tr>';

		// $('#orderDetail > tbody:last-child').append(html);
		$('#orderDetail').html(html);
}

$(document).ready(function(){
		
		var confirmedOrders = localStorage.getItem("confirmedOrders");
		if(confirmedOrders){
			localStorage.removeItem("confirmedOrders");
			appendOrderDetails(JSON.parse(confirmedOrders));
		}else{
			alert("Please create a new order!");
			location.href = "index.html";
		}

})