var makeGrid = function(x, y, w, h, childFactory) {
    var all = new PIXI.ParticleContainer();
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


var renderer = new PIXI.WebGLRenderer(1200, 800);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var _frame = 0;
var _speed = 550;
var _step = 0;

var animators = [];

var g = new PIXI.Graphics();
g.beginFill(0xDDDDDD);
g.drawCircle(0, 0, 1);
var dot = g.generateTexture();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(20, 50, 3, 3, s);
    grid.x = 200;
    grid.y = 120;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.xx + 80 * Math.sin(_step + i);
            c.y = c.yy + 90 * Math.cos(_step + i/2);
        }
    });
})();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(30, 50, 6, 0, s);
    grid.x = 500;
    grid.y = 120;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.xx + 40 * Math.cos(_step + i);
            c.y = c.xx + 80 * Math.sin(_step + i);
        }
    });
})();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(20, 20, 5, 8, s);
    grid.x = 900;
    grid.y = 120;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.xx + 40 * Math.sin(_step + i);
            c.y = c.yy + 80 * Math.cos(_step + i/3);
        }
    });
})();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(50, 20, 5, 4, s);
    grid.x = 100;
    grid.y = 500;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.xx + Math.sin(_step);
            c.y = c.yy + 80 * Math.cos(_step + i/3);
        }
    });
})();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(50, 20, 3, 4, s);
    grid.x = 550;
    grid.y = 500;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.yy + 40 * Math.sin(_step + i);
            c.y = c.xx + 80 * Math.cos(_step + i/3);
        }
    });
})();


(function() {
    var s = function() { return new PIXI.Sprite(dot) };
    var grid = makeGrid(20, 20, 6, 6, s);
    grid.x = 800;
    grid.y = 500;
    stage.addChild(grid);

    animators.push(function() {
        for (var i=0; i<grid.children.length; i++) {
            var c = grid.children[i];
            c.x = c.yy + 40 * Math.abs(Math.log(Math.sin(_step + i)));
            c.y = c.xx + 80 * Math.sin(_step + i/3);
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




