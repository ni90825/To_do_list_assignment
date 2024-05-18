import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import Tasks from './tasks';

function App() {
  const [Alltasks,setAlltasks]=useState([]);
  const [visibletasks,setVisibletasks]=useState([...Alltasks]);
  const [enteredinput,setEnteredinput]=useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let tasklength=useRef(0);
  const [filter,setFilter]=useState("all");

  const handleFilterChange=(selectedposition)=>{
    let filteredtasks;
    setFilter(()=>{
      return selectedposition
    })

    if(selectedposition==="all"){
      setVisibletasks(()=>{
        return [...Alltasks]
      })
    }
    else if(selectedposition==="completed"){
      filteredtasks=Alltasks.filter((items,index)=>{
        return items.isCompleted 
      })
      console.log(filteredtasks)
      setVisibletasks(()=>{return filteredtasks})
    }
    else if(selectedposition==="incompleted"){
      filteredtasks=Alltasks.filter((items,index)=>{
        return !items.isCompleted 
      })
      console.log(filteredtasks)
      setVisibletasks(()=>{return filteredtasks})
    }
  }

  const [modalstatus,setModalstatus]=useState({
    description:"",
    status:"",
    action:""
  });

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasklength.current=storedTasks.length;
      setAlltasks(()=>{
        return storedTasks
      });
    } else {
      setVisibletasks([...Alltasks]);
      localStorage.setItem("tasks", JSON.stringify(Alltasks));

    }
  }, [Alltasks]);
  
  useEffect(() => {
    initialRender.current = false;
  }, []);

  return (
 <>
 <div className='body'>
 <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className={`modal-dialog ${modalstatus.status==="success"? "success":"fails"}`} role="document">
          <div className={`modal-content ${modalstatus.status==="success"? "success":"fails"}`}>
            <div className={`modal-header ${modalstatus.status ==="success" ? "successborder":"failsborder"}`}>
              <h5 className={`modal-title`} style={{fontWeight:600}}>{modalstatus.action}</h5>
              <button type="button" className="close" onClick={handleClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={`modal-body ${modalstatus.status ==="success" ? "successborder":"failsborder"}`}>
              <p>{modalstatus.description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className={`btn btn-secondary ${modalstatus.status==="success" ? "successok":"failsok"}`} onClick={handleClose}>Ok</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}></div>
 <header>
  <h1 className='heading pt-4 text-light'>TO DO LIST</h1>
 </header>
 <section className='mainsection d-flex flex-column'>
 <div>
 <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'btn-primaryselected' : 'btn-secondaryselected'}`}
          onClick={() => handleFilterChange('all')}
          style={{borderRight: "2px solid #225fa1"}}
        >
          All
        </button>
        <button
          type="button"
          className={`btn ${filter === 'completed' ? 'btn-primaryselected' : 'btn-secondaryselected'}`}
          onClick={() => handleFilterChange('completed')}
          style={{borderRight: "2px solid #225fa1"}}
        >
          Completed
        </button>
        <button
          type="button"
          className={`btn ${filter === 'incompleted' ? 'btn-primaryselected' : 'btn-secondaryselected'}`}
          onClick={() => handleFilterChange('incompleted')}
        >
          Incompleted
        </button>
      </div>
      </div>

  <div className='inputfield rounded'>
  <input type="text" className="form-control rounded border-0 outline-none" placeholder="Enter your text" onChange={(e)=>{
    setEnteredinput(e.target.value)
  }} value={enteredinput}/>
  <div class="input-group-append" onClick={()=>{

if(enteredinput == ""){
  setModalstatus({
    description:"Please Enter some input",
    status:"fails",
    action:"Error"
  })
  setShow(true);
  return 
}
tasklength.current++;
    setAlltasks((prevtasks)=>{
      return [...prevtasks,{"task_description":enteredinput,"isCompleted":false,"taskid":tasklength.current}]
    })
    
    setEnteredinput((entereddata)=>{
return ""
    })
  }}>
    <button class="btn btn-outline-secondary rounded-right custom-button" type="button"><i className="bi bi-plus"></i></button>
  </div>
  </div>
  <div className='tasklist flex-grow-1 bg-white rounded'>
    {
      visibletasks.length === 0 ? 
      <>
      {
        filter==="all" ?<>
        <p className='heading text-center large-text tasknotfoundtext'>No tasks available. Add some tasks!</p>
        </>:
        <>
       { 
       Alltasks.length!= 0 && filter==="completed" ? <>
       <p className='heading text-center large-text tasknotfoundtext'>No tasks completed yet. Keep going!</p>
       </>:
       <>
{      Alltasks.length!= 0 && filter==="incompleted" ? <p className='heading text-center large-text tasknotfoundtext'>All caught up! No pending tasks.</p> : <>
<p className='heading text-center large-text tasknotfoundtext'>No tasks available. Add some tasks!</p>
</>
}
       </>
       }
        </>
      }
      </>:
      <>
      <div className='flex-grow-1 taskcontainer'>
        {visibletasks.map((item,indexid)=>{
          return (
            <>
            <Tasks taskdetail={item} keyid={indexid} Alltaskfun={setAlltasks} Alltask={Alltasks} totaltask={tasklength}></Tasks>
            </>
          )
        })}
      </div>
      </>
    }
  </div>
 </section>
 </div>
 </>
  );
}

export default App;
