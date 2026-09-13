// src/pages/KanbanPage.jsx
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { STATUSES } from "../lib/statuses.js";
import ApplicationCard from "../components/applications/ApplicationCard.jsx";
import {
  useApplications,
  useUpdateApplication,
} from "../hooks/useApplications.js";

function DroppableColumn({ status, count, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="flex w-72 shrink-0 flex-col gap-3">
      <div
        className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
          isOver
            ? "border-blue-500 bg-slate-700"
            : "border-slate-700 bg-slate-800"
        }`}
      >
        <span className="text-sm font-semibold text-white">{status}</span>
        <span className="text-xs text-gray-400">{count}</span>
      </div>
      {children}
    </div>
  );
}

function DraggableCard({ app }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: app.id });

  return (
    <div
      ref={setNodeRef}
      // Drag offsets are per-pixel and computed at runtime, so this transform
      // cannot be a Tailwind utility. See the note in client/CLAUDE.md.
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={isDragging ? "relative z-10 opacity-80" : undefined}
      {...listeners}
      {...attributes}
    >
      <ApplicationCard app={app} />
    </div>
  );
}

export default function KanbanPage() {
  const { data } = useApplications();
  const applications = data ?? [];
  const updateApplication = useUpdateApplication();

  // A small drag threshold so an ordinary click on a card is not swallowed.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id;
    const app = applications.find((candidate) => candidate.id === active.id);
    if (!app || app.status === newStatus) return;

    updateApplication.mutate({ id: app.id, patch: { status: newStatus } });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Kanban</h1>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map((status) => {
            const columnApps = applications.filter(
              (app) => app.status === status,
            );

            return (
              <DroppableColumn
                key={status}
                status={status}
                count={columnApps.length}
              >
                {columnApps.map((app) => (
                  <DraggableCard key={app.id} app={app} />
                ))}
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
