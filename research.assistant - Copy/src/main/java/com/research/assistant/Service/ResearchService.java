package com.research.assistant.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.assistant.Response.GeminiResponse;
import com.research.assistant.request.ResearchRequest;

@Service
public class ResearchService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;

    private final ObjectMapper objectMapper;

    public ResearchService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

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

        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .bodyValue(requestBody).retrieve()
                .bodyToMono(String.class).block();
        // parse the response
        // return response

        return extractTextFromResponse(response);
    }

    private String extractTextFromResponse(String response) {
        try {

            GeminiResponse geminiResponse = objectMapper.readValue(response, GeminiResponse.class);
            if (geminiResponse.getCandidates() != null && !geminiResponse.getCandidates().isEmpty()) {
                GeminiResponse.Candidate firstcan = geminiResponse.getCandidates().get(0);

                if (firstcan.getContent() != null
                        && firstcan.getContent().getParts() != null
                        && !firstcan.getContent().getParts().isEmpty()) {
                    return firstcan.getContent().getParts().get(0).getText();
                }

            }

        } catch (Exception e) {
            return "Error Parsing:" + e.getMessage();
        }

        return "No content";

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
