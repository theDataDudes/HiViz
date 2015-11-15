//directive for d3 island map
module.exports = [function () {
  return {
    restrict : 'E',
    templateUrl : 'views/barChart.html',
    scope : true,
    link : function (scope, element, attrs) {

      //Width and height
      var w = 500;
      var h = 800;

      //Create SVG element
      var svg = d3.select('#pipContainer')
                  .append('svg')
                  .attr('id', 'barChart')
                  .attr('width', w)
                  .attr('height', h);

      //watching for the data to resolve
      scope.$watch('collection', function (barData) {

        if (!barData) {
          return;
        }

        //add data and attributes
        var bars = svg.selectAll('rect')
            .data(barData);

        bars.enter()
        .append('rect');

        //setting single bar attributes
        bars.attr('id', 'barRect')
         .attr('fill', 'teal')
         .attr('x', function(d, i) {
          return i * (w / barData.length);
        })
         .attr('y', h - 1)
         .attr('width', 40)
         .attr('height', h);

        //init transition that occurs on page load
        bars.transition()
          .duration(1000)
          .delay(100)
          .attr('y', function (d) {
            return h - Math.floor((d.month.TOTAL.passengers / 5000));  //Height minus data value
          })
           .attr('height', function (d) {
            return Math.floor(d.month.TOTAL.passengers / 5000);
          })

      });

      //testing directive code
      console.log('i made it !');
    }
  }
}];