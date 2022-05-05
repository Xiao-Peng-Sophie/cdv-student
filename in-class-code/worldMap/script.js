let w = 1200;
let h = 800;
let padding = -30;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
  d3.json("location.json").then(function (location){

 
  //d3.csv("china-pop-2018.csv").then(function(incomingData){
    //console.log(incomingData);
    // PRINT DATA
    //console.log(incomingData);

    // incomingData = incomingData.map(function(d,i){
    //   d.population = Number(d.population);
    //   return d

    // })

    // let minPop = d3.min(incomingData,function(d,i){
    //   return d.population
    // })

    // console.log("minPop",minPop)

    // let maxPop = d3.max(incomingData,function(d,i){
    //   return d.population
    // })

    // console.log("maxPop",maxPop)

    // let colorScale = d3.scaleLinear().domain([minPop,maxPop]).range(["white","blue"])
    

  
//geoMercator()
//geoNaturalEarth1() 

    let projection = d3.geoNaturalEarth1()  //can change to other projections
      .translate([w/2,h/2])
      .fitExtent([[3*padding,padding],[w-padding,h-padding]],geoData)
    
    ;




    // let projection = d3.geoOrthographic() //can change to other projections
    //   // .translate([w/2,h/2])
    //   // .center([103.8,34.1])
    //   .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
    
    // ;
    let pathMaker = d3.geoPath(projection);

    

    // CREATE SHAPES ON THE PAGE!
    viz.selectAll(".province").data(geoData.features).enter() //must be array! pay attention to the []
      .append("path")
        .attr("class", "province")
        .attr("d", pathMaker)
        .attr("fill","white")
        .attr("stroke", "blue")
        .attr("stroke-width", 1)

    ;
        // .attr("fill", function (d,i){
        //   console.log(d.properties.name);
        //   //see if the name is in incomingData

        //   let correspondingDatapoint = incomingData.find(function(datapoint){
        //     // console.log(datapoint);
        //     if(datapoint.province == d.properties.name) { 
        //       return true
        //     }
        //     else {
        //       return false
        //     }
            
        //   })
        //   if(correspondingDatapoint != undefined) {
        //   console.log(correspondingDatapoint.population);
        //   return colorScale(correspondingDatapoint.population)

        //   }

        //   else{
        //     return "pink"
        //   }

        // })
       

    let lat = 35.86166 ;
    let lon = 104.195397;
    let pixelvalue = projection([lon,lat])
    
    // viz.append("circle")
    //     .attr("cx",function(){
    //       return projection([lon,lat])[0];
    //     })
    //     .attr("cy",function(){
    //       return projection([lon,lat])[1];
    //     })
    //     .attr("r",5)
    //     .attr("fill","red")

        ;


        for(let i=0;i<location.length;i++){
          if(location[i].country == "China"){
            console.log(location[i].country,location[i].latitude,location[i].longitude);
          }
    
          viz.append("circle")
            .attr("cx",function(){
              return projection([location[i].longitude,location[i].latitude])[0];
            })
            .attr("cy",function(){
              return projection([location[i].longitude,location[i].latitude])[1];
            })
            .attr("r",3)
            .attr("fill",function(){
              if(location[i].country == "France" || location[i].country=="United States of America"){
                return "red";
              }
              else{
                return "black";
              }
            })
    
            ;
         
        }

        

      //})

  })

})
