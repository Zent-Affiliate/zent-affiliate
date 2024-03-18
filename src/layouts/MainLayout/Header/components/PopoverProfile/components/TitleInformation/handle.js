import {useSelector} from 'react-redux';

export default function Handle() {
    const me = useSelector(state => state.auth.me);

    return {
        me
    };
}
