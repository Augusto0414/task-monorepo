<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class BroadcastAuthController extends Controller
{
    public function authenticate(Request $request)
    {
        logger()->info('broadcast.auth', [
            'user_id' => optional($request->user())->id,
            'channel' => $request->input('channel_name'),
            'socket_id' => $request->input('socket_id'),
        ]);

        return Broadcast::auth($request);
    }
}
