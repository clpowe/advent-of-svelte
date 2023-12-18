<script >
import Fuse from 'fuse.js'
import ThumbsUp from '$lib/components/thumbsUp.svelte'
import ThumbsDown from '$lib/components/thumbsDown.svelte'



export let data

/**
 * @typedef {Object} Child
 * @property {string} name - The name of the child.
 * @property {number} tally - The tally count for the child.
 * @property {string} id - The unique identifier for the child.
 */

/** @type {Child[]} */
let children = [];
/** @type {string} */
let search = '';
/** @type {string} */
let name = '';
/** @type {number} */
let tally = 0;
/** @type {string} */
let active = '';

children = data.children


/**
 * Adds a new child to the children array.
 * @param {Event} e - The event object.
 */
 function addChild(e) {
    e.preventDefault();
    const child = {
        name,
        tally,
        id: crypto.randomUUID()
    };
    
    name = '';
    tally = 0;
    children = children;
	fuse.add(child)
}


const options ={
	includeScore: false,
	threshold: .2,
	keys: ['name','tally']
}

const fuse = new Fuse(children,options)

$: results = fuse.search(search)



function log(){
	console.log(results)
}

</script>

<svelte:head>
	<title>Day 1: Naught or Nice</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section class="text-column content-grid bg-brand-r500 gap-12">
	<h1 class="text-4xl uppercase font-italic w-full text-center"> <span class="text-r500 font-black ">Naughty</span> or <span class="text-g500 font-bold">Nice</span></h1>
	
	<form on:submit={addChild} class="mx-auto">
		<label for="name">
	Name
		<input bind:value={name} type="text" class="rounded-full ">
		</label>
		<label for="tally">
			Tally
		<input bind:value={tally}  type="number" class="rounded-full ">
		</label>
		<button>Add Child</button>
	</form>

	<form  class="mx-auto" on:submit={log} >
		<label for="search" placeholder="search">
	Search
		<input bind:value={search} type="text" class="rounded-full ">
		</label>
		
	</form>
	
	{#await children}
		<p>waiting for the promise to resolve...</p>
	{:then value}
	{#if results.length > 0}
	<ul class="w-full">
		{#each results as child (child.item.id)}
		<li class="flex flex-col w-full place-content-center p-4 grid-flow-dense rounded-xl gap-4" 
			class:full={active == child.item.id}
			class:bg-g500={child.item.tally > 0} 
			class:bg-r500={child.item.tally <= 0}>
			<div class="flex">	
		<p class="text-xl text-white w-full" >
			{child.item.name}
		</p>
		{#if active == child.item.id}
		<button class="text-white bg-transparent" on:click={()=> active = ''}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"/></svg>
			<div class="i-vscode-icons:file-type-light-pnpm" />
		</button>
		{/if}
			</div>
	
		{#if child.item.id != active}
			<button class="grid grid-cols-2 bg-transparent content-center items-center" on:click={()=> active = child.item.id}>
				<p class="text-xl font-bold text-white place-self-start">
					{child.item.tally}
				</p>
				{#if child.item.tally > 0}
					<ThumbsUp/>
				{:else}
					<ThumbsDown/>
				{/if}
			</button>
		{:else}
			<div class="grid grid-cols-7 items-center justify-content-center">
				<button class="p-2 rounded-l-lg col-span-2 "  on:click={()=> child.item.tally--}>-</button>
				<div class="p-2 bg-white w-full text-center col-span-3">
					{child.item.tally}
				</div>
				<button class="p-2  rounded-r-lg col-span-2" on:click={()=> child.item.tally++}>+</button>
			</div>
			{/if}
		</li>
		{/each}
	</ul> 
	{:else}
	<ul class="w-full">
		{#each value as child (child.id)}
		<li class="flex flex-col w-full place-content-center p-4 grid-flow-dense rounded-xl gap-4" 
			class:full={active == child.id}
			class:bg-g500={child.tally > 0} 
			class:bg-r500={child.tally <= 0}>
			<div class="flex">	
		<p class="text-xl text-white w-full" >
			{child.name}
		</p>
		{#if active == child.id}
		<button class="text-white bg-transparent" on:click={()=> active = ''}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.9 2.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l2.9-2.9l-2.9-2.875q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.9 2.9l2.875-2.9q.275-.275.7-.275t.7.275q.3.3.3.713t-.3.687L13.375 12l2.9 2.9q.275.275.275.7t-.275.7q-.3.3-.712.3t-.688-.3z"/></svg>
			<div class="i-vscode-icons:file-type-light-pnpm" />
		</button>
		{/if}
			</div>
	
		{#if child.id != active}
			<button class="grid grid-cols-2 bg-transparent content-center items-center" on:click={()=> active = child.id}>
				<p class="text-xl font-bold text-white place-self-start">
					{child.tally}
				</p>
				{#if child.tally > 0}
					<ThumbsUp/>
				{:else}
					<ThumbsDown/>
				{/if}
			</button>
		{:else}
			<div class="grid grid-cols-7 items-center justify-content-center">
				<button class="p-2 rounded-l-lg col-span-2 "  on:click={()=> child.tally--}>-</button>
				<div class="p-2 bg-white w-full text-center col-span-3">
					{child.tally}
				</div>
				<button class="p-2  rounded-r-lg col-span-2" on:click={()=> child.tally++}>+</button>
			</div>
			{/if}
		</li>
		{/each}
	</ul> 
	{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}



</section>

<style>
ul {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
	gap: 1rem;
	grid-auto-flow: dense;
}


</style>