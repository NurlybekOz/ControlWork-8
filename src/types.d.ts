export interface IQuote {
    id: string;
    category: string;
    description: string;
    author: string;

}

export interface IQuoteForm {
    category: string;
    description: string;
    author: string;
}

export interface IQuoteApi {
    [id: string]: IQuoteForm;
}