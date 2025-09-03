import { Expense } from "../types/expense";


const mockExpenses: Expense[] = [
  { id: 'E001', description: 'Ink purchase', amount: 150.00, category: 'Raw Materials', date: '2023-01-05' },
  { id: 'E002', description: 'Electricity bill', amount: 75.00, category: 'Electricity', date: '2023-01-10' },
  { id: 'E003', description: 'Employee Salary', amount: 1200.00, category: 'Salaries', date: '2023-01-20' },
];

export const expensesService = {
  async getExpenses(): Promise<Expense[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExpenses;
  },

  async getExpenseById(id: string): Promise<Expense | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockExpenses.find(expense => expense.id === id);
  },

  async createExpense(newExpense: Omit<Expense, 'id'>): Promise<Expense> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const expense: Expense = { ...newExpense, id: `E00${mockExpenses.length + 1}` };
    mockExpenses.push(expense);
    return expense;
  },
};