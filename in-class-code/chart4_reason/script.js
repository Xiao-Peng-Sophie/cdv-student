let w = 800;
let h = 700;
let padding = 50;



let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "lavender")
  .attr("width", w)
  .attr("height", h)
;







d3.json("PAC.json").then(function(incomingData){
  console.log(incomingData);

  // initialise scales
let xScale = d3.scaleLinear().range([padding, w-3*padding]);
// get the earliest and latest date in the dataset
let extent = d3.extent(incomingData, function(d){
 return d.year;
})
console.log(extent);
// amend domain to scale
xScale.domain([1947,2020]);
// group to hold axis
let xAxisGroup = viz.append("g").attr("class", "xaxisgroup");
// ask d3 to get an axis ready
 let xAxis = d3.axisBottom(xScale);
//let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));

// build the axis into our group
xAxisGroup.call(xAxis);
  incomingData = incomingData.map(function(datapoint){ //start position
    datapoint.x = xScale(datapoint.year);
    console.log("**",datapoint.x);
    datapoint.y = h/2;

    return datapoint;
  })



 

  let graphGroup = viz.append("g").attr("class", "graphgroup");
  
  // let texts = graphGroup.selectAll(".description").data(incomingData).enter()
  // .append("text")
  //   .attr("class", "description")
  //   .attr("transform", function(d){
  //     //console.log(d);
  //     return "translate("+ xScale(d.year) +","+ h/2 +")"
  //   })
  //   .text("hellooo")

  //   ;


  let datagroups = graphGroup.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d){
        //console.log(d);
        return "translate("+ xScale(d.year) +","+ h/2 +")"
      })
      .on("mouseover",function(event,d){

       



        d3.select(this).select("circle")
          .transition()
          .duration(1000)
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
            .duration(200)
            // .delay(5)
            .attr("opacity",0.2)
           
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
        .duration(200)
        .attr("opacity",1)
;
       
        
        
      })
  ;

  datagroups.append("circle")
      .attr("opacity",1)
      .attr("r", 5)
      .attr("fill","red")
      ;

      datagroups.append("rect")
      .attr("x",function(d,i){
        if(d.x< 140) {
          return -30;
        }
        else if(d.x>600){
          return -230;
        }
        else{
          return  -130;
        }
      })
      .attr("y",15)
      .attr("width",260)
      .attr("height",function(d,i){
        console.log(d.description.length/35)
        return 30+ d.description.length/2;
      })
      .attr("fill","white")
      ;

      datagroups.append("text")
      .text(function(d,i){
        return d.description;
      })
      .attr("x",function(d,i){
        if(d.x< 140) {
          return 100;
        }
        else if(d.x>600){
          return -100;
        }
        else{
          return  0;
        }
      })
      .attr("y",function(d,i){
        console.log(d.x);
        return  40;

      })
      .attr("text-anchor","middle")
      .call(cdvTextWrap(240))
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
        return 80;
      }
      else if (r == "Military rule/ One-party rule/ Dictatorship" || r == "Protracted conflict" || r== "Civil war" || r=="Civil unrest"|| r=="Insurgency"){
        return 400;
      }
      else if(r == "Treatment of indigenous population" || r == "Settler colonialism"||r=="Colonial rule"){
        return 160;
      }
      else if(r == "Slavery" ){
        return 240;
      }
      else if(r == "Treatment of sick/disabled"|| r== "Treatment of LGBTQ"|| r== "Treatment of minority group"||r=="Treatment of women" ){
        return 320;
      }
      else if(r=="Other"){
        return 480;
      }
      else {
        console.log(r);
        return 0;
        
      }
    }))
    .force("collide",d3.forceCollide(6.5))
    .on("tick",simulationRan)

  ;

  function simulationRan(){
    //console.log(incomingData[0].x);
    graphGroup.selectAll(".datagroup")
    .attr("transform", function(d){

      if(d.x>w-3*padding){
        d.x=w-3*padding;
      }
      //console.log(d);
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
