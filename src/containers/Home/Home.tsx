
import {IQuote, IQuoteApi} from "../../types";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import Grid from "@mui/material/Grid2";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import QuoteItem from "../../components/QuoteItem/QuoteItem.tsx";
import {Button} from "@mui/material";

const categories = [
    { title: 'Star Wars', id: "star-wars" },
    { title: 'Famous People', id: "famous-people" },
    { title: 'Saying', id: "saying" },
    { title: 'Humour', id: "humour" },
    { title: 'Motivational', id: "motivational" },
];

const Home = () => {
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { category } = useParams();

    const fetchData = useCallback(async () => {
        let url = 'quotes.json';

        if (category) {
            url = `quotes.json?orderBy="category"&equalTo="${category}"`;
        }
        try {
            setLoading(true)
            const response = await axiosApi<IQuoteApi>(url);
            if (response.data) {
                const quotesObject = response.data;
                const quotesObjectKeys = Object.keys(quotesObject);
                const quotesArray = quotesObjectKeys.map(quoteIdorKey => {
                    return {
                        id: quoteIdorKey,
                        ...quotesObject[quoteIdorKey],
                    }
                })
                setQuotes(quotesArray);
            } else {
                setQuotes([])
            }

        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }

    }, [category])

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const deleteQuote = async (quote: IQuote) => {
        if (quote.id) {
            try {
                setLoading(true);
                await axiosApi.delete<IQuoteApi>(`quotes/${quote.id}.json`);
                await fetchData();
                navigate("/");
                toast.success("Post was successfully deleted!");
            } catch (e) {
                alert(e);
            } finally {
                setLoading(false);
            }
        }
    };

    let content = null;

    if (loading) {
        content = <Loader />;
    }

    if (!loading) {
        if (quotes.length > 0) {
            content = (
                <Grid container spacing={2}>
                    {quotes.map(quote => (
                        <Grid key={quote.id} sx={{border: '1px solid', padding: '5px'}}>
                            <QuoteItem quote={quote} onDeleteQuote={() => deleteQuote(quote)}/>
                        </Grid>
                    ))}
                </Grid>
            )
        } else {
            content = (<strong>No quotes yet</strong>)
        }
    }

    const categoryTitle = category ? categories.find(cat => cat.id === category)?.title : 'All Quotes';

    return (
        <>
            <div className='quotes'>
                <div className='category-list'>
                    <h3>Categories</h3>
                    <ul>
                        <li>
                            <Button color='inherit' component={NavLink} to='/quotes'>All</Button>
                        </li>
                        {categories.map(category => (
                            <li key={category.id}>
                                <Button color="inherit" component={NavLink} to={`/quotes/${category.id}`}>{category.title}</Button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 1 }}>
                    <h1>{categoryTitle}</h1>
                    {content}
                </div>
            </div>
        </>
    );
};

export default Home;