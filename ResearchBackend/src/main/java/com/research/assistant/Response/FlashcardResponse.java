package com.research.assistant.Response;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardResponse {

    private List<Card> cards;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Card {
        private String q;
        private String a;
        private List<String> tags;
    }
}