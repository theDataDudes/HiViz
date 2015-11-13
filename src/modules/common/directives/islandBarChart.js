//directive for d3 island map
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : {},
    templateUrl : 'views/chart.html',
    link : function () {

      // fake data
      dataset = [4,8,12,16,24,50];

      //Width and height
      var w = 500;
      var h = 100;

      //Create SVG element
      var svg = d3.select('#pipContainer')
                  .append('svg')
                  .attr('id', 'barChart')
                  .attr('width', w)
                  .attr('height', h);

      var bars = svg.selectAll('rect')
         .data(dataset)
         .enter()
         .append('rect')
         .attr('id', 'barRect')
         .attr('fill', 'teal')
         .attr('x', function(d, i) {
          return i * (w / dataset.length);
        })
         .attr('y', h - 1)
         .attr('width', 40)
         .attr('height', 1);

      bars.transition()
        .duration(1000)
        .delay(100)
        .attr('y', function (d) {
          return h - (d * 4);  //Height minus data value
        })
         .attr('height', function (d) {
          return d * 4;
        })
      console.log('i made it !');
    }
  }
}];