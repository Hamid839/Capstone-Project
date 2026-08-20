// Compatibility re-export. The canonical mock data module is lib/mock/customers.ts —
// this file exists so `@/lib/mock-data` imports (used by the customer creation
// flow) resolve to the same shared data instead of duplicating it.
export {
  MOCK_CUSTOMERS,
  MOCK_TRANSACTIONS,
  getCustomerBalance,
  addCustomer,
} from "@/lib/mock/customers";
