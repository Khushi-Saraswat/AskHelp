package com.research.assistant.request;
import com.research.assistant.Constant.Format;
import lombok.Data;

@Data
public class CitationRequest {
    private String title;
    private String author;
    private String year;
    private String journal;
    private String publisher;
    private Format format;

}
