var users = [{username:"rbaird",password:"Password1!"},{username:"testuser",password:"test"}];


function validateLogin()
{

    event.preventDefault();
    let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var username = document.getElementById("user");
    var pwd = document.getElementById("pwd");
   
    var foundUser = false;
    for (let i in users)
    {
        if (username.value == users[i]["username"])
        {
            foundUser = true;
            document.getElementById("user").style = "background-color: white;";
 
            if (pwd.value == users[i]["password"])
            {
                console.log("password matched!");
                window.location.href = 'svg-graph.html';
                break;
            }
            else 
            {
                if (re.test(pwd.value))
                {
                    document.getElementById("loginerror").innerHTML="Password was incorrect!";
                    document.getElementById("pwd").style = "background-color: rgb(247, 201, 201);"
                    document.getElementById("loginerror").style = "visibility:visible;";
                    pwd = document.getElementById("pwd").value = "";
                }
                else
                {
                    document.getElementById("loginerror").innerHTML="Password must be at least 8 characters long.<br>Password must have at least one uppercase letter.<br>Password must have at least one lower case letter.<br>Password must contain  a special character.";
                    document.getElementById("pwd").style = "background-color: rgb(247, 201, 201);"
                    document.getElementById("loginerror").style = "visibility:visible;width:400px;";
                    pwd = document.getElementById("pwd").value = "";
                }
            }
        }
        
    }
    if (foundUser==false) {
        document.getElementById("loginerror").innerHTML="User was not found!";
        document.getElementById("loginerror").style = "visibility:visible;";
        document.getElementById("user").style = "background-color: rgb(247, 201, 201);";
    } 
}