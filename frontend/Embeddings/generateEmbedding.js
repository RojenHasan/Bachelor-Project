import { pipeline, env } from "@xenova/transformers";

env.useBrowserCache = false;

const pipe = await pipeline("feature-extraction", "Supabase/gte-small");

export const generateEmbedding = async (type, price, description) => {
  const numericPrice = parseInt(price, 10);

  const text = `${type} ${numericPrice} ${description}`;

  const output = await pipe(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};
