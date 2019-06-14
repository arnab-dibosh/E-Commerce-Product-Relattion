var searchModule = (function (){

  this.loadsearch= function(){
     $( "#search" ).autocomplete({
          source: this.getProduct(),
          select: function (event, ui) {
            
                  graphModule.searchTerm= ui.item.value;
                  var nodes= searchModule.prepareNodes();
                  var links= searchModule.prepareLinks();
                  graphModule.drawGraph(nodes, links);
                }              
        });
  }

  this.prepareNodes=function(){
    var nodeList=[];
    var selItems=graphModule.filterProduct();
    if(graphModule.searchTerm=='') return selItems;
    else{
      var items= selItems.filter(item=>item.title.toLowerCase().includes(graphModule.searchTerm.toLowerCase()));
      
      items.forEach(item=>{
          nodeList.push(item);

          item.related.also_bought.forEach(childAsin=>{
            var childObj=products.find(x=>x.asin==childAsin);
            nodeList.push(childObj);
          }); 
      });
    }
    return nodeList;
  }

  this.prepareLinks=function(){
    var edgeList=[];
    var filObjects;
    var selItems=graphModule.filterProduct();
    if(graphModule.searchTerm=='') filObjects=selItems;
    else filObjects= selItems.filter(item=>item.title.toLowerCase().includes(graphModule.searchTerm.toLowerCase()));

    filObjects.forEach(item=>{
      item.related.also_bought.forEach(child=>{
            var link=[item.asin, child];
            edgeList.push(link);    
        }); 
    });
    return edgeList;
  }
  
  this.getProduct = function(){
    var productLabels=[];
    graphModule.filterProduct().forEach(item=>productLabels.push(item.title));
    return productLabels;
  }   
  
  return this;
})();
