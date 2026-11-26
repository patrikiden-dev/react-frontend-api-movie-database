# SECURITY

## Introduction



## Table of Contents

- [Design Ideas](#design-ideas)



## Normalization, Validation and Sanitation

The optimal pipeline for data handling in React 19 follows a strict order: 
1. Normalize (including Unicode NFC) 
2. Validate 
3. Sanitize (if u are using raw inputs like markdown or html)

### Normalization (with Unicode NFC)

Data normalization should happen first to ensure that inputs are consistent before validation checks are applied.
A critical step often missed in text normalization is Unicode Normalization (NFC). When users type special characters 
(like é, ü, or å) on different devices (e.g., macOS vs. Windows/Android), the OS might encode them differently—either 
as a single combined character (NFC) or as a base character plus a combining accent (NFD). 

To prevent database mismatches and validation bugs, always use .normalize("NFC").

Example of where you should normalize:
- Input values
- URL search params
- LocalStorage values

Normalize functions: `/src/utils/unicode.ts`
- normalizeNFC() for individual user-entered strings
- deepNormalize() only at external-data boundaries (LocalStorage, imported JSON, third-party user content)

### Validation

Validation verifies that the normalized data matches your schema boundaries, structural business logic, and security invariants.
I use Zod for validation of environment variables, forms and api.

### Sanitation

Sanitation neutralizes structural code injections (like Cross-Site Scripting or XSS) when dealing with raw inputs.
• React's Built-in Escaping: By default, React 19 natively sanitizes any variable rendered inside JSX curly braces {userInput}. It automatically escapes strings into safe text nodes, removing the risk of script injections for standard strings.
• Manual Sanitation: If your application handles user-generated rich text or Markdown and must output raw HTML via dangerouslySetInnerHTML, you must sanitize it manually before rendering.
• React 19 & Trusted Types: React 19 natively supports the W3C Trusted Types API. In strict environments, React will block unsafe strings passing into potentially dangerous execution sinks (like innerHTML) unless they are processed by an authorized security policy.

React 19 have built-in sanitation against Cross-Site Scripting (XSS).

### Usage

Forms
```typescript
z.string()
 .trim()
 .transform(normalizeNFC)
```
URL search params
```typescript
z.string()
    .trim()
    .transform(normalizeNFC)
```

Query keys

```typescript
const query = normalizeNFC(search);
```

API responses
```typescript
MovieSchema.parse(response.data);

```


LocalStorage
```typescript
deepNormalize(data);

```
normalizeNFC() for individual user-entered strings
deepNormalize() only at external-data boundaries (LocalStorage, imported JSON, third-party user content)

❌ Don't run deepNormalize() on every object in the application. That's unnecessary complexity and wasted work. For a movie database app, field-level normalization inside your Zod schemas is the cleaner approach.

```typescript

```


