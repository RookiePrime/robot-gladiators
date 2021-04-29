var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = [
  "Roborto",
  "Amy Android",
  "Robo Trumble"
]
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyRobot) {

  while (enemyHealth > 0 && playerHealth > 0) {  
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
    if (promptFight.toLowerCase() === "skip") {
      // Confirm players wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // If yes, leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // Subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      } else {
        fight();
      }
    } else if (promptFight.toLowerCase() === "fight") {
  
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      var damageDealt = randomNumber(playerAttack - 3, playerAttack);

      enemyHealth = Math.max(0, enemyHealth - damageDealt);
    
      // Log a resulting message to the console so we know that it worked.
      console.log(
          playerName + " attacked " + enemyRobot + ". " + enemyRobot + " now has " + enemyHealth + " health remaining."
      );
    
      // Check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyRobot + " has died!");
        break;
      } else {
        window.alert(enemyRobot + " still has " + enemyHealth + " health left.");
      }
    
      // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
      var damageTaken = randomNumber(enemyAttack - 3, enemyAttack);

      playerHealth = Math.max(0, playerHealth - damageTaken);
    
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemyRobot + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );
    
      // Check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    }  else {
      window.alert("You need to choose a valid option. Refresh and try again!");
    }
  }

};

var startGame = function() {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0 ) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      var pickedEnemyName = enemyNames[i];
      enemyHealth = randomNumber(40, 60);
      fight(pickedEnemyName);

      // if we're not at the last enemy in the array, shoptime
      if (playerHealth > 0 && i < enemyNames.length - 1 ) {
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

  if (playerHealth > 0) {
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
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 points for 7 moneys.");
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
        break;
      } else {
        window.alert("You don't have enough money!");
        
        break;
      }
    case "UPGRADE":
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 points for 7 moneys.")
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
        break;
      } else {
        window.alert("You don't have enough money!");
        
        break;
      }
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
// The random values come from here
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Get da ball rollin'
startGame();