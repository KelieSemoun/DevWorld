import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButton, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  start() {
    alert('Commencez par lire le README et à vous de jouer !');
  }
}
