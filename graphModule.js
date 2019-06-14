var graphModule = (function (){
  
   this.category='Books';
   this.searchTerm='';

   this.filterProduct= function(){       
        var fproducts= products.filter(x=> {
            return x.categories.some(cat=>cat.includes(category));
        });
     return fproducts; 
   }

   this.drawGraph= function (nodes, links){
      
    $('#graphDiv').empty();
    var graph = Viva.Graph.graph();
      
    nodes.forEach(item=>{
        graph.addNode(item.asin, {url: item.imUrl});         
    })

    links.forEach(item=>{
        graph.addLink(item[0], item[1]);
    })
      
      var graphics = Viva.Graph.View.svgGraphics();
      var nodeSize=24;
      graphics.node(function(node) {   

            return Viva.Graph.svg('image')
                  .attr('width', nodeSize)
                  .attr('height', nodeSize)
                  .link(node.data.url);
          })
          .placeNode(function(nodeUI, pos){
                        nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y+200 - nodeSize / 2);
        });

        var createMarker = function(id) {
                    return Viva.Graph.svg('marker')
                               .attr('id', id)
                               .attr('viewBox', "0 0 10 10")
                               .attr('refX', "10")
                               .attr('refY', "5")
                               .attr('markerUnits', "strokeWidth")
                               .attr('markerWidth', "10")
                               .attr('markerHeight', "5")
                               .attr('orient', "auto");
                },

            marker = createMarker('Triangle');
        marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z');

         var defs = graphics.getSvgRoot().append('defs');
            defs.append(marker);
         var geom = Viva.Graph.geom();
    
       graphics.link(function(link){
                return Viva.Graph.svg('path')
                           .attr('stroke', 'gray')
                           .attr('marker-end', 'url(#Triangle)');
            }).placeLink(function(linkUI, fromPos, toPos) {
                var toNodeSize = nodeSize,
                    fromNodeSize = nodeSize;

                var from = geom.intersectRect(
                                fromPos.x - fromNodeSize / 2, // left
                                fromPos.y - fromNodeSize / 2, // top
                                fromPos.x + fromNodeSize / 2, // right
                                fromPos.y + fromNodeSize / 2, // bottom
                                fromPos.x, fromPos.y, toPos.x, toPos.y)
                           || fromPos; // if no intersection found - return center of the node

                var to = geom.intersectRect(
                                toPos.x - toNodeSize / 2, // left
                                toPos.y - toNodeSize / 2, // top
                                toPos.x + toNodeSize / 2, // right
                                toPos.y + toNodeSize / 2, // bottom
                                toPos.x, toPos.y, fromPos.x, fromPos.y)
                            || toPos; // if no intersection found - return center of the node

                var y1=from.y+200, y2=to.y+200;
                var data = 'M' + from.x + ',' + y1 +
                           'L' + to.x + ',' + y2;

                linkUI.attr("d", data);
            });
          

      var renderer = Viva.Graph.View.renderer(graph, {
              graphics : graphics,
              container: document.getElementById('graphDiv')
          });

      renderer.run();
    }
    
    return this;

})();
