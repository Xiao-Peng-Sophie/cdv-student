// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");


// global variables that we need at various spots:
let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
;

// X SCALE
// we use a band scale
//
// reference: https://github.com/d3/d3-scale#band-scales
// example: https://observablehq.com/@d3/d3-scaleband
//
// this is a useful scale when associating names (not values) with spots
// on the x axis. we don't map a range of values to another range of values,
// but a fixed set of names (the keys of our data points) to
// a range (pixel values along the x axis)
//
// first we need an array with the keys only:
let allNames = data.map(function(d){return d.key});
// check it:
console.log(allNames);

function assignkeys(d) {
    return d.key;
}

// now we as d3 to give us our custom scale
// we say "hey d3, here is a list of names (keys (the domain)), I want a function that
// returns a number (pixel location on the x axis (the range)) for each of the names.
// oh, and could you make sure that this functions calculates in some
// distance (passingInner) between each of thos points (bands)?"
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;
// create a visual axis corresponding to the scale.
let xAxis = d3.axisBottom(xScale)
// this is a tricky one.... by default the axis would show the scales domain (the unique keys)
// ...in our case we want emojis to show. This situation hardly comes up,
// that's why I just wrote this one-liner for you:
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
// create a group to hold all the axis elements
let xAxisGroup = viz.append("g").classed("xAxis", true);
// tell d3 to put the axis into place
xAxisGroup.call(xAxis);
// modfy the axis label (the emoojis) size
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
// get rid of the little tick lines
xAxisGroup.selectAll("line").remove();
// bring axis to the correct y position
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")


// Y SCALE
// we will not show a y axis in this graph, but still need a scale
// to make sure our bars have heights that fit the window. It's
// familiar linear scale.
let yMax = d3.max(data, function(d){return d.value});
// I decided not to use the minimum value of the dataset,
// because otherwise the smallest value's bar would always be 0 pixels
// high and therefore invisible.
yDomain = [0, yMax];
// "hey d3 i need a linear scale please. yeah! I want to supply a value
// to it that is between 0 and yMax and want one back that fits between
// my graph's paddings. Cheers!"
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);


// the ACTUAL GRAPH
// before we get to the actual graph, we make a group element into which to
// put all visual graph things:
let graphGroup = viz.append("g").classed("graphGroup", true);
// btw, this:
// .classed("graphGroup", true);
// is almost equivalent to
// .attr("class", "graphGroup");


let elementsForPage = graphGroup.selectAll(".datapoint").data(data);
// note, we do not use ".enter()" for now. let's have a close look
// at just this for now
// as we have learned, D3 did some kind of calculation here, some weighing
// of what is on the page already and what needs to go there.
// have a close look at this console.log:
console.log("D3's assessment of whats needed on the page:", elementsForPage);


let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();
// and again, look closely:
console.log("enteringElements", enteringElements);
console.log("exitingElements", exitingElements);


// make a group for each datapoint
let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
// position the group along the x axis (check the inspector tool to see
// what we are doing):
enteringDataGroups.attr("transform", function(d, i){
  return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
});
// then append rectangles to them and position/size them:
enteringDataGroups
  .append("rect")
    .attr("width", function(){
      // the scaleBand we are using
      // allows us to as how thick each band is:
      return xScale.bandwidth();
    })
    .attr("height", function(d, i){
      // the idea is that we make the bar
      // as high as dictated by the value...
      return yScale(d.value);
    })
    .attr("y", function(d,i){
      // ...and then push the bar up since it
      // is drawn from top to bottom
      return -yScale(d.value);
    })
    .attr("fill", "rgb(255,211,99)")
;

function basicSetting(){
    allNames = data.map(function(d){return d.key});
// and adjust the domain of xScale:
    xScale.domain(allNames);
    xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
    xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page
        
    // y scale...
    yMax = d3.max(data, function(d){return d.value});
    yDomain = [0, yMax+yMax*0.1];
    yScale.domain(yDomain);

    elementsForPage = graphGroup.selectAll(".datapoint").data(data,assignkeys); //!@@@@@@@@@@
    // note, we don't need "let" because the variable elementsForPage already exists
    console.log(elementsForPage);

    enteringElements = elementsForPage.enter();
    // and the exiting ones like so:
    exitingElements = elementsForPage.exit();
    // note: i don't use "let" because this variables already exists
    // ...after extracting those subgroups, what's left in elementsForPage
    // are the elements that update.
    // let's try it:
    elementsForPage.transition().delay(200).duration(1000).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });

    elementsForPage.select("rect")
            .transition()
            // .delay(100)
            .duration(100)
            .attr("width", function(){
                return xScale.bandwidth();
            })
            .attr("y", function(d,i){
            return -yScale(d.value);
            })
            .attr("height", function(d, i){
            return yScale(d.value);
            })
    ;

}


function add(){
    addDatapoints(1);
    basicSetting();

    

    //******** */
    let incomingDataGroups = enteringElements
    .append("g")
      .classed("datapoint", true)
  ;
  // position the groups:
  incomingDataGroups.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });
  // and append rectangles
  incomingDataGroups
  .append("rect")
    .attr("y", function(d,i){
      return 0;
    })
    .attr("height", function(d, i){
      return 0;
    })
    .attr("width", function(){
      return xScale.bandwidth();
    })
    .attr("fill", "#F27294")
    .transition()
    .delay(800)
    .duration(800)
    .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
    .transition()
    // .delay(500)
    .duration(200)
    
    .attr("fill", "rgb(255,211,99)")
 ;

    
           
  }
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
    removeDatapoints(1);

    elementsForPage = graphGroup.selectAll(".datapoint").data(data,assignkeys);//******* */
    // note, we don't need "let" because the variable elementsForPage already exists
    console.log(elementsForPage);

    enteringElements = elementsForPage.enter();
    // and the exiting ones like so:
    exitingElements = elementsForPage.exit();
    exitingElements.transition().attr("fill", "#F27294").transition().duration(500).attr("transform", function(d, i){
        return "translate("+ xScale(d.key)+ ",0)" ////undefined
        }).remove(); //add transition here!!!!!!

        // .attr("fill", "#F27294")
        // .transition()
        // .delay(500)
        // .duration(500)

        
    basicSetting();



    

   
    
  }
  document.getElementById("buttonB").addEventListener("click", remove);

  function removeAndAdd(){
    removeAndAddDatapoints(1,1);
    remove();
    add();

  }
  document.getElementById("buttonC").addEventListener("click", removeAndAdd);
  
  function sortData(){
    sortDatapoints();
    basicSetting();
  }
  document.getElementById("buttonD").addEventListener("click", sortData);
  
  function shuffleData(){
    shuffleDatapoints();
    basicSetting();

  }
  document.getElementById("buttonE").addEventListener("click", shuffleData);
  
  function surprise(){
    // shuffleDatapoints();
    // basicSetting();
    basicSetting();

    function randomColor(){
        let getRandom = Math.floor(Math.random()*255);
        console.log("getRandom",getRandom);
        
        return "rgb(255,"+getRandom+",100)" ;
    }

  elementsForPage.select("rect")
  .transition().duration(1000)
  .attr("fill",randomColor).transition().duration(1000).attr("fill","rgb(255,211,99)")
  ;
  
  }
  document.getElementById("buttonF").addEventListener("click", surprise);