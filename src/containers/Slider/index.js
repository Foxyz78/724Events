import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    // opérateur logique < changé par > pour trier dans le bon sens
    const byDateDesc = data?.focus.sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1));
    const nextCard = () => {
        // condition if ajouté pour géré l'erreur undefined de la proprité length de la variable byDateDesc
        if (byDateDesc) {
            setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
        }
    };
    useEffect(() => {
        nextCard();
    });
    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <>
                    <div key={event.title} className={`SlideCard SlideCard--${index === idx ? 'display' : 'hide'}`}>
                        {/* attribut alt modifié afin d'avoir les renseignements correspodants à l'image */}
                        <img src={event.cover} alt={event.title} />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateDesc.map((_, radioIdx) => (
                                <input
                                    key={`${event.id}`}
                                    type="radio"
                                    name="radio-button"
                                    // la variable idx a été remplacé par la variable index du usestate
                                    checked={index === radioIdx}
                                />
                            ))}
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
};

export default Slider;
