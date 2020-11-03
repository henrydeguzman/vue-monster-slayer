function getRandomValue (min, max) {
     return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
	data() {
		return {
			monsterHealth: 100,
               playerHealth: 100,
               currentRound: 0,
               winner: null,
               logMessages: []
		};
     },
     watch: {
          playerHealth (value) {
               if (value <= 0 && this.monsterHealth <= 0) {
                    // A draw
                    this.winner = 'draw'
               } else if (value <= 0) {
                    // Player Lost
                    this.winner = 'monster'
               }
          },
          monsterHealth (value) {
               if (value <= 0 && this.playerHealth <= 0) {
                    // A draw
                    this.winner = 'draw'
               } else if (value <= 0) {
                    // Monster Lost
                    this.winner = 'player'
               }
          }
     },
	computed: {
          hasWinner() {
               return this.winner !== null
          },
		monsterBarStyles() {
               if (this.monsterHealth < 0) {
                    return { width: '0%' }
               }
			return { width: this.monsterHealth + "%" };
		},
		playerBarStyles() {
               if (this.playerHealth < 0) {
                    return { width: '0%' }
               }
			return { width: this.playerHealth + "%" };
          },
          divisible () {
               return this.currentRound % 3 !== 0
          }
	},
	methods: {
          newGame(){
               this.playerHealth = 100;
               this.monsterHealth = 100;
               this.winner = null;
               this.currentRound = 0;
               this.logMessages = [];
          },
		attackMonster() {
			// if you attack, then the monster also attack
               // Attack value between 12 to 5
               this.currentRound++
			const attackValue = getRandomValue(12, 5);
               this.monsterHealth -= attackValue;
               this.addLogMessage('player', 'attack', attackValue)
			// monster attack back
               this.attackPlayer();               
		},
		attackPlayer() {
			// Attack value between 15 - 8
               const attackValue = getRandomValue(15, 8);               
               this.playerHealth -= attackValue;
               this.addLogMessage("monster", "attack", attackValue);
		},
		specialAttackMonster() {
               this.currentRound++
			const attackValue = getRandomValue(10, 25);
               this.monsterHealth -= attackValue;
               this.addLogMessage("player", "attack", attackValue);
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
               this.addLogMessage("player", "heal", healValue);
               this.attackPlayer()       
          },
          surrender () {
               this.winner = 'monster'
          },
          addLogMessage (who, what, value) {
               this.logMessages.unshift({
                    actionBy: who,
                    actionType: what,
                    actionValue: value
               })
          }
	},
});
app.mount('#game')