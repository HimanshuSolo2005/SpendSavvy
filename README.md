# Personal Finance Visualizer (Stage 2: Categories & Dashboard)

**Live URL:**  
Deployed on Vercel: [https://personal-finance-app-nine.vercel.app/](https://personal-finance-app-nine.vercel.app/)

---

## Project Overview
This is the second stage of the Personal Finance Visualizer, a web application designed to help users track and visualize their personal financial transactions.  
This stage builds upon the core transaction management by introducing categorization, enhanced data visualization, and a dashboard overview.

---

## Features Implemented

### Stage 1: Basic Transaction Tracking
- **Add Transaction:** Users can input a transaction's amount, date, and description.
- **Edit Transaction:** Existing transactions can be modified.
- **Delete Transaction:** Transactions can be removed from the record.
- **Transaction List View:** All transactions are displayed in a clear, sortable list.
- **Monthly Expenses Bar Chart:** A visual representation of total expenses per month, powered by Recharts.
- **Responsive Design:** The application is designed to be usable across various screen sizes.
- **Basic Form Validation:** Client-side validation for transaction inputs.
- **Toasts/Notifications:** User feedback for actions like adding, updating, or deleting transactions.

### Stage 2: Categories & Dashboard Enhancements
- **Transaction Categories:** Transactions now include a category field.
- **Predefined Categories:** A consistent list of categories (e.g., Food, Transport, Utilities) is available for selection.
- **Category Selection in Form:** The transaction form includes a dropdown for easy category assignment.
- **Category-wise Pie Chart:** A new chart visualizes the distribution of expenses across different categories using Recharts.
- **Dashboard Overview:** A dedicated section providing quick insights:
  - **Total Expenses Card:** Displays the sum of all recorded transactions.
  - **Most Recent Transactions Card:** Shows a summary list of the latest transactions.

---

## Technologies Used

### Frontend
- **Next.js (App Router):** React framework for production
- **React:** UI library
- **shadcn/ui:** Reusable UI components (Button, Input, Form, Dialog, Table, Calendar, Textarea, Select, Card)
- **Recharts:** Charting library for data visualization (BarChart, PieChart)
- **date-fns:** Modern JavaScript date utility library
- **react-hook-form:** For flexible forms with validation
- **Zod:** TypeScript-first schema declaration and validation library
- **Sonner:** A delightful toast library for React
- **@radix-ui/react-icons:** Icons for UI actions (Pencil, Trash, Calendar)
- **lucide-react:** A beautiful icon library for React (DollarSign, List)

### Backend & Database
- **Next.js API Routes (App Router):** For handling API requests
- **MongoDB:** NoSQL database for storing transaction data
- **Mongoose:** MongoDB object data modeling (ODM) for Node.js

---

## Getting Started

Follow these instructions to set up and run the project locally.

---

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** or **Yarn**
- A **MongoDB database** (local or cloud-based like MongoDB Atlas)

---

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd personal-finance-visualizer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
```php-template
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
```
*** Replace <username>, <password>, <cluster-url>, and <database-name> with your actual MongoDB credentials and details. ***

### 4.  Run the Development Server
```bash
npm run dev
```

## Project Structure (Relevant for Stage 2)
personal-finance-visualizer/
├── app/
│   ├── api/
│   │   ├── transactions/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts         
│   │   │   └── route.ts              
│   ├── layout.tsx                   
│   └── page.tsx                     
├── components/
│   ├── ui/                           
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx                  
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx                
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   └── ... (other shadcn/ui components)
│   ├── CategoryPieChart.tsx         
│   ├── MonthlyExpensesChart.tsx   
│   ├── SummaryCards.tsx
│   ├── TransactionForm.tsx         
│   └── TransactionList.tsx           
├── lib/
│   ├── dbConnect.ts  
│   └── sharedTypes.ts              
├── models/
│   └── Transaction.ts                
├── public/                           
├── .env.local                   
├── .gitignore                       
├── package.json
├── tsconfig.json
└── README.md                     


## Next Steps (Future Stage)
*** Stage 3: Budgeting***

- Implement features to:
- Set monthly category budgets
- Compare budget vs. actual spending
- Provide simple spending insights
