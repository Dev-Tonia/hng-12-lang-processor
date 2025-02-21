import { openDB } from "idb";
import { GetMessage } from "../providers/DataProvider";

// Initialize IndexedDB
const dbPromise = openDB("chatDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("chatSessions")) {
      db.createObjectStore("chatSessions", { keyPath: "id" });
    }
  },
});

// Export functions to interact with the database
export const saveChatSession = async (chatSession: GetMessage) => {
  const db = await dbPromise;
  await db.put("chatSessions", chatSession);
};

export const getChatSession = async (id: string) => {
  const db = await dbPromise;
  return await db.get("chatSessions", id);
};

export const getAllChatSessions = async () => {
  const db = await dbPromise;
  return await db.getAll("chatSessions");
};
