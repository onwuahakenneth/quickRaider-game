'use strict';

//game components
const playButton = document.querySelector('.play-btn');
const audioDestroy = document.querySelector('.destroy');
const audioLose = document.querySelector('.lose');
const audioWin = document.querySelector('.win');
const audioBackground = document.querySelector('.background');
const displayInfo = document.querySelector('.score');
const responseTime = document.querySelector('.response-time');
const scoreTable = document.querySelector('.score-bar');
const outputMessage = document.querySelector('.output');
const body = document.querySelector('body');
const titleHeader = document.querySelector('.header-title');
const welcomeMessage = document.querySelector('.welcome');
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');
const hamburgerlines = document.querySelectorAll('.line');
const rankBar = document.querySelector('.ranks');
const lifeProgress = document.querySelector('.progress');
const listElem = document.querySelector('.scoreBoard');



  



document.querySelector('footer').textContent = `KennyCodes || ${new Date().getFullYear()}`;
let gamePlay = false;
let gameFinished = true;

let mRoll;
//get random color
function getColor(){
    const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'grey', 'steelblue', 'cyan', 'black', 'coral', 'purple', 'lime', 'steelblue', 'gold'];
    const colorIndex = Math.floor(Math.random()*colors.length);
    return colors[colorIndex];
}

//get random positions (x, y, + or -)

function getPos(){
    let xfactor = (window.innerWidth/2)-70;
    let yfactor = (window.innerHeight/2)-100;
    const x = Math.floor(Math.random()*xfactor);
    const y = Math.floor(Math.random()*yfactor);
    const yaddMinus = ['+', '-'].sort((a, b)=> 0.5 - Math.random());
    const xaddMinus = ['+', '-'].sort((a, b)=> 0.4 - Math.random());
    
    const pos = {x, y, xsign: xaddMinus[0], ysign: yaddMinus[0]};
    return pos;
}

//game initial variables
let score = 0;
let attempts = 0;
const lifeColors = ['darkorange', 'red', 'transparent'];
let playerRTime = [];
let x;


//play game function

