const card = document.querySelector("[data-tilt-card]");
const hoverArea = document.querySelector("[data-tilt-stage]");

if (
    card &&
    hoverArea &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    let bounds;
    let frame;
    hoverArea.addEventListener("pointerenter", () => {
        bounds = hoverArea.getBoundingClientRect();
    });

    hoverArea.addEventListener("pointermove", (event) => {
        if (!bounds) bounds = hoverArea.getBoundingClientRect();
        const pointerX = Math.max(
            -1,
            Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
        );
        const pointerY = Math.max(
            -1,
            Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
        );

        if (frame) return;
        frame = requestAnimationFrame(() => {
            card.style.setProperty("--tilt-x", `${-pointerY * 5}deg`);
            card.style.setProperty("--tilt-y", `${pointerX * 5}deg`);
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
    });
}
