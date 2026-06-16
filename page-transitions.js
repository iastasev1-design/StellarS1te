const pageTransitionDelay = 220;
const reducePageMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("pageshow", () => {
  document.body.classList.remove("is-page-leaving");
});

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest("a[href]");
  if (!link || link.target || link.hasAttribute("download")) return;

  const targetUrl = new URL(link.href, window.location.href);
  if (targetUrl.origin !== window.location.origin) return;

  const isSamePageHash =
    targetUrl.pathname === window.location.pathname &&
    targetUrl.search === window.location.search &&
    targetUrl.hash;

  if (isSamePageHash) return;

  event.preventDefault();

  if (reducePageMotion) {
    window.location.href = targetUrl.href;
    return;
  }

  document.body.classList.add("is-page-leaving");
  window.setTimeout(() => {
    window.location.href = targetUrl.href;
  }, pageTransitionDelay);
});
