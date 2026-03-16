function TodoItem({todo, onDelete, onToggle}){

    return(
        <div>

            <input type="checkbox" checked={todo.completed} onChange={()=>onToggle(todo._id)} ></input>
        <span style={{ textDecoration:todo.completed ? "line-through" : "none"}}>
        {todo.text}
        </span>

        <button onClick={() => onDelete(todo._id)}>Delete</button>
        
        </div>
    )
}

export default TodoItem