var viz= d3.select("#viz-container")
    .append("svg")
        .attr("id","viz")
        .attr("width",800)
        .attr("height",window.innerHeight-20)
;

// viz.attr("height",600);

// var myCircle= viz.append("circle")
//     .attr("cx",100)
//     .attr("cy",200)
//     .attr("r",50)
// ;

// myCircle.attr("fill","white");

var myData = [4,10,8,2,9,14,3];

function randomX(){
    return Math.random()*700;
}

function durianRadius(d,i){
    console.log(d);
    return d.durian*5;
}
function posX(d,i){ // d is the value of datapoint and i is the index like iterating an array
    console.log("D3 passed",d,"and",i,"into the function");
    return 50+i*100;
    
}

function getRadius(d,i){
    return d*4;
}




function gotData(newData){
    console.log(newData);



    viz.selectAll("circle").data(newData).enter().append("circle")
        .attr("cx",posX)  //function reference not directly call the function 
        .attr("cy",200)
        .attr("r",durianRadius)

;
    





}





d3.json("data.json").then(gotData)