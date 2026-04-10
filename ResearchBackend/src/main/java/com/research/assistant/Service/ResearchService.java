package com.research.assistant.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.assistant.Response.FlashcardResponse;
import com.research.assistant.request.ChatRequest;
import com.research.assistant.request.SummarizeRequest;
import com.research.assistant.request.ExplainRequest;
import com.research.assistant.request.FlashcardRequest;
import com.research.assistant.request.CitationRequest;

@Service
public class ResearchService {

    @Autowired
    private ChatClient chatClient;
    

    private List<String> splitText;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String CHUNKS_STORAGE_DIR = "data/pdf_chunks";
    
    public ResearchService() throws IOException {
        // Create storage directory if it doesn't exist
        Files.createDirectories(Paths.get(CHUNKS_STORAGE_DIR));
    }

    

    public String processContent(ChatRequest request,String operation) {
        // Build the prompt
        String prompt = buildPrompt(operation);

        // Query the ai model api
        String response = chatClient
                .prompt()
                .user(request.getMessage()+""+prompt)
                .call()
                .content();

        return response;
    }


    public String SummarizeContent(SummarizeRequest summarizeRequest,String operation){
        // Build the prompt
        String prompt = buildPrompt(operation);

        // Query the ai model api
        String response = chatClient
                .prompt()
                .user(summarizeRequest.getText()+""+summarizeRequest.getMode()+""+prompt)
                .call()
                .content();

        return response;
    }

    public String explainConcept(ExplainRequest explainRequest, String operation) {
        // Build the prompt
        String prompt = buildPrompt(operation);

        // Query the ai model api
        String response = chatClient
                .prompt()
                .user(explainRequest.getConcept() + " Level: " + explainRequest.getLevel() + " " + prompt)
                .call()
                .content();

        return response;
    }

    public String generateCitation(CitationRequest citationRequest, String operation) {
        // Build the prompt
        String prompt = buildPrompt(operation);

        // Build the citation input
        String citationInput = String.format(
            "Title: %s, Author: %s, Year: %s, Journal: %s, Publisher: %s, Format: %s %s",
            citationRequest.getTitle(),
            citationRequest.getAuthor(),
            citationRequest.getYear(),
            citationRequest.getJournal() != null ? citationRequest.getJournal() : "",
            citationRequest.getPublisher() != null ? citationRequest.getPublisher() : "",
            citationRequest.getFormat(),
            prompt
        );

        // Query the ai model api
        String response = chatClient
                .prompt()
                .user(citationInput)
                .call()
                .content();

        return response;
    }

    private String buildPrompt(String operation) {
        StringBuilder prompt = new StringBuilder();
        switch (operation) {

            case "chat":
                prompt.append("Provide a clear and concise answer of the following text:");
                break;

            case "explain":
                prompt.append("Provide a clear and accurate explanation of this concept at the specified level:");
                break;

            case "summarize":
                prompt.append("Provide a clear and concise summary of the following text:");
                break;

            case "citation":
                prompt.append("Generate a properly formatted citation from these details:");
                break;

            case "ask":
                prompt.append("Based on the following content, answer the user's question clearly and accurately: ");
                break;

            case "export_pdf":
                prompt.append(
                        "Prepare the following summary and any reference information for professional PDF export. Make the text clear, structured, and easy to read: ");
                break;

            default:
                throw new IllegalArgumentException("Unknown Operation " + operation);
        }
        
        return prompt.toString();
    }
   
    public FlashcardResponse generateFlashcards(FlashcardRequest request) {

    String prompt = """
       Generate %d flashcards from the text below.

  {
  "cards":[
    {
      "q":"question",
      "a":"answer",
      "tags":["tag1","tag2"]
    }
  ]
   }
        Text:
       %s
       """.formatted(request.getCount(), request.getText());

    String response = chatClient
            .prompt()
            .user(prompt)
            .call()
            .content();

    
    response = response.replace("```json", "")
                       .replace("```", "")
                       .trim();

    System.out.println("RAW AI RESPONSE: " + response);

    try {
        FlashcardResponse flashcardResponse =
                objectMapper.readValue(response, FlashcardResponse.class);

        return flashcardResponse;

    } catch (Exception e) {
        e.printStackTrace();

        // fallback: return empty but not null
        return new FlashcardResponse(new ArrayList<>());
    }
}



}