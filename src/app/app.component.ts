import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 public boardChess : string[][];
 private currentPosition = { row: 6, col: 4 };
 public board: string[][] = [];
 public image = 'assets/img/chess.svg';
 public x: number = 0;
 public y: number = 0;
 public direction: string = 'NORTH';
 public color: string = 'White';
 public place: boolean = false;
 public firstMove: boolean = true;
 private directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];

  constructor() {
    this.boardChess = this.createBoard();
    this.board = this.createBoardWithPieces();
  }

  createBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(''));
    const pieces: string[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        pieces.push(`${i},${j}`);
        board[i][j] = pieces[i * 8 + j];
      }
    }
    return board;
  }

  createBoardWithPieces() {
    const board = this.createBoard();
    for (let i = 0; i < 8; i++) {
      board[0][i] = '';
      board[1][i] = '';
      board[2][i] = '';
      board[3][i] = '';
      board[4][i] = '';
      board[5][i] = '';
      board[6][i] = '';
      board[7][i] = '';
    }
    return board;
  }

  onReport() {
    alert(this.y + ', ' + this.x + ', '+ this.direction +', '+ this.color);
  }

  placePiece() {
    alert('This action will reset the pawn and logs, Are you sure want to continue?');
    this.place = false;
    this.x = 0;
    this.y = 0;
    this.firstMove = true;
    this.board[this.currentPosition.row][this.currentPosition.col] = '';
    this.board = this.createBoardWithPieces();
  }

  movePawn() {
    switch (this.direction) {
      case 'NORTH':
        if (this.y > 0) this.y--;
        break;
      case 'SOUTH':
        if (this.y < 7) this.y++;
        break;
      case 'EAST':
        if (this.x < 7) this.x++;
        break;
      case 'WEST':
        if (this.x > 0) this.x--;
        break;
    }
    this.board = Array(8).fill(null).map(() => Array(8).fill('')); 
    this.board[this.y][this.x] = this.image;
  }

  moveTwo() {
    if (this.firstMove) {
      if (this.direction === 'NORTH' && this.y > 1) {
        this.board[this.y][this.x] = ''; 
        this.y -= 2; 
        this.board[this.y][this.x] = this.image;
      }
      else if (this.direction === 'SOUTH' && this.y < 6) {
        this.board[this.y][this.x] = ''; 
        this.y += 2; 
        this.board[this.y][this.x] = this.image; 
      }
      this.firstMove = false; 
    }
  }

  leftButton() {
    let currentIndex = this.directions.indexOf(this.direction);
    this.direction = this.directions[(currentIndex - 1 + 4) % 4];
    this.updateRobotIcon();
  }

  rightButton() {
    let currentIndex = this.directions.indexOf(this.direction);
    this.direction = this.directions[(currentIndex + 1) % 4];
    this.updateRobotIcon();
  }
  
  placeRobot() {
    if (this.x >= 0 && this.x <= 7 && this.y >= 0 && this.y <= 7) {
      this.place = true;
      this.currentPosition = { row: this.y, col: this.x };
      this.board[this.y][this.x] = this.image;
      this.updateRobotIcon();
    }
  }

  updateRobotIcon() {
    let icon: any;
    switch (this.direction) {
      case 'NORTH':
        icon = 'assets/img/left.svg'; 
        break;
      case 'SOUTH':
        icon = 'assets/img/right.svg'; 
        break;
      case 'EAST':
        icon = 'assets/img/down.svg';
        break;
      case 'WEST':
        icon = 'assets/img/up.svg'; 
        break;
    }
    this.board[this.y][this.x] = icon;
   }
}
