
let wW = window.innerWidth;
let wH = window.innerHeight;
let gW = 800;
let gH = 400;
let paddingTop = (wH-gH)/2;
let paddingLeft = (wW-gW)/2;

let viz = d3.select("#vizContainer").append("svg")
    .style("width", wW)
    .style("height", wH)
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
    "Republic of Armenia": "Armenia",
    "Federal Republic of Germany":"Germany",
    "United Kingdom of Great Britain and Northern Ireland":"United Kingdom",
    "Republic of South Sudan": "Sudan"
    
  }

  d3.json("countries.geojson").then(function(geoData){
    d3.json("location.json").then(function (location){
      d3.json("PAC.json").then(function (pacData){

        let locationFileCountries = location.map(d=>d.country)
      // let PACCountries = pacData.map(d=>d.countrysend)
      // console.log(PACCountries)
      //console.log(locationFileCountries)
      pacData.forEach(d =>{
        // console.log(d)
        let countryNamePAC = d.countrysend;
        if(locationFileCountries.includes(countryNamePAC)){
          //console.log(countryNamePAC, "is included ✅")
        }else{
          if(countryNameCorrection[d.countrysend] != undefined){
            d.countrysend = countryNameCorrection[d.countrysend]
            //console.log("REPLACED", d)
          }else{
            //console.log("🚨 can't find ", countryNamePAC)
          }
          
        }
      })



        // build scale and axis
        // g1xScale
        // g1xAxis
        //  goes to (check you measurements) probably: paddingTop + gH
        // ...no y scale need because it's wH/2 (the midpoint of the UPPER graph)

        // g2 "scale" is actually a projection that translates lon lat to pixel locations
        //  the map will probably be between ~ paddingLeft and wW - padding left
        //                                  and ~ wH+paddingTop and wH+paddingTop+gH

        // before drawing graphs, calculate each points location using force similations
        // graph1
        //  run soimmulation using g1Scale and inital y position
        //  after the simulation done you want to "store" the cacluated position valus so you don t have to run
        //  the simiulation everytime you scrolup and down
        //  .on("end", function(){
        //    datagroups.forEach(d=>{
        //      d.g1x = d.x;
        //      d.g1y = d.y;
        //    }) 
        //    after having "stored" all these graph1 position, 
        //    we start the siulation that will calculate g2 positions 
        //  })

        // graph2
        // calcGraph2(){
        //   d3.forceSimulation(pacData...
        //     run simulation with the projection "scale"
         //  .on("end", function(){
        //    datagroups.forEach(d=>{
        //      d.g2x = d.x;
        //      d.g2y = d.y;
        //    }) 
        // }
        //  
        // draw graph with all points in location 1 (g1x and g1y)
        // and do what we did in class to transition the points (and shift up bothGraphs)



        //console.log(pacData[0]);
        


        let g1xScale = d3.scaleLinear().range([paddingLeft, gW+paddingLeft]);

        let extent = d3.extent(pacData, function(d){
            return d.year;
          })
          //console.log(extent);
          // amend domain to scale
          g1xScale.domain(extent);
          // group to hold axis
          let g1xAxisGroup = bothGraphs.append("g")
            .attr("class", "x1axisgroup")
            .attr("transform", "translate(0,"+(paddingTop+gH)+")")
          
          ;

          // ask d3 to get an axis ready
          let g1xAxis = d3.axisBottom(g1xScale);
          // build the axis into our group
          g1xAxisGroup.call(g1xAxis);


          //reason graph aixs

          let reasons = pacData.map(d=>d.reason).filter(onlyUnique); 


        let g2xScale = d3.scaleLinear().range([paddingLeft, gW+paddingLeft]);
          g2xScale.domain(extent);
  
          let g2xAxisGroup = bothGraphs.append("g")
            .attr("class", "x2axisgroup")
            .attr("transform", "translate(0,"+(wH*2+paddingTop+gH)+")")
          
          ;
          let g2xAxis = d3.axisBottom(g2xScale);
          g2xAxisGroup.call(g2xAxis);

          let g2yScale = d3.scaleBand().range([wH*2+paddingTop, wH*2+paddingTop+gH]);
          g2yScale.domain(reasons);
          let g2yAxis = d3.axisLeft(g2yScale);
          let g2yAxisGroup = bothGraphs.append("g")
              .attr("class", "y2axisgroup")
              .attr("transform", "translate("+paddingLeft+",0)")
          ;
          g2yAxisGroup.call(g2yAxis);



         




          let projection = d3.geoNaturalEarth1()  //can change to other projections
            .translate([gW/2,gH/2])
            // .fitExtent([[-100,0],[gW+100,gH]],geoData)
    
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
   
   //console.log(d.properties.name);
  
 })

 ;

 mapGroup
 .attr("transform", "translate("+ paddingLeft+","+(wH+paddingTop)+")")



//calculate the positions on graph 1

//function(d,i){
//   return d3.forceX(g1xScale(d.year));
            
// }
 let force = d3.forceSimulation(pacData)
        .force("forceX",d3.forceX(d => g1xScale(d.year)))
       .force("forceY",d3.forceY(wH/2))
       .force("collide",d3.forceCollide(5))
     //.on("tick",simulationRan)
       .tick(400)
       .on("end",function(){
           pacData.forEach(d=>{
           d.g1x = d.x;
           d.g1y = d.y;
          // shoud be the next stage
           d.x = 0;
           d.y = 0;

           })
           showGraph1();

           getPosition2();
           

          
                
        })
            
       ;

        //calculate position for map 
       let PACCountries = pacData.map(d=>d.countrysend);

       function getPosition2(){
         force = d3.forceSimulation(pacData)
         .force("forceX",d3.forceX(function(d){
          //console.log("ddd",d);

         let countryObj = location.find(c => c.country === d.countrysend);
         //console.log("countryObj",countryObj);

         let coordinate = [countryObj.longitude,countryObj.latitude];

         return projection(coordinate)[0];
        
            
        }))
        .force("forceY",d3.forceY(function(d){
          let countryObj = location.find(c => c.country === d.countrysend);
          //console.log("countryObj",countryObj);
 
          let coordinate = [countryObj.longitude,countryObj.latitude];
 
          return projection(coordinate)[1];
           
    
        }) )
        .force("collide",d3.forceCollide(5))
      //.on("tick",simulationRan)
        .tick(400)
        .on("end",function(){
            pacData.forEach(d=>{
            
            d.g2x = d.x + paddingLeft;
            d.g2y = d.y + gH*2 +paddingTop/2; //how can I change the y position of the map??
     
            })
              
         })
             
        ;

       }


//calculate and save the position on graph 2 (map)
    //let simulation2 

   console.log("pac",pacData);

        
          // put a circle for each data point onto the page
        
      function showGraph1(){

            // pacData = pacData.map(function(datapoint){ //start position
            //     datapoint.x = g1xScale(datapoint.year);
            //     datapoint.y = wH/2;
            //     return datapoint;
            //   })


            //bothGraphs
            bothGraphs.selectAll(".datapoint").data(pacData).enter()
              .append("circle")
              .attr("class", "datapoint")
              .attr("cx", function(d){
                //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
                return d.g1x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g1y;
              })
              .attr("r", 4)
            ;

            let updatingDatagroups = bothGraphs.selectAll(".datapoint").data(pacData);
            updatingDatagroups
              .transition()
              .duration(1000)
              .attr("cx", function(d){
                //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
                return d.g1x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g1y;
              })
              ;
              


  

          }

          function showGraph2(){

            let updatingData = bothGraphs.selectAll(".datapoint").data(pacData);

            updatingData
              .transition()
              .duration(1000)
              .attr("cx",function(d){
                console.log("now the g2x data is: ",d.g2x); //g1x returns undefined
                return d.g2x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g2y;
              })
              .attr("r",4)

              ;



          }

          //map part!

    
      // let timesApology = {};
     
      // pacData.forEach(d =>{
      //   let country = d.countrysend;
      //   if(country in timesApology == false){
      //     timesApology[country]= 1;
      //   }
      //   else if (country in timesApology == true){
      //     timesApology[country]=timesApology[country]+1;

      //   }
      // })

//end of map part

          enterView({
            selector: '.textTwo',
            enter: function(el) {
              // el.classList.add('entered');
              console.log("enter!!!")
              showGraph2();
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



    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

