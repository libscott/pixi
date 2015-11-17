

window.initVideo = (callback, width=320, height=240) ->
    navigator.getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.msGetUserMedia or navigator.oGetUserMedia
    video = document.createElement 'video'
    video.width = width
    video.height = height
    canvas = document.createElement 'canvas'
    handleVideo = (stream) ->
        video.src = URL.createObjectURL stream
        video.addEventListener 'canplay', (e) ->
            video.play()
            console.log video.videoWidth, video.videoHeight
            callback (stream: stream, video: video, canvas: canvas)
    spec =
        video:
            mandatory:
                minWidth: width
                minHeight: height
                maxWidth: width
                maxHeight: height
    navigator.getUserMedia spec, handleVideo, (e) -> console.log(e)

