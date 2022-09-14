import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plain-plain',
  template: `
    <p>
      plain works!
    </p>
  `,
  styles: [
  ]
})
export class PlainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
