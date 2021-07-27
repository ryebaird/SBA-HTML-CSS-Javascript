document.getElementById("navbaraccount").style="background-color:darkslategrey;color:white";

function editUsername(){
     var name=prompt("Please enter your name"," ");
    if (name!=null){
        name = name + " <img onclick = \"editUsername()\" src = \"editicon.png\" width=\"13\"></img>";
       document.getElementById("usernamedisplay").innerHTML= name;
   }
}