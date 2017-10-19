   testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|'  +
                            'Opera Mini|IEMobile|Mobile' , 'i');
  
    if (testExp.test(navigator.userAgent)) {
        d3.select("div").select("text").html("Touch the section of the waveform that you want to hear.")
    }

    var width = 960,
        height = 230,
        waveHeight = 200,
        sampleCount = 8;

    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)

    var waveShape = svg.append("g")
        .attr("id", "waveShape")
        .append("path")
        .attr("transform", "translate(0,30)")
        
    var cuts = svg.append("g").selectAll("g")
        .data(d3.range(sampleCount))
      .enter().append("g")
        .attr("transform", function(d, i) {return "translate("+ width/sampleCount*i + ",30)"})

    cuts.append("rect")
        .attr("id", function(d, i) {return "rect"+i})
        .attr("height",waveHeight)
        .attr("width",width/sampleCount)
        .attr("stroke-dasharray", [3,3])
        .on("touchstart", function(d, i) {playSound(i);})

    cuts.append("text")
        .attr("transform", "translate(0," + -10 + ")")
        .text(function(d, i) {return i+1})

    var position = svg.append("line")
        .attr("y2", waveHeight)

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        source = null,
        beatData = importAudio("ccheer.wav");


    function importAudio(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'arraybuffer';
        req.onload = function() {audioCtx.decodeAudioData(req.response, loadAudio)}
        req.send();

        function loadAudio(buffer) {
            beatData = buffer;

            var waveData = d3.values(beatData.getChannelData(0))
                .filter(function(d,i) {return i % 10 == 0})
            
            var xScale = d3.scaleLinear().range([0, width]).domain([0, waveData.length]);
            
            var line = d3.line()
                .x(function(d, i) {return xScale(i)})
                .y(function(d) {return waveHeight/2*d+waveHeight/2});

            waveShape.datum(waveData).attr("d",line) 
        }
    }

    function playSound(i) {
        if (source) {source.stop();}

        source = audioCtx.createBufferSource();
        source.buffer = beatData;
        source.connect(audioCtx.destination);
        source.start(0, beatData.duration/sampleCount*i);

        positionSlide(i);

        function positionSlide(n) {
            cuts.selectAll("rect")
                .transition().duration(100)
                .style("fill-opacity", function() {return (this.id == "rect"+n) ? .2 : 0})

            position.style("visibility", "visible")
                .transition().duration(0)
                .attr("transform", "translate(" + width/sampleCount*n + ",30)")
                .transition().duration(beatData.duration/sampleCount*1000).ease(d3.easeLinear)
                    .attr("transform", "translate(" + width/sampleCount*++n + ",30)")
                    .on("end", function() {n < sampleCount ? positionSlide(n) : playSound(0)})
        }
    }

    function stopSound() {
        if (source) {source.stop();}
        
        position.interrupt()
            .style("visibility", "hidden")
            .attr("transform", "translate(0,30)");

        cuts.selectAll("rect")
            .transition().duration(100)
            .style("fill-opacity", 0)
    }

    document.body.onkeydown = function(e){
        var thisKey = e.keyCode-48;
        if (thisKey > 0 && thisKey < 9) {playSound(thisKey-1)}
    };