function calculateScore(data) {
  let score = 0;
  const issues = [];

  if (data.hasDefinition) {
    score += 20;
  } else {
    issues.push("❌ No clear definition found (add a 2–3 line definition after the title)");
  }

  if (data.hasQuestions) {
    score += 20;
  } else {
    issues.push("❌ No question-based headings (add headings like 'What is X?' or 'How does X work?')");
  }

  if (data.hasLists) {
    score += 20;
  } else {
    issues.push("❌ No lists or steps (add bullet points or numbered steps)");
  }

  if (data.hasSummary) {
    score += 15;
  } else {
    issues.push("❌ No summary or key takeaways section");
  }

  if (!data.promotionalTone) {
    score += 25;
  } else {
    issues.push("❌ Promotional language detected (reduce words like best, ultimate, guaranteed)");
  }

  return { score, issues };
}

chrome.tabs.query({ active: true, currentWindow: tr
