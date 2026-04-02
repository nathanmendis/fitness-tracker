# FitSync Pro Documentation

## 🚀 Overview
FitSync Pro is a high-performance fitness dashboard designed to bridge the gap between the flexibility of Google Sheets and the premium experience of a professional health application.

---

## 🌟 Core Features

### 1. Dashboard (Command Center)
- **Real-Time Data Visualization**: BMI, Target Weight, and Body Fat calculations synced directly from the user's sheet.
- **Transformation Progress Ring**: Visual percentage tracking based on "Starting" vs "Goal" weights.
- **Weekly Schedule Card**: A sleek, high-contrast grid for weekly workout planning.
- **Micro-Interactions**: Hover effects, smooth transitions, and glassmorphism styling.

### 2. Intelligent Synchronization
- **Google Sheets Integration**: Uses the OpenSheet protocol for high-speed, read-only data pulls.
- **Verification Engine**: Real-time checking of Sheet ID, permissions, and tab structure before finalizing connections.
- **Sync Control**: One-click refresh to bypass caching and pull the latest metrics.

### 3. Onboarding & UX Architecture
- **4-Step Wizard**: (Welcome → Template → Permissions → Connect) to ensure a flawless first-time experience.
- **Responsive Navigation**: Adaptive TopNavbar that scales features for mobile and desktop viewports.
- **Honest Success States**: Multi-layered circular animations confirming data integrity.

### 4. Technical Foundations
- **Firebase Core**: Secure Authentication and Firestore persistence for user-specific configurations.
- **Error Resiliency**: Custom `ErrorState` system with diagnostic feedback and troubleshooting steps.

---

## 🛠 MVP Roadmap

| **Phase** | **Focus** | **Key Milestone** |
| :--- | :--- | :--- |
| **Phase 1** | **Core Sync** | Initial Google Sheet tab fetch and table display. |
| **Phase 2** | **Persistence** | Firebase Auth + Firestore integration for user data privacy. |
| **Phase 3** | **Logic Engine** | Implementation of BMI and Progress calculation algorithms. |
| **Phase 4** | **Optimization** | Launch of the 4-step Setup Wizard and Premium UI. |
| **Phase 5** | **Polish** | Real-time verification and Mobile responsiveness. |

---

## 🏗 System Architecture

```mermaid
graph TD
    subgraph Client [Frontend - React PWA]
        UI[User Interface - TailwindCSS]
        HOOKS[useFitnessData Hook]
        API_UTIL[API Utility - axios]
    end

    subgraph Backend [Firebase Platform]
        AUTH[Firebase Authentication]
        FIRESTORE[(Firestore DB - User Config)]
    end

    subgraph Data_Pipe [Data Pipeline]
        OPEN_SHEET[OpenSheet API]
        G_SHEET[(Google Sheets - User Data)]
    end

    UI --> AUTH
    UI --> FIRESTORE
    HOOKS --> API_UTIL
    API_UTIL --> OPEN_SHEET
    OPEN_SHEET --> G_SHEET
    FIRESTORE -.->|Contains Sheet ID| HOOKS
```

---

## 📊 Entity Relationship (ER) Diagram

```mermaid
erDiagram
    USER ||--o{ FIRESTORE_CONFIG : "has"
    FIRESTORE_CONFIG {
        string uid "Primary Key"
        string sheetId "Unique Sheet Identifier"
        string name "User Display Name"
    }
    
    FIRESTORE_CONFIG ||--o{ GOOGLE_SHEET : "synchronizes with"
    
    GOOGLE_SHEET {
        string Profile "Tab: Metrics & Bio"
        string Workouts "Tab: Routine Data"
        string Goals "Tab: Target Metrics"
        string Schedule "Tab: Weekly Plan"
        string Progress "Tab: Weight Logs"
    }
```

---

## 🔄 Data Flow Diagram (DFD)

```mermaid
flowchart LR
    U((User)) -->|Input Credentials| LOGIN[Authentication]
    LOGIN -->|Success| SETUP[Setup Wizard]
    U -->|Paste Sheet ID| SETUP
    SETUP -->|Verification Fetch| API_CHK[OpenSheet API]
    API_CHK -->|Valid| DB_SAVE[Save to Firestore]
    DB_SAVE -->|Trigger Sync| MAIN[useFitnessData]
    MAIN -->|Parallel Fetch| API_PULL[Full Data Pull]
    API_PULL -->|JSON Data| UI_RND[Dashboard Renderer]
    UI_RND -->|Visual Feedback| U
```

---

## 🧪 Technical Stack
- **Framework**: React 18+ (Vite)
- **Styling**: TailwindCSS (Modern Glassmorphism)
- **State Management**: React Context + Custom Hooks
- **Icons**: Lucide React
- **Backend**: Firebase (Auth & Firestore)
- **API**: axios + OpenSheet
