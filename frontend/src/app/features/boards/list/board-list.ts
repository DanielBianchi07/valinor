import { Component, inject, OnInit } from '@angular/core';
import { BoardService } from '../../../shared/services/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBoard } from '../components/add-board/add-board';
import { IBoard } from '../../../shared/models/board.model';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './board-list.html',
  styleUrl: './board-list.scss'
})
export class BoardList implements OnInit {
  private readonly boardService = inject(BoardService);
  private readonly dialog = inject(MatDialog);
  refetch = new Subject<void>();
  boards = toSignal(
    this.refetch.asObservable()
    .pipe(
      switchMap(() => this.boardService.getBoards())
    )
  );

  ngOnInit(): void {
    this.refetch.next();
  }

  openNewBoardFlow(board?: IBoard) {
    this.dialog
    .open(AddBoard, {
      width: '400px',
      data: {
        board
      }
    })
    .afterClosed()
    .subscribe((board: IBoard) => {
      board && this.refetch.next();
    });
  }

  deleteBoard(board: IBoard) {
    this.boardService.deleteBoard(board.id).subscribe(() => {
      this.refetch.next();
    });
  }
}

