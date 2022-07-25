import React, { useEffect, useState } from "react";
import { client } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Home() {
  const navigate = useNavigate();
  const [showTaskDone,setShowTaskDone] = useState(true);


  useEffect(() => {
    if (!client.auth.user()) {
      navigate("/login");
    }
  });

  return (
    <div className="row pt-4">
            <div className="col-md-4 offset-md-4">
      
      <TaskForm/>
      <header className="d-flex justify-content-between my-3">
        <span className="h5">{showTaskDone ? "Tasks Done": "Tasks to Do"}</span>
        <button className="btn btn-dark btn-sm" onClick={()=>setShowTaskDone(!showTaskDone)}>{showTaskDone ? "Show tasks to do":"Show tasks done"}</button>
      </header>
      <TaskList done={showTaskDone}/>
      </div>
    </div>
  );
}
export default Home;
