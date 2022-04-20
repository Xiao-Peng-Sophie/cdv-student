let w = 1200;
let h = 800;
let padding = 120
let campuses = ["United Arab Emirates","Ghana","Germany","Argentina","France","United Kingdom","United States of America","Spain","Italy","Czech Republic","China","Australia","Israel"]

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "white")
;
viz.append("text")
.attr("x",420)  //function reference not directly call the function 
.attr("y",70)
.attr("style","font-size:46px; font-family: Times New Roman;")
.attr("fill","rgba(79, 16, 135, 1)")
.text("NYU Outside NYC")


const config = {
  speed: 0.035,
  verticalTilted: -10,
  horizontalTilted: 0
}

// Rotate();


// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
 

    let projection = d3.geoOrthographic() //can change to other projections
    .center([0, 0]) 
    .clipAngle(90 )
      .translate([w/2,h/2])
      .rotate([0,0])
      .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
    
    ;
    let pathMaker = d3.geoPath(projection);

    
    function Rotate() {
      d3.timer(function (elapsed) {
          projection.rotate(
              [config.speed*elapsed-120, 
              config.verticalTilted, 
              config.horizontalTilted]);
              viz.selectAll("path").attr("d", pathMaker);
              
          });
      } 

      Rotate();

    

    // CREATE SHAPES ON THE PAGE!
    console.log("geoData",geoData.features )

    

    viz.selectAll(".province").data(geoData.features).enter() //must be array! pay attention to the []
      .append("path")
        .attr("class", "province")
        .attr("fill", function (d,i){
          
            console.log(d.properties.name);
            // if (d.properties.name == "China" || d.properties.name =="Italy"){
            //   return "blue"
            //}

            if (campuses.includes(d.properties.name)){
              return "rgba(161, 106, 208, 1)"

            }
          
            else {
            return "rgba(230, 205, 252, 1)"
            }
        })
        // .attr("fill",(d, i) => "pink")
        .attr("d", pathMaker)
        .attr("stroke", "rgba(79, 16, 135, 1)")
        // .attr("stroke-width", 8)

    ;

    // let globe = viz.append("circle")
    // .attr("fill", "rgba(0,0,0,0.1)")
    // .attr("stroke", "rgba(0,0,0,0.1)")
    // .attr("stroke-width", "0.2")
    // .attr("cx", w/2)
    // .attr("cy", h/2)
    // .attr("r", 100)

    // let lat = 31.23 ;
    // let lon = 121.53;
    // let pixelvalue = projection([lon,lat])
    
    // viz.append("circle")
    //     .attr("cx",function(){
    //       return projection([lon,lat])[0];
    //     })
    //     .attr("cy",function(){
    //       return projection([lon,lat])[1];
    //     })
    //     .attr("r",5)
    //     .attr("fill","blue")

    //     ;


  


  //})

  

})


