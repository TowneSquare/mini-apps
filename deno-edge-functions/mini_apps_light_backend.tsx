import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.5.0'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

console.log("Hello from Query!")



const router = new Router();


// Add the new '/set' endpoint
router.get("/set", async (context) => {
  // Parse parameters from the query string
  const queryParams = context.request.url.searchParams;
  const appName = queryParams.get('app_name');
  const key = queryParams.get('key');
  const value = queryParams.get('value');

  // Check if all required parameters are provided
  if (!appName || !key || !value) {
      context.response.status = 400;
      context.response.body = "Missing required query parameters: app_name, key, or value";
      return;
  }

  // Initialize Supabase client
  const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Attempt to insert the new record into the database
  const { data, error } = await supabase
      .from('townsquare_mint_app')
      .insert([
          { app_name: appName, key: key, value: value }
      ]);

  if (error) {
      console.error('Error inserting data:', error);
      context.response.status = 500;
      context.response.body = { error: "Failed to insert data" };
      return;
  }

  // Respond with success if the data is inserted correctly
  context.response.body = { result: "Data inserted successfully", data: data };
})
  .get("/", async (context) => {
    // * get value by the key and app name.
    // TODO: impl the param parser of get/post in the scaffold-aptos.
    // 1. parse params in get req.
    const queryParams = context.request.url.searchParams;
    const appName = queryParams.get('app_name');
    const key = queryParams.get('key');

    // 2. parse params in post req.
    // let content = await context.request.body.text();
    // content = JSON.parse(content);
    // const uuid = content.uuid;

    const supabase = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      // { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    // Ensure both app_name and key are provided
    if (!appName || !key) {
      context.response.status = 400;
      context.response.body = "Missing required query parameters: app_name or key";
      return;
    }

    // Querying data from Supabase
    const { data, error } = await supabase
      .from('townsquare_mint_app')
      .select('*')
      .eq('app_name', appName)
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error fetching data:', error);
      context.response.status = 500;
      context.response.body = "Failed to fetch data";
      return;
    }

    context.response.body = data;
})
.get("/reset", async (context) => {
    // * get value by the key and app name.
    // 1. parse params in get req.
    const queryParams = context.request.url.searchParams;
    const bloodTotal = queryParams.get('blood');

      // Initialize Supabase client
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
  
    // Update the 'blood' field in the database where app_name is "battle"
    const { data, error } = await supabase
        .from('townsquare_mint_app')
        .update({ value: bloodTotal })
        .eq('app_name', 'battle_game')
        .eq('key', 'blood');

    if (error) {
        console.error('Error updating data:', error);
        context.response.status = 500;
        context.response.body = { error: "Failed to update data" };
        return;
    }

    context.response.body = {"result": "reset success!"};
})
.get("/blood_reduce", async (context) => {

  const queryParams = context.request.url.searchParams;
  const reduceNum = queryParams.get('count');

  // Initialize Supabase client
  const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // First, retrieve the current value of 'blood'
  const { data: getCurrent, error: getError } = await supabase
      .from('townsquare_mint_app')
      .select('value')
      .eq('app_name', 'battle_game')
      .eq('key', 'blood')
      .single(); // Assuming 'blood' key is unique per 'app_name'

  if (getError || !getCurrent) {
      console.error('Error fetching current blood value:', getError);
      context.response.status = 500;
      context.response.body = { error: "Failed to fetch current blood value" };
      return;
  }

  // Convert the current blood value from string to integer and reduce it by 1
  const currentBloodValue = parseInt(getCurrent.value, 10);
  const newBloodValue = currentBloodValue - reduceNum;

  // Now update the 'blood' value in the database
  const { data: updateData, error: updateError } = await supabase
      .from('townsquare_mint_app')
      .update({ value: newBloodValue.toString() }) // converting it back to string if necessary
      .eq('app_name', 'battle_game')
      .eq('key', 'blood');

  if (updateError) {
      console.error('Error updating blood value:', updateError);
      context.response.status = 500;
      context.response.body = { error: "Failed to update blood value" };
      return;
  }

  context.response.body = { "blood_now": newBloodValue.toString() };
});


const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8000");

await app.listen({ port: 8000 });