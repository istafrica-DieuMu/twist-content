/* ---------- Parents Lab: ideas for the parents dashboard ----------
   The Parents Lab tab shows pages/parents-lab (each component with the
   parent's question it answers and the data it needs) in a frame, as the
   Drawings and Task types tabs show theirs. Practice a parent sends reaches
   the child through child.assigned (practice-ui.js, mySuggestions).
   Inlined after app-ui.js. */
function renderParents() {
  const el = $("#parentsView");
  if (!el.querySelector("iframe")) el.innerHTML = `<iframe class="pa-lab" src="../parents-lab/index.html" title="Parents Lab"></iframe>`;
}
