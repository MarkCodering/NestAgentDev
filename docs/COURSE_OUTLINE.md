# Course Outline: Building a Personal Assistant with OpenAI Agents + MCP

**Format:** 6 modules, 12 lessons, 1 capstone demo

---

## Module 1: Foundations

### Lesson 1.1 – What is an AI agent?
* What agents are (beyond chatbots)
* Tool calling and orchestration
* Why MCP matters

### Lesson 1.2 – The personal assistant project
* Project goals and scope
* Demo walkthrough
* Architecture overview

---

## Module 2: Backend with NestJS

### Lesson 2.1 – Building the API shell
* NestJS fundamentals
* REST endpoints for agent prompts
* Health checks + CORS

### Lesson 2.2 – Wiring the OpenAI Agent
* Agent setup
* Instructions design
* Using `run()` and reading outputs

---

## Module 3: MCP Tools + Context

### Lesson 3.1 – MCP concepts and server types
* Stdio vs HTTP MCP servers
* Tool schemas + capabilities
* Security considerations

### Lesson 3.2 – Gmail + Calendar MCP integration
* OAuth setup
* Connecting MCP servers from NestJS
* Tool reliability and fallbacks

---

## Module 4: Frontend Demo (Next.js)

### Lesson 4.1 – UI scaffolding
* Next.js app router basics
* Form handling + API calls
* Error states and loading UI

### Lesson 4.2 – Designing for trust
* Showing context sources
* Providing “next actions”
* UX for missing data

---

## Module 5: Agent Quality + Safety

### Lesson 5.1 – Prompt engineering for assistants
* Instruction hierarchies
* Output formatting
* Response constraints

### Lesson 5.2 – Guardrails + reliability
* Logging tool calls
* Retries and timeouts
* Transparent error messages

---

## Module 6: Capstone + Launch

### Lesson 6.1 – Capstone build session
* Build a personalized assistant workflow
* Add one extra MCP server
* Add custom output formatting

### Lesson 6.2 – Launching your assistant
* Deployment checklist
* Monitoring + analytics
* Future improvements

---

## Bonus Content

* Office hours Q&A
* Templates for lesson prompts
* Checklist for student project reviews
