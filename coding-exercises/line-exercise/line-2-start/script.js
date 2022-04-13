d3.json("births.json").then(gotData);

let indexx=1;


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;


function gotData(incomingData){
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
  console.log("incoming",incomingData);


  // temporarily flatten data to get the minima/maxima:
  let flatData = d3.merge(incomingData)
  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(flatData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);

  let lineMaker =d3.line()
    .x(function(d,i){
      return xScale(d.year)

    })

    .y(function(d,i){
      return yScale(d.birthsPerThousand) // why d is individual data point

    })
  
  
  ;

  let graphGroup = viz.append("g").attr("class", "graphGroup");

  

  function visualizeData() {

    let dataToShow=incomingData[indexx];



  console.log("toShow",dataToShow)

  function assignKey(d,i){
    return d.year;
  }



  graphGroup.selectAll(".line").data([incomingData[indexx]],assignKey).enter() 
    .append("path")
      .attr("class","line")
      .attr("d",lineMaker)
      .attr("fill","none")
      .attr("stroke",function(d,i){
        console.log("*&*&*&*",d);
        if(d[0].country == "China"){  
          return "red"
        }
        else{
          return "blue"
        }
      })
      // .attr("stroke","red")
      .attr("stroke-width",5)


  ;


  graphGroup.selectAll(".line").data([incomingData[indexx]],assignKey).transition().duration(600) 
      .attr("d",lineMaker)
      .attr("stroke",function(d,i){
        
        if(d[0].country == "China"){   
          return "red"
        }
        else{
          return "blue"
        }
      })
      // .attr("stroke","red")
      



  ;


  }

  document.getElementById("usa").addEventListener("click",function(){
    indexx=0;
    visualizeData();//change 
  });

  document.getElementById("china").addEventListener("click",function(){
    indexx=1;
    visualizeData();//change 
  });


}



// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}
