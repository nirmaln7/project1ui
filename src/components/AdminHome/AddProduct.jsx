import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { addProduct } from "../../services/productServices";

export default function AddProduct({ categories }) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCatChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} variant="outlined" aria-label="add">
        <AddIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              addProduct(formJson);
              console.log(formJson);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Add Products</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            multiline
            rows={2}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="stock"
            name="stock"
            label="Stock"
            type="number"
            fullWidth
            variant="standard"
          />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="category"
            name="category"
            value={category || ""}
            label="Category"
            onChange={handleCatChange}
            variant="standard"
            fullWidth
            required
          >
            {categories.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.Name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
