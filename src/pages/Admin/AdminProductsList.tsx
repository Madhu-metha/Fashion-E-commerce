import { useEffect, useState } from "react";
import { DataGrid, type GridToolbar } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import api from "../../lib/axios"; 

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

export default function AdminProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
    });

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete product
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    // Open dialog for edit / add
    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setForm({
                name: product.name,
                category: product.category,
                price: String(product.price),
                image: product.image,
                description: product.description,
            });
        } else {
            setEditingProduct(null);
            setForm({ name: "", category: "", price: "", image: "", description: "" });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    // Save product
    const handleSave = async () => {
        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, form);
            } else {
                await api.post("/products", form);
            }
            fetchProducts();
            handleClose();
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    // Columns for table
    const columns: GridColDef[] = [
        { field: "name", headerName: "Product Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "price", headerName: "Price", flex: 0.5, renderCell: (params) => `₹${params.value}` },
        {
            field: "image",
            headerName: "Image",
            flex: 0.7,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.name}
                    className="w-12 h-12 object-cover rounded-lg border"
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.8,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <IconButton onClick={() => handleOpenDialog(params.row)}>
                        <EditIcon className="text-blue-600" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon className="text-red-600" />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <motion.div
            className="p-6 bg-gray-50 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#ec4899",
                        "&:hover": { backgroundColor: "#db2777" },
                    }}
                    onClick={() => handleOpenDialog()}
                >
                    Add Product
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
                <DataGrid
                    rows={products}
                    columns={columns}
                    getRowId={(row) => row._id}
                    loading={loading}
                    autoHeight
                    components={{ Toolbar: GridToolbar }}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5, page: 0 } },
                    }}
                />
            </div>

            {/* Add/Edit Product Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogContent className="space-y-4">
                    <TextField
                        label="Product Name"
                        fullWidth
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <TextField
                        label="Image URL"
                        fullWidth
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        {editingProduct ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </motion.div>
    );
}
