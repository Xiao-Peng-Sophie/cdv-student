console.log("helloooo");

let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
      .attr("class", "viz")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#FFFDF6") //FFFDF6
;

function getPosition(d,i){
  
  var px=i%12;
  var py=Math.floor(i/12);
  var x=100+px*200;
  var y=120+py*250;
  return "translate("+x+","+y+") scale(0.9)"
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
    return "#97D9D5" ;
  }
  else {
    return "#EDBEF5"; //park
  }
}

function forWhat(d,i){
  if(d.whatAreYouWaitingFor == "Food"){
    return "#FFAE6F" ;
  }
  else if(d.whatAreYouWaitingFor == "Traffic Light"){
    return "#FF86C0" ;
  }
  else if(d.whatAreYouWaitingFor == "Friends"){
    return "#FF98A4" ;
  }
  else if(d.whatAreYouWaitingFor == "Subway"){
    return "#FFC860" ;
  }
  else if(d.whatAreYouWaitingFor == "Workout Over"){
    return "#D3A8FF" ;
  }
  else if(d.whatAreYouWaitingFor == "Alarm clock"){
    return "#FF906C" ;
  }
  else if(d.whatAreYouWaitingFor == "Shuttle Bus"){
    return "#F29FFF" ;
  }
  else if(d.whatAreYouWaitingFor == "Taxi"){
    return "#9BABFF" ;
  }
  else if(d.whatAreYouWaitingFor == "A friend's face in a video"){
    return "#FFB3A9" ;
  }
  else if(d.whatAreYouWaitingFor == "A video of my friend's playing guitar"){
    return "#FFEC89" ;
  }
  else if(d.whatAreYouWaitingFor == "Sunset"){
    return "#85AEFF" ;
  }
  else if(d.whatAreYouWaitingFor == "Class begin"){
    return "#94DFA4" ;
  }
  else {
    return "#79D4DA";
  }
}

function gotData(incomingData){
  console.log(incomingData);
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class","datagroup") ;

      var sym = d3.symbol().type(d3.symbolTriangle).size(3000);
      

  

//basic hourglass
      datagroups.append("path")
        .attr("d",sym)
        .attr("fill","#CFEEFF")
        .attr("transform","translate(0,80)");

      datagroups.append("path")
        .attr("d",sym)
        .attr("fill","#CFEEFF")
        .attr("transform","translate(0,-16) rotate(180)");
      
      datagroups.append("rect")
        .attr("x",-55)
        .attr("y",-58)
        .attr("width",110)
        .attr("height",11)
        .attr("fill","#F8D0AC")
        ;

      datagroups.append("rect")
        .attr("x",-55)
        .attr("y",110)
        .attr("width",110)
        .attr("height",11)
        .attr("fill","#F8D0AC")
        ;

        

        // triangle at top - where & how long
        var topTriangle = d3.symbol().type(d3.symbolTriangle).size(1500);
        function myTriangle(d,i){
          return "M -42 0 42 0 0 -75 Z"
        }

       

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

        

        function anotherTriangle(d,i){
          let y=-25*Math.sqrt(3);
          // return "M 0 0 25 -50 -25 -50  Z"
          return "M 0 0 25 "+y+ "-25 "+ y +  " Z";
        }
        let myScale= d3.scaleLinear().domain([2,60]).range([1.15,0.78]);
  
        datagroups.append("path")
          .attr("d",anotherTriangle)
          .attr("fill",where)
          .attr("transform",function(d, i){
           
            let a = d.howLongDidYouWait;
            let time = parseInt(a);
            //let result=0.35+time/180
            let result=myScale(time);
  
            return " translate(0,32) scale("+result+")"; //different from linear scale?
          })
          
          ;
          function getY (d,i){
            let a = d.howLongDidYouWait;
            let time = parseInt(a);
            let index=myScale(time);
            let moodIndex=0;
            if(d.feelings=="Impatient"){
              moodIndex=6;
            }
            let posY=32-25*Math.sqrt(3)*index+moodIndex;


            return posY;
          }
         // circle at top - wait for what & mood
        datagroups.append("circle")
        .attr("cx",0)
        .attr("cy",getY)
        .attr("r",15)
        .attr("fill",forWhat)
      
        ;

        datagroups.filter(function(d, i){
          if(d.feelings == "Happy and Excited"){
             return false
          }else{
             return true
          }
      }).append("path")
      .attr("d",anotherTriangle)
      .attr("fill",where)
      .attr("transform",function(d, i){
       
        let a = d.howLongDidYouWait;
        let time = parseInt(a);
        //let result=0.35+time/180
        let result=myScale(time);

        return " translate(0,32) scale("+result+")"; //different from linear scale?
      })
      
      ;


        // datagroups.append("path")
        //   .attr("d",anotherTriangle)
        //   .attr("fill",where)
        //   .attr("transform",function(d, i){
           
        //     let a = d.howLongDidYouWait;
        //     let time = parseInt(a);
        //     //let result=0.35+time/180
        //     let result=myScale(time);
  
        //     return " translate(0,32) scale("+result+")"; //different from linear scale?
        //   })
          
        //   ;

         //arc 
        //   var path1= d3.path();
        // path1.arc(0,0,15,-2.74,-0.4)
        //  datagroups.append("path")
        //  .attr("d",path1)
        //  .attr("fill","blue")
        //  .attr("transform","translate(0,-10) scale(1,1)")
        //  ;


         //semi circle

        // path1.arc(0,0,15,3.14,0)
        //  datagroups.append("path")
        //  .attr("d",path1)
        //  .attr("fill","blue")
        //  .attr("transform","translate(0,-17) scale(1,1)")
        //  ;

          




  

      





      

  datagroups.attr("transform",getPosition);



}


d3.json("data.json").then(gotData);