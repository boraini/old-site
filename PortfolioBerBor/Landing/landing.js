window.onload = setup;
function setup() {
const left = document.querySelector('.left .button');
const right = document.querySelector('.right .button');
const container = document.querySelector('.container');

left.addEventListener('mouseenter', () => {
    container.classList.add('hover-left');
});
left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left');
});
right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
});
right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right');
});
}
