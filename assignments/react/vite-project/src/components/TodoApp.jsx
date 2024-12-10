// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, Plus, X } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }
    ]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">任务清单</h1>
      
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="添加新任务..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
        >
          <Plus size={20} />
          添加
        </button>
      </form>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          进行中
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          已完成
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 border rounded-lg ${
              task.completed ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed ? 'border-green-500 bg-green-500' : 'border-gray-400'
              }`}
            >
              {task.completed && <Check size={16} className="text-white" />}
            </button>

            {editingId === task.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => startEditing(task.id, task.text)}
                  className="p-1 text-gray-600 hover:text-gray-700"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;