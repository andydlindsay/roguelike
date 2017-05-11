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
  dataset: any;
  meteors: any;

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

    this.data.getJson().subscribe(
      data => {
        if (data) {
          this.dataset = data;
          // console.log(data);
          this.data.getMeteor().subscribe(
            data => {
              if (data) {
                this.meteors = data.features;
                // console.log(data);
                this.drawRoguelike();
              }
            }
          );
        }
      }
    );

  }

  drawRoguelike() {
    // alias d3
    const d3 = this.d3;

    // setup svg component
    const width = 1312,
          height = 756,
          padding = 50;

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

    



  }

}
