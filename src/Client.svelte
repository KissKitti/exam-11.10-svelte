<script lang="ts">
import { onMount } from "svelte";
  import axios from "axios";
  import { z } from "zod";

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

  export let client;

  const Pet = ({pet}) => {
    const handleToggleVaccination = async () => {
        try {
            PetSchema.parse(pet);

            const response = await axios.post('/api/vet/pets', {
                name: pet.name, isVaccinated: !pet.isVaccinated,
            });

            PetSchema.parse(response.data);

            pet.isVaccinated = response.data.isVaccinated;
        } catch (error) {
            console.error('Error')
        }
    }
  }

const petsWithLoading = client.pets.map((pet) => ({
    ...pet,
loading: false,
}))

onMount(() => {

})

</script>

<div>
    <h2>{client.name}</h2>

    {#each petsWithLoading as pet (pet.id)}

    <div>
        <span>{pet.name}</span>
        {#if pet.loading}
        <p>Loading...</p>
        {:else}
        <button on:click={handleToggleVaccination}>
        {pet.isVaccinated ? 'Vaccinated' : 'Not vaccinated'}
    </button>
    {/if}
    </div>
{/each}
</div>