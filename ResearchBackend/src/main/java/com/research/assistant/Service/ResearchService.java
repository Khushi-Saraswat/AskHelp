package com.research.assistant.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.research.assistant.request.ChatRequest;
import com.research.assistant.request.SummarizeRequest;
import com.research.assistant.request.ExplainRequest;
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

    public String upload(MultipartFile file)throws IOException{
       PDDocument document= PDDocument.load(file.getInputStream());
       PDFTextStripper pdfTextStripper=new PDFTextStripper();
       String text=pdfTextStripper.getText(document);
       splitText=chunkText(text,500,100);
       
       // Persist chunks to local file for durability
       String fileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]", "_");
       saveChunks(splitText, fileName);
       
       return "PDF processed and chunks saved successfully";
    }

    private List<String> chunkText(String text, int chunkSize, int overlap) {
    List<String> chunks = new ArrayList<>();
    for (int i = 0; i < text.length(); i += (chunkSize - overlap)) {
        chunks.add(text.substring(i, Math.min(text.length(), i + chunkSize)));
    }
    return chunks;
    }

    /**
     * Saves chunked PDF data to a JSON file for persistence
     * @param chunks List of text chunks to save
     * @param fileName Original PDF file name (used to create unique storage file)
     */
    public void saveChunks(List<String> chunks, String fileName) throws IOException {
        try {
            String jsonFileName = fileName.replaceAll("\\.pdf$", "") + "_chunks.json";
            Path filePath = Paths.get(CHUNKS_STORAGE_DIR, jsonFileName);
            
            String jsonData = objectMapper.writeValueAsString(chunks);
            Files.write(filePath, jsonData.getBytes());
            
            System.out.println("Chunks saved to: " + filePath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Error saving chunks: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Loads previously saved chunks from JSON file
     * @param fileName Original PDF file name
     * @return List of chunks, or empty list if file not found
     */
    public List<String> loadChunks(String fileName) throws IOException {
        try {
            String jsonFileName = fileName.replaceAll("\\.pdf$", "") + "_chunks.json";
            Path filePath = Paths.get(CHUNKS_STORAGE_DIR, jsonFileName);
            
            if (Files.exists(filePath)) {
                String jsonData = Files.readString(filePath);
                List<String> chunks = objectMapper.readValue(jsonData, 
                    objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
                System.out.println("Chunks loaded from: " + filePath.toAbsolutePath());
                return chunks;
            } else {
                System.out.println("Chunks file not found: " + filePath);
                return new ArrayList<>();
            }
        } catch (IOException e) {
            System.err.println("Error loading chunks: " + e.getMessage());
            throw e;
        }
    }

    /**
     * List all stored chunk files
     * @return List of stored PDF chunk file names
     */
    public List<String> listStoredChunks() throws IOException {
        List<String> fileNames = new ArrayList<>();
        if (Files.exists(Paths.get(CHUNKS_STORAGE_DIR))) {
            Files.list(Paths.get(CHUNKS_STORAGE_DIR))
                .filter(path -> path.toString().endsWith("_chunks.json"))
                .forEach(path -> fileNames.add(path.getFileName().toString()));
        }
        return fileNames;
    }

    /**
     * Delete chunks storage for a specific file
     * @param fileName Original PDF file name
     */
    public boolean deleteChunks(String fileName) throws IOException {
        try {
            String jsonFileName = fileName.replaceAll("\\.pdf$", "") + "_chunks.json";
            Path filePath = Paths.get(CHUNKS_STORAGE_DIR, jsonFileName);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                System.out.println("Chunks deleted: " + filePath);
                return true;
            }
            return false;
        } catch (IOException e) {
            System.err.println("Error deleting chunks: " + e.getMessage());
            throw e;
        }
    }
}
