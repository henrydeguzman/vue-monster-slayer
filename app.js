function getRandomValue (min, max) {
     return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
	data() {
		return {
			monsterHealth: 100,
			playerHealth: 100,
		};
	},
	computed: {
		monsterBarStyles() {
			return { width: this.monsterHealth + "%" };
		},
		playerBarStyles() {
			return { width: this.playerHealth + "%" };
		},
	},
	methods: {
		attackMonster() {
			// if you attack, then the monster also attack
			// Attack value between 12 to 5
			const attackValue = getRandomValue(12, 5);
			this.monsterHealth -= attackValue;
			console.log("monster: " + this.playerHealth);
			// monster attack back
			this.attackPlayer();
		},
		attackPlayer() {
			// Attack value between 15 - 8
			const attackValue = getRandomValue(15, 8);
			this.playerHealth -= attackValue;
			console.log("player: " + this.playerHealth);
		},
	},
});
app.mount('#game')