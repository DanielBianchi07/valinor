import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, ICreateBoard } from '../models/board.model';

export interface IReorderSwimlaneDto {
    boardId: number
    item: IReorderSwimlaneItemDto[]
}
export interface IReorderSwimlaneItemDto {
    id: number;
    order: number;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  http = inject(HttpClient);

  createBoard(_createBoard: ICreateBoard): Observable<IBoard> {
    return this.http.post<IBoard>('/api/board', _createBoard);
  }

  updateBoard(id: number, _updateBoard: ICreateBoard): Observable<IBoard> {
    return this.http.patch<IBoard>(`/api/board/${id}`, _updateBoard);
  }

  deleteBoard(id: number): Observable<void> {
    return this.http.delete<void>(`/api/board/${id}`);
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('/api/board');
  }

  getBoardById(id: number): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/board/${id}`);
  }

  updateSwimlaneOrder(reorder: IReorderSwimlaneDto): Observable<void> {
    return this.http.put<void>('/api/swimlane/update-order', reorder)
  }
}
