import { Component, OnInit } from '@angular/core';
import { D3Service, D3, Selection, SimulationNodeDatum, SimulationLinkDatum, ForceLink } from 'd3-ng2-service';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { legendColor } from 'd3-svg-legend';
import * as topojson from 'topojson';

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
    'maxDamage': 4,
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
    'Find better weapons and health potions throughout the dungeon.',
    'Level up by defeating enemies.',
    'Beat the boss to beat the game.',
    'Use the arrow keys to move around.',
    'Welcome to the game.'
  ];

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

    console.log(this.dungeon.nodes[this.hero.currentNode]);

    // alias this.dungeon.nodes
    const nodes = this.dungeon.nodes;

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
    const maxItems = 5;
    while (placedItems < maxItems) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height);
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
    const maxEnemies = 7;
    while (placedEnemies < maxEnemies) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'e';
        this.dungeon.nodes[selectedNode]['hp'] = 8;
        placedEnemies += 1;
      }
    }

    // randomly place the boss in the dungeon
    let bossPlaced = false;
    while (!bossPlaced) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'b';
        this.dungeon.nodes[selectedNode]['hp'] = 36;
        bossPlaced = true;
      }
    }

    // randomly place the hero in the dungeon
    let heroPlaced = false;
    while (!heroPlaced) {
      let selectedNode = getRandom(0, this.dungeon.width * this.dungeon.height);
      if (this.dungeon.nodes[selectedNode]['type'] == 'f') {
        this.dungeon.nodes[selectedNode]['type'] = 'p';
        heroPlaced = true;
        this.hero.currentNode = selectedNode;
      }
    }

    console.log('dungeon:', this.dungeon);

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
      .attr('fill', (d) => {
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
      });

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

        if (destinationNode != undefined) {
          if (this.dungeon.nodes[destinationNode]['type'] == 'w') {
            this.messages.push('Ouch! You hit the wall!');
          } else {
            // console.log('That\'s a valid move!');
            const nodeType = this.dungeon.nodes[destinationNode]['type'];
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

            } else if (nodeType == 'e') {
              this.messages.push('It\'s go time!');
              // fight the enemy

            } else if (nodeType == 'b') {
              this.messages.push('You\'ve found the boss!');
              // fight the boss

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
        
      });

      function getRandom(minNum, maxNum) {
        return Math.floor((Math.random() * maxNum) + minNum);
      }

      function hasLevelledUp() {
        if (this.hero.xp >= this.hero.nextLevelXp) {
          levelUp();
        }
      }

      function levelUp() {
        
        // increase max health
        this.hero.healthMax += 10;
        // set next level xp
        this.hero.nextLevelXp += 100 * this.hero.level;
        // increase level
        this.hero.level += 1;
        // increase max damage
        this.hero.maxDamage += 2;
        // alert player to level up
        this.messages.push('Congratulations! You\'ve levelled up!');
        this.messages.push('Your maximum health is now ' + String(this.hero.healthMax) + '.');
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
        .attr('fill', (d) => {
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
        });

      }

  }

}
