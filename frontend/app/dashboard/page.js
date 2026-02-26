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
    <div className="p-10 max-w-2xl mx-auto">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 mb-4"
      >
        Logout
      </button>

      <h1 className="text-2xl mb-6">Task Dashboard</h1>

      {/* Create Task */}
      <form onSubmit={handleCreate} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-black text-white p-2 w-full">
          Create Task
        </button>
      </form>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="border p-2 flex-1"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border p-2"
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task._id} className="border p-3 mb-3">
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <div className="mt-2">
            <button
              onClick={async () => {
                await api.delete(`/tasks/${task._id}`);
                fetchTasks();
              }}
              className="text-red-500 mr-3"
            >
              Delete
            </button>

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
              className="text-blue-500"
            >
              Toggle Status
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}