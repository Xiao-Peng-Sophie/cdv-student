let w = 800;
let h = 600;
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


 


  // put a circle for each data point onto the page

  viz.selectAll(".datapoint").data(incomingData).enter()
    .append("circle")
    .attr("class", "datapoint")
    .attr("cx", function(d){
      return w/2;
    })
    .attr("cy", function(d){
      return h/2;
    })
    .attr("r", 4)
  ;

 


  let simulation = d3.forceSimulation(incomingData)  // final position 
    // .force("forceX",function(d,i){
    //   return d3.forceX(xScale(d.year));

    // })
    .force("forceX",d3.forceX(function(d){
      console.log("d",d);
      let p = d.roleperson;
      if(p == "1 =King/Queen/Emperor" || p == "5 =(Member of) parliament"  ){
        return 100;
      }
      else if (p == "2 =President" || p== "6 =Diplomat"){
        return 300;
      }
      else if (p == "3 =Prime Minister" || p=="8 =Other official role"){
        return 500;
      }
      else if (p == "4 =Minister" ){
        return 700;
      }

      else {
        return 10;
      }
      
    }))
    .force("forceY",d3.forceY(function(d){
      let p = d.roleperson;
      if(p=="1 =King/Queen/Emperor" || p=="2 =President" ||p=="3 =Prime Minister" ||p=="4 =Minister"){
        return 150;
      }
      else {
        return 450;
      }


    }))
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
