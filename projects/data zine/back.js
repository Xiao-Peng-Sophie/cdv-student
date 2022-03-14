console.log("this is the back page")
let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
      .attr("class", "viz")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#FFFDF6") //FFFDF6
;

function anotherTriangle(d,i){
    let y=-230*Math.sqrt(3);
    // return "M 0 0 25 -50 -25 -50  Z"
    return "M 0 0 230 "+y+ "-230 "+ y +  " Z";
  }

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(150,180) scale(0.225)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(150,180) rotate(180) scale(0.225)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(150,216) rotate(180) scale(0.225,0.135)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(150,180) scale(0.1125)")
          ;
viz.append("rect")
          .attr("x",83)
          .attr("y",68)
          .attr("width",135)
          .attr("height",14)
          .attr("fill","#F8D0AC")
          ;
  
viz.append("rect")
          .attr("x",83)
          .attr("y",277)
          .attr("width",135)
          .attr("height",14)
          .attr("fill","#F8D0AC")
          ;

viz.append("circle")
          .attr("cx",150)
          .attr("cy",132)
          .attr("r",18)
          .attr("fill","#FFAE6F")
           ;

viz.append("circle")
           .attr("cx",150)
           .attr("cy",255)
           .attr("r",9)
           .attr("fill","#FFEF9D")
            ;

viz.append("rect")
            .attr("x",150)
            .attr("y",125)
            .attr("width",110)
            .attr("height",1.5)
            .attr("fill","#3B445B")
            ;

viz.append("rect")
            .attr("x",150)
            .attr("y",165)
            .attr("width",110)
            .attr("height",1.5)
            .attr("fill","#3B445B")
;

viz.append("rect")
            .attr("x",150)
            .attr("y",254)
            .attr("width",110)
            .attr("height",1.5)
            .attr("fill","#3B445B")
            
;

