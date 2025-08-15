import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectChangeEvent } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchExpenses, addExpense, deleteExpense } from "./expensesSlice";
import { fetchCategories } from "../categories/categoriesSlice";

const Expenses: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((state) => state.expenses);
  const categoriesList = useAppSelector((state) => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    currencyCode: "USD",
    categoryId: "",
    startDate: "",
    endDate: "",
    frequency: "",
    interval: "1",
    nws: "",
    isActive: true,
    note: "",
  });
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addExpense({
        title: form.title,
        amount: Number(form.amount),
        currencyCode: form.currencyCode,
        categoryId: form.categoryId,
        startDate: form.startDate,
        endDate: form.endDate,
        frequency: form.frequency,
        interval: Number(form.interval),
        nws: form.nws,
        isActive: form.isActive,
        note: form.note,
      }),
    );
    setIsModalOpen(false);
    setForm({
      title: "",
      amount: "",
      currencyCode: "USD",
      categoryId: "",
      startDate: "",
      endDate: "",
      frequency: "",
      interval: "1",
      nws: "",
      isActive: true,
      note: "",
    });
  };

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setForm({
      title: expense.title,
      amount: expense.amount,
      currencyCode: expense.currencyCode,
      categoryId: expense.categoryId,
      startDate: expense.startDate,
      endDate: expense.endDate,
      frequency: expense.frequency,
      interval: String(expense.interval),
      nws: expense.nws,
      isActive: expense.isActive,
      note: expense.note,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div>
      <h1>Expenses</h1>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add Expense
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>NWS</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.currencyCode}</TableCell>
              <TableCell>
                <Chip
                  label={expense.Category.name}
                  style={{
                    backgroundColor: expense.Category.color,
                    color: "#000",
                    fontWeight: 500,
                  }}
                />
              </TableCell>
              <TableCell>{expense.startDate}</TableCell>
              <TableCell>{expense.endDate}</TableCell>
              <TableCell>{expense.frequency}</TableCell>
              <TableCell>{expense.interval}</TableCell>
              <TableCell>{expense.nws}</TableCell>
              <TableCell>{expense.isActive ? "Yes" : "No"}</TableCell>
              <TableCell>{expense.note}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(expense)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <form id="add-expense-form" onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <input
              name="currencyCode"
              value={form.currencyCode}
              onChange={handleChange}
              placeholder="Currency"
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <FormControl fullWidth style={{ marginBottom: 8 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="categoryId"
                value={form.categoryId}
                label="Category"
                onChange={handleSelectChange}
                required
              >
                {categoriesList.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              placeholder="Start Date"
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              placeholder="End Date"
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <FormControl fullWidth style={{ marginBottom: 8 }}>
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                labelId="frequency-label"
                name="frequency"
                value={form.frequency}
                label="Frequency"
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="one_time">One Time</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
            <input
              name="interval"
              value={form.interval}
              onChange={handleChange}
              placeholder="Interval"
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
            <FormControl fullWidth style={{ marginBottom: 8 }}>
              <InputLabel id="nws-label">NWS</InputLabel>
              <Select
                labelId="nws-label"
                name="nws"
                value={form.nws}
                label="NWS"
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="need">Need</MenuItem>
                <MenuItem value="want">Want</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
              </Select>
            </FormControl>
            <label style={{ display: "block", marginBottom: 8 }}>
              <input
                name="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={handleChange}
              />
              Active
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Note"
              style={{ display: "block", marginBottom: 8, width: "100%" }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          <Button type="submit" form="add-expense-form" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Expenses;
