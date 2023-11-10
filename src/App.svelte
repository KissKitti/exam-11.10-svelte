<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import { z } from "zod";
  import Client from "./Client.svelte"; 

  const PetSchema = z.object({
    id: z.number(),
    name: z.string(),
    isVaccinated: z.boolean(),
  });

  const ClientSchema = z.object({
    id: z.number(),
    name: z.string(),
    pets: z.array(PetSchema),
  });

  let searchTerm = "";
  let clients: string | any[] = [];
  let loading = false;

  const handleSearchClick = async () => {
    loading = true;

    try {
      const response = await axios.get(
        "/api/vet/clients?search=WHAT-THE-USER-WROTE"
      );
      clients = ClientSchema.parse(response.data);
    } catch (error) {
      console.error("Couldn't fetch");
    } finally {
      loading = false;
    }
  };
</script>

<div>
  <h1>Veterinarian admin - clients</h1>
  <input
    type="text"
    placeholder="Enter at least 3 characters"
    bind:value={searchTerm}
  />
  <button disabled={searchTerm.length < 3} on:click={handleSearchClick}>Search</button>

  {#if loading}
    <p>Loading...</p>
  {:else if clients.length > 0}
  {#each clients as client}
  <Client {client} />
{/each}

    <p>No clients were found</p>
  {/if}
</div>

<style>
</style>
