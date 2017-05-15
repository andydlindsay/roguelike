import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  getDungeon() {
    const levelString = 'nwwwwwnwwwwwwwwwwwwwwnnnnnwwwww'
                      + 'wwfffwwwffffffffwwffwnwwwnwfffw'
                      + 'wfffffwwfffwwwffffffwwwfwwwwffw'
                      + 'wfffffwwwwwwwwwfwwwwwffffwwwfww'
                      + 'wwwffwwnwwffffffwwwwffwffwwffwn'
                      + 'nwffwwnwwffwwwffwffffwwwfwfffwn'
                      + 'nwfffwwwffwwwfffffwwwwwffffwwwn'
                      + 'nwwwffwfffwwwfwwwffwwwwwfffffww'
                      + 'nnwwfffffffwffwwffffffwwwfffffw'
                      + 'nwwffwfffffffwwffffffffwwwffffw'
                      + 'nwfffwwffffwwwfffffwwwffwwwfffw'
                      + 'nwffwwwwfwwwwfffffwwnwfffwfffww'
                      + 'nwffwwwffwnnwfffwfwwwwwwfwffwwn'
                      + 'nwffffwfwwwwwwfwwfwwfwwwfffwwnn'
                      + 'nwffwfffwnwffffwffwffffffwffwnn'
                      + 'nwffwwwwwnwfwwwwffffwwffwwffwnn'
                      + 'nwwffffwnnwffwwwwwwffwwwwffwwnn'
                      + 'nnwwwwfwnnwwffffwwwwffffffwwwww'
                      + 'nnwwwffwwwwwwfwffwwwffffffffffw'
                      + 'nnwfffwwffffffwfffwwwwffffwwffw'
                      + 'nnwfwwwffwfwwwwfwffwwwffffwwwww'
                      + 'nwwffwwfwwffwwwwwwfwwffffwwwnnn'
                      + 'wwffffwfwwwfffffwffwwffwfffwwnn'
                      + 'wffffwwffwwwffwfffwwwwfwwffwwnn'
                      + 'wwfffwwwffwwwffffwwwwffwwwffwww'
                      + 'nwffwwnwwffwfffffffwwfwwwwwfffw'
                      + 'nwfffwwwffffffwwfffwffffffwwffw'
                      + 'nwwfffwwffwwwffffffwffffffwwwfw'
                      + 'nnwwfffffwwnwwfffffwwwfffwwwffw'
                      + 'nnnwwwwwwwnnnwwwwwwwnwwwwwnwwww';

    const levelArray = [];
    for (let i = 0; i < levelString.length; i++) {
      levelArray.push({ 'type': levelString[i]});
    }

    const levels = [
      {
        'name': 'First Try',
        'type': 'experimental',
        'width': 8,
        'height': 8,
        'nodes': [
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' }

        ]
      },
      {
        'name': 'Slightly Larger',
        'type': 'experimental',
        'width': 16,
        'height': 16,
        'nodes': [
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },

          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' },
          { 'type': 'n' }

        ]
      },
      {
        'name': 'Production Ready',
        'type': 'production',
        'width': 31,
        'height': 30,
        'nodes': levelArray
      }
    ];

    const randomNumber = 2;
    return levels[randomNumber];
  }

}
