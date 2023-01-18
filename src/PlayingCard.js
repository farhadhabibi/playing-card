import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './PlayingCard.css'
const API_BASE_URL = `https://www.deckofcardsapi.com/api/deck/`;

class PlayingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDeck: null,
            cards: [],
        }
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        const response = await axios.get(`${API_BASE_URL}new/shuffle/`);
        this.setState({ cardDeck: response.data })
    }

    async getCard() {
        const id = this.state.cardDeck.deck_id;
        try {
            const cardURL = await axios.get(`${API_BASE_URL}${id}/draw/`);
            const card = cardURL.data.cards[0];
            if (!cardURL.data.success) {
                throw new Error('No card left')
            }
            this.setState(st => ({
                cards: [
                    ...st.cards,
                    {
                        code: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]

            }))
        } catch (error) {
            alert(error)
        }



    }

    render() {
        const cards = this.state.cards.map(card => (
            <Card key={card.code} img={card.image} alt={card.name} />
        ))
        return (
            <div className="Deck">
                <h1 className="Deck-title">Playing Card Dealer</h1>
                <h2 className="Deck-title subtitle">A littler Demo with React Lifecycle</h2>
                <button className="Deck-btn" onClick={this.getCard}>DEAL ME A CARD</button>
                {cards}
            </div>
        )
    }

}

export default PlayingCard;