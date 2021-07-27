
                function doSomething()
                {
                    point1.style.fill = "black";
                    point1.style.stroke = "black";
                }
               function addCirc(x, y, i)
               { 
                
                var svgns = "http://www.w3.org/2000/svg",
                container = document.getElementById( 'graph' );
                var circle = document.createElementNS(svgns, 'circle');
                circle.setAttributeNS(null, 'id', 'point'+i);
                circle.setAttributeNS(null, 'cx', x);
                circle.setAttributeNS(null, 'onmouseover', 'showDetails('+i+');');
                circle.setAttributeNS(null, 'onmouseout', 'hideDetails();');
                circle.setAttributeNS(null, 'class', 'addedelement');               
                circle.setAttributeNS(null, 'cy', y);
                circle.setAttributeNS(null, 'r', 5);
                circle.setAttributeNS(null, 'style', 'fill: blue; stroke: blue; stroke-width: 1px;' );
                container.appendChild(circle);
      
               }

               function addGame(){
                event.preventDefault();
                    var canAdd = true;
                    
                   var newgame = {gamenumber:0,score:0,};
                       newgame.gamenumber =  document.getElementById("gameNumber").value;
                       newgame.score = parseInt(document.getElementById("gameScore").value);
                       canAdd = !isNaN(newgame.score);
                       if (newgame.score  < 0 || newgame.score > 300)
                       {
                           canAdd=false;
                       }
                       var e = document.getElementById("ballSelect");
                       if (e.selectedIndex!=0)
                       {
                        newgame.ball = e.options[e.selectedIndex].innerText;
                       }
                       var ee = document.getElementById("locationSelect");
                       if (ee.selectedIndex!=0)
                       {
                        newgame.location = ee.options[ee.selectedIndex].innerText;
                       }
                       var d = document.getElementById("dateBowled");
                       if (d.value != "")
                        {
                            newgame.date=d.value;
                        }
                       if (canAdd)
                       {
                           games.push(newgame);
                           clearGraph();
                           plotPoints();
                           var newnumber = parseInt(games[games.length-1].gamenumber)+1;
                           document.getElementById("gameNumber").value=newnumber;
                           document.getElementById("gameScore").value="";
                           document.getElementById("dateBowled").value="";
                           document.getElementById("ballSelect").selectedIndex=0;
                           document.getElementById("locationSelect").selectedIndex=0;
                       }
                   
               }

               function clearGraph()
               {
                   var elecollection = document.getElementsByClassName("addedelement");
                    while (elecollection.length > 0)
                    {
                        elecollection[0].parentNode.removeChild(elecollection[0]);
                    }
               }

               function addText(y,i)
               {
                var svgns = "http://www.w3.org/2000/svg",
                container = document.getElementById( 'graph' );
                var text = document.createElementNS(svgns, 'text');
                text.setAttributeNS(null, 'x', y);
                text.setAttributeNS(null, 'y','365');
                text.setAttributeNS(null, "class", "addedelement")
                text.innerHTML=''+i+'';
                container.appendChild(text);
               }

               function addLine(x, y, xx, yy)
               { 
                
                var svgns = "http://www.w3.org/2000/svg",
                container = document.getElementById( 'graph' );
                var line = document.createElementNS(svgns, 'line');
                line.setAttributeNS(null, 'x1', x);
                line.setAttributeNS(null, 'y1', y);
                line.setAttributeNS(null, 'x2', xx);
                line.setAttributeNS(null, 'y2', yy);
                line.setAttributeNS(null, "class","addedelement");
                line.setAttributeNS(null, 'style', 'stroke: blue; stroke-width: 2px;' );
                container.appendChild(line);
               }
    
               function showDetails(point)
               {
                var innerhtmlstring = "Game Number: " + games[point-1]["gamenumber"] + "<br>Game Score: "+ games[point-1]["score"];
                if (games[point-1]["ball"]!= undefined)
                {
                    innerhtmlstring = innerhtmlstring + "<br>Ball Used: " + games[point-1]["ball"];
                }
                if (games[point-1]["location"]!= undefined)
                {
                    innerhtmlstring = innerhtmlstring + "<br>Location: " + games[point-1]["location"];
                }
                if (games[point-1]["date"]!= undefined)
                {
                    innerhtmlstring = innerhtmlstring + "<br>Date bowled on: " + games[point-1]["date"];
                }
                document.getElementById("gameinfo").style.visibility= "visible";
               

                    document.getElementById("gameinfo").innerHTML = innerhtmlstring;
               }
               function hideDetails(point)
               {
                    document.getElementById("gameinfo").style.visibility= "hidden";
               }
    
               function adjustFloor(floor){
                    if (floor < 50)
                    {
                        floor = 0;
                    }
               }

               function plotPoints(){
                var addCirY= 0;
                var xstep = Math.round(550/(games.length+1));
                var addCirX = 80;
                var y2;
                for (let i in games)
                 {
 
                     addCirY = (350 - (games[i]["score"]-50) * 1.4);
                     addCirc(addCirX,addCirY,games[i]["gamenumber"]);
                     addText(addCirX,games[i]["gamenumber"]);
                     console.log(addCirX +','+ addCirY + ','+ games[i]["gamenumber"]);
                     if (i != 0)
                     {
                         addLine(addCirX,addCirY,addCirX-xstep,y2);
                     }
                     addCirX = addCirX + xstep;
                     y2=addCirY;
                 }
               }
    
               function getGraphDetails(games)
               {
                   var floor = games[0]["score"];
                   var ceil = games[0]["score"];
                    for (let i in games)
                    {
                        if (games[i]["score"]>ceil)
                        {
                            ceil = games[i]["score"];
                        }
                        if (games[i]["score"]<floor)
                        {
                            floor = games[i]["score"];
                        }
                    }
                    
                    var range = ceil-floor;
                    var yspan = Math.floor(range / 11);
                    return [floor,ceil,range,yspan];
    
               }
    
               // Formula for scaling to graph's y axis "Height - (Score - floor) * (maxscore/(maxy - miny))";
               // formula for current graph = "350 - (score-50) * 1.4";
               var games = [{gamenumber:1, score:191,location:"Bowlero mesa",ball:"Storm Axiom - 15lb", date:"02/21/21"},{gamenumber:2, score:118},{gamenumber:3, score:226},{gamenumber:4, score:147},{gamenumber:5, score:184}];
               var balls = ["Storm Axiom - 15lb","Tenacity Grit - 15lb","Plastic Spare Ball - 14lb"];
               var locations = ["Bowlero Mesa","Bowlero Gilbert","AMF Chandler"];
               var graphdetails = getGraphDetails(games);
                
               plotPoints();
              
       
                for (let i in balls)
                {
                    var newoption = document.createElement("option");
                    newoption.innerText=balls[i];
                    document.getElementById("ballSelect").appendChild(newoption);
                }

                for (let i in locations)
                {
                    var newoption = document.createElement("option");
                    newoption.innerText=locations[i];
                    document.getElementById("locationSelect").appendChild(newoption);
                }

                var newnumber = games[games.length-1].gamenumber+1;
                document.getElementById("gameNumber").value=newnumber;
                document.getElementById("navbargames").style="background-color:darkslategrey;color:white";
                
    
    
                