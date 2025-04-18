import { motion } from "framer-motion";

const OrdersTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">Your orders will appear here</p>
    </div>
  </motion.div>
);

export default OrdersTab;