function mapValue (n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };

var viz= d3.select("#viz-container")
    .append("svg")
        .attr("id","viz")
        .attr("width",800)
        .attr("height",600)
        //window.innerHeight-20
;



function waitingTimeRadius(d,i){
    var time= parseInt(d.howLongDidYouWait);
    return mapValue(time,1,60,15,45)
}
function moodColor(d,i){
    var mood=d.feelings;
    var c;
    if(mood == "Normal"){
        c="rgb(217, 213, 247)";
        
    }
    else if(mood == "Impatient"){
        c="rgb(173, 226, 255)";

    }
    else{
        c="rgb(255, 214, 231)";
    }
    return c;
}
function waitingStroke(d,i){
    var circleStroke;
    if (d.whatWereYouDoing=="Just waiting"){
        circleStroke="rgba(70, 70, 70,0.2)"
    }
    else{
        circleStroke="none"
    }
    return circleStroke;
    
}

function textPosX(d,i){
    var p= i%6;
    return 30+p*130;
}
function posX(d,i){ // d is the value of datapoint and i is the index like iterating an array
    console.log("D3 passed",d,"and",i,"into the function");
    var p= i%6;
    return 60+p*120;
    
}
function textPosY(d,i){
    var py=Math.floor(i/6) //on py+1 row
    return 113+py*130;
}
function posY(d,i){
    var py=Math.floor(i/6) //on py+1 row
    return 50+py*130;

}
function getText(d,i){
    return d.whatAreYouWaitingFor;
}

function getRadius(d,i){
    return d*4;
}




function gotData(newData){
    console.log(newData);



    var myCircle=viz.selectAll("circle").data(newData).enter().append("circle")
        .attr("cx",posX)  //function reference not directly call the function 
        .attr("cy",posY)
        .attr("r",waitingTimeRadius)
        .attr("fill",moodColor)
        .attr("stroke",waitingStroke)
        .attr("stroke-width",12)
        // .attr("r",durianRadius)


;

    // viz.selectAll("text").data(newData).enter().append("text")
    // .attr("x",textPosX)  //function reference not directly call the function 
    // .attr("y",textPosY)
    // .attr("style","font-size:15px; font-family: monospace;")
    // .text(getText)
    
    
    
    // ;


    
    





}





d3.json("data.json").then(gotData)