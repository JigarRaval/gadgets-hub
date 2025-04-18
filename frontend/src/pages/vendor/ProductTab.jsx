import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductsTab = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate("/vendor/add-product")} // Update this path to match your route
        >
          Add New Product
        </motion.button>
      </div>
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">Your products will appear here</p>
      </div>
    </motion.div>
  );
};

export default ProductsTab;