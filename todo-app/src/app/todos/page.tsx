"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/todos')
        setTodos(response.data.todos)
      } catch (err) {
        setError('Failed to fetch todos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista de Tarefas</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="h-4 w-4 text-blue-600 rounded mr-3"
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {todo.todo}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}