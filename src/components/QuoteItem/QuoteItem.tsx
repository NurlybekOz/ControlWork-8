import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IQuote} from "../../types";
import {NavLink} from "react-router-dom";

interface Props {
    quote: IQuote;
    onDeleteQuote: React.MouseEventHandler;
}


const QuoteItem:React.FC<Props> = ({quote, onDeleteQuote}) => {
    return (
        <Card variant='outlined' sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom sx={{fontSize: 19 }}>
                   "{quote.description}"
                </Typography>
                <Typography gutterBottom sx={{fontSize: 19 }}>
                  - {quote.author}
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' component={NavLink} to={`/quotes/${quote.id}/edit`}>Edit</Button>
                <Button size="small" variant='contained' color='error' onClick={onDeleteQuote}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default QuoteItem;
