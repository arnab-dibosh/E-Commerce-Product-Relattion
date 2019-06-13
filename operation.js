var graphModule = (function (){
  
   this.category='Books';

   this.filterProduct= function(allProducts){       
        var products= allProducts.filter(x=> {
            return x.categories.some(cat=>cat.includes(category));
        });
     return products; 
   }

   this.drawGraph= function (products){
      
    $('#graphDiv').empty();
    var graph = Viva.Graph.graph();
      
    products.forEach(item=>{
        graph.addNode(item.asin, {url : item.imUrl});
    });

    products.forEach(item=>{
        item.related.also_bought.forEach(linkItem=>{
            graph.addLink(item.asin, linkItem);
        })        
    });
      
      var graphics = Viva.Graph.View.svgGraphics();
      graphics.node(function(node) {   

            return Viva.Graph.svg('image')
                  .attr('width', 50)
                  .attr('height', 50)
                  .link(node.data.url);
          })
          .placeNode(function(nodeUI, pos){
                        nodeUI.attr('x', pos.x - 12).attr('y', pos.y +200);
                    });

         graphics.link(function(link){
                return Viva.Graph.svg('path')
                           .attr('stroke', 'gray');
            })            
            .placeLink(function(linkUI, fromPos, toPos) {
                var y1pos=fromPos.y+200, y2pos=toPos.y+200;

                var data = 'M' + fromPos.x + ',' + y1pos +
                           'L' + toPos.x + ',' + y2pos;
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
