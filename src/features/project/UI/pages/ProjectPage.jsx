import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Pencil, Trash2, X, ListTodo, CheckCircle2 } from "lucide-react";

import { addProject, editProject, deleteProject } from "../../state/projectSlice";

import {
  addTask,
  editTask,
  toggleTask,
  deleteTask,
  deleteTasksByProject,
} from "../../../task/state/taskSlice";

const colors = [
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-pink-500",
];

export default function ProjectsPage() {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  const tasks = useSelector((state) => state.task.tasks);

  const user = useSelector((state) => state.auth.user);

  const [projectModal, setProjectModal] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const totalTasks = tasks.length;

  function handleProjectSubmit(data) {
    if (projectModal?.id) {
      dispatch(
        editProject({
          id: projectModal.id,
          name: data.name.trim(),
          description: data.description.trim(),
        }),
      );
    } else {
      dispatch(
        addProject({
          name: data.name.trim(),
          description: data.description.trim(),
        }),
      );
    }

    setProjectModal(null);
  }

  function handleDeleteProject(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project and its tasks?",
    );

    if (!confirmed) return;

    dispatch(deleteProject({ id }));
    dispatch(deleteTasksByProject({ projectId: id }));

    if (activeProject?.id === id) {
      setActiveProject(null);
    }
  }

  function openTaskManager(project) {
    setActiveProject(project);
    setEditingTask(null);
  }

  return (
    <main className="min-h-screen bg-[#f0f3fa] px-5 py-8 sm:px-10 lg:px-20">
      {/* Profile */}
      <header className="mb-8 flex justify-end">
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171a31] font-bold text-white">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div className="text-sm">
            <p className="font-bold text-gray-900">
              {user?.name || "Your account"}
            </p>
            <p className="text-gray-500">{user?.email || "your@email.com"}</p>
          </div>
        </div>
      </header>

      {/* Heading */}
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#11152d] sm:text-5xl">
            Your projects
          </h1>

          <p className="mt-2 text-gray-500">
            {projects.length} projects with {totalTasks} tasks in total
          </p>
        </div>

        <button
          onClick={() => setProjectModal({})}
          className="flex items-center justify-center gap-2 self-start rounded-full bg-[#171a31] px-5 py-3 font-semibold text-white transition hover:bg-indigo-900"
        >
          <Plus size={18} />
          New project
        </button>
      </section>

      {/* Project cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const projectTasks = tasks.filter(
            (task) => task.projectId === project.id,
          );

          const completedTasks = projectTasks.filter(
            (task) => task.completed,
          ).length;

          return (
            <article
              key={project.id}
              className="flex min-h-[238px] flex-col rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-white ${colors[index % colors.length]}`}
                >
                  {project.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex gap-3 text-gray-400">
                  <button
                    onClick={() => setProjectModal(project)}
                    aria-label="Edit project"
                    className="hover:text-indigo-600"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    aria-label="Delete project"
                    className="hover:text-red-500"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#11152d]">
                {project.name}
              </h2>

              <p className="mt-1 break-words text-sm text-gray-500">
                {project.description || "No description added."}
              </p>

              <div className="mt-auto pt-5">
                <div className="h-2 overflow-hidden rounded-full bg-[#edf0f7]">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{
                      width: `${
                        projectTasks.length
                          ? (completedTasks / projectTasks.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-500">
                    {projectTasks.length === 0
                      ? "No tasks yet"
                      : `${completedTasks} of ${projectTasks.length} tasks done`}
                  </p>

                  <button
                    onClick={() => openTaskManager(project)}
                    className="flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <ListTodo size={14} />
                    Tasks
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Add project card */}
        <button
          onClick={() => setProjectModal({})}
          className="flex min-h-[238px] items-center justify-center gap-2 rounded-[28px] border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-indigo-400 hover:bg-white/50"
        >
          <Plus size={20} />
          <span className="font-semibold">New project</span>
        </button>
      </section>

      {/* Project create/edit modal */}
      {projectModal !== null && (
        <ProjectForm
          project={projectModal}
          onClose={() => setProjectModal(null)}
          onSubmit={handleProjectSubmit}
        />
      )}

      {/* Task manager modal */}
      {activeProject && (
        <TaskManager
          project={activeProject}
          tasks={tasks.filter((task) => task.projectId === activeProject.id)}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onClose={() => {
            setActiveProject(null);
            setEditingTask(null);
          }}
          dispatch={dispatch}
        />
      )}
    </main>
  );
}

