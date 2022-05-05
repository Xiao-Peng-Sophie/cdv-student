let w = 1200;
let h = 800;
let padding = -30;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;

let countryNameCorrection = {
  "German Democratic Republic": "Germany",
  "Czechia": "Czech Republic",
  "Republic of Korea": "South Korea",
  "USSR":"Russia",
  "Russian Federation":"Russia",
  "Taiwan, Province of China":"Taiwan",
  "Democratic People's Republic of Korea": "North Korea",
  "Myanmar": "Myanmar [Burma]",
  "Serbia and Montenegro":"Serbia",
  "Yugoslavia" : "Serbia",
  "Republic of Armenia": "Armenia"
  
}

// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
  d3.json("location.json").then(function (location){
    d3.json("PAC.json").then(function (pacData){

      let locationFileCountries = location.map(d=>d.country)
      // let PACCountries = pacData.map(d=>d.countrysend)
      // console.log(PACCountries)
      console.log(locationFileCountries)
      pacData.forEach(d =>{
        // console.log(d)
        let countryNamePAC = d.countrysend;
        if(locationFileCountries.includes(countryNamePAC)){
          console.log(countryNamePAC, "is included ✅")
        }else{
          if(countryNameCorrection[d.countrysend] != undefined){
            d.countrysend = countryNameCorrection[d.countrysend]
            console.log("REPLACED", d)
          }else{
            console.log("🚨 can't find ", countryNamePAC)
          }
          
        }
      })

      let timesApology = {};
     
      pacData.forEach(d =>{
        let country = d.countrysend;
        if(country in timesApology == false){
          timesApology[country]= 1;
        }
        else if (country in timesApology == true){
          timesApology[country]=timesApology[country]+1;

        }
      })

      //console.log("TPAC",timesApology);

     
      //console.log("pacData",pacData)
 

   

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




    // // let projection = d3.geoOrthographic() //can change to other projections
    // //   // .translate([w/2,h/2])
    // //   // .center([103.8,34.1])
    // //   .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
    
    // // ;
  let pathMaker = d3.geoPath(projection);

   let mapGroup = viz.append("g").attr("class", "mapgroup");
   let datagroups = mapGroup.selectAll(".country").data(geoData.features).enter()
   .append("g")
   .attr("class", "country")
  
  ;
  
  datagroups.append("path")
    .attr("d", pathMaker)
    .attr("fill",function(d, i){
   //console.log(d.properties.name)
   // if(locationFileCountries.includes(d.properties.name) ){
   //   return "red"
   // }
    return "white"
 })
 .attr("stroke", "blue")
 .attr("stroke-width", 1)
 .on("mouseover",function(event,d){
   
   console.log(d.properties.name);
  
 })

 ;
//  datagroups.append("text")
//   .text(function(d,i){
    
//     return d.properties.name;
    
//   })
  //.attr("opacity",0)
  
  //;


     



    

    // CREATE SHAPES ON THE PAGE!
    // viz.selectAll(".province").data(geoData.features).enter() //must be array! pay attention to the []
    //     .append("path")
    //     .attr("class", "province")
    //     .attr("d", pathMaker)
    //     .attr("fill",function(d, i){
    //       //console.log(d.properties.name)
    //       // if(locationFileCountries.includes(d.properties.name) ){
    //       //   return "red"
    //       // }
    //       return "white"
    //     })
    //     .attr("stroke", "blue")
    //     .attr("stroke-width", 1)
    //     .on("mouseover",function(event,d){
    //       //console.log("d",d.fromElement);
    //       console.log(d.properties.name);

      

    //     })

    // ;
   

  
    //************************** */

      //********** */
      let PACCountries = pacData.map(d=>d.countrysend);

      viz.selectAll(".countryPoint").data(location).enter().append("circle")
        .attr("cx",function(d, i){
          if(PACCountries.includes(d.country)){
            //console.log("yes");
            return projection([d.longitude,d.latitude])[0];
          }
        
        })
        .attr("cy",function(d, i){
          if(PACCountries.includes(d.country)){
          return projection([d.longitude,d.latitude])[1];
          }
        })
        //.attr("r",3)
        .attr("r",function(d,i){
          if(PACCountries.includes(d.country)){

            return 5+ timesApology[d.country]/3;


          }

        })
        .attr("fill","rgba(0,0,200,0.5)")
        .attr("id",function(d,i){
          return d.country;
        })

        ;
         
        // }

        

      //})
    })
  })

})
