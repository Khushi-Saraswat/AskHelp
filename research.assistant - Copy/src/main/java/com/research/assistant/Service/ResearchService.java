package com.research.assistant.Service;

import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.assistant.request.ResearchRequest;

@Service
public class ResearchService {

    @Autowired
    private ChatClient chatClient;

    @Autowired
    private ObjectMapper objectMapper;

    public String processContent(ResearchRequest request) {
        // Build the prompt
        String prompt = buildPrompt(request);
        // Query the ai model api
        Map<String, Object> requestBody = Map.of(

                "contents", new Object[] {

                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                }

        );

        // String parts = (String) requestBody.get("text");
        // String response = webClient.post()
        // .uri(geminiApiUrl + geminiApiKey)
        // .bodyValue(requestBody).retrieve()
        // .bodyToMono(String.class).block();
        // parse the response
        // return response

        String response = chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return response;
    }

    private String buildPrompt(ResearchRequest request) {
        StringBuilder prompt = new StringBuilder();
        switch (request.getOperation()) {
            case "summarize":
                prompt.append("Provide a clear and concise summary of the following text:");
                break;

            case "citation":
                prompt.append(
                        "Extract the citation details (author, title, publication, year, URL) in APA format from this text: ");
                break;

            case "ask":
                prompt.append("Based on the following content, answer the user's question clearly and accurately: ");
                break;

            case "export_pdf":
                prompt.append(
                        "Prepare the following summary and any reference information for professional PDF export. Make the text clear, structured, and easy to read: ");
                break;

            default:
                throw new IllegalArgumentException("Unknown Operation " + request.getOperation());
        }
        prompt.append(request.getContent());
        return prompt.toString();
    }
}
