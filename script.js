const canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const tool=canvas.getContext("2d");
const points=document.getElementById("points");
console.log(points);

let x=100;
let y=400;
let point1X=200;
let point1Y=200;
let point2X=300;
let point2Y=300;
let dangerX1=275;
let dangerY1=155;
let score=0;
let rectangles=[];


//Controlling the movement of rectangle with KEYBOARD using event Listner
document.addEventListener("keydown",(event)=>{
    switch(event.key){
        case "ArrowUp":
            console.log("Move up");
            y-=10;
            break
        case "ArrowDown":
            console.log("Move down");
            y+=10;
            break
        case "ArrowRight":
            console.log("Move right");
            x+=10;
            break
        case "ArrowLeft":
            console.log("Move left");
            x-=10;
        
            
    }
    console.log(x,y);


});

class Rectangles{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
    }
    draw(){
        tool.fillStyle=this.color;
        tool.fillRect(this.x,this.y,this.width,this.height);
    }
}

//! Rectangle data generator
for(let i=0;i<100;i++){
    rectangles.push(new Rectangles(50+Math.random()*window.innerWidth*0.98,50+Math.random()*window.innerHeight*0.98,20,20,"seagreen"));
}
console.log(rectangles[0].draw());
rect1=new Rectangles(20,20,20,20,"blue");
rect1.draw();
console.dir(rect1.draw());

function animate(){
    requestAnimationFrame(animate);
    tool.clearRect(0,0,window.innerWidth,window.innerHeight);
    // rectangles.forEach((element,index)=>{
    //     element.draw();
    // })
    rect1.draw();

    //! Points collection mechanism
    if(( x+50>point1X &&
        x<point1X+20 &&
        y+50>point1Y &&
        y<point1Y+20
    )){
        console.log("Point collected");
        point1X=-100;
        score+=1;
        points.innerHTML=`<i>Points: ${score}</i>`
        rectangles[score].draw();
        console.log(rectangles[score]);
    }
    else if (x+50>point2X &&
        x<point2X+20 &&
        y+50>point2Y &&
        y<point2Y+20)
        {
            point2X=-100;
            score+=1;
            points.innerHTML=`<i>Points: ${score}</i>`

        }
    else if(x+70>dangerX1 &&
        x<dangerX1+20 &&
        y+70>dangerY1 &&
        y<dangerY1+20){
            if(score>0){
                console.log("Enemy detected");
                score-=1;
                points.innerHTML=`<i>Points: ${score}</i>`
            }
            
            
    }

    //!Rectangle
    tool.fillStyle="tomato";
    tool.fillRect(x,y,50,50);
    tool.fillStyle="seagreen";
    tool.fillRect(point1X,point1Y,20,20);
    tool.fillStyle="seagreen";
    tool.fillRect(point2X,point2Y,20,20);

    //!Circle needs 4 steps
    tool.fillStyle="red";
    tool.beginPath();
    tool.arc(dangerX1,dangerY1,20,0,Math.PI*2);
    tool.fill();
    tool.fillStyle="red";
    tool.beginPath();
    tool.arc(355,355,20,0,Math.PI*2);
    tool.fill();

};
animate();
