import functions from 'firebase-functions';
import { pipeline, env } from "@xenova/transformers";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndngjaaaerzazmukqwxe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmdqYWFhZXJ6YXptdWtxd3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTg4NjE4NiwiZXhwIjoyMDMxNDYyMTg2fQ.V16C1_qlQzpM4o61Yq0k0o1NHEPVyNzre-NYB-0vRIM';

const supabase = createClient(supabaseUrl, supabaseKey);

env.useBrowserCache = false;

const generateEmbedding = async (type, price, description) => {
  const numericPrice = parseInt(price, 10);
  const text = `${type} ${numericPrice} ${description}`;
  const pipe = await pipeline("feature-extraction", "Supabase/gte-small");
  const output = await pipe(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data);
};

const onNewFurniture = functions.firestore
  .document("furniture/{furnitureId}")
  .onCreate(async (snap, context) => {
    const furniture = snap.data();
    const { id, type, price, description } = furniture;

    try {
      const embedding = await generateEmbedding(type, price, description);
      await supabase.from("furniture").update({ embedding }).eq("id", id);
      console.log(`Embedding for furniture id ${id} added successfully.`);
    } catch (error) {
      console.error(`Error generating embedding for furniture id ${id}:`, error);
    }
  });

export { onNewFurniture };
