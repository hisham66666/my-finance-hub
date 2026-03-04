import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    title: '1. Problem Statement',
    content: `Managing personal finances is a common challenge for students and young professionals in Bangladesh. Many individuals lack a structured system to track their income and expenses, leading to overspending and poor financial decisions. Existing solutions are either too complex, require internet connectivity, or are not tailored to the needs of local users. This project aims to develop a simple, secure, and user-friendly Personal Finance Tracker web application to address these issues.`
  },
  {
    title: '2. Project Gap',
    content: `While several finance tracking applications exist (e.g., Mint, YNAB, Wallet), they present significant gaps for our target audience:\n• Most require paid subscriptions or premium features\n• Complex interfaces overwhelm non-technical users\n• Lack of support for Bangladeshi Taka (৳) currency\n• Over-reliance on cloud services and external APIs\n• No offline/localhost capability for academic demonstration\n\nThis project fills the gap by providing a lightweight, self-hosted, and academically demonstrable finance tracker.`
  },
  {
    title: '3. Objectives',
    content: `• To develop a secure web-based personal finance tracking system\n• To implement user authentication with session management and password hashing\n• To enable CRUD operations for income and expense records\n• To provide monthly and yearly financial summaries with visual charts\n• To design a responsive, clean, and professional user interface\n• To demonstrate software engineering principles in a real-world project`
  },
  {
    title: '4. Feasibility Study',
    content: `Technical Feasibility: The project uses widely available technologies (React, TypeScript, Tailwind CSS). All tools are open-source and free. Development can be completed within the project timeline.\n\nOperational Feasibility: The system has a simple, intuitive interface requiring minimal training. Users can start tracking finances immediately after registration.\n\nEconomic Feasibility: Zero development cost using open-source tools. No hosting fees required for localhost demonstration. Can be deployed free on platforms like Vercel or Netlify.\n\nSchedule Feasibility: The project scope is well-defined and can be completed within 8-10 weeks of development.`
  },
  {
    title: '5. Functional Requirements',
    content: `FR-01: The system shall allow users to register with name, email, and password\nFR-02: The system shall authenticate users via email and password login\nFR-03: The system shall maintain user sessions and protect routes\nFR-04: The system shall allow users to add, edit, and delete income records\nFR-05: The system shall allow users to add, edit, and delete expense records\nFR-06: The system shall categorize transactions using predefined categories\nFR-07: The system shall display a dashboard with total income, expense, and balance\nFR-08: The system shall generate monthly/yearly financial summaries\nFR-09: The system shall visualize income vs expense data using bar charts\nFR-10: The system shall provide a responsive design for mobile and desktop`
  },
  {
    title: '6. Non-Functional Requirements',
    content: `NFR-01: Security — Passwords shall be hashed; sessions shall be validated on every request\nNFR-02: Performance — Pages shall load within 2 seconds on localhost\nNFR-03: Usability — Interface shall follow Bootstrap/Tailwind design principles for consistency\nNFR-04: Reliability — Data shall persist across browser sessions using local storage (upgradeable to database)\nNFR-05: Maintainability — Code shall follow modular architecture with reusable components\nNFR-06: Portability — Application shall run on any modern web browser\nNFR-07: Scalability — Architecture shall support migration to a full database backend`
  },
  {
    title: '7. Use Case Descriptions',
    content: `Use Case 1: User Registration\n• Actor: New User\n• Precondition: User is not registered\n• Flow: User fills registration form → System validates input → System creates account → User is logged in\n• Postcondition: User account is created and session is active\n\nUse Case 2: Add Income\n• Actor: Authenticated User\n• Precondition: User is logged in\n• Flow: User clicks "Add Income" → Fills amount, category, date, description → Submits form\n• Postcondition: Income record is saved and displayed in the table\n\nUse Case 3: View Monthly Summary\n• Actor: Authenticated User\n• Precondition: User has transaction records\n• Flow: User navigates to Monthly Summary → Selects year → Views bar chart and totals\n• Postcondition: Summary data is displayed with visual representation\n\nUse Case 4: Delete Expense\n• Actor: Authenticated User\n• Precondition: Expense record exists\n• Flow: User clicks delete icon → Record is removed\n• Postcondition: Expense is permanently deleted`
  },
  {
    title: '8. Activity Flow',
    content: `Start → User visits application → [Has Account?]\n  → No → Register (name, email, password) → Account Created → Dashboard\n  → Yes → Login (email, password) → [Valid?]\n    → No → Show Error → Retry Login\n    → Yes → Dashboard\n\nDashboard → View Financial Overview (Income, Expense, Balance)\n  → Navigate to Income → Add/Edit/Delete Income Records\n  → Navigate to Expenses → Add/Edit/Delete Expense Records\n  → Navigate to Monthly Summary → Select Year → View Bar Chart\n  → Logout → Return to Login Page → End`
  },
  {
    title: '9. Test Cases',
    content: `TC-01: User Registration\n• Input: Name="John Doe", Email="john@test.com", Password="pass123"\n• Expected: Account created successfully, redirected to dashboard\n• Status: Pass\n\nTC-02: Duplicate Registration\n• Input: Same email as TC-01\n• Expected: Error "Email already registered"\n• Status: Pass\n\nTC-03: Invalid Login\n• Input: Email="wrong@test.com", Password="wrong"\n• Expected: Error "Invalid email or password"\n• Status: Pass\n\nTC-04: Add Income Record\n• Input: Amount=50000, Category="Salary", Date="2026-03-01", Description="March salary"\n• Expected: Record added to income table, total updated\n• Status: Pass\n\nTC-05: Delete Expense Record\n• Input: Click delete on existing expense\n• Expected: Record removed from table, totals recalculated\n• Status: Pass\n\nTC-06: Monthly Summary Chart\n• Input: Navigate to Monthly Summary, select 2026\n• Expected: Bar chart displays with correct income/expense data per month\n• Status: Pass`
  }
];

const DocumentationPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Project Documentation</h1>
        <p className="text-muted-foreground">Personal Finance Tracker — Daffodil International University</p>
      </div>

      <Card>
        <CardContent className="py-6 space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{section.content}</p>
              {i < sections.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPage;
