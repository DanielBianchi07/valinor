import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard, ICreateBoard } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  http = inject(HttpClient);

  createCard(_createCard: Partial<ICard>): Observable<ICard> {
    return this.http.post<ICard>('/api/card', _createCard);
  }

  updateCard(id: number, _updateCard: Partial<ICard>): Observable<ICard> {
    return this.http.patch<ICard>(`/api/card/${id}`, _updateCard);
  }

  deleteCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`/api/card/${cardId}`);
  }

  getCard(): Observable<ICard[]> {
    return this.http.get<ICard[]>('/api/card');
  }

  getCardById(id: number): Observable<ICard> {
    return this.http.get<ICard>(`/api/card/${id}`);
  }

  updateCardOrdersAndSwimlanes(boardId: number, cards: ICard[]): Observable<ICard[]> {
    return this.http.put<ICard[]>('/api/card/update-order', {
      boardId,
      cards,
    });
  }
}
