
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader/Loader.tsx";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import {IQuoteForm} from "../../types";
import QuoteForm from "../../components/QuoteForm/QuoteForm.tsx";


const NewQuote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmitAddNewQuote = async (quote: IQuoteForm) => {
        try {
            setLoading(true);
            await axiosApi.post("/quotes.json", quote);
            toast.success("New Quote Added!")
            navigate("/");
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }
    let form = (<QuoteForm onSubmitAction={onSubmitAddNewQuote} isEdit={false}/>)

    if (loading) form = <Loader/>
    return (
        <div>
            {form}
        </div>
    );
};

export default NewQuote;