viz.append("text")
.attr("x",270)  
.attr("y",130)
// .attr("class","title")
.attr("style","font-size:18px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("what I'm waiting for") 
;

viz.append("text")
.attr("x",270)  
.attr("y",170)
// .attr("class","title")
.attr("style","font-size:18px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("where") 
;

viz.append("text")
.attr("x",270)  
.attr("y",258)
// .attr("class","title")
.attr("style","font-size:18px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("what I'm doing") 
;

//********** */

viz.append("text")
.attr("x",83)  
.attr("y",355)
// .attr("class","title")
.attr("style","font-size:24px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("what I'm waiting for") 
;

let forWhatColors1=[
    "#FFAE6F", 
    "#FF86C0",
    "#FF98A4",
    "#FFC860",
    "#D3A8FF",
    "#FF906C",
    "#F29FFF"

];

let forWhatText1=[
    "Food",
    "Traffic light",
    "Friend(s)",
    "Subway",
    "Workout over",
    "Alarm clock",
    "Shuttle bus"

];

for(let i=0;i<7;i++){

    viz.append("circle")
           .attr("cx",98)
           .attr("cy",400+i*55)
           .attr("r",16)
           .attr("fill",forWhatColors1[i])
;

viz.append("text")
    .attr("x",130)  
    .attr("y",405+i*55)
    // .attr("class","title")
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text(forWhatText1[i]) 
;


}

let forWhatColors2=[
    "#9BABFF",
    "#FFB3A9",
    "#FFEC89",
    "#85AEFF",
    "#94DFA4",
    "#79D4DA"
];
let forWhatText2=[
    "Taxi",
    "A friend's face in video",
    "A friend's guitar video",
    "Sunset",
    "Class begin",
    "Spoiling water"


];

for(let i=0;i<6;i++){

    viz.append("circle")
           .attr("cx",308)
           .attr("cy",400+i*55)
           .attr("r",16)
           .attr("fill",forWhatColors2[i])
;

viz.append("text")
    .attr("x",340)  
    .attr("y",405+i*55)
    // .attr("class","title")
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text(forWhatText2[i]) 
;


}

viz.append("text")
.attr("x",625)  
.attr("y",355)
// .attr("class","title")
.attr("style","font-size:24px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("where") 
;

let whereColors=[
    "#86B2F3",
    "#7CCBED",
    "#AFBEF5",
    "#97D0AA",
    "#CDBEF5",
    "#97D9D5",
    "#EDBEF5",

];
let whereText=[
    "School",
    "Road",
    "Restaurant",
    "Gym",
    "Dorm",
    "Subway station",
    "Park"

];


for(let i=0;i<7;i++){

    viz.append("circle")
           .attr("cx",640)
           .attr("cy",400+i*55)
           .attr("r",16)
           .attr("fill",whereColors[i])
;

viz.append("text")
    .attr("x",672)  
    .attr("y",405+i*55)
    // .attr("class","title")
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text(whereText[i]) 
;


}

//**** */
viz.append("text")
.attr("x",865)  
.attr("y",355)
// .attr("class","title")
.attr("style","font-size:24px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("what I'm doing") 
;

let doingColors=[
    "#FFEF9D",
    " #FFD6D6",
    " #D7F091",
    " #FFD4AD",
    "#DCFFD7"


];

let doingText=[
    "Chatting with friends",
    "Looking at phone",
    "Just waiting",
    "Recording a video",
    "Riding a bike",

];


for(let i=0;i<5;i++){

    viz.append("circle")
           .attr("cx",880)
           .attr("cy",400+i*55)
           .attr("r",16)
           .attr("fill",doingColors[i])
;

viz.append("text")
    .attr("x",912)  
    .attr("y",405+i*55)
    // .attr("class","title")
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text(doingText[i]) 
;


}

viz.append("text")
.attr("x",625)  
.attr("y",100)
// .attr("class","title")
.attr("style","font-size:24px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("waiting time") 
;


viz.append("text")
.attr("x",865)  
.attr("y",100)
// .attr("class","title")
.attr("style","font-size:24px; font-family: monospace; ")
.attr("fill","#3B445B")
.text("my mood") 
;
//!!!!!!!

function anotherTriangle(d,i){
    let y=-230*Math.sqrt(3);
    // return "M 0 0 25 -50 -25 -50  Z"
    return "M 0 0 230 "+y+ "-230 "+ y +  " Z";
  }
//one hourglass
viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(650,200) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(650,200) rotate(180) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(650,200) scale(0.09)")
;

viz.append("path")
     .attr("d",anotherTriangle)
     .attr("fill","#86B2F3")
     .attr("transform", "translate(650,236) rotate(180) scale(0.125,0.035)")
     ;

//another 
viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(725,200) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(725,200) rotate(180) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(725,200) scale(0.07)")
;
viz.append("path")
     .attr("d",anotherTriangle)
     .attr("fill","#86B2F3")
     .attr("transform", "translate(725,226) rotate(180) scale(0.125,0.06)")
     ;
//another
viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(800,200) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#CFEEFF")
          .attr("transform", "translate(800,200) rotate(180) scale(0.125)")
          ;

viz.append("path")
          .attr("d",anotherTriangle)
          .attr("fill","#86B2F3")
          .attr("transform", "translate(800,200) scale(0.055)")
;

viz.append("path")
     .attr("d",anotherTriangle)
     .attr("fill","#86B2F3")
     .attr("transform", "translate(800,222) rotate(180) scale(0.125,0.07)")
;

//mood shape

viz.append("circle")
          .attr("cx",890)
          .attr("cy",180)
          .attr("r",18)
          .attr("fill","#FFAE6F")
;

viz.append("circle")
          .attr("cx",980)
          .attr("cy",180)
          .attr("r",18)
          .attr("fill","#FFAE6F")
;

viz.append("rect")
            .attr("x",962)
            .attr("y",180)
            .attr("width",36)
            .attr("height",36)
            .attr("fill","#FFFDF6")
;

viz.append("circle")
          .attr("cx",1070)
          .attr("cy",186)
          .attr("r",18)
          .attr("fill","#FFAE6F")
;

viz.append("rect")
            .attr("x",1052)
            .attr("y",180)
            .attr("width",36)
            .attr("height",36)
            .attr("fill","#FFFDF6")
;

viz.append("text")
    .attr("x",865)  
    .attr("y",230)
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text("Happy") 
;

viz.append("text")
    .attr("x",955)  
    .attr("y",230)
    .attr("style","font-size:18px; font-family: monospace; ")
    .attr("fill","#3B445B")
    .text("Normal") 
;
viz.append("text")
    .attr("x",1045)  
    .attr("y",230)
    .attr("style","font-size:18px; font-family: monospace;  ")
    .attr("fill","#3B445B")
    .text("Impatient") 
;








