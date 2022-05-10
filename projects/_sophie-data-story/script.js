 //CODING ROAD MAP

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



let wW = window.innerWidth;
let wH = window.innerHeight;
let gW = 800;
let gH = 400;
let paddingTop = (wH-gH)/2;
let paddingLeft = (wW-gW)/2;

let viz = d3.select("#vizContainer").append("svg")
    .style("width", wW)
    .style("height", wH*6) //wH*5
    .style("background-color", "lavender")
;






let bothGraphs = viz.append("g").attr('class', "bothGraphs");
let graphTranslateScale = d3.scaleLinear().domain([0, 1]).range([0, -wH])

bothGraphs.append("rect")
 .attr("x",0)
 .attr("y",0)
 .attr("width",wW)
 .attr("height",wH)
 .attr("fill","lightyellow");

 bothGraphs.append("rect")
 .attr("x",0)
 .attr("y",wH)
 .attr("width",wW)
 .attr("height",wH)
 .attr("fill","lightblue");

 bothGraphs.append("rect")
 .attr("x",0)
 .attr("y",wH*2)
 .attr("width",wW)
 .attr("height",wH)
 .attr("fill","lightgreen");

 bothGraphs.append("rect")
 .attr("x",0)
 .attr("y",wH*3)
 .attr("width",wW)
 .attr("height",wH)
 .attr("fill","pink");


