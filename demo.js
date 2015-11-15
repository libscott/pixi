var makeGrid = function(x, y, w, h) {
    var all = new PIXI.Container();
    for (var i=0; i<x; i++) {
        for (var j=0; j<y; j++) {
            var c = new PIXI.Container();
            c.x = i*w;
            c.y = j*h;
            var c1 = new PIXI.Container();
            c1.addChild(c);
            all.addChild(c1);
        }
    }
    return all;
}


var renderer = new PIXI.WebGLRenderer(300, 300);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var _frame = 0;
var _speed = 90;
var _step = 0;


var g = new PIXI.Graphics();
g.beginFill(0xBBBBBB);
g.drawCircle(0, 0, 1);
g.endFill();
var grid = makeGrid(20, 20, 3, 3);
grid.x = 100;
grid.y = 100;
stage.addChild(grid);
for (var i=0; i<grid.children.length; i++) {
    grid.children[i].children[0].addChild(g.clone());
}


function animate() {
    requestAnimationFrame(animate);
    for (var i=0; i<grid.children.length; i++) {
        grid.children[i].x = 40 * Math.sin(_step + i);
        grid.children[i].y = 80 * Math.cos(_step + i/3);
    }
    renderer.render(stage);
    _frame += 1;
    _step = _frame / _speed;
}


animate();
