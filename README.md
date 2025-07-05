# Personal Finance Visualizer (Stage 1: Basic Transaction Tracking)

## Live URL
Deployed on Vercel : https://personal-finance-app-nine.vercel.app/

## Project Overview

This is the first stage of the Personal Finance Visualizer, a simple web application designed to help users track and visualize their personal financial transactions. This stage focuses on core transaction management functionalities and a basic graphical representation of monthly expenses.

## Features Implemented (Stage 1)

* **Add Transaction**: Users can input a transaction's amount, date, and description.
* **Edit Transaction**: Existing transactions can be modified.
* **Delete Transaction**: Transactions can be removed from the record.
* **Transaction List View**: All transactions are displayed in a clear, sortable list.
* **Monthly Expenses Bar Chart**: A visual representation of total expenses per month, powered by Recharts.
* **Responsive Design**: The application is designed to be usable across various screen sizes.
* **Basic Form Validation**: Client-side validation for transaction inputs.
* **Toasts/Notifications**: User feedback for actions like adding, updating, or deleting transactions.

## Technologies Used

* **Frontend**:
    * [Next.js](https://nextjs.org/) (App Router) - React framework for production
    * [React](https://react.dev/) - UI library
    * [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components
    * [Recharts](https://recharts.org/) - Charting library for data visualization
    * [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
    * [react-hook-form](https://react-hook-form.com/) - For flexible forms with validation
    * [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library
    * [Sonner](https://sonner.emilkowalski.dk/) - A delightful toast library for React
    * [@radix-ui/react-icons](https://icons.radix-ui.com/) - Icons for UI actions
* **Backend & Database**:
    * [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (App Router) - For handling API requests.
    * [MongoDB](https://www.mongodb.com/) - NoSQL database for storing transaction data.
    * [Mongoose](https://mongoosejs.com/) - MongoDB object data modeling (ODM) for Node.js.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (LTS recommended)
* npm or Yarn
* A MongoDB database (local or cloud-based like MongoDB Atlas).

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd personal-finance-visualizer
npm i
```
