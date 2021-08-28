import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [message, setMessage] = useState('')

  function insertTask() {
    setTasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 10000),
        title: newTaskTitle,
        isComplete: false
      }
    ])
    setNewTaskTitle('');
    setMessage('');
  }

  function handleCreateNewTask() {
    (newTaskTitle) ? insertTask() : setMessage('Digite o nome da task.')
  }

  function handleToggleTaskCompletion(id: number) {
    const listTask = tasks.map(item => {
      return item.id === id ? { ...item, isComplete: !item.isComplete } : item
    })
    setTasks(listTask)
  }

  function handleRemoveTask(id: number) {
    const listTask = tasks.filter(item => item.id !== id)
    setTasks(listTask)
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
          <span>{message}</span>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}