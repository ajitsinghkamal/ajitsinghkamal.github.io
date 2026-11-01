const card = document.querySelector("[data-holo-card]");
const hoverArea = document.querySelector("[data-holo-stage]");

if (
    card &&
    hoverArea &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    let bounds;
    let frame;
    let pointerX = 0;
    let pointerY = 0;

    hoverArea.addEventListener("pointerenter", () => {
        bounds = hoverArea.getBoundingClientRect();
    });

    hoverArea.addEventListener("pointermove", (event) => {
        if (!bounds) bounds = hoverArea.getBoundingClientRect();
        pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
        pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));

        if (frame) return;
        frame = requestAnimationFrame(() => {
            card.style.setProperty("--tilt-x", `${-pointerY * 5}deg`);
            card.style.setProperty("--tilt-y", `${pointerX * 5}deg`);
            card.style.setProperty("--pointer-x", pointerX);
            card.style.setProperty("--pointer-y", pointerY);
            card.style.setProperty("--refraction-scale-a", Math.min(1, 0.15 + pointerX * 0.25));
            card.style.setProperty("--refraction-scale-b", Math.min(1, 0.15 - pointerX * 0.65));
            card.style.setProperty("--refraction-shift-x-a", `${Math.max(-10, Math.min(10, -10 + pointerX * 10))}%`);
            card.style.setProperty("--refraction-shift-y-a", `${Math.max(0, pointerY * -10)}%`);
            card.style.setProperty("--refraction-shift-x-b", `${Math.max(-10, Math.min(10, 10 + pointerX * 10))}%`);
            card.style.setProperty("--refraction-shift-y-b", `${Math.min(0, pointerY * -10)}%`);
            card.classList.add("is-tilting");
            frame = null;
        });
    });

    hoverArea.addEventListener("pointerleave", () => {
        bounds = null;
        if (frame) cancelAnimationFrame(frame);
        frame = null;
        card.classList.remove("is-tilting");
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--pointer-x", "0");
        card.style.setProperty("--pointer-y", "0");
        card.style.setProperty("--refraction-scale-a", "0.15");
        card.style.setProperty("--refraction-scale-b", "0.15");
        card.style.setProperty("--refraction-shift-x-a", "-10%");
        card.style.setProperty("--refraction-shift-y-a", "0%");
        card.style.setProperty("--refraction-shift-x-b", "10%");
        card.style.setProperty("--refraction-shift-y-b", "0%");
    });
}
