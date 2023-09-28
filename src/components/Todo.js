import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

//browser or localStorage se data ko delete nhi karta hi
  useEffect(()=>{
    if(localStorage.getItem("localTasks")){
        const storedList = JSON.parse(localStorage.getItem("localTasks"));
        setTasks(storedList);
    }
},[]);

// //click button save Data in localStorage
  const addTask = () => {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]); //prev data 
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask])); // store data in localStorage
      setTask(""); //clear input 
  };


  //delete btn
  const handleDelete = (item)=>{
      const deleted = tasks.filter((t)=>t.id !== item.id);
      setTasks(deleted);
      localStorage.setItem("localTasks", JSON.stringify(deleted)) //convert
  }

  return (
    <div className="container row">
      <h1 className="mt-3 text-black">Todo list</h1>
      <div className="col-3">
        <input
          value={task}
          placeholder="add list"
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-2">
        <button className="btn btn-primary form-control material-icons" onClick={addTask}>add</button>
      </div>

      {/* map and show in browser, btn delete*/}
      {tasks.map((item) => (
        <div key={item.id}>
            <div className="col-2">
                <h1>{item.title}</h1> 
            <button className =" mt-3 btn btn-warning material-icons"
                onClick ={()=> handleDelete(item)}>delete</button>
            </div>
            
        </div>
      ))}
    </div>
  )
}

export default Todo;