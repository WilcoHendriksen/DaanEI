import { createOrOpenDatabase } from "./IDBRepo"

/**
 * Gets all items from the given store
 * @param store Name of the store
 * @returns list of the given StoreType
 */
async function readCustomers(): Promise<Customer[]> {
  const db = await createOrOpenDatabase()
  let items = await db.getAll("customer")
  let retVal: Customer[] = []
  items.forEach((item) => {
    retVal.push(item)
  })
  db.close()
  return retVal
}

/**
 * Create all items and saves all items to the store
 * @param store Name of the store
 * @param customer list of the given StoreType
 */
async function createCustomer(customer: Customer): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.put("customer", customer)
  db.close()
}

/**
 * Delete an item from the given store with the given key
 * @param store Name of the store
 * @param key Key value
 */
async function deleteCustomer(name: string): Promise<void> {
  const db = await createOrOpenDatabase()
  await db.delete("customer", name)
  db.close()
}

export { readCustomers, createCustomer, deleteCustomer }
