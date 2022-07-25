import { createContext, useContext, useState } from "react";
import { client } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskContext");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = client.auth.user();

    const { error, data } = await client
      .from("tasks")
      .select()
      .eq("userid", user.id)
      .eq("done", done)
      .order("id", { ascending: true });

    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = client.auth.user();
      const { error, data } = await client.from("tasks").insert({
        name: taskName,
        userid: user.id,
      });

      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id)=>{
    const user = client.auth.user();

    const {error} = await client.from('tasks').delete().eq("userid",user.id).eq("id",id)
    if(error) throw error;
    setTasks(tasks.filter(task => task.id !== id));
    
  };

  const updateTask = async (id, updateFields)=>{
    const user = client.auth.user();

    const {error}= await client.from("tasks").update(updateFields).eq("userid",user.id).eq("id",id)
    if(error) throw error;
    setTasks(tasks.filter(task => task.id !== id));
    }
  

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, createTask, adding, loading,deleteTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
