<template lang="">
	<header>
		<nav>
			<h1><router-link to="/">Find a Coach</router-link></h1>
			<ul>
				<li><router-link to="/coaches">All Coaches</router-link></li>
				<li v-if="isLoggedIn">
					<router-link to="/requests">Requests</router-link>
				</li>
				<li v-else>
					<router-link to="/auth">Login</router-link>
				</li>
				<li v-if="isLoggedIn">
					<base-button @click="logout">Logout</base-button>
				</li>
			</ul>
		</nav>
	</header>
</template>
<script>
export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch("logout");
			this.$router.replace("/coaches");
		},
	},
};
</script>
<style scoped>
header {
	color: var(--white-2);

	max-width: var(--max-width);
	margin-top: 1.2rem;
}

header nav {
	background: var(--purple-2);
	box-shadow: 0.8rem 0.8rem var(--purple-1);
	border-radius: 1.2rem;
	padding: 1.2rem;

	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 {
	font-family: var(--font-display);
	font-size: 2rem;
}

#brand-title {
	color: var(--white-2);
	font-weight: normal;
	padding: 1rem;
}

a:active,
a:hover {
	color: var(--pink-1);
	background-color: var(--purple-3);
	border-color: var(--purple-3);
	padding: 0.5rem 1rem;
	border-radius: 8px;
}

a.router-link-active {
	color: var(--pink-1);
	background-color: var(--purple-3);
	padding: 0.5rem 1rem;
	border-radius: 8px;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
	border-color: transparent;
	color: inherit;
	background: none;
}

header ul {
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
}

@media only screen and (max-width: 600px) {
	header a,
	logout-btn {
		padding: 0.5em;
		font-size: 0.9em;
	}
	li {
		margin: 0 0.2rem;
	}
}
</style>
