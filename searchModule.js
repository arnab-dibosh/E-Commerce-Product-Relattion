var searchModule = (function (){

  this.loadsearch= function(){
     $( "#search" ).autocomplete({
          source: this.getProduct()
        });
  }
  
  this.getProduct = function(){
    var productLabels=[];
    graphModule.filterProduct().forEach(item=>productLabels.push(item.title));
    return productLabels;
  }   
  
  return this;
})();
