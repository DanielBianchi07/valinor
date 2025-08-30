export class ReorderSwimlaneDto {
    boardId: number
    item: ReorderSwimlaneItemDto[]
}
export class ReorderSwimlaneItemDto {
    id: number;
    order: number;
}