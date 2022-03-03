let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
      .attr("class", "viz")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "lightblue")
;

function gotData(incomingData){
  console.log(incomingData);
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup") ;

  let maxHeight = d3.max(incomingData,function(datapoint){
    return datapoint.height;
  })

  // min and max at the same time
  let heightExtent = d3.extent(incomingData,function(datapoint){
    return datapoint.height;
  })

  console.log(maxHeight);
  let padding=20;
  let yScale = d3.scaleLinear().domain([0,maxHeight]).range([0,h/2-padding]);  //?
  console.log(yScale(134));

  let colorScale= d3.scaleLinear().domain([300,maxHeight]).range(["brown","orange"]);


  function getHeight(d,i){
    console.log(d);
    let height=yScale(d.height); 
    return height;
  }

  function getY(d,i){
    return -yScale(d.height);
  }
  function getColor(d,i){
    // if(d.name =="Shanghai Tower"){
    //   return "yellow";
    // }

    // else {
    //   return "black";
    // }

    return colorScale(d.height);
  }
  let towers = datagroups.append("rect")
      .attr("x",0)
      .attr("y",getY)
      .attr("width",20)
      .attr("height",getHeight)
      .attr("fill",getColor)
      
      ;


  function getName(d,i){
    return d.name ;
  }
  let labels = datagroups.append("text")
      .attr("x",10)
      .attr("y",-5)
      .text(getName)
      .attr("transform","rotate(90)");



  function getPosition(d,i){
    let x=i*(w/100);
    let y=h/2;

    return "translate("+x+","+y+")";
  }
    datagroups.attr("transform",getPosition);





}


d3.json("buildings.json").then(gotData);
