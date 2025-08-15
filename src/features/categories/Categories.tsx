import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  Category,
} from "./categoriesSlice";
import { deleteCategory } from "./categoriesSlice";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category>>({
    name: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenAdd = () => {
    setEditingCategory({ name: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteCategory(id));
  };

  const handleSave = async () => {
    if (editingCategory.id) {
      await dispatch(updateCategory(editingCategory));
    } else {
      await dispatch(addCategory(editingCategory));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Categories</h1>
      <Button variant="contained" onClick={handleOpenAdd}>
        Add Category
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((cat: Category) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  <span
                    style={{
                      display: "inline-block",
                      width: 24,
                      height: 24,
                      backgroundColor: cat.color,
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      verticalAlign: "middle",
                      marginRight: 8,
                    }}
                    title={cat.color}
                  />
                </TableCell>
                <TableCell>{cat.defaultNws}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEdit(cat)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cat.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>
          {editingCategory.id ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editingCategory.name || ""}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
            fullWidth
            autoFocus
          />
          <TextField
            label="Color"
            type="color"
            value={editingCategory.color || "#000000"}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, color: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="defaultNws-label">Default</InputLabel>
            <Select
              labelId="defaultNws-label"
              value={editingCategory.defaultNws || ""}
              label="Default NWS"
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  defaultNws: e.target.value as "need" | "want" | "savings",
                })
              }
            >
              <MenuItem value="need">Need</MenuItem>
              <MenuItem value="want">Want</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
