import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateBoard, IBoard, ICreateSwimlane, ISwimlane } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class SwimlanesService {
  http = inject(HttpClient);

  createSwimlane(_createSwimlane: ICreateSwimlane): Observable<ISwimlane> {
    return this.http.post<ISwimlane>('/api/swimlane', _createSwimlane);
  }

  updateSwimlane(id: number, _updateBoard: ICreateBoard): Observable<ISwimlane> {
    return this.http.patch<ISwimlane>(`/api/swimlane/${id}`, _updateBoard);
  }

  deleteSwimlane(swimlaneId: number): Observable<void> {
    return this.http.delete<void>(`/api/swimlane/${swimlaneId}`);
  }

  getSwimlanes(): Observable<ISwimlane[]> {
    return this.http.get<ISwimlane[]>('/api/swimlane');
  }

  getSwimlaneById(id: number): Observable<ISwimlane> {
    return this.http.get<ISwimlane>(`/api/swimlane/${id}`);
  }
}
