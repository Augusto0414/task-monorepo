<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskAssigned implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Task $task,
        public int $assignedById
    ) {
    }

    public function broadcastOn(): array
    {
        return [new PrivateChannel('users.' . $this->task->assignee_id)];
    }

    public function broadcastAs(): string
    {
        return 'task.assigned';
    }

    public function broadcastWith(): array
    {
        return [
            'task' => $this->task->toArray(),
            'assigned_by' => $this->assignedById,
        ];
    }
}
