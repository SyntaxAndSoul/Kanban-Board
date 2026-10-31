import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../../features/task/state/taskSlice";

const columns = [
  { title: "Todo", color: "bg-indigo-100" },
  { title: "In Progress", color: "bg-amber-100" },
  { title: "Completed", color: "bg-emerald-100" },
];

function KanbanBoard({ projectId }) {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = projectTasks.filter(
          (task) => task.status === column.title,
        );

        return (
          <section
            key={column.title}
            className={`min-h-64 rounded-3xl p-4 ${column.color}`}
          >
            <h2 className="mb-5 font-bold">
              {column.title} ({columnTasks.length})
            </h2>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <span className="text-sm text-orange-600">
                    {task.priority}
                  </span>

                  <h3 className="mt-3 font-semibold">{task.title}</h3>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      dispatch(
                        moveTask({
                          id: task.id,
                          status: e.target.value,
                        }),
                      )
                    }
                    className="mt-4 rounded-lg border p-2 text-sm"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
