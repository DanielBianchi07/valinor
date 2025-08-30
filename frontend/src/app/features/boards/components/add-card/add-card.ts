import { Component, inject } from '@angular/core';
import { IBoard, ICard, ICreateBoard } from '../../../../shared/models/board.model';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CardService } from '../../../../shared/services/card.service';

@Component({
  selector: 'app-add-card',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-card.html',
  styleUrl: './add-card.scss'
})
export class AddCard {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly cardService = inject(CardService);
  data = inject(MAT_DIALOG_DATA);

  addCardForm = this.fb.group({
    order: this.fb.control(this.data.swimlane.cards.length),
    boardId: this.fb.control(this.data.boardId),
    swimlaneId: this.fb.control(this.data.swimlane.id),
    name: this.fb.control(this.data.card?.name, [Validators.required]),
    content: this.fb.control(this.data.card?.content, [Validators.required]),
  });

  createOrEditCard() {
    if(this.addCardForm.invalid) return;

    if(this.data.card?.id) {
      this._updateCard();
    } else {
      this._createCard();
    }
  }

  private _createCard() {
    this.cardService
    .createCard(this.addCardForm.value as Partial<ICard>)
    .subscribe((card: ICard) => {
      this.dialogRef.close(card);
    });
  }

  private _updateCard() {
    this.cardService
    .updateCard(this.data.card?.id, this.addCardForm.value as Partial<ICard>)
    .subscribe((card: ICard) => {
      this.dialogRef.close(card);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
