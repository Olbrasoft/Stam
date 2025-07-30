# AGENTS.md - Browser Extension Development Guide

## Project Type
Chrome extension using Manifest V3 for microphone activation shortcuts

## Build/Test Commands
- No build process required (plain JS)
- Manual testing: Load unpacked extension in `chrome://extensions/`
- Test on supported sites: Google Search, Gemini, YouTube, ChatGPT, Perplexity.ai

## Code Style Guidelines
- **Language**: Vanilla JavaScript (ES6+)
- **Indentation**: 2 spaces
- **Functions**: Use function declarations and arrow functions appropriately
- **Variables**: Use `let`/`const`, prefer `const` for immutable values
- **Strings**: Single quotes for code, template literals for complex strings
- **Console logging**: Use `console.log()` with 'STAM:' prefix for debugging
- **Comments**: Use single-line `//` comments, Czech language acceptable

## Naming Conventions
- **Functions**: camelCase (e.g., `activateMic()`)
- **Variables**: camelCase (e.g., `micBtn`)
- **Constants**: camelCase for element selectors
- **CSS selectors**: Use specific selectors for each website

## Error Handling
- Check element existence before interaction (`if (micBtn)`)
- Provide user feedback via temporary DOM notifications
- Use fallback selectors for website variations