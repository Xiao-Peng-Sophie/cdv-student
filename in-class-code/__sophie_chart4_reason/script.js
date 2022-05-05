let w = 800;
let h = 700;
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


  incomingData = incomingData.map(function(datapoint){ //start position
    datapoint.x = xScale(datapoint.year);
    // datapoint.y = h/2;
    let r = datapoint.reason;
      if(r == "War" || r == "Invasion/ Annexation/ Occupation"){
        datapoint.y = 100;
      }
      else if (r == "Military rule/ One-party rule/ Dictatorship" || r == "Protracted conflict" || r== "Civil war" || r=="Civil unrest"|| r=="Insurgency"){
        datapoint.y = 500;
      }
      else if(r == "Treatment of indigenous population" || r == "Settler colonialism"||r=="Colonial rule"){
        datapoint.y = 200;
      }
      else if(r == "Slavery" ){
        datapoint.y = 300;
      }
      else if(r == "Treatment of sick/disabled"|| r== "Treatment of LGBTQ"|| r== "Treatment of minority group"||r=="Treatment of women" ){
        datapoint.y = 400;
      }
      else if(r=="Other"){
        datapoint.y = 600;
      }
      else {
        console.log(r);
        datapoint.y = 0;
      }

    return datapoint;
  })



  let graphGroup = viz.append("g").attr("class", "graphgroup");


  let datagroups = graphGroup.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d){
        //console.log(d);
        return "translate("+ d.x +","+ d.y +")"
      })
      .on("mouseover",function(event,d){
        d3.select(this).select("circle")
          .transition()
          .attr("opacity",1)
          
          ;

          datagroups.filter(function(datapoint){
            if(datapoint == d){
              return false;
            }
            else{
              return true;
            }
          }).select("circle")
            .transition()
            .delay(10)
            .attr("opacity",0.1)
           
          ;
        
      })
      .on("mouseout",function(event,d){
        // d3.select(this).select("circle")
        //   .transition()
        //   .attr("opacity",0.5)
        //   // .attr("r",10)
        //   ;
        datagroups.select("circle")
        .transition()
        .attr("opacity",1)
;
        
        
      })
  ;

  datagroups.append("circle")
      .attr("opacity",1)
      .attr("r", 5)
      .attr("fill","red")
      ;
      




  // put a circle for each data point onto the page

  // viz.selectAll(".datapoint").data(incomingData).enter()
  //   .append("circle")
  //   .attr("class", "datapoint")
  //   .attr("cx", function(d){
  //     return xScale(d.year);
  //   })
  //   .attr("cy", function(d){
  //     return h/2;
  //   })
  //   .attr("r", 5)
  // ;


 


  let simulation = d3.forceSimulation(incomingData)
    .force("forceX",function(d,i){
      return d3.forceX(xScale(d.year));

    })
    .force("forceY",d3.forceY(function(d){
      let r = d.reason;
      if(r == "War" || r == "Invasion/ Annexation/ Occupation"){
        return 100;
      }
      else if (r == "Military rule/ One-party rule/ Dictatorship" || r == "Protracted conflict" || r== "Civil war" || r=="Civil unrest"|| r=="Insurgency"){
        return 500;
      }
      else if(r == "Treatment of indigenous population" || r == "Settler colonialism"||r=="Colonial rule"){
        return 200;
      }
      else if(r == "Slavery" ){
        return 300;
      }
      else if(r == "Treatment of sick/disabled"|| r== "Treatment of LGBTQ"|| r== "Treatment of minority group"||r=="Treatment of women" ){
        return 400;
      }
      else if(r=="Other"){
        return 600;
      }
      else {
        console.log(r);
        return 0;
      }
    }))
    .force("collide",d3.forceCollide(6.5))
    .on("tick",simulationRan)
    .on("end", function(){
      console.log("end")
    })

  ;

  function simulationRan(){
    console.log("simulation iterated")
    //console.log(incomingData[0].x);
    graphGroup.selectAll(".datagroup")
    .attr("transform", function(d){
      //console.log(d);
      if(d.x>w-3*padding){
        d.x=w-3*padding
      }
      return "translate("+ d.x +","+ d.y +")"
    }) 
      // .attr("cx", function(d){
      //   return 0;
      // })
      // .attr("cy", function(d){
      //   return 0; //d.y
      // })

    
  }


  

  // problem: points overlap!




})
