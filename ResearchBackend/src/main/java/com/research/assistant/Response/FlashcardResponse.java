package com.research.assistant.Response;

import java.util.List;

import lombok.Data;


@Data
public class FlashcardResponse {
        private List<Card> cards;

    public FlashcardResponse(List<Card> cards) {
        this.cards = cards;
    }

    // getter & setter

    @Data
    public static class Card {
        private String question;
        private String answer;

        // getters & setters
    }

}
