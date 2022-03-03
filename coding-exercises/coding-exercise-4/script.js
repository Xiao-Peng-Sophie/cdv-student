var viz= d3.select("#viz-container")
    .append("svg")
        .attr("id","viz")
        .attr("width",700)
        .attr("height",700)
        
;
function mapValue (n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
  };


function posX(d,i){
    var p=i%3;
    return 150+p*200;
}

function posY(d,i){
    var py=Math.floor(i/3)
    return 150+py*200;
}

function translateGroup(d,i){
    var px=i%3;
    var py=Math.floor(i/3);
    var x=150+px*200;
    var y=150+py*200;

    
    return "translate("+x+","+y+")"
}
function checkEllipse(d,i){
    if(d.takenBy=="Camera"){
        // return "rgba(0,0,0,0)"; 
        return 0;
    }
    else {
        return 1;
    }
}

function checkDiamond(d,i){
    if(d.takenBy=="Phone"){
        // return "rgba(0,255,0,0)";
        return 0;
    }
    else {
        return 1;
    }
}
function checkCircle(d,i){
    if(d.where=="Indoor"){
        // return "rgba(255, 140, 169,0)";
        return 0;
    }
    else {
        return 1;
    }
}
function checkSquare(d,i){
    if(d.where=="Outdoor"){
        return 0; //return "rgba(255, 0, 0,0)";
    }
    else {
        return 1;
    }
}
function getRadius(d,i){
    var r=mapValue(d.satisfaction,1,5,6,12)
    return r ;
}

function insideColor(d,i){
    if(d.with=="family"){
        return "rgb(138, 200, 255)"; //247, 149, 74
    }
    else if (d.with=="alone"){
        return "rgb(156, 164, 255)";
    }
    else{
        return "rgb(255, 77, 127)";
    }
}
function outsideColor(d,i){
    if(d.weather=="Sunny"){
        return "rgb(255, 172, 89)"; 
    }
    else if (d.weather=="Cloudy"){
        return "rgb(203, 147, 237)";
    }
    else{
        return "rgb(255, 168, 168)";
    }
}
function getText(d,i){
    return d.aboutWhat ;
}
function gotData(newData){
   

       
        let dataGroups=viz.selectAll(".dataGroup").data(newData).enter().append("g") //!!!!!! group
        .attr("class","dataGroup") ;

        var sym = d3.symbol().type(d3.symbolDiamond).size(1000);

        dataGroups.append("rect")
        .attr("x",-50)
        .attr("y",-50)
        .attr("width",100)
        .attr("height",100)
        .attr("fill",outsideColor)
        .style("opacity",checkSquare)
        .attr("transform","rotate(45)")  //rgba(200,0,0,1)
        ;

        dataGroups.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",60)
        .attr("fill",outsideColor)
        .style("opacity",checkCircle)
        
        ;

    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill",insideColor)
        .style("opacity",checkDiamond)

        .attr("transform","translate(-30,0) rotate(90)");


    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill",insideColor)
        .style("opacity",checkDiamond)
        .attr("transform","translate(0,30)");

    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill",insideColor)
        .style("opacity",checkDiamond)
        .attr("transform","translate(0,-30)");
    
    dataGroups.append("path")
        .attr("d",sym)
        .attr("fill",insideColor)
        .style("opacity",checkDiamond)
        .attr("transform","rotate(90)")
        .attr("transform","translate(30,0) rotate(90)");

        dataGroups.append("ellipse")
        .attr("cx",0)
        .attr("cy",0)
        .attr("rx",60)
        .attr("ry",12)
        .attr("fill",insideColor)
        .style("opacity",checkEllipse)
        
        ;

        dataGroups.append("ellipse")
        .attr("cx",0)
        .attr("cy",0)
        .attr("rx",60)
        .attr("ry",12)
        .attr("fill",insideColor)
        .style("opacity",checkEllipse)
        .attr("transform","rotate(90)") ;



        dataGroups.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",16)
        .attr("fill","white")
        .style("opacity",0.3) ;
   
        dataGroups.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",getRadius)
        .attr("fill","rgb(64, 99, 255)") ;

        

        dataGroups.append("text")
            .text(getText)
            .attr("x",-65)
            .attr("y",100)
            .attr("fill","rgb(37, 37, 68)")
            .attr("font-size","1.4em")
            .attr("font-family","monospace");

        
        
        
        


    dataGroups.attr("transform",translateGroup);



  


}

d3.json("data.json").then(gotData)
