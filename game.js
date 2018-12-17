// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;
var currentLives = 2;
var lose = false;
// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
 
  createItem(175, 130, 'coin');
  
  createItem(125, 50, 'star');
  createItem(650, 230, 'coin');
  createItem(50, 230, 'coin');
  createItem(275, 400, 'coin');
  createItem(600, 400, 'coin');
  createItem(500, 500, 'coin');
  createItem(600, 550, 'coin');
  createItem(370, 500, 'poison');
  createItem(100, 375, 'poison');


}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 150, 'platform');
  platforms.create(90, 180, 'platform2');
  platforms.create(300, 350, 'platform');
  platforms.create(150, 450, 'platform2');
  platforms.create(50, 550, 'platform');
  platforms.create(600, 280, 'platform');
  platforms.create(650, 500, 'platform');
  platforms.create(500, 450, 'platform2');
  platforms.create(1, 300, 'platform');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}



// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
 item.kill();
 
  if(item.key==='poison'){
    currentScore = currentScore -5; 
  }
  else if(item.key==='coin'){
    currentScore = currentScore + 10;
	}
  else if(item.key==='star'){
    currentScore = currentScore + 20;
  }
  if (currentScore === winningScore) {
      createBadge();
  }
  if (currentScore <= -5){
  --currentLives;
  }
   if (currentLives === 0){
    lose = true;
  }
 }

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    //Load spritesheets
    game.load.spritesheet('player', 'Bence3.png', 50, 71);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
	game.load.spritesheet('poison', 'poison.png', 32, 32);
	game.load.spritesheet('poisonPurple', 'poisonPurple.png', 32, 32);
	game.load.spritesheet('star', 'star.png' , 32,32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
   textLives = game.add.text(680, 16, "Lives: " + currentLives, { font: "bold 24px Arial", fill: "white" });
   winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
	textLives.text = "LIVES: " + currentLives;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
	  
    }
	 else if (lose) {
      winningMessage.text = "YOU LOSE!!! :(";
    }
	
  }

  function render() {

  }

  
};
