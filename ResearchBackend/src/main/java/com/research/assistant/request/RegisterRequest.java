package com.research.assistant.request;

import lombok.Data;

@Data
public class RegisterRequest {
    
    private String name;
    private String email;
    private String password;
}
