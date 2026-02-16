import { randomUUID } from "crypto";

export const pets = [
    {
      id: randomUUID(),
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      type: "Dog"
    },
    {
      id: randomUUID(),
      name: "Tobi",
      breed: "Labrador",
      age: 2,
      type: "Dog",
    }

];
