import Event from './Event';

var maxRow=8;
var width=window.innerWidth/maxRow;
var row=[[],[],[],[],[],[],[],[],[],[]];
const eventList = {
    "8AM": [{eventname:"",eventduration:0},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4},{eventname:"Name2",eventduration:4}],
    "10AM": [{eventname:"Name2",eventduration:4}],
    "2PM": [{eventname:"Name3",eventduration:1},{eventname:"Name4",eventduration:2}],
};
function areOverlapping(A, B) {
    if(B[0] < A[0]) {
        return B[1] > A[0];
    }
    else {
        return B[0] < A[1];
    }
}
function addEvent(t,eventtime, eventname, eventduration){
    var r=0;
    for(var i=0;i<10;i++){
        var overlap=false;
        for (var j = 0; j < r[i].length; j++){
            if(areOverlapping([t,t+eventduration],row[i][j])){
                overlap=true
                break;
            }
        }
        if(!overlap){
            row[i].push([t,t+eventduration])
            eventList[eventtime][i]={eventname:eventname, eventduration:eventduration}
            return;
        }
    }
}
function Hour(props) {

    return (
        <div id={props.time} style={{minWidth:"100%", width:(maxRow+1)*100+100, backgroundColor:"black", height:"100px",borderTop: "0.5px solid gray", position: "relative" }}>
            <p style={{margin:"0", top:"-0.7em", left:"0", position:"absolute",backgroundColor:"black", color:"white"}}>{props.time}</p>
            <p style={{margin:"0", top:"-0.7em", right:"0", position:"absolute",backgroundColor:"black", color:"white"}}>{props.time}</p>
            {eventList[props.time]?.map((event,index)=>{
                return(<Event width={width} height={event.eventduration} t={props.t} eventname={event.eventname} row={index}/>);
            })}
        </div>)

}
  
export default Hour;