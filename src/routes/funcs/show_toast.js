import { toast } from "@zerodevx/svelte-toast";

export default function show_toast(msg) {
  // remove ALL active toasts from ALL containers
  toast.pop(0);
  toast.push(msg, {
    class: "bg-primary text-white",
    duration: 1000,
    theme: {
      "--toastBarHeight": 0
    }
  });
}
