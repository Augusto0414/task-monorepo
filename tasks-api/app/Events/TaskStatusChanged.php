<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskStatusChanged implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Task $task,
        public string $fromStatus,
        public string $toStatus,
        public int $changedById,
        public int $notifyUserId
    ) {
    }

    public function broadcastOn(): array
    {
        return [new PrivateChannel('users.' . $this->notifyUserId)];
    }

    public function broadcastAs(): string
    {
        return 'task.status_changed';
    }

    public function broadcastWith(): array
    {
        return [
            'task' => $this->task->toArray(),
            'from_status' => $this->fromStatus,
            'to_status' => $this->toStatus,
            'changed_by' => $this->changedById,
        ];
    }
}
