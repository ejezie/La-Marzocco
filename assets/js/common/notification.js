const notyf = new Notyf({
	position: {
    x: 'center',
    y: 'top',
  },
	  types: [
	    {
	      type: 'info',
	      backgroundColor: 'orange',
	      icon: false
	    }
	  ]
	});


function notifyError(e){
	return notyf.error(e);
}

function notifySuccess(message){
	return notyf.success(message);
}

function notifyInfo(message){
	return notyf.open({ type: 'info', message: message});
}

function dismiss(id){
	notyf.dismiss(id);
}

