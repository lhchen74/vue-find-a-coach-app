<template>
	<base-card>
		<li>
			<h3>{{ fullName }}</h3>
			<h4>${{ rate }}/hour</h4>
			<div>
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:title="area"
				>
				</base-badge>
			</div>
			<div class="actions">
				<base-button mode="flat" link :to="coachContactLink"
					>Contact</base-button
				>
				<base-button link :to="coachDetailsLink"
					>ViewDetails</base-button
				>
			</div>
		</li>
	</base-card>
</template>

<script>
export default {
	props: ["id", "firstName", "lastName", "rate", "areas"],
	computed: {
		fullName() {
			return this.firstName + " " + this.lastName;
		},

		coachContactLink() {
			return this.$route.path + "/" + this.id + "/contact"; // /coaches/c1/contact
		},

		coachDetailsLink() {
			return this.$route.path + "/" + this.id; // /coaches/c1/
		},
	},
};
</script>

<style scoped>
.card:hover {
	border-color: var(--purple-2);
	box-shadow: 1rem 1rem var(--purple-1);
}

li {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.4em;
}

h3 {
	font-size: 2.4rem;
	color: var(--purple-2);
	font-family: var(--font-display);
	font-weight: normal;
}

.actions {
	margin-top: auto;
	padding-top: 1.6rem;
	display: flex;
	justify-content: flex-end;
	gap: 1.6rem;
}
</style>