/* Project form */
function ProjectForm({ project, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  // Reset form values when switching between create and edit.
  // Calling reset during render is not needed; use the effect below.
  useState(() => {
    reset({
      name: project?.name || "",
      description: project?.description || "",
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {project?.id ? "Edit project" : "Create project"}
          </h2>

          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <label className="mb-1 block text-sm font-medium">Project name</label>

        <input
          {...register("name", {
            required: "Project name is required",
            maxLength: {
              value: 60,
              message: "Maximum 60 characters",
            },
            validate: (value) =>
              !!value.trim() || "Project name cannot be empty",
          })}
          placeholder="e.g. Mobile app"
          className="mb-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
        />

        {errors.name && (
          <p className="mb-3 text-sm text-red-500">{errors.name.message}</p>
        )}

        <label className="mb-1 mt-3 block text-sm font-medium">
          Description
        </label>

        <textarea
          {...register("description", {
            maxLength: {
              value: 250,
              message: "Maximum 250 characters",
            },
          })}
          rows={3}
          placeholder="Describe your project"
          className="mb-1 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
        />

        {errors.description && (
          <p className="mb-3 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-[#171a31] py-3 font-semibold text-white"
        >
          {project?.id ? "Save changes" : "Create project"}
        </button>
      </form>
    </div>
  );
}

/* Task manager */
function TaskManager({
  project,
  tasks,
  editingTask,
  setEditingTask,
  onClose,
  dispatch,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingTask?.title || "",
      description: editingTask?.description || "",
    },
  });

  // Load the selected task into the form for editing.
  // Reset is called by the edit button below.

  function submitTask(data) {
    if (editingTask) {
      dispatch(
        editTask({
          id: editingTask.id,
          title: data.title.trim(),
          description: data.description.trim(),
        }),
      );
    } else {
      dispatch(
        addTask({
          projectId: project.id,
          title: data.title.trim(),
          description: data.description.trim(),
        }),
      );
    }

    setEditingTask(null);
    reset({ title: "", description: "" });
  }

  function startEditing(task) {
    setEditingTask(task);
    reset({
      title: task.title,
      description: task.description || "",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <section className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#11152d]">{project.name}</h2>
            <p className="mt-1 text-sm text-gray-500">Manage project tasks</p>
          </div>

          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitTask)} className="space-y-3">
          <div>
            <input
              {...register("title", {
                required: "Task title is required",
                validate: (value) =>
                  !!value.trim() || "Task title cannot be empty",
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters",
                },
              })}
              placeholder="Task title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <textarea
            {...register("description", {
              maxLength: {
                value: 250,
                message: "Maximum 250 characters",
              },
            })}
            placeholder="Task description (optional)"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#171a31] py-2.5 font-semibold text-white"
            >
              <Plus size={17} />
              {editingTask ? "Save task" : "Add task"}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  reset({ title: "", description: "" });
                }}
                className="rounded-lg border px-3 py-2"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="my-5 border-t border-gray-200" />

        <h3 className="mb-3 font-semibold">Tasks ({tasks.length})</h3>

        {tasks.length === 0 ? (
          <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
            No tasks yet. Add your first task above.
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-xl border border-gray-200 p-3"
              >
                <button
                  type="button"
                  aria-label={
                    task.completed
                      ? "Mark task incomplete"
                      : "Mark task complete"
                  }
                  onClick={() => dispatch(toggleTask({ id: task.id }))}
                  className={`mt-0.5 ${
                    task.completed ? "text-emerald-600" : "text-gray-400"
                  }`}
                >
                  <CheckCircle2 size={20} />
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`break-words font-medium ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>

                  {task.description && (
                    <p className="mt-1 break-words text-sm text-gray-500">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-2 flex gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => startEditing(task)}
                      className="font-semibold text-indigo-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => dispatch(deleteTask({ id: task.id }))}
                      className="font-semibold text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
