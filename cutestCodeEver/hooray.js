let canvas=document.getElementById("canvas");
//The getContext() is a built-in HTML object, with properties and methods for drawing
let ctx=canvas.getContext("2d");
//fit the window:
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let confeti=[];
const count=300;
const gravity=0.5;
const velocity=5;
const drag=0.075;

const colours=[ "purple","turquoise","grey"];


//random range:
function randomRange(min,max){
    return Math.random()*(max-min)+min;
}




function initConfet(){
    for(let i=0;i< count;i++){
        confeti.push({
            colour: colours[Math.floor(randomRange(0,colours.length))],
            dimensions: {
                x:randomRange(10,20),
                y:randomRange(10,30),
            },
            position:{
                x:randomRange(0,canvas.width),
                y:canvas.height-1,
            },
            rotation:randomRange(0,2*Math.PI),

            veloc: {
                x:randomRange(-25,25),
                y:randomRange(0,-50),
            },
        });


    }
};



function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    confeti.forEach((confet,index)=>{
        //dimensions of one piece of confeti:
        let width = confet.dimensions.x ;
        let height = confet.dimensions.y;
        //move to each confeti's place on the canvas with translate and then rotate:
        ctx.translate(confet.position.x, confet.position.y);
        ctx.rotate(confet.rotation);

        // Adjust the velocities:
        confet.veloc.x -= confet.veloc.x * drag; //x-axis slow-down
        confet.veloc.y = Math.min(confet.veloc.y + gravity, velocity);//y-axis velocity
        if(confet.veloc.x += Math.random()>0.5){confet.veloc.x-=Math.random();};//some will move a little bit to the left

        // Set  each confeti's position:
        confet.position.x += confet.veloc.x;
        confet.position.y += confet.veloc.y;


        // Delete confeti when out of frame:
        if (confet.position.y >= canvas.height) confeti.splice(index, 1);

        // Loop confeti x position
        if (confet.position.x > canvas.width) confet.position.x = 0;
        if (confet.position.x < 0) confet.position.x = canvas.width;

        //set the colour:
        ctx.fillStyle = confet.colour;

        // Draw confeti:
        ctx.fillRect(0,0, width, height);
    
        // Reset transform matrix:
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    
        
    });



    // Fire off another round of confeti:
    if (confeti.length <= 10) initConfet();
    //The window.requestAnimationFrame() method tells the browser that you wish to perform 
    //an animation and requests that the browser calls a specified function to update an animation before the next repaint
    window.requestAnimationFrame(render);
}




//execute:
initConfet();
render();
