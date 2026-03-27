package com.research.assistant.request;

import lombok.Data;

@Data
public class SummarizeRequest {
    private String text;
    private String mode;
}
