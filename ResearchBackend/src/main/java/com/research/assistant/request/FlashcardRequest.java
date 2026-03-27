package com.research.assistant.request;

import lombok.Data;

@Data
public class FlashcardRequest {
    private String text;
    private int count;

}
