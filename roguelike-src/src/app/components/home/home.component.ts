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
    const width = 1312,
          height = 756,
          padding = 60,
          internalPadding = 20;

    // hero object
    let hero = {
      'health': 20,
      'level': 1,
      'weapon': 'Dagger',
      'maxDamage': 4,
      'currentNode': 70
    }
    console.log(this.dungeon.nodes[hero.currentNode]);

    const nodes = this.dungeon.nodes;

    // append svg component
    // zoom based on Sebastian Gruhier's post
    // https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
    const svg = d3.select("#svg")
      .append("svg")
      .attr("class", "svg")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().on('zoom', () => {
        svg.attr('transform', d3.event.transform);
      }))
      .append('g');

    // tooltip
    const div = d3.select('#svg')
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
    console.log('dungeon:', this.dungeon);

    // positions of play area
    const playareaWidth = Math.round(width / 2 - (2 * internalPadding));
    const playareaHeight = Math.round(height * 0.8 - (2 * internalPadding));
    const playareaXZero = 0 + internalPadding;
    const playareaYZero = height - playareaHeight - (internalPadding * 2);

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
          destinationNode = hero.currentNode - 1;
        } else if (d3.event.keyCode == 38) {
          // console.log('up');
          destinationNode = hero.currentNode - this.dungeon.width;
        } else if (d3.event.keyCode == 39) {
          // console.log('right');
          destinationNode = hero.currentNode + 1;
        } else if (d3.event.keyCode == 40) {
          // console.log('down');
          destinationNode = hero.currentNode + this.dungeon.width;
        }

        if (destinationNode != undefined) {
          if (this.dungeon.nodes[destinationNode]['type'] == 'w') {
            console.log('Ouch! You hit the wall!');
          } else {
            // console.log('That\'s a valid move!');
            const nodeType = this.dungeon.nodes[destinationNode]['type'];
            // console.log('nodeType:', nodeType);
            if (nodeType == 'h') {
              console.log('That\'s a health pickup.');
            } else if (nodeType == 'e') {
              console.log('It\'s go time!');
            } else if (nodeType == 'b') {
              console.log('You\'ve found the boss!');
            } else if (nodeType == 'n') {
              console.log('Something went seriously wrong.');
            } else if (nodeType == 'u') {
              console.log('That\'s a weapon upgrade.');
            }
            this.dungeon.nodes[destinationNode]['type'] = 'p';
            this.dungeon.nodes[hero.currentNode]['type'] = 'f';
            hero.currentNode = destinationNode;
            updateData();
          }
        }
        
      });

      function updateData() {
        // console.log('updateData has been called');

        svg.select('.playarea').exit().remove();

        svg.append('g')
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
