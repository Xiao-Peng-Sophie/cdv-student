


let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 600)
                    .attr("height", 400)
                    .style("background-color", "lavender")
;

function randomX(d,i){
    return Math.random()*600;
}
function randomY(d,i){
    return Math.random()*400;
}

function translateGroup(d,i){
    var x=50+i*100
    
    return "translate("+x+",200)"
}
function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)
    // viz.selectAll(".blackCircle").data(incomingData).enter().append("circle") //!!!!!!
    //     .attr("class","blackCircle") //!!!!!
    //     .attr("cx",randomX)
    //     .attr("cy",randomY)
    //     .attr("r",10)
    //     .attr("fill","black")
    // ;

    // viz.selectAll(".redCircle").data(incomingData).enter().append("circle") //!!!!!!
    //     .attr("class","redCircle") //!!!!!
    //     .attr("cx",randomX)
    //     .attr("cy",randomY)
    //     .attr("r",10)
    //     .attr("fill","red")
    // ;

    let dataGroups=viz.selectAll(".dataGroup").data(incomingData).enter().append("g") //!!!!!! group
            .attr("class","dataGroup")

    ;
    var sym = d3.symbol().type(d3.symbolDiamond).size(1000);

    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill","green")
        .attr("transform","translate(0,0) rotate(90)");


    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill","green")
        .attr("transform","translate(30,30)");

    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill","green")
        .attr("transform","translate(30,-30)");
    
    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill","red")
        .attr("transform","rotate(90)")
        .attr("transform","translate(60,0) rotate(90)");


    dataGroups.append("circle")
        .attr("cx",30)
        .attr("cy",0)
        .attr("r",10)
        .attr("fill","black")

    ;

    dataGroups.append("circle")
        .attr("cx",-10)
        .attr("cy",30)
        .attr("r",20)
        .attr("fill","red")

    ;

    dataGroups.append("text")
        .text("hello?")
        .attr("x",-10)
        .attr("y",40)
        .attr("font-size","1.3em");
    dataGroups.attr("transform",translateGroup);


    




    


}


d3.json("data.json").then(gotData)

