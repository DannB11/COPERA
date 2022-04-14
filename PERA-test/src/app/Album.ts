export default class Album {
    id!: string;
    title!: string;
    artist!: string;
    date!: string;
    price!: string;

    constructor(id: string, title: string, artist: string, date: string, price: string) { 
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.price = price;
     }  
}