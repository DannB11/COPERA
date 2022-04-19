export default class Album {
    id!: number;
    title!: string;
    artist!: string;
    date!: Date;
    price!: number;

    constructor(id: number, title: string, artist: string, date: Date, price: number) { 
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.price = price;
     }  
}