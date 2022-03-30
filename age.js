
function calculateAge(date) {
  const now = new Date();
  const diff = Math.abs(now - date);
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
  return age
}

var text = document.getElementById("age")
var age = calculateAge((new Date(2003, 9, 24)))
text.innerHTML = age
