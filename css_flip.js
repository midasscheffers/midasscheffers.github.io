if (localStorage.css_state_is_old == undefined){
	localStorage.css_state_is_old = true;
}

var is_old = localStorage.css_state_is_old == true;

var old_css_tag = "<link rel='stylesheet' type='text/css' href='css/style.css' id='css_link'>"
var new_css_tag = "<link rel='stylesheet' type='text/css' href='css/new_style.css' id='css_link'>"

function flip_css(){
	if (is_old){
		document.getElementById("css_link").outerHTML = new_css_tag;
		document.getElementById("flip_button_text").innerHTML = "change style to old";
		is_old = !is_old;
		localStorage.css_state_is_old = is_old;
	}
	else{
		document.getElementById("css_link").outerHTML = old_css_tag;
		document.getElementById("flip_button_text").innerHTML = "change style to new";
		is_old = !is_old;
		localStorage.css_state_is_old = is_old;
	}
}

function set_css_state(){
	if (is_old == true) {
		localStorage.css_state_is_old = is_old;
		document.getElementById("css_link").outerHTML = old_css_tag;
		document.getElementById("flip_button_text").innerHTML = "change style to new";
		console.log("use old");
	}
	else{
		localStorage.css_state_is_old = is_old;
		document.getElementById("css_link").outerHTML = new_css_tag;
		document.getElementById("flip_button_text").innerHTML = "change style to old";
		console.log("use new");
	}
}
