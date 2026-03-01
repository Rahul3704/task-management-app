"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await api.get(
      `/tasks?page=${page}&limit=5&status=${statusFilter}&search=${search}`
    );

    setTasks(res.data.tasks);
    setPages(res.data.pages);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Create Task Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>
          <form onSubmit={handleCreate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Enter task description"
                className="border border-gray-300 rounded-lg p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform transition hover:scale-105 shadow-md">
              Create Task
            </button>
          </form>
        </div>

        {/* Search + Filter Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Search by title..."
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />

            <select
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-w-40"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 mb-8">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h2>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={async () => {
                      await api.put(`/tasks/${task._id}`, {
                        status:
                          task.status === "pending"
                            ? "completed"
                            : "pending",
                      });
                      fetchTasks();
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold p-2 rounded-lg hover:from-green-600 hover:to-green-700 transition"
                  >
                    {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
                  </button>

                  <button
                    onClick={async () => {
                      await api.delete(`/tasks/${task._id}`);
                      fetchTasks();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center items-center gap-4 bg-white rounded-lg shadow-lg p-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-2 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <span className="text-gray-700 font-semibold">
              Page <span className="text-blue-600">{page}</span> of <span className="text-blue-600">{pages}</span>
            </span>

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
              className="px-6 py-2 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}