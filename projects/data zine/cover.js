console.log("welcome to the cover");
let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
      .attr("class", "viz")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#FFFDF6") //FFFDF6
;



var sym = d3.symbol().type(d3.symbolTriangle).size(60000);


function anotherTriangle(d,i){
    let y=-230*Math.sqrt(3);
    // return "M 0 0 25 -50 -25 -50  Z"
    return "M 0 0 230 "+y+ "-230 "+ y +  " Z";
  }

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(230,400) scale(1)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(230,400) rotate(180) scale(1)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(288,500) scale(0.5)")
          ;
viz.append("circle")
    .attr("cx",360)
    .attr("cy",160)
    .attr("r",80)
    .attr("fill","#FFAE6F")
     ;

viz.append("path")
     .attr("d",anotherTriangle)
     .attr("fill","#86B2F3")
     .attr("transform", "translate(500,560) rotate(180) scale(1,0.6)")
     ;
viz.append("circle")
     .attr("cx",501)
     .attr("cy",715)
     .attr("r",40)
     .attr("fill","#FFEF9D")
      ;
viz.append("text")
.attr("x",460)  //function reference not directly call the function 
.attr("y",330)
.attr("class","title")
.attr("fill","#3B445B")
// .attr("style","font-size:70px; font-family: monospace; ")
.text("About Waiting") 
;

viz.append("text")
.attr("x",460)  //function reference not directly call the function 
.attr("y",385)
.attr("class","description")
.attr("fill","#3B445B")
// .attr("style","font-weight:Bold; ")
.text("A visualization of my waiting") 
;

viz.append("text")
.attr("x",460)  //function reference not directly call the function 
.attr("y",420)
.attr("class","description")
.attr("fill","#3B445B")
// .attr("style","font-weight:Bold; ")
.text("in past 10 days") 
;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(1070,360) scale(0.15)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(1070,360) rotate(180) scale(0.15)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(1070,384) rotate(180) scale(0.15,0.09)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(1070,360) scale(0.075)")
          ;
viz.append("rect")
          .attr("x",1025)
          .attr("y",286)
          .attr("width",90)
          .attr("height",9)
          .attr("fill","#F8D0AC")
          ;
  
viz.append("rect")
          .attr("x",1025)
          .attr("y",425)
          .attr("width",90)
          .attr("height",9)
          .attr("fill","#F8D0AC")
          ;

viz.append("circle")
          .attr("cx",1070)
          .attr("cy",330)
          .attr("r",12)
          .attr("fill","#FFAE6F")
           ;

viz.append("circle")
           .attr("cx",1070)
           .attr("cy",407)
           .attr("r",6)
           .attr("fill","#FFEF9D")
            ;