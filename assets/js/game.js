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
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      } else {
        fight();
      }
    } else if (promptFight.toLowerCase() === "fight") {
  
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      enemyHealth = enemyHealth - playerAttack;
    
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
      playerHealth = playerHealth - enemyAttack;
    
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

for (var i = 0; i < enemyNames.length; i++) {
  var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}