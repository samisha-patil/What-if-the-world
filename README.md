# WhatIf World
**Tagline:** Imagine the Impossible. Explore the Possible.

WhatIf World is a frontend-first interactive “what if?” scenario explorer. Users can choose a scenario, select one of three paths, and read an imaginative possible outcome. Users can also create their own custom scenario in the current browser session.

## Features
- Responsive futuristic dark/purple/cyan design
- Home, Explore, How it works, and About sections
- Six built-in interactive scenarios
- Category filters: Future & tech, Space, Society, Wild ideas
- Choice-based outcomes and try-again interaction
- Create-your-own scenario form
- Mobile navigation and accessible modal close behavior
- Built with plain HTML, CSS, and JavaScript—no build tools required

## Run in VS Code
1. Extract `WhatIf_World_Project.zip`.
2. Open the `WhatIf_World` folder in VS Code.
3. Open `index.html` in your browser.
4. Recommended: install the **Live Server** extension in VS Code, right-click `index.html`, then choose **Open with Live Server**.

## Project structure
```
WhatIf_World/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── scenarios.js
    └── main.js
```

## Important notes
- This is a frontend prototype. Sign in is a demo message only; there is no real account system or database.
- Custom scenarios are stored in JavaScript memory for the current page session; refreshing the page resets them.
- Scenario outcomes are creative thought experiments, not predictions or professional advice.

## Next development milestones
1. Add browser storage for saved scenarios.
2. Create separate scenario detail pages and a user dashboard.
3. Add a backend using Python/Flask and a database.
4. Add secure authentication and an AI-powered scenario generator.
5. Test accessibility, responsiveness, and deployment.

## Main files
- `index.html` — page structure and modal dialogs
- `css/style.css` — responsive styling and visual design
- `js/scenarios.js` — scenario content and choices
- `js/main.js` — rendering, filtering, modal behavior, outcomes, and custom scenario creation
