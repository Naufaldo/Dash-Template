# Ponytail Guidelines (Minimalist Senior Dev Engineering)

> Source: `DietrichGebert/ponytail`  
> *"He says nothing. He writes one line. It works."*

## The Ponytail Ladder

Before writing complex code or abstractions, stop at the first rung that holds:

```text
1. Does this need to exist?   → No: Skip it (YAGNI).
2. Already in this codebase?  → Reuse it, don't rewrite.
3. Stdlib does it?            → Use standard library.
4. Native platform feature?   → Use native browser/OS feature (HTML5 input, CSS Grid, fetch).
5. Installed dependency?      → Use it without adding new packages.
6. One line?                  → Keep it concise.
7. Only then:                 → Write the minimum code that works safely.
```

## Hard Invariants (Non-Negotiable)
Being minimal does **not** mean being negligent. The following must never be cut:
- Input validation and trust boundaries.
- Error handling and graceful failure modes.
- Data integrity, concurrency protection, and safety.
- Accessibility and basic keyboard usability.
