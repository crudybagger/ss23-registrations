var usedRow=[[],[],[],[],[],[],[],[],[],[]];
var eventList = {};

function eventListInit(){
    var emptyrow=[];
    for(var i=0;i<10;i++){
        emptyrow.push({eventname:"",eventduration:""})
    }
    for (var i = 0; i < 24; i++) {
        eventList[i]=JSON.parse(JSON.stringify(emptyrow));
    }
    console.log(eventList);
}
function areOverlapping(A, B) {
    if(B[0] < A[0]) {
        return B[1] > A[0];
    }
    else {
        return B[0] < A[1];
    }
}
function addEvent(t,etime, ename, eduration){
    var r=0;
    for(var i=0;i<10;i++){
        var overlap=false;
        for (var j = 0; j < usedRow[i].length; j++){
            if(areOverlapping([t,t+eduration],usedRow[i][j])){
                overlap=true
                break;
            }
        }
        if(!overlap){
            usedRow[i].push([t,t+eduration])
            eventList[t][i].eventname=ename;
            eventList[t][i].eventduration=eduration;
            return;
        }
    }
}

eventListInit();
addEvent(8,"8AM","Name",3)
addEvent(8,"8AM","Name",3)
addEvent(8,"8AM","Name",3)
addEvent(9,"9AM","Name",4)
// console.log(eventList);