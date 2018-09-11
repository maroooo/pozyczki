/*
 * Model danych przedmiotu.
 *
*/

export interface Item {
    id: string;
    uid: string;
    name: string;
    state: string;
    category: string;
    person: string;
    startDate: any;
    endDate: any;
    comment: string;
    image: string;
}