function play(){
    
    gameFinished = false;
    // clearInterval(mRoll)

    if(gamePlay){

        scoreTable.classList.add('show');
        hamburger.classList.add('hide');
        audioBackground.play();
        audioBackground.volume = 0.05;
    let attackSucceed = false;

   

    playButton.textContent = 'Playing...';
    
    // create the object to display
    const circleObj = document.createElement('div');
    circleObj.classList.toggle('circle');
    circleObj.style.background = `${getColor()}`;
    
    const squareObj = document.createElement('div');
    squareObj.classList.toggle('square');
    squareObj.style.background = `${getColor()}`;

    const rectangleVObj = document.createElement('div');
    rectangleVObj.classList.toggle('rectangleVertical');
    rectangleVObj.style.background =`${getColor()}`;

    const rectangleHObj = document.createElement('div');
    rectangleHObj.classList.toggle('rectangleHorizontal');
    rectangleHObj.style.background =`${getColor()}`;

    const triangleUp = document.createElement('div');
    triangleUp.classList.toggle('triangleUp');
    triangleUp.style.borderBottomColor = `${getColor()}`;

    const triangleDown = document.createElement('div');
    triangleDown.classList.toggle('triangleDown');
    triangleDown.style.borderTopColor = `${getColor()}`;


    const objects = [circleObj, squareObj, triangleDown, rectangleVObj, triangleUp, rectangleHObj];

    const obj = objects[(Math.floor(Math.random()*objects.length))];

    obj.style.transform = `translate(${getPos().xsign}${getPos().x}px, ${getPos().ysign}${getPos().y}px)`;
    
    //Add object to the screen
    
      audioBackground.play();
      audioBackground.volume = 0.1;


    let time = new Date().getTime();
    body.append(obj);
    const colors = ['lavender', 'lightgreen', 'lightcyan', 'lightpurple', 'lightpink', 'lightcoral', 'lightsalmon'];
    body.style.background = `${colors.sort((a, b)=> 0.5 - Math.random())[0]}`;
    
    
    let elapsed;
    const runTime = function(){
        elapsed = ((new Date().getTime()) - time)/10000;
    };
    
    let y = setInterval(runTime, 100);

    
    
    const  objectMissed =  function(){

        if(!attackSucceed){
            attempts += 1;

          
            audioLose.play();
            obj.remove();

            //update Life

            lifeProgress.style.width = `${((3 - attempts)/3)*100}%`;
            lifeProgress.style.background = lifeColors[attempts - 1];            

            if(attempts == 3){
              audioLose.play();
               
                scoreTable.classList.toggle('show');
                audioBackground.pause();
                audioBackground.currentTime = 0;
                audioLose.volume = 0.2;
                

            if(score >= 8){
                outputMessage.textContent = `{Score: ${score} } Nice Try...`;
            }else{
                outputMessage.textContent = `{Score: ${score} } Ooops...`;
            }

            outputMessage.classList.add('show');
            setTimeout(()=>{
                outputMessage.classList.remove('show');
            }, 3000);
            setTimeout(()=>{
                playButton.classList.toggle('hide');

            }, 3500);
            hamburger.classList.toggle('hide');
            playButton.textContent = 'RESTART';
            body.style.background = 'rgb(219, 210, 193)';
            gamePlay = false;
            clearInterval(x);
            gameFinished = true;

            addScore();

            titleHeader.classList.toggle('hide');

             }
        }
    };
    
    setTimeout(objectMissed, 1500);
    
    
    
    //when the object is clicked
    
    obj.onclick = ()=>{
        
        obj.remove();
        
        //time limit to earn a point
        if(elapsed < 0.33){
            audioDestroy.play();
            audioDestroy.volume = 0.2;
            attackSucceed = true;
            score +=1;
            playerRTime.push(elapsed);
        }
        
        displayInfo.textContent = ` Score : ${score}`;
        responseTime.textContent = `Time : ${(elapsed*10).toFixed(2)} sec`;
        if(score == 100){
            
            //stop the game loop
            clearInterval(x);
            gameFinished = true;
            scoreTable.classList.toggle('show');
            audioBackground.pause();
            audioBackground.currentTime = 0;
            audioWin.play();
            audioWin.volume = 0.15;
            
            const messages = ['Good Job!', 'Bravo!', 'Awesome...', 'Hero', 'Boss Mode!', 'Master Badge', 'Wonderful!', 'Amazing'];
            
            const messageIndex = Math.floor(Math.random()*(messages.length));
            
            playButton.textContent = 'RESTART';
            outputMessage.textContent = `${messages[messageIndex]}`;
            setTimeout(()=>{
                outputMessage.classList.add('show');
            },4000);

            addScore(); 

            titleHeader.classList.toggle('hide');
           

        }
        
    }; 
    
}


}
// game start control
playButton.onclick = ()=>{
    if(gameFinished){
        
        playButton.classList.toggle('hide');
        hamburger.classList.remove('hide');
        gamePlay = true;
        // rollingDiv.classList.add('show')
        score = 0;
        attempts = 0;
        gameFinished = false;
        lifeProgress.style.background = 'green';
        lifeProgress.style.width = '100%';
        displayInfo.textContent = 'Score : 0';
    outputMessage.classList.remove('show');
    scoreTable.classList.remove('show');
    titleHeader.classList.add('hide');
    welcomeMessage.classList.add('hide');
    playButton.textContent = 'Starting...';
    
    const gettingready = function(){

       
            const rTime = (Math.random()*2) + 4; 
            x =  setInterval(play, rTime*1000);
        
        };
        
    gettingready();
    }
};






// handle the user name input


const userInput = document.createElement('input');
const saveBtn = document.createElement('button');
const inputContainer = document.createElement('div');
const scorePlate = document.createElement('p');


inputContainer.classList.add('inputContainer');
userInput.classList.add('userInput');  // css sttyling
saveBtn.classList.add('saveBtn');
scorePlate.classList.add('scorePlate');

saveBtn.textContent = 'Save';
userInput.setAttribute('placeholder', 'Please Enter Your Name...');
userInput.autofocus = true;





// function to render the form to the screen
function addInterface(){
    
    userInput.value = '';
    scorePlate.textContent = `Score : ${score}`;
    inputContainer.append(userInput);
    inputContainer.append(saveBtn);             
    inputContainer.append(scorePlate);             
    body.append(inputContainer);
}


