function analyzePage() {
  const text = document.body.innerText.toLowerCase();

  // Detect definition patterns
  const hasDefinition =
    text.includes(" is ") ||
    text.includes(" refers to ") ||
    text.includes(" means ");

  // Detect question-based headings
  const headings = Array.from(document.querySelectorAll("h2, h3"));
  const hasQuestions = headings.some(h =>
    /^(what|why|how|when|can|does)/i.test(h.innerText.trim())
  );

  // Detect lists or steps
  const hasLists = document.querySelectorAll("ul, ol").length > 0;

  // Detect summary or takeaways
  const hasSummary =
    text.includes("summary") ||
    text.includes("key takeaways") ||
    text.includes("tldr") ||
    text.includes("in short");

  // Detect promotional tone
  const promoWords = ["best", "ultimate", "revolutionary", "guaranteed"];
  const promotionalTone = promoWords.some(word => text.includes(word));

  return {
    hasDefinition,
    hasQuestions,
    hasLists,
    hasSummary,
    promotionalTone
  };
}

// Listen for popup request
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    sendResponse(analyzePage());
  }
});
