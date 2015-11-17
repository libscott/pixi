
makeGrid = (x, y, w, h, factory) ->
    all = new PIXI.Container()
    for j in [0..y-1]
        for i in [0..x-1]
            c = factory()
            c.x = c.xx = i*w
            c.y = c.yy = j*h
            all.addChild c
    return all

renderer = new PIXI.WebGLRenderer 1200, 800
document.body.appendChild renderer.view
stage = new PIXI.Container()

_frame = 0
_speed = 100
_step = 0
_resX = 160
_resY = 120

dot = new PIXI.Graphics()
dot.beginFill 0xFFFFFF
dot.drawCircle 0, 0, 2
dot = dot.generateTexture()

grid = makeGrid _resX, _resY, 6, 6, () -> new PIXI.Sprite(dot)
stage.addChild(grid)


animators = []


animators.push () ->
    videoContext.canvas.getContext('2d').drawImage videoContext.video, 0, 0

last = null
animators.push () ->
    rgb2hex = (r, g, b) -> ((r << 16) | (g << 8) | b).toString 16
    getrgb = (d, i) -> [d[i*4], d[i*4+1], d[i*4+2]]
    setrgb = (d, i, r, g, b) -> d[i*4] = r; d[i*4+1] = b; d[i*4+2] = g
    bias = (a, b, n) -> (a*n + b) / (n+1)
    pixels = videoContext.canvas.getContext('2d').getImageData 0, 0, _resX, _resY
    d = pixels.data
    if not last
        last = d
    i=0
    for s in grid.children
        x = i % _resX
        y = i / _resY >> 0
        [r, g, b] = getrgb d, i
        [r2, g2, b2] = getrgb last, i
        [r, g, b] = [(bias r2, b, 4), (bias g2, r, 4), (bias b2, g, 4)]
        setrgb last, i, r, g, b
        s.tint = '0x' + rgb2hex r, g, b
        i++







animate = () ->
    for animator in animators
        animator()
    renderer.render(stage)
    _frame += 1
    _step = _frame / _speed





videoContext = null
onVideo = (vc) ->
    videoContext = vc
    window.vc = vc
    window.setInterval animate, 1000/30
initVideo onVideo, _resX, _resY
