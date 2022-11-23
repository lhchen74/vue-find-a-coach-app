<template>
	<section class="row">
		<base-card class="card" mode="shadow">
			<h2>💀 Page not found 💀</h2>
			<p>
				Maybe check out all our
				<router-link to="/coaches">coaches</router-link>
			</p>
		</base-card>
	</section>
</template>

<style scoped>
section {
	margin-top: 3.2rem;
}

h2 {
	text-align: center;
	font-family: var(--font-display);
	font-weight: normal;
	margin-bottom: 2rem;
}
</style>
