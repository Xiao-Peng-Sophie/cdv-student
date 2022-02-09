console.log("hello!!! It works!!!");
var titleName=document.getElementById("titleName"); //if using "let", report errors
var clickButton=document.getElementById("clickButton");

var textBox=document.getElementById("textBox");

var boxContainer=document.getElementById("boxContainer");
var sizeSlider=document.getElementById("sizeSlider");
var emojiSlider=document.getElementById("emojiSlider");

var emoji=document.getElementById("emoji");
var emojis=["🦭","🦄","🐟","🐽","🧜","🦆","🐢","🦞","🦕","🦐","🦙","🦜","🦥"];

//emoji.innerHTML="10";

emojiSlider.addEventListener("input",()=>{
    //emoji.innerHTML=emojiSlider.value;
    // emoji.innerHTML=emojis[emojiSlider.value-1];
    titleName.innerHTML=emojis[emojiSlider.value-1]+" "+emojis[emojiSlider.value-1]+" "+emojis[emojiSlider.value-1]+" Coding Foundation "+emojis[emojiSlider.value-1]+" "+emojis[emojiSlider.value-1]+" "+emojis[emojiSlider.value-1];


   
    
});

sizeSlider.addEventListener("input",()=>{
    console.log("slider works");
    var circles=document.getElementsByClassName("box0");
    for(let i=0;i<circles.length;i++){
        circles[i].style.width=sizeSlider.value+"px";
        circles[i].style.height=sizeSlider.value+"px";

    }
});

clickButton.addEventListener("click",()=>{
    boxContainer.innerHTML="";
    var result=textBox.value;
    console.log("Button clicked!!!");
   
    let boxNumber = Number(result);

    if(result !=""){
   

    for(let i=0;i<boxNumber;i++){
        let h=Math.floor(Math.random()*256);
        var newBox=document.createElement("div");
       newBox.classList.add("box0");
       newBox.style.backgroundColor= "hsl("+h+", 67%, 81%)";
        boxContainer.appendChild(newBox);

        }
    
}
    else{
    console.log("Enter a valid number");
}
    
    

});
