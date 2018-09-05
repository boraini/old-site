var ratio = 480 / 360;
var canvaswidth = 480;
var pi = 3.141592654;
var svgns = "http://www.w3.org/2000/svg";
var canvas;
var context;
var textures = {bodies: [], heads: []};
var paintscale = 1;
var jstextures = document.createElement("img");
var hitRegions = [];
var mouse = {x: 0, y: 0};
jstextures.src = "textures.svg";
function start() {
canvas = document.getElementById("game");
context = canvas.getContext("2d");
textures.bodies[0] = extractTexture("body1");
textures.bodies[1] = extractTexture("body2");
textures.bodies[2] = extractTexture("body3");
textures.heads[0] = extractTexture("head1");
textures.heads[1] = extractTexture("head2");
textures.heads[2] = extractTexture("head3");
arrangeElements();
console.log(loadControls("gamecontrols"));
addEventListener("resize", arrangeElements);
var listener = canvas.addEventListener("pointermove", mouseUpdates, true);
if (!listener) listener = canvas.addEventListener("mousemove", mouseUpdates, true);
}
function extractTexture(id) {
var group = document.getElementById("textures").contentDocument.getElementById(id);
var output = document.createElement("img");
if (group) {
var svg = document.createElementNS(svgns, "svg");
svg.appendChild(document.importNode(group, true));
svg.setAttribute("width", group.getAttribute("width"));
svg.setAttribute("height", group.getAttribute("height"));
var serialized = new XMLSerializer().serializeToString(svg);
var uri = "data:image/svg+xml;base64," + btoa(serialized);
output.setAttribute("src", uri);
output.setAttribute("width", svg.getAttribute("width"));
output.setAttribute("height", svg.getAttribute("height"));
output.setAttribute("cx", group.getAttribute("cx"));
output.setAttribute("cy", group.getAttribute("cy"));
output.addEventListener("load", markAsLoaded);
}
return output;
}
function markAsLoaded(e) {
if (e.target) {
e.target.setAttribute("ready", true);
}
}
function arrangeElements() {
if (window.innerWidth / window.innerHeight > ratio) {
canvas.width = Math.round(window.innerHeight * ratio);
canvas.height = window.innerHeight;
}
else {
canvas.height = Math.round(window.innerWidth / ratio);
canvas.width = window.innerWidth;
}
paintscale = canvas.width / canvaswidth;
context.setTransform(paintscale, 0, 0, paintscale, 0, 0);
render(context);
}
function loadControls(id) {
var includes = document.getElementById(id);
var controls = document.getElementById("maincontrols");
if (includes) {
while (controls.firstChild) controls.removeChild(controls.firstChild);
for (control of includes.children)
{
controls.appendChild(control.cloneNode(true));
}
}
return includes;
}
function render(ctx) {
ctx.clearRect(0, 0, canvaswidth, canvaswidth / ratio);
ctx.fillStyle = "white";
renderSprite(ctx, textures.bodies[0], -240, -180, pi / 4, 1);
renderSprite(ctx, textures.bodies[1], 0, 0, 0, 1);
renderSprite(ctx, textures.bodies[2], 240, 180, 0, 1);
}
function renderSprite(ctx, skin, x, y, r, s) {
ctx.save();
ctx.translate(x + 240, 180 - y);
ctx.rotate(r - (pi / 2));
ctx.scale(s, s);
ctx.translate(-parseFloat(skin.getAttribute("cx")), -parseFloat(skin.getAttribute("cy")));
ctx.drawImage(skin, 0, 0);
ctx.restore();
}
function mouseUpdates(e) {
e.preventDefault();
mouse.x = (e.clientX - canvas.getBoundingClientRect().left) / paintscale - canvaswidth / 2;
mouse.y = canvaswidth / ratio / 2 - (e.clientY - canvas.getBoundingClientRect().top) / paintscale;
document.getElementById("debug").innerHTML = "Pointer x: " + Math.round(mouse.x * 10) / 10 + ", y: " + Math.round(mouse.y * 10) / 10;
}
