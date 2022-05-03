console.log("hellooo");


function gotData(incomingData){
    console.log(incomingData[0]);

}


d3.json("data.json").then(gotData);