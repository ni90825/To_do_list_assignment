import React, { useRef, useState } from 'react';
import './App.css';
import dustbin from "../src/assets/icons8-trash-can.svg";

function Tasks({taskdetail,keyid,Alltaskfun,Alltask,totaltask}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteClick = (id) => {
    totaltask.current=totaltask.current-1;
    let filteredarray=Alltask.filter((items,index)=>{
            return index != id
        })

        
        let idchangearray=filteredarray.map((items,index)=>{
       if(id<items.taskid){
        return {...items,"taskid":items.taskid-1}
       }
       return {...items};
        })


        Alltaskfun(()=>{
            return [...idchangearray]
        });


  }

  const completecheck = (id)=>{
   let completedfilterarray = Alltask.map((items,index)=>{
    if(!items.isCompleted){
    if(id===items.taskid-1){
        return {...items,isCompleted:true}
    }
    else {
        return {...items,isCompleted:false}
    }
}
return {...items}
    })
    console.log(completedfilterarray)
    Alltaskfun((itemsarray)=>{
        return [...completedfilterarray]
    })
  }

  return (
    <div className="container pt-4 pb-2" style={{ width: '96%' }} id={keyid}>
      <div className="row align-items-center d-flex flex-row align-items-center">
        <div className="col-auto">
          <div className="form-check d-flex align-items-center">
            {
                taskdetail.isCompleted ?  <input className="form-check-input" type="checkbox" id="exampleCheck1" style={{transform:"scale(1.5)"}}  checked={true} disabled={true}/>:<input className="form-check-input" type="checkbox" id="exampleCheck1" style={{transform:"scale(1.5)"}} onChange={(event)=>{
                    if(event.target.checked){
                        completecheck(keyid)
                    }
                }}/>
            }
          </div>
        </div>
        <div className="col">
          <div className="input-group">
            <p
              className={`description ${taskdetail.isCompleted && "completedtask"}`}
              value={inputValue}
              onChange={handleInputChange}
              style={{marginTop:0,marginBottom:0}}
            >
                {taskdetail.task_description}
            </p>
          </div>
        </div>
        <div className="col-auto">
          <button className="btn bg-danger" id={keyid} onClick={()=>{handleDeleteClick(keyid)}}>
          <img src={dustbin} alt="SVG Example" width="20" height="20"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
