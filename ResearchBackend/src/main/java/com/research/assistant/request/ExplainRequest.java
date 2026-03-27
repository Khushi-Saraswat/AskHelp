package com.research.assistant.request;
import com.research.assistant.Constant.Level;
import lombok.Data;

@Data
public class ExplainRequest {
    private String concept;
    private Level level; 
}
