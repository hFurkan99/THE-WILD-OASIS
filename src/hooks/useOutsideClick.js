import { useEffect } from "react";
import { useRef } from "react";
export default function useOutsideClick(handler, enabled = true) {
  const ref = useRef();
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handler, enabled]);
  return ref;
}