let tooltip = bothGraphs.append("g").attr("class", "tooltip").attr("transform", "translate(-300,-200)").attr("opacity", 0);
tooltip.append("rect").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 100).attr("fill", "blue");
let description = tooltip.append("text").text("description").attr("x", 15).attr("y",20);


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

        //make the country name in location file and PAC file match 
         
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

        //put reason into 6 categories
        pacData.forEach(d =>{
          let reason = d.reason;
          if(reason == "War" || reason == "Invasion/ Annexation/ Occupation" ){
            d.reason = "War";
          }
          else if (reason == "Military rule/ One-party rule/ Dictatorship" || reason == "Protracted conflict" || reason== "Civil war" || reason=="Civil unrest"|| reason=="Insurgency"){
            d.reason = "Military rule / Civil Unrest";
          }
          else if (reason == "Treatment of indigenous population" || reason == "Settler colonialism"||reason=="Colonial rule"){
            d.reason = "Colonialism"
          }
          else if (reason == "Treatment of sick/disabled"|| reason== "Treatment of LGBTQ"|| reason== "Treatment of minority group"||reason=="Treatment of women"){
            d.reason = "Treatment of sick/LGBTQ/minority group/women"
          }
        })
        //console.log("after categorizing:",pacData);

        
        //SET AXIS AND MAP

        //Axis for Graph 1 (general timeline)

        let g1xScale = d3.scaleLinear().range([paddingLeft, gW+paddingLeft]);
        let extent = d3.extent(pacData, function(d){
            return d.year;
          })
        //console.log(extent);
        g1xScale.domain(extent);
        let g1xAxisGroup = bothGraphs.append("g")
            .attr("class", "x1axisgroup")
            .attr("transform", "translate(0,"+(paddingTop+gH)+")")
        ;

        let g1xAxis = d3.axisBottom(g1xScale);
          // build the axis into our group
        g1xAxisGroup.call(g1xAxis);


        //Reason graph axis

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

        //draw the map 

        let projection = d3.geoNaturalEarth1()  //can change to other projections
          .translate([wW/2,wH+wH/2])
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
          // console.log("over:",d);
          
        })

        ;


        //FORCE SIMULATIONS 
        //get position for graph 1
        let force = d3.forceSimulation(pacData)
          .force("forceX",d3.forceX(d => g1xScale(d.year)))
          .force("forceY",d3.forceY(wH/2))
          .force("collide",d3.forceCollide(5.5))
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

        //get position for map 
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
        .force("collide",d3.forceCollide(1.1))
      //.on("tick",simulationRan)
        .tick(400)
        .on("end",function(){
            pacData.forEach(d=>{
            
            d.g2x = d.x;
            d.g2y = d.y; //how can I change the y position of the map??
     
            })

            //showGraph2(); //!! change it here
            getPosition3();
              
         })
             
        ;

       }

       //get polistion  for graph 3

       function getPosition3(){
        force = d3.forceSimulation(pacData)
        .force("forceX",d3.forceX(d => g2xScale(d.year)))
       .force("forceY",d3.forceY(d => g2yScale(d.reason)) )
       .force("collide",d3.forceCollide(5.5))
     //.on("tick",simulationRan)
       .tick(400)
       .on("end",function(){
           pacData.forEach(d=>{
           
           d.g3x = d.x;
           d.g3y = d.y; //how can I change the y position of the map??
    
           })

           showGraph3(); //!! change it here
           getPosition4();

             
        })
            
      ;

      }

       //get polistion  for graph 4

       function getPosition4(){
        force = d3.forceSimulation(pacData)
        .force("forceX",d3.forceX(function(d){
          console.log("d",d);
          let p = d.roleperson;
          if(p == "1 =King/Queen/Emperor" || p == "5 =(Member of) parliament"  ){
            return paddingLeft+200;
          }
          else if (p == "2 =President" || p== "6 =Diplomat"){
            return paddingLeft+400;
          }
          else if (p == "3 =Prime Minister" ||p == "4 =Minister" || p=="8 =Other official role"){
            return paddingLeft+600;
          }
    
          else {

            return 10;
          }
          
        })) //d3.forceY(d => g2yScale(d.reason))
       .force("forceY",d3.forceY(function(d){
        let p = d.roleperson;
        if(p=="1 =King/Queen/Emperor" || p=="2 =President" ||p=="3 =Prime Minister" ||p=="4 =Minister"){
          return wH*3 + paddingTop + 100;
        }
        else {
          return  wH*3 + paddingTop + 300;
        }
  
  
      }))
       .force("collide",d3.forceCollide(5.5))
     //.on("tick",simulationRan)
       .tick(400)
       .on("end",function(){
           pacData.forEach(d=>{
           
           d.g4x = d.x;
           d.g4y = d.y; //how can I change the y position of the map??
    
           })

           showGraph4(); //!! change it here
           getPosition5();

             
        })
            
      ;

      }

      //get polistion  for graph 5

      function getPosition5(){
        force = d3.forceSimulation(pacData)
        .force("forceX",d3.forceX(function(d){
          console.log("d",d);
          let setting = d.setting;
          if(setting == "1 =Public speech" || setting == "5 =Commemoration" || setting == "12 =Twitter"  ){
            return paddingLeft+160;
          }
          else if (setting == "2 =Parliament" || setting == "7 =(Diplomatic) visit" || setting =="9 =Within country visit" || setting =="10 =(Diplomatic) reception" || setting =="50 =Other"){
            return paddingLeft+320;
          }
          else if (setting == "3 =Public letter/ Statement" || setting == "8 =Interview"){
            return paddingLeft+480;
          }
          else if (setting == "4 =Resolution/law" || setting == "11 =Conference/ Meeting"){
            return paddingLeft+640;
          }
          else {

            return 10;
          }
          
        })) //d3.forceY(d => g2yScale(d.reason))
       .force("forceY",d3.forceY(function(d){
        let setting = d.setting;
        if(setting =="1 =Public speech" || setting =="2 =Parliament" || setting =="3 =Public letter/ Statement" || setting =="4 =Resolution/law"){
          return wH*4 + paddingTop + 100;
        }
        else if (setting =="12 =Twitter" || setting == "50 =Other"){
          return wH*4 + paddingTop + 400;

        }
        else {
          return  wH*4 + paddingTop + 250;
        }
  
  
      }))
       .force("collide",d3.forceCollide(5.5))
     //.on("tick",simulationRan)
       .tick(400)
       .on("end",function(){
           pacData.forEach(d=>{
           
           d.g5x = d.x;
           d.g5y = d.y; //how can I change the y position of the map??
    
           })

           showGraph5(); //!! change it here
             
        })
            
      ;

      }


