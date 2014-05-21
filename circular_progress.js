Template.circularProgress.progressContainer = function() {
    return this.containerId || 'svg-progress-container'
};

Template.circularProgress.rendered = function() {

    // parametrizable options
    // CSS classes used: progress-outer, progress-inner, progress-text
    if (!this.data)
        this.data = {} 
    var textPadding = this.data.textPadding || 0;
    var outerPadding = this.data.outerPadding || 20;
    var canvasSize = this.data.canvasSize || 300;
    var spacer = this.data.spacer || 5;
    var arcWidth = this.data.arcWidth || 10;
    var sessionValueKey = this.data.sessionValueKey || 'progressPercent';
    var sessionTextKey = this.data.sessionTextKey || 'progressText';
    var borderClass = this.data.borderClass || 'progress-border';
    var progressClass = this.data.progressClass || 'progress-circular-bar';
    var textClass = this.data.textClass || 'progress-text';
    var containerId = this.data.containerId || 'svg-progress-container';
    var tweenDuration = this.data.tweenDuration || 750;
    
    // internal variables
    var pi = Math.PI;
    var midPoint = canvasSize/2;
    var circleRadius = (canvasSize/2) - outerPadding;
    var outerRadius = circleRadius - spacer;
    var innerRadius = outerRadius - arcWidth;
    var center = midPoint.toString()+','+midPoint.toString();
    var svg = d3.select('#'+containerId).append('svg')
                .attr('width', canvasSize)
                .attr('height', canvasSize);

    // ugly lineHeight bandaid -- must revisit

    var lineHeight = $('#'+containerId).css('line-height').split('px')[0] === 'normal' ? 20 : $('#'+containerId).css('line-height').split('px')[0];
    var fontSize = $('#'+containerId).css('font-size').split('px')[0];

    var maxCharCount = Math.floor((2*innerRadius) / (fontSize / 2) - textPadding);

    // append the outer circle

    svg.append('circle')
        .attr('cx',midPoint)
        .attr('cy',midPoint)
        .attr('r',circleRadius)
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke','#aaa')
        .attr('class',borderClass);

    // same as above, create the arc without the end angle, since we don't know it yet

    var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0*(pi/180));

    var progressBar = svg.append('path')
                        .datum({endAngle: 0*(pi/180)})
                        .attr('d', arc)
                        .attr('fill', 'green')
                        .attr('class', progressClass)
                        .attr('transform', 'translate('+center+')');

    // function to enable moving the end angle back and forth as needed, using the same arc

    var arcTween = function (transition, newAngle) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
              d.endAngle = interpolate(t);
              return arc(d);
          };
      });
    }

    // function transform a string into an variable-length array of words, based on a given char count

    var wordWrap = function(str, charCount) {
        charCount = charCount || 50;
        cut = cut || false;
        var regex = '.{1,' +charCount+ '}(\\s|$)' + (cut ? '|.{' +charCount+ '}|.+$' : '|\\S+?(\\s|$)');
        return str.match(RegExp(regex,'g')) || [];
    };

    // set up the reactive animation 

    Deps.autorun(function() {
        var percent = Session.get(sessionValueKey) || 0;
        var radians = (percent/100*360) * (pi/180);
        progressBar.transition()
            .duration(tweenDuration)
            .call(arcTween, radians);
    });

    // set up the reactive text

    Deps.autorun(function() {
        var text = Session.get(sessionTextKey) || '';
        var wrapText = wordWrap(text, maxCharCount);
        var startPoint = midPoint - (fontSize * wrapText.length / 2);
        d3.selectAll('#'+containerId+' text').remove();
        for (var i = 0; i < wrapText.length; i++) {
            svg.append('text')
                .attr('x', midPoint)
                .attr('y', startPoint + (i * lineHeight))
                .attr('class', textClass)
                .attr('text-anchor', 'middle')
                .text(wrapText[i]);
        };
    });
}