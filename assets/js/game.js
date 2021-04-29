// The random values come from here
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 moneys");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
}

const enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
    health: randomNumber(40, 60),
  },
  {
    name: "Amy Android",
    attack: randomNumber(11, 15),
    health: randomNumber(40, 60)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(12, 16),
    health: randomNumber(40, 60)
  }
]

const resetEnemies = () => {
  for (let i = 0; i < enemyInfo.length; i++) {
    enemyInfo[i].health = randomNumber(40, 60);
  }
}

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var fight = function(enemy) {

  while (enemy.health > 0 && playerInfo.health > 0) {  
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
    if (promptFight.toLowerCase() === "skip") {
      // Confirm players wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // If yes, leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // Subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("Money:", playerInfo.money);
        break;
      } else {
        fight();
      }
    } else if (promptFight.toLowerCase() === "fight") {
  
      //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy` variable
      var damageDealt = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damageDealt);
    
      // Log a resulting message to the console so we know that it worked.
      console.log(
          playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
    
      // Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
    
      // Subtract the value of `enemyAttack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
      var damageTaken = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damageTaken);
    
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );
    
      // Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }  else {
      window.alert("You need to choose a valid option. Refresh and try again!");
    }
  }

};

var startGame = function() {
  //reset player stats
  playerInfo.reset();
  resetEnemies();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0 ) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      var pickedEnemy = enemyInfo[i];

      fight(pickedEnemy);

      // if we're not at the last enemy in the array, shoptime
      if (playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
        // ask if they wanna shop
        var storeConfirm = window.confirm("The fight is over. Wanna visit the store before the next round?");

        // If yes, store!
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  endGame();
}

var endGame = function() {

  if (playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

var shop = function() {
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  switch(shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");

      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      shop();
      break;
  }
}

// Get da ball rollin'
startGame();