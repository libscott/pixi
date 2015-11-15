var makeGrid = function(x, y, w, h, childFactory) {
    var all = new PIXI.Container();
    for (var i=0; i<x; i++) {
        for (var j=0; j<y; j++) {
            var c = childFactory();
            c.x = c.xx = i*w;
            c.y = c.yy = j*h;
            all.addChild(c);
        }
    }
    return all;
}

var makeRing = function(n, r, fac) {
    var ring = new PIXI.Container();
    var a = 2 * Math.PI / n;
    for (var i=0; i<n; i++) {
        var c = fac();
        c.x = c.xx = Math.sin(a * i) * r;
        c.y = c.yy = Math.cos(a * i) * r;
        ring.addChild(c);
    }
    return ring;
}


var renderer = new PIXI.WebGLRenderer(1200, 800);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
// stage.filters = [new PIXI.filters.BlurFilter()];

var _frame = 0;
var _speed = 300000;
var _step = 0;

var animators = [];

var g = new PIXI.Graphics();
g.beginFill(0xDDDDDD);
g.drawCircle(0, 0, 2);
var dot = g.generateTexture();

(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    n = 900;
    var a = 2 * Math.PI / n;
    var ring = makeRing(n, 400, s);
    ring.x = 300;
    ring.y = 300;
    stage.addChild(ring);

    animators.push(function() {
        for (var i=0; i<ring.children.length; i++) {
            var c = ring.children[i];
            a += _step;
            c.x = Math.sin(a + i) * (200 + Math.sin(i) * 100);
            c.y = Math.cos(a + i) * (200 + Math.sin(i) * 100);
        }
    });
})();


window.setInterval(function() {
    for (var i=0; i<animators.length; i++) {
        animators[i]();
        renderer.render(stage);
        _frame += 1;
        _step = _frame / _speed;
    }
}, 1000/30);




