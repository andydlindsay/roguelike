import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  getDungeon() {
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
          { 'type': 'e' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'n' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'e' },
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
          { 'type': 'u' },
          { 'type': 'f' },
          { 'type': 'h' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'e' },
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
          { 'type': 'p' },
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
          { 'type': 'e' },
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
          { 'type': 'e' },
          { 'type': 'f' },
          { 'type': 'w' },

          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'h' },
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
          { 'type': 'e' },
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
          { 'type': 'h' },
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
          { 'type': 'u' },
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
          { 'type': 'e' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'f' },
          { 'type': 'w' },
          { 'type': 'w' },
          { 'type': 'f' },
          { 'type': 'b' },
          { 'type': 'f' },
          { 'type': 'e' },
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
          { 'type': 'u' },
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
      }
    ];

    const randomNumber = 1;
    return levels[randomNumber];
  }

}
