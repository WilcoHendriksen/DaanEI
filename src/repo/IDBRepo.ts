import { IDBPDatabase, openDB, deleteDB } from "idb"

const databaseName = "DaanEI_db"
const databaseVersion = 1

/**
 * Creates a object store
 * @param db The IndexedDB
 * @param store The name of the store to create
 * @param key The key to identify values
 */
async function createStore(
  db: IDBPDatabase,
  store: string,
  key: string | string[]
) {
  const objectStore = db.createObjectStore(store, {
    keyPath: key
  })
  objectStore.createIndex("key", key, { unique: true })
  if (store === "order") {
    objectStore.createIndex("date", "date", { unique: false })
  }
}

/**
 * creates or opens an indexedDB database
 * @returns an open indexedDB database
 */
export async function createOrOpenDatabase() {
  return await openDB(databaseName, databaseVersion, {
    upgrade: (db) => {
      createStore(db, "customer", "name")
      createStore(db, "deliverDate", "date")
      createStore(db, "order", ["date", "name"])
    }
  })
}

/**
 * deletes the created indexedDB database
 */
export async function recreatedDB() {
  await deleteDB(databaseName)
  await createOrOpenDatabase()
}
