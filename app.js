function getRandomValue (min, max) {
     return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
	data() {
		return {
			monsterHealth: 100,
               playerHealth: 100,
               currentRound: 0
		};
     },
     watch: {
          currentRound (value, oldval) {
               if (value >= 3) {

               }
          }
     },
	computed: {
		monsterBarStyles() {
			return { width: this.monsterHealth + "%" };
		},
		playerBarStyles() {
			return { width: this.playerHealth + "%" };
          },
          divisible () {
               return this.currentRound % 3 !== 0
          }
	},
	methods: {
		attackMonster() {
			// if you attack, then the monster also attack
               // Attack value between 12 to 5
               this.currentRound++
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
		specialAttackMonster() {
               this.currentRound++
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
          },
          healPlayer () {
               this.currentRound++
               const healValue = getRandomValue(8, 20)
               if (this.playerHealth + healValue > 100) {
                    this.playerHealth = 100
               } else {
                    this.playerHealth += healValue
               }        
               this.attackPlayer()       
          }
	},
});
app.mount('#game')