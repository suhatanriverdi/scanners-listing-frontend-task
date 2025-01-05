# S4E.io Frontend Application

This repository contains the implementation of a simple frontend application for the S4E.io platform. The application replicates a scan tools list with filtering, responsive design, and local state persistence. It is built using **Next.js**, **Tailwind CSS**, and **ShadCN UI**.

## Screenshots

<img width="1472" alt="Screenshot 2025-01-06 at 00 13 46" src="https://github.com/user-attachments/assets/cd3315cc-ea25-4f33-ae27-7c33eb2ab8cf" />
<hr />
<img width="1471" alt="Screenshot 2025-01-06 at 00 14 23" src="https://github.com/user-attachments/assets/36ef0ef2-dfe6-492b-9960-9706ff5c414b" />
<hr />
<img width="325" alt="Screenshot 2025-01-06 at 00 14 43" src="https://github.com/user-attachments/assets/71575d08-1cfd-4033-bc83-5d0ac665ab00" />
<hr />
<img width="1469" alt="Screenshot 2025-01-06 at 00 15 08" src="https://github.com/user-attachments/assets/db2d74b6-bb3a-4f8a-ae4a-feaa83b52b21" />
<hr />
<img width="1263" alt="image" src="https://github.com/user-attachments/assets/13446b91-3d7c-4e87-a377-e4a9ae2e1e26" />

## Project Description

**S4E.io** is a cybersecurity platform that continuously detects and reports system vulnerabilities. This project focuses on implementing the scan tools list available at [S4E.io Scan Tools](https://app.s4e.io/scans/tools).

### Features

1. **Responsive Design**
   - Implements a sidebar navigation and table-based layout.
   - Supports both light and dark themes.

2. **Table Functionality**
   - Filters based on `scan category` and `search`.
   - Persisted filters using local storage to maintain the state after refresh or browser restart.
   - Paginated table for better data visualization.

3. **Error Handling**
   - Displays user-friendly messages for API errors.

4. **Backend Integration**
   - Fetches scan tools data via API from `https://app.s4e.io/api-token`.
   - Uses `fetch` for data retrieval.

## Tech Stack

- **Next.js**: Framework for server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS framework.
- **ShadCN UI**: Component library for consistent design.
- **Zustand**: State management library for managing table filters and persistence.
- **TypeScript**: Typed JavaScript for improved developer experience.

## Folder Structure

```
app/
├── components/          # Placeholder for reusable React components.
├── config/              # API endpoints and configuration files.
│   └── endpoints.ts     # Endpoint configuration.
├── lib/                 # Utility functions and data definitions.
│   ├── data.ts          # Mock or utility data.
│   └── definitions.ts   # TypeScript type definitions.
├── scanners/            # Components and logic specific to the scan tools list.
│   ├── columns.tsx      # Table column definitions.
│   ├── dataTable.tsx    # Data table implementation.
│   └── page.tsx         # Main page for displaying the scan tools list.
├── seed/                # Seeder data for development.
│   └── seedScannersData.ts
├── store/               # Zustand state management logic.
│   ├── localStorageService.ts # Utilities for managing local storage.
│   └── queryStore.ts         # Zustand store for filters and table state.
├── ui/                  # UI components like navigation and sidebar.
│   ├── navLinks.tsx     # Links for navigation.
│   └── sidenav.tsx      # Sidebar component.
├── utils/               # General utility functions.
│   └── utils.ts
├── globals.css          # Global styles.
├── layout.tsx           # App layout component.
└── page.tsx             # Root page implementation.
```

## Installation and Setup

### Prerequisites

- Node.js (version >= 18.x recommended)
- npm, yarn, or pnpm

### Steps

1. Clone the repository:

    ```
    git clone https://github.com/your-username/s4e-frontend-task.git
    cd s4e-frontend-task
    ```

2. Install dependencies:

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

    or

    ```
    pnpm install
    ```

3. Start the development server:

    ```
    npm run dev
    ```

    or

    ```
    yarn dev
    ```

    or

    ```
    pnpm dev
    ```

4. Open the application in your browser:

   [http://localhost:3000](http://localhost:3000)

## How to Use

1. Navigate to the Tools List section.
2. Use the Search or Category Filter to refine results.
3. Switch between Light and Dark themes using the toggle button.
4. Navigate through pages using the pagination controls.

## API Integration

- **Endpoint**: List of All Scans
- **Data Fetching**: Uses the fetch API for retrieving scan tools data.
