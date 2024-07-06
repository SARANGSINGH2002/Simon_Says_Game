let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","green","purple"];  // 0 to 3 index
let started=false;
let level=0;

// start game
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelUp();
    }
    
})

// level-up

let h2=document.querySelector("h2");
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIndex= Math.floor(Math.random()*3);  // to a random number between 0 to 3 as these numbers represent the index positions of the btns array
    let randColor= btns[randIndex];  // choosing random color among those 4 colors

    let randbtn=document.querySelector(`.${randColor}`);  // accessing the random color we got

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);  // we will flash the button after accessing the button
}

// game-flash button
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");  // to bring back the original background-colour of the button after it has flashed for 500 milli-sec
    },500);
}

// user-flash button
function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");  // to bring back the original background-colour of the button after it has flashed for 500 milli-sec
    },500);
}
 
// the one we click will flash
function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns= document.querySelectorAll(".btn");
for(i of allbtns){
    i.addEventListener("click",btnPress);
}


// to match user sequence with game sequence
function checkAns(idx){
    
    if(userSeq[idx]==gameSeq[idx]){
        // if it matches, then we have two cases, that is either qe are in middle of the sequence or we are at the last ofthe sequence
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),1000);
        }
    }
    else{
        h2.innerHTML=`Game Over!! Your score was <b>${level}</b><br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="burlywood";
        },150);

        reset();
    }
}

// reset game
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
