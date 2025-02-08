import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IQuoteForm} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader.tsx";
import QuoteForm from "../../components/QuoteForm/QuoteForm.tsx";



const EditQuote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {idQuote} = useParams();

    const onSubmitAddNewQuote = async (quote: IQuoteForm) => {
        try {
            setLoading(true);
            await axiosApi.put(`quotes/${idQuote}.json`, quote);
            toast.success("Quote was successfully edited!");
            navigate('/');
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }
    let form = (<QuoteForm onSubmitAction={onSubmitAddNewQuote} isEdit={true} idQuote={idQuote} />)

    if (loading) form = <Loader/>
    return (
        <div>
            {form}
        </div>
    );
};

export default EditQuote;