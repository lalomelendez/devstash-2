# Load Action

1. Check $ARGUMENTS (after "load"):
   - If it looks like a filename (single word, no spaces): Look for `context/features/{name}.md` or `context/fixes/{name}`
   - If it's multiple words: Use as inline feature description, generate goals
   - If empty: Error - "load" requires a spec filename or feature description

2. Update current-feature.md:
   - Write Title and Description  as bullet points (no header) under ## Current Feature, leave one blank line.
   - Write goals as bullet points under ## Goals
   - Write any additional notes/context under ## Notes
   - Set Status to "In Progress"
   - Do NOT touch items below # History

3. Confirm spec loaded and show the feature summary
