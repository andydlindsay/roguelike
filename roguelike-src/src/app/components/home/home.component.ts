import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, SimulationNodeDatum, SimulationLinkDatum, ForceLink } from 'd3-ng2-service';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { legendColor } from 'd3-svg-legend';
// import * as topojson from 'topojson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  private d3: D3;
  dungeon: any;

  // hero object
  hero = {
    'healthMax': 20,
    'health': 20,
    'level': 1,
    'weapon': 'Dagger',
    'weaponLevel': 0,
    'maxDamage': 5,
    'currentNode': 70,
    'xp': 0,
    'nextLevelXp': 100
  }

  // weapon array
  weapons = [
    'Dagger',
    'Short Sword',
    'Long Sword',
    'Great Axe',
    'Halberd'
  ];

  // messages array
  messages = [
    'Good luck, adventurer.',
    'Zoom the map with the mouse scroll wheel.',
    'Find better weapons and health potions throughout the dungeon.',
    'Level up by defeating enemies.',
    'Beat the boss to beat the game.',
    'Use the arrow keys to move around.',
    'Welcome to the game.'
  ];

  // game difficulty
  gameDifficulty = 1.25;

  constructor(
    d3Service: D3Service,
    private titleService: Title,
    private data: DataService
  ) {
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    // title the page
    this.titleService.setTitle('Roguelike - FCC');

    let okay = true;

    // retrieve gameboard
    this.dungeon = this.data.getDungeon();
    // confirm that dungeon is valid
    if (this.dungeon.nodes.length != this.dungeon.width * this.dungeon.height) {
      console.error('Dungeon level is not valid.');
      okay = false;
    }

    // draw
    if (okay) {
      this.drawRoguelike();
    }

  }

  drawRoguelike() {
    // alias d3
    const d3 = this.d3;

    // setup svg component
    const width = 886,
          height = 736,
          padding = 60,
          internalPadding = 20;

    // alias this.dungeon.nodes
    const nodes = this.dungeon.nodes;
    const dungeonWidth = this.dungeon.width;
    let hero = this.hero;
    let messages = this.messages;
    let playing = true;
    let visionRadius = 3;

    // get fov for fog of war
    // generates an array of visible nodes based on hero position
    function getFov(heroNode, visionRadius, dungeonWidth) {
      let returnArray = [];
      returnArray.push(heroNode);
      for (let i = 0; i <= visionRadius; i++) {
        for (let j = 0; j <= visionRadius - i; j++) {
          if (i > 0) {
            // rows above and below the heroNode
            if (j > 0) {
              // coloumns left and right of heroNode
              if (j < dungeonWidth - (heroNode % dungeonWidth)) {
                returnArray.push(heroNode + i * dungeonWidth + j);
                returnArray.push(heroNode - i * dungeonWidth + j);
              }
              
              if (j <= heroNode % dungeonWidth) {
                returnArray.push(heroNode + i * dungeonWidth - j);              
                returnArray.push(heroNode - i * dungeonWidth - j);
              }
            } else {
              // same column as heroNode
              returnArray.push(heroNode + i * dungeonWidth);
              returnArray.push(heroNode - i * dungeonWidth);
            }
          } else {
            // same row as the heroNode
            if (j > 0) {
              if (j < dungeonWidth - (heroNode % dungeonWidth)) {
                returnArray.push(heroNode + j);
              }

              if (j <= heroNode % dungeonWidth) {
                returnArray.push(heroNode - j);
              }
            }
          }
        }
      }
      return returnArray;
    }

    // append svg component
    // zoom based on Sebastian Gruhier's post
    // https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
    const svg = d3.select("#playarea")
      .append("svg")
      .attr("class", "svg")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().on('zoom', () => {
        svg.attr('transform', d3.event.transform);
      }))
      .append('g')
      .attr('class', 'main')
      .attr('width', width)
      .attr('height', height);

    // tooltip
    const div = d3.select('#playarea')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // add row and column info to this.dungeon
    for (let i = 0; i < this.dungeon.height; i++) {
      for (let j = 0; j < this.dungeon.width; j++) {
        this.dungeon.nodes[(i * this.dungeon.width) + j].row = i;
        this.dungeon.nodes[(i * this.dungeon.width) + j].col = j;
      }
    }

    // randomly place pickups throughout the dungeon
    let placedItems = 0;
    const maxItems = Math.round(this.dungeon.width / 2.7);
    while (placedItems < maxItems) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height - 1);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        let itemToPlace = getRandom(1, 3);
        if (itemToPlace <= 2) {
          this.dungeon.nodes[selectedNode]['type'] = 'h';
        } else {
          this.dungeon.nodes[selectedNode]['type'] = 'u';
        }
        placedItems += 1;
      }
    }

    // randomly place enemies throughout the dungeon
    let placedEnemies = 0;
    const maxEnemies = Math.round(this.dungeon.width / 1.8);
    while (placedEnemies < maxEnemies) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height - 1);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'e';
        this.dungeon.nodes[selectedNode]['hp'] = Math.round(10 * this.gameDifficulty);
        placedEnemies += 1;
      }
    }

    // randomly place the boss in the dungeon
    let bossPlaced = false;
    while (!bossPlaced) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height - 1);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'b';
        this.dungeon.nodes[selectedNode]['hp'] = Math.round(40 * this.gameDifficulty);
        bossPlaced = true;
      }
    }

    // randomly place the hero in the dungeon
    let heroPlaced = false;
    while (!heroPlaced) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height - 1);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'p';
        heroPlaced = true;
        this.hero.currentNode = selectedNode;
      }
    }

    // positions of play area
    const playareaWidth = Math.round(width - (2 * internalPadding));
    const playareaHeight = Math.round(height - (2 * internalPadding));
    const playareaXZero = 0 + internalPadding;
    const playareaYZero = 0 + (internalPadding * 2);

    // size of play area rects
    const playareaRectWidth = playareaWidth / this.dungeon.width;
    const playareaRectHeight = playareaHeight / this.dungeon.height;

    svg.append('g')
      .attr('class', 'playarea')
      .selectAll('rect')
      .filter('.playarea-node')
      .data(this.dungeon.nodes)
      .enter()
      .append('rect')
      .attr('class', (d) => {
        if (d['type'] == 'h') {
          return 'playarea-node hero';
        } else {
        return 'playarea-node';
        }
      })
      .attr('x', (d) => playareaXZero + (d['col'] * playareaRectWidth))
      .attr('y', (d) => playareaYZero + (d['row'] * playareaRectHeight))
      .attr('width', playareaRectWidth)
      .attr('height', playareaRectHeight)
      .attr('fill', (d, i) => {
        const fovArray = getFov(hero.currentNode, visionRadius, dungeonWidth);
        if (fovArray.indexOf(i) != -1) {
          if (d['type'] == 'w') {
            return '#766951';
          } else if (d['type'] == 'f') {
            return '#D7C7AD';
          } else if (d['type'] == 'p') {
            return 'blue';
          } else if (d['type'] == 'e') {
            return 'red';
          } else if (d['type'] == 'h') {
            return 'green';
          } else if (d['type'] == 'u') {
            return 'yellow';
          } else if (d['type'] == 'b') {
            return 'purple';
          } else {
            return 'none';
          }
        } else {
          return 'none';
        }
      });

    // legend
    const ordinal = d3.scaleOrdinal()
      .domain(['Adventurer', 'Monster', 'Boss', 'Health Potion', 'Weapon Upgrade'])
      .range(['blue', 'red', 'purple', 'green', 'yellow']);

    const legend = d3.select('#legend')
      .append('svg')
      .attr('height', '100px');

    legend.append('g')
      .attr('class', 'legendQuant')
      .attr('transform', 'translate(0,0)');

    const colorLegend = legendColor()
      .shapeWidth(20)
      .orient('vertical')
      .scale(ordinal);

    legend.select('.legendQuant')
      .call(colorLegend);

    // enemy damage
    const maxEnemyDamage = Math.round(8 * this.gameDifficulty);
    const maxBossDamage = Math.round(12 * this.gameDifficulty);

    // movement in nodes
    d3.select('body')
      .on('keydown', () => {

        let destinationNode;
        if (d3.event.keyCode == 37) {
          // console.log('left');
          destinationNode = this.hero.currentNode - 1;
        } else if (d3.event.keyCode == 38) {
          // console.log('up');
          destinationNode = this.hero.currentNode - this.dungeon.width;
        } else if (d3.event.keyCode == 39) {
          // console.log('right');
          destinationNode = this.hero.currentNode + 1;
        } else if (d3.event.keyCode == 40) {
          // console.log('down');
          destinationNode = this.hero.currentNode + this.dungeon.width;
        }

        if (playing) {
          if (destinationNode != undefined) {
            const nodeType = this.dungeon.nodes[destinationNode]['type'];
            if (nodeType == 'w') {
              this.messages.push('Ouch! You hit the wall!');
            } else if (nodeType == 'b') {
              // fight the boss
              let playerDamageDealt = getRandom(Math.floor(0.5 * this.hero.maxDamage), this.hero.maxDamage);
              this.dungeon.nodes[destinationNode]['hp'] -= playerDamageDealt;
              this.messages.push('You smite the boss for ' + playerDamageDealt + ' points of damage.');
              if (this.dungeon.nodes[destinationNode]['hp'] <= 0) {
                this.messages.push('Excellent work, brave adventurer.');
                this.messages.push('You have defeated the boss and beaten the game!');
                playing = false;
                // move into the destination node
                this.dungeon.nodes[destinationNode]['type'] = 'p';
                this.dungeon.nodes[this.hero.currentNode]['type'] = 'f';
                this.hero.currentNode = destinationNode;
                // update the graph
                updateData();
              } else {
                // boss strikes player
                let bossDamageDealt = getRandom(Math.floor(maxBossDamage * 0.5), maxBossDamage);
                this.hero.health -= bossDamageDealt;
                this.messages.push('The boss smashes you for ' + bossDamageDealt + ' points of damage.');
                if (this.hero.health <= 0) {
                  this.hero.health = 0;
                  this.messages.push('Better luck next time. Press F5 to try again.');
                  this.messages.push('You\'ve died. Game over.');
                  playing = false;
                }
              }
            } else if (nodeType == 'e') {
              // fight the enemy
              let playerDamageDealt = getRandom(Math.floor(0.5 * this.hero.maxDamage), this.hero.maxDamage);
              this.dungeon.nodes[destinationNode]['hp'] -= playerDamageDealt;
              this.messages.push('You dealt ' + playerDamageDealt + ' points of damage to the monster.');
              if (this.dungeon.nodes[destinationNode]['hp'] <= 0) {
                this.messages.push('You defeated your foe!');
                this.hero.xp += 50;
                hasLevelledUp();
                // move into the destination node
                this.dungeon.nodes[destinationNode]['type'] = 'p';
                this.dungeon.nodes[this.hero.currentNode]['type'] = 'f';
                this.hero.currentNode = destinationNode;
                // update the graph
                updateData();
              } else {
                // enemy strikes player
                let enemyDamageDealt = getRandom(Math.floor(maxEnemyDamage * 0.5), maxEnemyDamage);
                this.hero.health -= enemyDamageDealt;
                this.messages.push('The monster hits you and does ' + enemyDamageDealt + ' points of damage.');
                if (this.hero.health <= 0) {
                  this.hero.health = 0;
                  this.messages.push('Better luck next time. Press F5 to try again.');
                  this.messages.push('You\'ve died. Game over.');
                  playing = false;
                }
              }
            } else {
              // console.log('nodeType:', nodeType);
              if (nodeType == 'h') {
                // this.messages.push('That\'s a health pickup.');
                const currHealth = this.hero.health;
                this.hero.health += 20;
                if (this.hero.health > this.hero.healthMax) {
                  this.hero.health = this.hero.healthMax;
                }
                const healthRestored = this.hero.health - currHealth;
                this.messages.push('The health potion restored ' + String(healthRestored) + ' hit points.');

              } else if (nodeType == 'n') {
                this.messages.push('Something went seriously wrong.');
              } else if (nodeType == 'u') {
                // this.messages.push('That\'s a weapon upgrade.');
                this.hero.weaponLevel += 1;
                if (this.hero.weaponLevel >= this.weapons.length) {
                  this.hero.weapon = 'Enchanted ' + this.weapons[this.hero.weaponLevel % this.weapons.length];
                } else {
                  this.hero.weapon = this.weapons[this.hero.weaponLevel];
                }
                this.hero.maxDamage += 2;
                this.messages.push('You\'ve found a ' + this.hero.weapon + '!');
              }

              // move into the destination node
              this.dungeon.nodes[destinationNode]['type'] = 'p';
              this.dungeon.nodes[this.hero.currentNode]['type'] = 'f';
              this.hero.currentNode = destinationNode;
              // update the graph
              updateData();
            }
          }
        }
        
      });

      function getRandom(minNum, maxNum) {
        return Math.floor((Math.random() * (maxNum - minNum + 1)) + minNum);
      }

      function hasLevelledUp() {
        if (hero.xp >= hero.nextLevelXp) {
          levelUp();
        }
      }

      function levelUp() {
        // increase max health and current health
        hero.healthMax += 10;
        hero.health += 10;
        // set next level xp
        hero.nextLevelXp += 100 * hero.level;
        // increase level
        hero.level += 1;
        // increase max damage
        hero.maxDamage += 2;
        // alert player to level up
        messages.push('Your maximum health is now ' + String(hero.healthMax) + '.');
        messages.push('Congratulations! You\'ve levelled up!');
        // this.messages.push('Your maximum damage is now ' + String(this.hero.maxDamage) + '.');
      }

      function updateData() {

        svg.select('.playarea').exit().remove();

        // svg.append('g')
        d3.select('g')
        .filter('.main')
        .append('g')
        .attr('class', 'playarea')
        .selectAll('rect')
        .filter('.playarea-node')
        .data(nodes)
        .enter()
        .append('rect')
        .attr('class', (d) => {
          if (d['type'] == 'h') {
            return 'playarea-node hero';
          } else {
          return 'playarea-node';
          }
        })
        .attr('x', (d) => playareaXZero + (d['col'] * playareaRectWidth))
        .attr('y', (d) => playareaYZero + (d['row'] * playareaRectHeight))
        .attr('width', playareaRectWidth)
        .attr('height', playareaRectHeight)
        .attr('fill', (d, i) => {
          const fovArray = getFov(hero.currentNode, visionRadius, dungeonWidth);
          if (fovArray.indexOf(i) != -1) {
            if (d['type'] == 'w') {
              return '#766951';
            } else if (d['type'] == 'f') {
              return '#D7C7AD';
            } else if (d['type'] == 'p') {
              return 'blue';
            } else if (d['type'] == 'e') {
              return 'red';
            } else if (d['type'] == 'h') {
              return 'green';
            } else if (d['type'] == 'u') {
              return 'yellow';
            } else if (d['type'] == 'b') {
              return 'purple';
            } else {
              return 'none';
            }
          } else {
            return 'none';
          }
        });

      }

  }

}
