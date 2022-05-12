# I express my deep remorse

# –– CDV Data Story

## Introduction

![dataStory.gif](I%20express%20my%20deep%20remorse%20c5b2c6ce76584c9ba4e9104308725559/dataStory.gif)

![Screen Shot 2022-05-12 at 21.46.26.png](I%20express%20my%20deep%20remorse%20c5b2c6ce76584c9ba4e9104308725559/Screen_Shot_2022-05-12_at_21.46.26.png)

![Screen Shot 2022-05-12 at 21.46.40.png](I%20express%20my%20deep%20remorse%20c5b2c6ce76584c9ba4e9104308725559/Screen_Shot_2022-05-12_at_21.46.40.png)

Are we living in an age of apologies? This project is a visualization of over 300 political apologies in recent years. By examining the time, content, stakeholders and occasions of each political apology, it provides a different perspective to understand these apologies and their role in our society.

**Visit my website [HERE](https://xiao-peng-sophie.github.io/cdv-student/projects/newversion/index.html).**

Read my [Data Story Contextual Report](https://docs.google.com/document/d/1Fnu_GhOC6gYEQ0r1c3kSET8_nWBZf7crndVRfJULsqA/edit?usp=sharing). 

Original datasets and research inspirations are from [this website](https://www.politicalapologies.com/).

## The Process

**Research**

Find more about this part in my [Data Story Contextual Report](https://docs.google.com/document/d/1Fnu_GhOC6gYEQ0r1c3kSET8_nWBZf7crndVRfJULsqA/edit?usp=sharing).

**Website structure**

In my project, there are 5 visualization graphs, which put the political apologies into different categories. The data points will move from one graph to another as we scroll down the web page.  Instead of putting visualizations into separate pages, I place them in one page and create the transition effect in order to make those data points look coherent. 

**Problems & Difficulties**

I spend a lot of time on building the map visualization. I first use the geo-json data to draw the outline of world map, and then use another data set which contains the longitude and latitude of each country to bring the “apology data points” to the map. In this process, I need to write some code to make the country name in different datasets match each other. Also, there were some errors in the geo-json file, which leads to the disappearance of some countries. 

Apart from that, it takes me some time to understand how the transition between graphs works. I create different functions to do the transition part – for each graph I create a “getPosition()” function to run the force simulation and then use “enterView()” function to control the showing of graphs, which are written into anther function “showGraph()”. 

**Feedback & Further plans**

During the critique, I received some feedback about the visual design, typography and wrong time axis, which I already corrected in my latest version. In addition to that, I think I can also add more visual references when scrolling on a specific section.