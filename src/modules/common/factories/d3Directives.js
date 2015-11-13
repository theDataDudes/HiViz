//directive for d3
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : {},
    templateUrl : 'views/chart.html',
    link : function () {
      var width = 960;
      var height = 500;
      var centered;

      d3.select(window)
        .on('resize', sizeChange);

      var projection = d3.geo.albersUsa()
          .scale(4280)
          .translate([width / 0.80, -550]);

      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select('#mainContent').append('svg')
          .attr('width', '80%')
          .attr('height', height);

      svg.append('rect')
          .attr('class', 'background')
          .attr('width', width)
          .attr('height', height)
          .on('click', clicked);

      var g = svg.append('g');

      d3.json('/hawaii.json', function(error, hawaii) {
        if (error) throw error;

        g.append('g')
            .attr('id', 'states')
          .selectAll('path')
            .data(hawaii.features)
          .enter().append('path')
            .attr('d', path)
            .on('click', clicked);

        g.append('path')
            .datum(hawaii.features, function(a, b) { return a !== b; })
            .attr('id', 'state-borders')
            .attr('d', path);
      });

      function clicked(d) {
        var x;
        var y;
        var k;

        if (d && centered !== d) {
          var centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          k = 4;
          centered = d;
        } else {
          x = width / 2;
          y = height / 2;
          k = 1;
          centered = null;
        }

        g.selectAll('path')
            .classed('active', centered && function(d) { return d === centered; });

        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
            .style('stroke-width', 1.5 / k + 'px');
      }

      function sizeChange () {
        d3.select('g')
          .attr('transform', 'scale(' + $('#mainContent').width() / 900 + ')');
          $('svg').height($('#mainContent').width() * 0.618);
      }

    }
  }
}];