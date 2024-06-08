// Author: Poltanek
// Version: 1.0
// This is a simple script that will be used to simulate a terminal on the website.
// It will be used to display information about me, my projects, and other things.
// It will also be used to simulate a password prompt.


var before = document.getElementById('before');
var liner = document.getElementById('liner');
var command = document.getElementById('typer');
var textarea = document.getElementById('texter');
var terminal = document.getElementById('terminal');
var theme = document.getElementById('theme');

var git = 0;
var pw = false;
var pwd = false;
var commands = [];
let currentDirectory = "";

setTimeout(function() {
    loopLines(banner, "", 80);
    textarea.focus();

}, 100);

window.addEventListener('keyup', enterKey);

console.log(
    "%cYou hacked my password! You're a hacker!",
    "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "'Wonder what you can do with that?"), "color: grey";

textarea.value = "";
command.innerHTML = textarea.value;
function enterKey(e) {
    if (e.keyCode == 181) {
        document.ATTRIBUTE_NODE.location.reload(true);
    }
    if (pw) {
        let et = "*";
        let w = textarea.value.length;
        command.innerHTML = et.repeat(w);
        if (textarea.value === password) {
            pwd = true;
        }
        
        if (pwd && e.keyCode == 13) {
            loopLines(secret, "color2 margin", 120);
            command.innerHTML = "";
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLine ("Wrong password", "error", 0);
            command.innerHTML = "";
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }

    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;

            if (currentDirectory === "scripts") {
                addLine("visitor@localhost:~/" + command.innerHTML, "no-animation", 0);
            } else {
                addLine("visitor@localhost:~" + command.innerHTML, "no-animation", 0);
            }

            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
        }

        if (e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.value = commands[git];
            command.innerHTML = textarea.value;
        }
        if (e.keyCode == 40 && git < commands.length) {
            git += 1;
            if (commands[git] === undefined) {
                textarea.value = "";
            } else {
                textarea.value = commands[git];
            }
            command.innerHTML = textarea.value; 
        }
    }
}

function commander(cmd) {
    var parts = cmd.toLowerCase().split('');
    var command = parts[0];
    var argument = parts[1];

    switch(command) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "theme":
            if (theme[argument]) {
                setTheme(argument);
            } else {
                console.error("Theme not found: " + argument);
            }
            break;
    }
}

function commander(cmd) {
    
}

function setTheme(themeName) {
    var theme = themes[themeName];
    if (theme) {
        Object.keys(theme).forEach(function(key) {
            document.documentElement.style.setProperty(key, theme[key]);
        });
    } else {
        console.error("theme not found: " + themeName);
    }
}
// Linux Commands
// switch case to handle the commands

function commander(cmd) {
    switch(cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "clear":
            clearTerminal();
            break;
        case "whois":
            loopLines(whois, "color2 margin", 80);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 80);
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
        case "cv":
            loopLines(cv, "color2 margin", 80);
            break;
            /* Provides email link */
        case "email":
            addLine(email, "color2 margin", 80);
            break;
            /* Simulates the banner that appears at the start */
        case "banner":
            loopLines(banner, "", 80);
            break;

            /* Simulates a password prompt */
        case "pwd":
            addLine("visitor@localhost:~", "no-animation", 0);
            break;

            /* Displays a list of files/folders */
        case "ls":
            addLine("scripts", "no-animation", 0);
            break;

            /* Changes the directory to the scripts directory */
        case "cd scripts":
            currentDirectory = "scripts";
            addLine("visitor@localhost:~/scripts", "no-animation", 0);
            break;

            /* Changes the directory back to the root directory */
        case "cd ..":
            currentDirectory = "";
            addLine("visitor@localhost:~", "no-animation", 0);
            break;
        
            /* Provides a list of historic commands that the visitor/user has used */
        case "history":
            loopLines(history, "color2 margin", 80);
            break;
        case "secret":
            pw = true;
            liner.classList.add("password");
            addLine("Password: ", "no-animation", 0);
            break;
        case "Themes":
            addLine("Themes", "color2 margin", 80);
            break;
        case "request":
            break;
        case "donate":
            loopLines(donate, "color2 margin", 80);
            break;


            default:
                addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>", "error", 100);
    }
}

function clearTerminal() {
    var textarea = document.getElementById('texter');
    var terminal = document.getElementById('terminal');

    terminal.innerHTML = "";

    loopLines(banner, "", 80);
    textarea.focus();
}

function newTab(link) {
    setTimeout(function() {
        window.open(link, "_blank");
    }, 500);
}


// Function to add lines to the terminal
function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === "" && text.charAt(i + 1) == "") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function() {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);
        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
        addLine(item, style, index * time);
    });
}