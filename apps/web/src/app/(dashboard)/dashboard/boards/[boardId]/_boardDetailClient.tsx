"use client";

import { useState } from "react";
import { BoardHeader } from "@/components/board/board-header";
import { KanbanBoard } from "@/components/board/kanban-board";
import { ListView } from "@/components/board/board-list-view";

interface BoardDetailClientProps {
  board: any;
  isOwner: boolean;
}

export function BoardDetailClient({ board, isOwner }: BoardDetailClientProps) {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="-mx-8 -mt-8 flex h-[calc(100vh-3.5rem)] w-[calc(100%+4rem)] flex-col">
      <BoardHeader
        board={board}
        currentView={view}
        onViewChange={setView}
        isOwner={isOwner}
      />

      {view === "kanban" ? (
        <KanbanBoard board={board} isOwner={isOwner} />
      ) : (
        <ListView board={board} />
      )}
    </div>
  );
}
