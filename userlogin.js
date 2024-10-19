const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('firstName');

if (firstName) {
const loginLink = document.getElementById('loginLink');
loginLink.innerHTML = `<h4 style="color: white; font-weight:500">${firstName}</h4>`;
}