let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  // getting min max of our data.
  // because if the structure of this particular data (5 mini datasets in one)
  // getting the min and max computationally would be slightly different
  // that we have done in the past. It uses d3.min and d3.max but requires 
  // one extra step. For sake of time, I am "hardcoding" the minimum and
  // maximum here. But if you scroll down I included 2 varieties of solutions
  // to get min and max computationally!  
  let minX = 0;
  let maxX = 145;
  let minY = 0;
  let maxY = 140



}



d3.json("data.json").then(gotData);




























/*
Minimum and Maximum of our Data

The Problem:
 
For an array in which each element is one of our datapoints, we have used d3.min and d3.max
in the past:
```
let incomingData = [ {x: 6, y: 2}, {x: 3, y: 5} ];
let max = d3.max(incomingData, function(d, i){ return d.x });
```
The problem we have now is that our incomingData array contains further arrays
```
let incomingData = [ [{x: 6, y: 2}, {x: 3, y: 5}], [{x: 5, y: 7}, {x: 3, y: 9}] ];
```
If we do the same formular as above, then the `d` is itself a data set 
within which are multiple values:
```
let max = d3.max(incomingData, function(d, i){ 
  // d is equal to arrays like this: [{x: 6, y: 2}, {x: 3, y: 5}]
  // "return d.x" won't work because d is a full array, not a single data point
});


Solution #1:
Nested use of d3.min and d3.max:
```
let max = d3.max(incomingData, function(d, i){ 
  // as we loop over the inner arrays of our data
  // we first find the max value within them:
  let maxInInnerArray = d3.max(d, function(innerD, innerI){
    return innerD.x
  })
  // then return that max value to the first d3.max function we
  // called. It will then essentially find the max value
  // of all the max values of the inner arrays.
  return maxInInnerArray
});
```


Solution #2:
Using d3.merge to flatten the incomingData array temporarily. 
Documentation: https://github.com/d3/d3-array/blob/main/README.md#merge

with the above function we can very quickly get from this data shape:
```
[ [{x: 6, y: 2}, {x: 3, y: 5}], [{x: 5, y: 7}, {x: 3, y: 9}] ];
```
to this:
```
[ {x: 6, y: 2}, {x: 3, y: 5}, {x: 5, y: 7}, {x: 3, y: 9} ];
```
Do you see the difference? It's one-dimensional array now. 
Since we will use the original data shape later on, and need this
flat shap only to get to the min and max value more easily, we 
flatten the array into a temporary variable:
```
let flatArray  = d3.merge(incomingData)
```
now the data is one-dimensional and we can 
use our regular d3.min and d3.max function:
```
let max = d3.max(flatArray, function(d, i){ return d.x });
let min = d3.min(flatArray, function(d, i){ return d.x });
```


*/