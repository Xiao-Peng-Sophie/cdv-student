let w = 800;
let h = 500;
let padding = 50;



let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "lavender")
  .attr("width", w)
  .attr("height", h)
;



// initialise scales
let xScale = d3.scaleLinear().range([padding, w-3*padding]);



d3.json("PAC.json").then(function(incomingData){
  console.log(incomingData);

  // incomingData = incomingData.slice(0,400);

  //turn date in to data object
  // incomingData = incomingData.map(d=>{
  //   d.date = new Date(d.parsedDate)
  //   return d
  // })


  // get the earliest and latest date in the dataset
  let extent = d3.extent(incomingData, function(d){
    return d.year;
  })
  console.log(extent);
  // amend domain to scale
  xScale.domain([1947,2022]);
  // group to hold axis
  let xAxisGroup = viz.append("g").attr("class", "xaxisgroup");
  // ask d3 to get an axis ready
  let xAxis = d3.axisBottom(xScale);
  // build the axis into our group
  xAxisGroup.call(xAxis);


  // put a circle for each data point onto the page

  viz.selectAll(".datapoint").data(incomingData).enter()
    .append("circle")
    .attr("class", "datapoint")
    .attr("cx", function(d){
      return xScale(d.year);
    })
    .attr("cy", function(d){
      return h/2;
    })
    .attr("r", 4)
  ;

  incomingData = incomingData.map(function(datapoint){ //start position
    datapoint.x = xScale(datapoint.year);
    datapoint.y = h/2;
    return datapoint;
  })


  let simulation = d3.forceSimulation(incomingData)
    .force("forceX",function(d,i){
      return d3.forceX(xScale(d.year));

    })
    .force("forceY",d3.forceY(h/2))
    .force("collide",d3.forceCollide(5))
    .on("tick",simulationRan)

  ;

  function simulationRan(){
    console.log(incomingData[0].x);
    viz.selectAll(".datapoint")
      .attr("cx", function(d){
        return d.x;
      })
      .attr("cy", function(d){
        return d.y;
      })

    
  }


  

  // problem: points overlap!




})
