console.log("helloooo");

let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
      .attr("class", "viz")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "white")
;

function getPosition(d,i){
  
  var px=i%12;
  var py=Math.floor(i/12);
  var x=100+px*200;
  var y=120+py*250;
  return "translate("+x+","+y+")"
}
//"whatWereYouDoing": "Chatting with friends"
function doingWhat(d,i){
  if (d.whatWereYouDoing == "Chatting with friends"){
    return "#FFEF9D";
  }
  else if(d.whatWereYouDoing == "Looking at phone"){
    return " #FFD6D6";
  }
  else if(d.whatWereYouDoing == "Just waiting"){
    return " #D7F091";
  }
  else if(d.whatWereYouDoing == "Recording the video"){
    return " #FFD4AD";
  }
  else{
    return "#DCFFD7";
  }
}

function where(d,i){
  if(d.where=="School"){
    return "#86B2F3" ;
  }

  else if (d.where =="Road"){
    return "#7CCBED" ;
  }
  else if (d.where =="Restaurant"){
    return "#AFBEF5" ;
  }
  else if (d.where =="Gym treadmill"){
    return "#97D0AA" ;
  }
  else if (d.where =="Dorm"){
    return "#CDBEF5" ;
  }
  else if (d.where =="Subway station"){
    return "#CDBEF5" ;
  }
  else {
    return "#EDBEF5"; //park
  }
}

function forWhat(d,i){
  if(d.whatAreYouWaitingFor == "Food"){
    return "#FFB47E" ;
  }
  else if(d.whatAreYouWaitingFor == "Traffic Light"){
    return "#FF8CC3" ;
  }
  else if(d.whatAreYouWaitingFor == "Friends"){
    return "#FF8989" ;
  }
  else if(d.whatAreYouWaitingFor == "Subway"){
    return "#FDCE74" ;
  }
  else if(d.whatAreYouWaitingFor == "Workout Over"){
    return "#CE9CFF" ;
  }
  else if(d.whatAreYouWaitingFor == "Alarm clock"){
    return "#F48866" ;
  }
  else if(d.whatAreYouWaitingFor == "Shuttle Bus"){
    return "#F096FF" ;
  }
  else if(d.whatAreYouWaitingFor == "Taxi"){
    return "#A8A6FF" ;
  }
  else if(d.whatAreYouWaitingFor == "A friend's face in a video"){
    return "#FFC0B8" ;
  }
  else if(d.whatAreYouWaitingFor == "A video of my friend's playing guitar"){
    return "#FEF391" ;
  }
  else if(d.whatAreYouWaitingFor == "Sunset"){
    return "#EF63A6" ;
  }
  else {
    return "#FFB9E3";
  }
}

function gotData(incomingData){
  console.log(incomingData);
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup") ;

      var sym = d3.symbol().type(d3.symbolTriangle).size(3000);
      // datagroups.append("circle")
      //   .attr("cx",0)
      //   .attr("cy",0)
      //   .attr("r",60)
      //   .attr("fill","red")
      //   ;
//basic hourglass
      datagroups.append("path")
        .attr("d",sym)
        .attr("fill","rgb(194,231,252)")
        .attr("transform","translate(0,80)");

      datagroups.append("path")
        .attr("d",sym)
        .attr("fill","rgb(194,231,252)")
        .attr("transform","translate(0,-16) rotate(180)");
      
      datagroups.append("rect")
        .attr("x",-55)
        .attr("y",-58)
        .attr("width",110)
        .attr("height",11)
        .attr("fill","rgb(233,198,166)")
        ;

      datagroups.append("rect")
        .attr("x",-55)
        .attr("y",110)
        .attr("width",110)
        .attr("height",11)
        .attr("fill","rgb(233,198,166)")
        ;

        

        // triangle at top - where & how long
        var topTriangle = d3.symbol().type(d3.symbolTriangle).size(1500);
        function myTriangle(d,i){
          return "M -42 0 42 0 0 -75 Z"
        }
        // datagroups.append("circle")
        // .attr("cx",0)
        // .attr("cy",0)
        // .attr("r",20)
        // // .attr("height",60)
        // .attr("fill","black")
        // ;

        let myScale= d3.scaleLinear().domain([2,60]).range([0.8,0.2]);
        
        datagroups.append("path")
        .attr("d",topTriangle)
        .attr("fill",where)
        // .attr("transform","translate(0,4) rotate(180) scale(0.5)");
        .attr("transform",function(d, i){
          let a = d.howLongDidYouWait;
          let time = parseInt(a);
          
          let result=myScale(time);

          return "translate(0,0) rotate(180) scale( "+result+")"; //different from linear scale?
        })
        
        ;

        //triangle at bottom - where & how long
        datagroups.append("path")
        .attr("d",myTriangle)
        .attr("fill",where)
        .attr("transform",function(d, i){
          console.log(d)
          let a = d.howLongDidYouWait;
          //var time= parseInt(d.howLongDidYouWait);
          let time = parseInt(a);
          let result=0.35+time/180;

          return "translate(0,104) scale(1, "+result+")"; //different from linear scale?
        })
        
        ;

        //circle at the bottom - what I'm doing
       datagroups.append("circle")
       .attr("cx",0)
       .attr("cy",91)
       .attr("r",8)
       .attr("fill",doingWhat)
       ;

        // circle at top - wait for what & mood
        datagroups.append("circle")
        .attr("cx",0)
        .attr("cy",-10)
        .attr("r",15)
        .attr("fill",forWhat)
        ;




  

      





      

  datagroups.attr("transform",getPosition);



}


d3.json("data.json").then(gotData);