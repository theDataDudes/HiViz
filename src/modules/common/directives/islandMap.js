//directive for d3 island map
module.exports = [function () {
  return {
    restrict : 'EA',
    scope : true,
    templateUrl : 'views/chart.html',
    link : function (scope, element, attrs, ctrl) {

    //setting the $watch to give d3 access to scope data
    scope.$watch(function () {
      return scope.$ngc;
    }, function () {
        if (!scope.$ngc) {
          return;
        }

        //setting the base variables for the graph
        var islandFilter = scope.$ngc;
        var margin = { top : 0, right : 0, bottom : 20, left : 70 };
        var width = 960 - margin.left;
        var height = 700 - margin.bottom;
        var centered = null;

        //setting up the projection. scaled to half of main container and
        // translated to the right middle of the page
        var projection = d3.geo.albersUsa()
            .scale(6420) //4280
            .translate([width / 0.55, -1025]);

        //setting up the path
        var path = d3.geo.path()
            .projection(projection);

        //appending the svg element to the main container
        var svg = d3.select('#vis').append('svg')
            .attr('id', 'islandMap')
            .attr('width', '85%')
            .attr('height', height)
            .attr('viewBox', '0 0 960 700')
            .attr('preserveAspectRatio', 'xMidYMid');

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', width)
            .attr('height', height)
            .on('click', clicked);

        //defining the tooltip
        mapTip = d3.tip()
          .attr('class', 'd3-tip')
          .html(function (d) {
            return "<strong>" + d.name.toUpperCase() +
              "</strong> <span style='color:grey'></span>";
          });
        svg.call(mapTip);

        var g = svg.append('g');

        //loading the geojson data
        d3.json('/hawaii.json', function(error, hawaii) {
          if (error) throw error;

          //appending the data to the path and drawing the map
          g.append('g')
              .attr('id', 'islands')
            .selectAll('path')
              .data(hawaii.features)
            .enter().append('path')
              .attr('d', path)
              .on('click', clicked)
              .on('mouseover', hover)
              .on('mouseout', noHover);

          g.append('path')
              .datum(hawaii.features, function(a, b) { return a !== b; })
              .attr('id', 'island-borders')
              .attr('d', path);

          //big island
          g.append("image")
              .attr("xlink:href", "/img/big-island.png")
              .attr("x", "695")
              .attr("y", "290")
              .attr("width", "170")
              .attr("height", "170")
              .style("pointer-events", "none");

          // oahu
          g.append("image")
              .attr("xlink:href", "/img/oahu.png")
              .attr("x", "470")
              .attr("y", "110")
              .attr("width", "105")
              .attr("height", "105")
              .style("pointer-events", "none");


          // maui
          g.append("image")
              .attr("xlink:href", "/img/maui.png")
              .attr("x", "640")
              .attr("y", "195")
              .attr("width", "95")
              .attr("height", "95")
              .style("pointer-events", "none");
          // kauai
          g.append("image")
              .attr("xlink:href", "/img/kauai.png")
              .attr("x", "275")
              .attr("y", "47")
              .attr("width", "120")
              .attr("height", "120")
              .style("pointer-events", "none");
          // lanai
          g.append("image")
              .attr("xlink:href", "/img/lanai.png")
              .attr("x", "600")
              .attr("y", "215")
              .attr("width", "40")
              .attr("height", "40")
              .style("pointer-events", "none");
          // molokai
          g.append("image")
              .attr("xlink:href", "/img/molokai.png")
              .attr("x", "570")
              .attr("y", "150")
              .attr("width", "85")
              .attr("height", "90")
              .style("pointer-events", "none");
        });

        // on hover the tooltip appears
        function hover(d) {
          if (d && centered !== d) {
            mapTip.show(d);
            d3.select()
            .style('fill', 'black');
          }
        }

        //when you take your mouse off the island, the tooltip disappears
        function noHover(d) {
          if (d && centered !== d) {
            mapTip.hide(d);
          }
        }

        //on path click function
        function clicked(d) {
          var x;
          var y;
          var k;

          //if one island is clicked...
          if (d && centered !== d) {
            islandFilter.filterBy('island', d.name);
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 1.5;
            centered = d;
            mapTip.show(d);
            setTimeout(function () {
              mapTip.hide();
            }, 7000);

          //if no islands are selected
          } else {
            islandFilter.filterBy('island', 'total');
            x = width / 2.2;
            y = height / 2.3;
            k = 1;
            centered = null;
            mapTip.hide(d);
          }

          g.selectAll('path')
              .classed('active', centered && function(d) { return d === centered; });

          //adjusts size and projection of map when single island is clicked
          g.transition()
              .duration(750)
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
              .style('stroke-width', 1.5 / k + 'px');

        }

        //resizing the svg based on screen size
        var map = $('#islandMap');
        var aspect = map.width() / map.height();
        var container = map.parent();
        $(window).on('resize', function() {
          var targetWidth = container.width();
          map.attr('width', targetWidth);
          map.attr('height', Math.round(targetWidth / aspect));
        }).trigger('resize');

      });
    }
  }
}];