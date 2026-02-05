import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getEnv } from "./getEnv";

type EchoConstructorType = new (...args: unknown[]) => Echo<"pusher">;

type EchoEnv = ReturnType<typeof getEnv>;

type EchoConfig = {
  token: string;
  env: EchoEnv;
};

export const createEchoClient = ({ token, env }: EchoConfig): Echo<"pusher"> => {
  (window as typeof window & { Pusher: typeof Pusher }).Pusher = Pusher;

  const appUrl = env.VITE_APP_URL ?? "http://localhost:8000";
  const wsHost = env.VITE_REVERB_HOST ?? "127.0.0.1";
  const wsPort = Number(env.VITE_REVERB_PORT ?? 8080);
  const wsScheme = env.VITE_REVERB_SCHEME ?? "http";
  const wsCluster = env.VITE_REVERB_CLUSTER ?? "mt1";
  const appKey = env.VITE_REVERB_APP_KEY ?? "local";

  const EchoConstructor =
    (Echo as unknown as { default?: EchoConstructorType }).default ?? (Echo as EchoConstructorType);

  return new EchoConstructor({
    broadcaster: "pusher",
    key: appKey,
    cluster: wsCluster,
    wsHost,
    wsPort,
    forceTLS: wsScheme === "https",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${appUrl}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