//calculate and save the position on graph 2 (map)
    //let simulation2 

      //console.log("pac",pacData);

        
      // put a circle for each data point onto the page
        
      function showGraph1(){

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
              .on("mouseover",function(event,d){
                d3.select(this)
                  .transition()
                  .duration(500)
                  .attr("r",6) 
                ;

                description.text(d.description).call(cdvTextWrap(270));
                tooltip.raise();
                tooltip.transition().duration(10).attr("transform", function(){
                  return "translate("+(d.g1x-150)+","+(d.g1y-120)+")"
                });
                tooltip.selectAll("text").attr("fill","red");
                tooltip.transition().delay(20).attr("opacity", 1);
              })
              .on("mouseout",function(event,d){

              
                d3.select(this)
                  .transition()
                  .duration(500)
                  .attr("r",4) 
                ;


                tooltip.transition().delay(50).duration(100).attr("opacity", 0);
                tooltip.transition().delay(170)
                  .attr("transform", "translate(-300, -200)")
                ;
              })
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
              .attr("r",4)
              ;
            
  

          }

      function showGraph2(){

            let updatingData = bothGraphs.selectAll(".datapoint").data(pacData); //temporary 
          //   let enteringData = updatingData.enter();

          //   enteringData
          //     .append("circle")
          //     .attr("class", "datapoint")
          //     .attr("cx", function(d){
          //       //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
          //       return d.g2x; //d.g1x
          //     })
          //     .attr("cy", function(d){
          //       return d.g2y;
          //     })
          //     .attr("r", 1)
          // ;

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
              .attr("r",1)

              ;

          }

      function showGraph3(){

            let updatingData = bothGraphs.selectAll(".datapointXXXX").data(pacData); //temporary 
            let enteringData = updatingData.enter();

            enteringData
              .append("circle")
              .attr("class", "datapoint")
              .attr("cx", function(d){
                //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
                return d.g3x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g3y;
              })
              .attr("r", 4)
              //mouse interaction
              .on("mouseover",function(event,d){
                //console.log("mouseoverrrr:",d);
                description.text(d.description).call(cdvTextWrap(270));
                tooltip.raise();
                tooltip.transition().duration(10).attr("transform", function(){
                  return "translate("+(d.g3x-150)+","+(d.g3y-120)+")"
                });
                tooltip.selectAll("text").attr("fill","red");
                tooltip.transition().delay(20).attr("opacity", 1);
              })
              .on("mouseout",function(event,d){
                tooltip.transition().delay(50).duration(100).attr("opacity", 0);
                tooltip.transition().delay(170)
                  .attr("transform", "translate(-300, -200)")
                ;
              })
          ;

            updatingData
              .transition()
              .duration(1000)
              .attr("cx",function(d){
                console.log("now the g2x data is: ",d.g3x); //g1x returns undefined
                return d.g3x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g3y;
              })
              .attr("r",4)

              ;

          }

          function showGraph4(){

            let updatingData = bothGraphs.selectAll(".datapointYYYY").data(pacData); //temporary 
            let enteringData = updatingData.enter();

            enteringData
              .append("circle")
              .attr("class", "datapoint")
              .attr("cx", function(d){
                //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
                return d.g4x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g4y;
              })
              .attr("r", 4)
              //mouse interaction
              .on("mouseover",function(event,d){
                //console.log("mouseoverrrr:",d);
                description.text(d.description).call(cdvTextWrap(270));
                tooltip.raise();
                tooltip.transition().duration(10).attr("transform", function(){
                  return "translate("+(d.g4x-150)+","+(d.g4y-120)+")"
                });
                tooltip.selectAll("text").attr("fill","red");
                tooltip.transition().delay(20).attr("opacity", 1);
              })
              .on("mouseout",function(event,d){
                tooltip.transition().delay(50).duration(100).attr("opacity", 0);
                tooltip.transition().delay(170)
                  .attr("transform", "translate(-300, -200)")
                ;
              })
          ;

            updatingData
              .transition()
              .duration(1000)
              .attr("cx",function(d){
                console.log("now the g4x data is: ",d.g4x); //g1x returns undefined
                return d.g4x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g4y;
              })
              .attr("r",4)

              ;

          }

          function showGraph5(){

            let updatingData = bothGraphs.selectAll(".datapointZZZZZ").data(pacData); //temporary 
            let enteringData = updatingData.enter();

            enteringData
              .append("circle")
              .attr("class", "datapoint")
              .attr("cx", function(d){
                //console.log("now the g1x data is: ",d.g1x); //g1x returns undefined
                return d.g5x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g5y;
              })
              .attr("r", 4)
              //mouse interaction
              .on("mouseover",function(event,d){
                //console.log("mouseoverrrr:",d);
                description.text(d.description).call(cdvTextWrap(270));
                tooltip.raise();
                tooltip.transition().duration(10).attr("transform", function(){
                  return "translate("+(d.g5x-150)+","+(d.g5y-120)+")"
                });
                tooltip.selectAll("text").attr("fill","red");
                tooltip.transition().delay(20).attr("opacity", 1);
              })
              .on("mouseout",function(event,d){
                tooltip.transition().delay(50).duration(100).attr("opacity", 0);
                tooltip.transition().delay(170)
                  .attr("transform", "translate(-300, -200)")
                ;
              })
          ;

            updatingData
              .transition()
              .duration(1000)
              .attr("cx",function(d){
                console.log("now the g4x data is: ",d.g5x); //g1x returns undefined
                return d.g5x; //d.g1x
              })
              .attr("cy", function(d){
                return d.g5y;
              })
              .attr("r",4)

              ;

          }


          
          

    
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
              // bothGraphs.attr("transform", function(){
              //   let y = graphTranslateScale(progress)
              //   return "translate(0, "+y+")";
              // })
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

