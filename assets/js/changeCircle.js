function setSize( evt, circleSize ) {
  var circle = evt.getTarget();
  circle.setAttribute( "r", circleSize );
}
    
function setLocation( evt, newX, newY ) {
  var circle = evt.getTarget();
  circle.setAttribute( "cx", newX );
  circle.setAttribute( "cy", newY );
}

function setStyle( evt, newStyle ) {
  var circle = evt.getTarget();
  circle.setAttribute( "style", newStyle );
}