//check for QuickData in LocalStorage & Create one if none is found
if(localStorage.getItem('QuickData') == null){
    localStorage.setItem('QuickData', JSON.stringify([]));
}

//add score to localstorage
function addScore(){
    //get data
    let storedScores = JSON.parse(localStorage.getItem('QuickData'));

    if(score >= 10 ){

        const aveSpeed = (playerRTime.reduce((acc, v)=> acc + v ,0)/playerRTime.length);
        const date = new Date().toDateString();
        
        if(storedScores.length < 5){
            //alert to enter name
            setTimeout(addInterface, 4000);
            

            saveBtn.onclick = ()=>{

               let userName = userInput.value;
               
               if(userName.trim().length > 0){

                   inputContainer.remove();
                   
                   
                   const user = {name: userName, score: score, aveTime: aveSpeed, date: date};
                   storedScores = JSON.stringify([...storedScores, user]);
                localStorage.setItem('QuickData', storedScores);
                
            if(storedScores.length > 1){
                
                let secondFetch =  JSON.parse(localStorage.getItem('QuickData'));
                
                secondFetch.sort((a, b)=>{
                    if(a.score === b.score){
                        return a.aveTime - b.aveTime;
                    }else{
                        return b.score - a.score;
                    }
                });
                
                localStorage.setItem('QuickData', JSON.stringify(secondFetch));
                
            }
        }

        };

        }else{

            let found = 'no';
           for(let i = 0; i < storedScores.length; i++){

                //find the first user with lower score
                if((score > storedScores[i].score) || ((score == storedScores[i].score) && (aveSpeed < storedScores[i].aveTime))){

                found = i;
                break; //find only one and jump out
             }

            
           }
          

           if(found !== 'no'){
               //alert to enter name;
                addInterface();

                saveBtn.onclick = ()=>{

                   let userName = userInput.value;
                   if(userName.trim().length > 0){

                       inputContainer.remove();
                    
                       
                       let user = {name: userName, score: score, aveTime: aveSpeed, date: date};
                       
                       //no removal done here
                       storedScores.splice(found, 0, user);
                       
                    //remove the last person currently the lowest
                    storedScores.pop();
                    localStorage.setItem('QuickData', JSON.stringify(storedScores));
                }
                };
           }
        }


    }
}


//Nav-Bar Control

hamburger.onclick = ()=>{
    navBar.classList.toggle('active');
    playButton.classList.toggle('hide');
    
    if(rankBar.textContent == 'Close'){
        rankBar.textContent = 'Ranks';
        listElem.classList.toggle('hide');
        
       
    }

    hamburgerlines.forEach(e=>{
        e.classList.toggle('active');
    });
   
    titleHeader.classList.toggle('hide');
    welcomeMessage.classList.toggle('hide');
};

//fetch the high scores and display them

function getRanking(){

    listElem.innerHTML = '';
    const rankRecordArray = JSON.parse(localStorage.getItem('QuickData'));
    rankRecordArray.map((obj, i)=>{

        const listItem = document.createElement('li');
        const nameElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const dateElem = document.createElement('p');
        const divElem = document.createElement('div');
        const spanElem = document.createElement('span');

        nameElem.textContent = `Name: ${obj.name.toUpperCase()}`;
        scoreElem.textContent = `Score:  ${obj.score}`;
        dateElem.textContent = `Date:  ${obj.date}`;
        spanElem.textContent = `${i+1}.`;
        listItem.append(nameElem);
       listItem.append(scoreElem);
       listItem.append(dateElem);

      
       divElem.append(spanElem);
       divElem.append(listItem);
        listElem.append(divElem);
        divElem.classList.add('divElem');

        
    });
    if(rankBar.textContent == 'Close'){
        listElem.classList.remove('hide');
        
    }else {
        listElem.classList.add('hide');
        navBar.classList.toggle('active');
        playButton.classList.remove('hide');
        titleHeader.classList.remove('hide');
    }
    body.append(listElem);

}

let hideBtn = document.querySelector('.hideScore');

//handle the click event 
let rankBarInfo = rankBar.textContent;

rankBar.onclick = ()=>{
    rankBar.classList.toggle('hide');
    if(rankBar.classList.contains('hide')){
        rankBar.textContent = 'Close';
    }else{
         rankBar.textContent = rankBarInfo;
        }

    getRanking();
    
   
};
