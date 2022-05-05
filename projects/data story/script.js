
let wW = window.innerWidth;
let wH = window.innerHeight;
let gW = 800;
let gH = 450;
let paddingTop = (wH-gH)/2;
let paddingLeft = (wW-gW)/2;

let viz = d3.select("#vizContainer").append("svg")
    .style("width", gW)
    .style("height", gH)
    .style("background-color", "lavender")
;


let bothGraphs = viz.append("g").attr('class', "bothGraphs");
let graphTranslateScale = d3.scaleLinear().domain([0, 1]).range([0, -wH])



// viz.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", wW)
//   .attr("height", wH)
//   .attr("fill", 0)
//   .attr("opacity", 0.2)
// ;

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

  d3.json("countries.geojson").then(function(geoData){
    d3.json("location.json").then(function (location){
      d3.json("PAC.json").then(function (pacData){

        console.log(pacData[0]);

        let g1xScale = d3.scaleLinear().range([30, gW-30]);



        let extent = d3.extent(pacData, function(d){
            return d.year;
          })
          //console.log(extent);
          // amend domain to scale
          g1xScale.domain(extent);
          // group to hold axis
          let g1xAxisGroup = bothGraphs.append("g")
            .attr("class", "xaxisgroup")
            .attr("transform", "translate(0,"+(paddingTop+gH)+")")
          
          ;

          // ask d3 to get an axis ready
          let g1xAxis = d3.axisBottom(g1xScale);
          // build the axis into our group
          g1xAxisGroup.call(g1xAxis);


          let projection = d3.geoNaturalEarth1()  //can change to other projections
            .translate([gW/2,gH/2])
            .fitExtent([[-30,0],[gW+30,gH]],geoData)
    
         ;

    let pathMaker = d3.geoPath(projection);

   let mapGroup = bothGraphs.append("g").attr("class", "mapgroup");
   let datagroups = mapGroup.selectAll(".country").data(geoData.features).enter()
   .append("g")
   .attr("class", "country")
  
  ;
  
  datagroups.append("path")
    .attr("d", pathMaker)
    .attr("fill",function(d, i){
    return "white"
 })
 .attr("stroke", "blue")
 .attr("stroke-width", 1)
 .on("mouseover",function(event,d){
   
   console.log(d.properties.name);
  
 })

 ;

 mapGroup
 .attr("transform", "translate(0,"+(wH+paddingTop+gH)+")")



        
        
          // put a circle for each data point onto the page
        
          function showGraph1(){

            pacData = pacData.map(function(datapoint){ //start position
                datapoint.x = g1xScale(datapoint.year);
                datapoint.y = gH/2;
                return datapoint;
              })
            
              viz.selectAll(".datapoint").data(pacData).enter()
              .append("circle")
              .attr("class", "datapoint")
              .attr("cx", function(d){
                return g1xScale(d.year);
              })
              .attr("cy", function(d){
                return gH/2;
              })
              .attr("r", 4)
            ;
          
              let simulation = d3.forceSimulation(pacData)
                .force("forceX",function(d,i){
                  return d3.forceX(g1xScale(d.year));
            
                })
                .force("forceY",d3.forceY(gH/2))
                .force("collide",d3.forceCollide(5))
                .on("tick",simulationRan)
            
              ;
            
              function simulationRan(){
                //console.log(incomingData[0].x);
                viz.selectAll(".datapoint")
                  .attr("cx", function(d){
    
                    if(d.x>gW-30){
                        d.x =gW-30;
                    }
                    return d.x;
                  })
                  .attr("cy", function(d){
                    return d.y;
                  })
            
                
              }
            

          }
          showGraph1();


          //map part!

    let locationFileCountries = location.map(d=>d.country)
      // let PACCountries = pacData.map(d=>d.countrysend)
      // console.log(PACCountries)
      console.log(locationFileCountries)
      pacData.forEach(d =>{
        // console.log(d)
        let countryNamePAC = d.countrysend;
        if(locationFileCountries.includes(countryNamePAC)){
          //console.log(countryNamePAC, "is included ✅")
        }else{
          if(countryNameCorrection[d.countrysend] != undefined){
            d.countrysend = countryNameCorrection[d.countrysend]
            console.log("REPLACED", d)
          }else{
            //console.log("🚨 can't find ", countryNamePAC)
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

//end of map part

          enterView({
            selector: '.textTwo',
            enter: function(el) {
              // el.classList.add('entered');
              console.log("enter!!!")
              //showGraph2();
            },
            exit: function(el) {
              // el.classList.remove('entered');
              console.log("exit")
              showGraph1();
            },
            progress: function(el, progress) {
              // el.style.opacity = progress;
              console.log("progress", progress)
              bothGraphs.attr("transform", function(){
                let y = graphTranslateScale(progress)
                return "translate(0, "+y+")";
              })
            },
            offset: 0.5, // enter at middle of viewport
            // once: true, // trigger just once
          });
          


      })

    })

    })

