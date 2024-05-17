import { supabase } from "./supabase.js";
import { generateEmbedding } from "./generateEmbedding.js";
const getFurnitures = () => {
  return supabase.from("furniture").select("*").is("embedding", null);
};

const addFurnitureEmbedding = async (furniture) => {
  const embedding = await generateEmbedding(furniture.type, furniture.price);
  await supabase.from("furniture").update({ embedding }).eq("id", furniture.id);
};

const processAllFurnitures = async () => {
  const { data: furniture } = await getFurnitures();
  console.log(furniture.length);
  if (!furniture?.length) {
    return;
  }

  await Promise.all(furniture.map(addFurnitureEmbedding));
  processAllFurnitures();
};

processAllFurnitures();
